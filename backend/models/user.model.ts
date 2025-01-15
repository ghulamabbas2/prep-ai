import { userRoles } from "@/constants/constants";
import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  roles: string[];
  profilePicture: {
    id: string;
    url: string | null;
  };
  password?: string | null;
  authProviders: {
    provider: string;
    providerId: string;
  }[];
  subscription: {
    id: string;
    customer: string;
    created: Date;
    status: string;
    startDate: Date;
    currentPeriodEnd: Date;
    nextPaymentAttempt: Date;
  };
}

const authProvidersSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
    enum: ["google", "github", "credentials"],
  },
  providerId: {
    type: String,
    required: true,
  },
});

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      trim: true,
      unique: [true, "Email already exists"],
      lowercase: true,
    },
    roles: {
      type: [String],
      default: ["user"],
      enum: userRoles,
    },
    profilePicture: {
      id: String,
      url: {
        type: String,
        default: null,
      },
    },
    password: {
      type: String,
      select: false,
      minLength: [8, "Password must be at least 8 characters"],
      default: null,
    },
    authProviders: {
      type: [authProvidersSchema],
      default: [],
    },
    subscription: {
      id: String,
      customer: String,
      created: Date,
      status: String,
      startDate: Date,
      currentPeriodEnd: Date,
      nextPaymentAttempt: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  if (this.password) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
