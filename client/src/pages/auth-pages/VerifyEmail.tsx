"use client";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, XCircle, Mail } from "lucide-react";
import { verifyEmailMutationOptions } from "@/queries/authQueries";



export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const {userId, token} = useParams();


  const mutation = verifyEmailMutationOptions();

  useEffect(() => {
    // Automatically trigger verification when component mounts if params are present
    if (userId && token) {
      mutation.mutate({ userId, token });
    }
  }, [userId, token]);

  const handleRetry = () => {
    if (userId && token) {
      mutation.mutate({ userId, token });
    }
  };

  const handleGoToLogin = () => {
    navigate("/login");
  };

  // Show error if required parameters are missing
  if (!userId || !token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-xl font-semibold">
              Invalid Verification Link
            </CardTitle>
            <CardDescription>
              The verification link is invalid or missing required parameters.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={handleGoToLogin} className="w-full">
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
            {mutation.isPending ? (
              <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
            ) : mutation.isSuccess ? (
              <CheckCircle className="h-6 w-6 text-green-600" />
            ) : mutation.isError ? (
              <XCircle className="h-6 w-6 text-red-600" />
            ) : (
              <Mail className="h-6 w-6 text-blue-600" />
            )}
          </div>
          <CardTitle className="text-xl font-semibold">
            {mutation.isPending && "Verifying Your Email"}
            {mutation.isSuccess && "Email Verified Successfully"}
            {mutation.isError && "Verification Failed"}
            {!mutation.isPending &&
              !mutation.isSuccess &&
              !mutation.isError &&
              "Email Verification"}
          </CardTitle>
          <CardDescription>
            {mutation.isPending &&
              "Please wait while we verify your email address..."}
            {mutation.isSuccess &&
              "Your email has been verified. Redirecting to login..."}
            {mutation.isError &&
              "There was an error verifying your email address."}
            {!mutation.isPending &&
              !mutation.isSuccess &&
              !mutation.isError &&
              "Verifying your email address"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {mutation.isError && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                {mutation.error?.message ||
                  "An unexpected error occurred during verification."}
              </AlertDescription>
            </Alert>
          )}

          {mutation.isSuccess && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                {mutation.data?.message ||
                  "Your email has been successfully verified!"}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col gap-2">
            {mutation.isError && (
              <Button
                onClick={handleRetry}
                variant="outline"
                className="w-full bg-transparent"
              >
                Try Again
              </Button>
            )}

            {(mutation.isSuccess || mutation.isError) && (
              <Button onClick={handleGoToLogin} className="w-full">
                {mutation.isSuccess ? "Continue to Login" : "Go to Login"}
              </Button>
            )}
          </div>

          {mutation.isPending && (
            <div className="text-center text-sm text-muted-foreground">
              This may take a few moments...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
