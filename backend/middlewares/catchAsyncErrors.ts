type HandlerFunction = (...args: any[]) => Promise<any>;

interface IValidationError {
  message: string;
}

function extractErrors(error: any) {
  if (error?.name === "ValidationError") {
    return {
      message: Object.values<IValidationError>(error?.errors)
        .map((value) => value.message)
        .join(", "),
      statusCode: 400,
    };
  }

  if (error?.response?.data?.message) {
    return {
      message: error?.response?.data?.message,
      statusCode: 400,
    };
  }

  if (error?.message) {
    return {
      message: error.message,
      statusCode: 400,
    };
  }
  return {
    message: "Internal Server Error",
    statusCode: 500,
  };
}

export const catchAsyncErrors =
  (handler: HandlerFunction) =>
  async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error: any) {
      const { message, statusCode } = extractErrors(error);

      return {
        error: {
          message,
          statusCode,
        },
      };
    }
  };
