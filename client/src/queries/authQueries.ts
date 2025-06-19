import api from "@/axios/api";
import { type LoginSchemaType, type SignupSchemaType } from "@/schema";

const signUpMutationOptions = {
  mutationFn: (data: SignupSchemaType) => signUp(data),
  onSuccess: (data: any) => {
    console.log("signUp successful", data);
  },
  onError: (error: any) => {
    console.log("signUp failed", error);
  },
};

const signUp = async (data: SignupSchemaType): Promise<any> => {
  try {
    const response = await api.post("/auth/signUp", data);
    console.log("success", response);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

const loginMutationOptions = {
  mutationFn: (data: LoginSchemaType) => login(data),
  onSuccess: (data: any) => {
    console.log("login successful", data);
  },
  onError: (error: any) => {
    console.log("login failed", error);
  },
};

const login = async (data: LoginSchemaType): Promise<any> => {
  try {
    const response = await api.post("/auth/login", data);
    console.log("success", response);
    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export { login, loginMutationOptions, signUp, signUpMutationOptions };
