import api from "@/lib/api";
import { type LoginSchemaType, type SignupSchemaType } from "@/schema";
import getErrorMessage from "@/utils/getErrorMessage";
import { toast } from "sonner";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AuthResponse } from "@/lib/types/authTypes";

const signUpMutationOptions = (
  options?: Partial<UseMutationOptions<AuthResponse, Error, SignupSchemaType>>
) => {
  return useMutation({
    mutationFn: (data: SignupSchemaType) => signUp(data),
    onSuccess: (
      data: AuthResponse,
      variables: SignupSchemaType,
      context: unknown
    ) => {
      console.log("signUp successful", data);
      toast.success(data.message || "Sign up successful");
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error: Error, variables: SignupSchemaType, context: unknown) => {
      console.log("signUp failed", error);
      const message = getErrorMessage(error);
      console.log("error message", message);
      toast(message);
      options?.onError?.(error, variables, context);
    },
  });
};

const signUp = async (data: SignupSchemaType): Promise<AuthResponse> => {
  const response = await api.post("/auth/register", data);
  console.log("success", response);
  return response.data;
};

const loginMutationOptions = (
  options?: Partial<UseMutationOptions<AuthResponse, Error, LoginSchemaType>>
) => {
  return useMutation({
    mutationFn: (data: LoginSchemaType) => login(data),
    onSuccess: (
      data: AuthResponse,
      variables: LoginSchemaType,
      context?: unknown
    ) => {
      toast.success(data.message || "Login successful");
      console.log("login successful", data);
      localStorage.setItem("user", JSON.stringify(data.data));
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error: Error, variables: LoginSchemaType, context?: unknown) => {
      console.log("login failed", error);
      const message = getErrorMessage(error);
      console.log("error message", message);
      toast.error(message);
      options?.onError?.(error, variables, context);
    },
    ...options,
  });
};

const login = async (data: LoginSchemaType): Promise<any> => {
  const response = await api.post("/auth/login", data);
  console.log("success", response);
  return response.data;
};

export { loginMutationOptions, signUpMutationOptions };
