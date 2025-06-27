interface BaseAuthResponse {
  statusCode: number;
  message: string;
  success: boolean;
}

interface UnVerifiedUserAuthResponse extends BaseAuthResponse {
  success: true;
}

interface VerifiedUserAuthResponse extends BaseAuthResponse {
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

type AuthResponse =
  | UnVerifiedUserAuthResponse
  | VerifiedUserAuthResponse
  | ErrorAuthResponse;

export type { AuthResponse };
