//TODO we need better change the core packages first and then impement here, for now it is temporary solution
const ERROR_MAPPING: Record<string, string> = {
  "Temporary password has expired and must be reset by an administrator.":
    "We need to send you a new invite to the platform, please message your Asthma Connect contact.",
  "User password cannot be reset in the current state.":
    "We need to send you a new invite to the platform, please message your Asthma Connect contact.",
  "There is already a signed in user.":
    "Your previous session was not cleared properly. Please try logging in again.",
  // Add other AWS or GraphQL error mapping here
};

export const resolveAuthError = (error: unknown): string | undefined => {
  if (!error) return undefined;

  if (typeof error === "string") {
    return ERROR_MAPPING[error] ?? error;
  }

  if (error instanceof Error) {
    const message = error.message;
    return ERROR_MAPPING[message] ?? message;
  }

  return JSON.stringify(error);
};
