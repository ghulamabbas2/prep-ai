import dbConnect from "../config/dbConnect";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors";
import User from "../models/user.model";
import { delete_file, upload_file } from "../utils/cloudinary";
import { resetPasswordHTMLTemplate } from "../utils/emailTemplate";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";

export const register = catchAsyncErrors(
  async (name: string, email: string, password: string) => {
    await dbConnect();

    const newUser = await User.create({
      name,
      email,
      password,
      authProviders: [
        {
          provider: "credentials",
          providerId: email,
        },
      ],
    });

    return newUser?._id
      ? { created: true }
      : (() => {
          throw new Error("User not created");
        })();
  }
);

export const updateUserProfile = catchAsyncErrors(
  async ({
    name,
    userEmail,
    avatar,
    oldAvatar,
  }: {
    name: string;
    userEmail: string;
    avatar?: string;
    oldAvatar?: string;
  }) => {
    await dbConnect();

    const data: {
      name: string;
      profilePicture?: { id: string; url: string };
    } = { name };

    if (avatar) {
      data.profilePicture = await upload_file(avatar, "prep-ai/avatars");

      if (oldAvatar) {
        await delete_file(oldAvatar);
      }
    }

    await User.findOneAndUpdate({ email: userEmail }, { ...data });

    return { updated: true };
  }
);

export const updateUserPassword = catchAsyncErrors(
  async ({
    newPassword,
    confirmPassword,
    userEmail,
  }: {
    newPassword: string;
    confirmPassword: string;
    userEmail: string;
  }) => {
    await dbConnect();

    const user = await User.findOne({ email: userEmail }).select("+password");

    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    if (
      !user?.authProviders?.some(
        (provider: { provider: string }) => provider.provider === "credentials"
      )
    ) {
      user?.authProviders?.push({
        provider: "credentials",
        providerId: userEmail,
      });
    }

    user.password = newPassword;
    await user.save();

    return { updated: true };
  }
);

export const forgotUserPassword = catchAsyncErrors(async (email: string) => {
  await dbConnect();

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const resetToken = user.getResetPasswordToken();
  await user.save();

  const resetUrl = `${process.env.API_URL}/password/reset/${resetToken}`;
  const message = resetPasswordHTMLTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Prep AI Password reset request",
      message,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    throw new Error("Email could not be sent");
  }

  return { emailSent: true };
});

export const resetUserPassword = catchAsyncErrors(
  async (token: string, password: string, confirmPassword: string) => {
    await dbConnect();

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new Error("Invalid token or token expired");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    user.password = password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return { passwordUpdated: true };
  }
);
