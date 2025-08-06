interface BaseAuthResponse {
  statusCode: number;
  message: string;
  success: boolean;
}

interface UnVerifiedUserAuthResponse extends BaseAuthResponse {
  success: true;
  type: "UNVERIFIED_USER";
}

interface VerifiedUserAuthResponse extends BaseAuthResponse {
  success: true;
  data: {
    loggedInUser: {
      id: string;
      fullName: string;
      username: string;
      email: string;
      isVerified: boolean;
    };
  };
}

interface ErrorAuthResponse extends BaseAuthResponse {
  success: false;
  errors: [];
  stack?: string;
}

interface LogoutAuthResponse extends BaseAuthResponse {
  success: true;
  type: "LOGOUT";
}

interface VerifyEmailAuthResponse extends BaseAuthResponse {
  success: true;
  type: "VERIFY_EMAIL";
}

type AuthResponse =
  | UnVerifiedUserAuthResponse
  | VerifiedUserAuthResponse
  | ErrorAuthResponse
  | LogoutAuthResponse
  | VerifyEmailAuthResponse;

const isUnverifiedAuth = (
  response: AuthResponse
): response is UnVerifiedUserAuthResponse => {
  // Check if it's a successful response without data (unverified user)
  const isUnverified =
    response.success === true &&
    !("data" in response) &&
    !("errors" in response);

  // If type field exists, also check it matches
  if ("type" in response) {
    return isUnverified && response.type === "UNVERIFIED_USER";
  }

  // Fallback: if no type field, assume unverified based on structure
  return isUnverified;
};

const isSuccessfulAuth = (
  response: AuthResponse
): response is VerifiedUserAuthResponse => {
  return response.success === true && "data" in response;
};

const isErrorAuth = (response: AuthResponse): response is ErrorAuthResponse => {
  return response.success === false && "error" in response;
};

const isLogoutAuth = (
  response: AuthResponse
): response is LogoutAuthResponse => {
  return (
    response.success === true &&
    "type" in response &&
    response.type === "LOGOUT"
  );
};

const isVerifyEmailAuth = (
  response: AuthResponse
): response is VerifyEmailAuthResponse => {
  return (
    response.success === true &&
    "type" in response &&
    response.type === "VERIFY_EMAIL"
  );
};

export type { AuthResponse };
export {
  isSuccessfulAuth,
  isErrorAuth,
  isUnverifiedAuth,
  isLogoutAuth,
  isVerifyEmailAuth,
};
