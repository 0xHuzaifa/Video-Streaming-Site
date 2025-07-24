interface BaseAuthResponse {
  statusCode: number;
  message: string;
  success: boolean;
}

interface UnVerifiedUserAuthResponse extends BaseAuthResponse {
  success: true;
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
}

type AuthResponse =
  | UnVerifiedUserAuthResponse
  | VerifiedUserAuthResponse
  | ErrorAuthResponse
  | LogoutAuthResponse;

const isUnverifiedAuth = (
  response: AuthResponse
): response is UnVerifiedUserAuthResponse => {
  return (
    response.success === true && !("data" in response) && !("error" in response)
  );
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
  return response.success === true && !("data" in response);
};

export type { AuthResponse };
export { isSuccessfulAuth, isErrorAuth, isUnverifiedAuth, isLogoutAuth };
