import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
// import githubLogo from "@/assets/githubLogo.svg";
// import githubLogo from "@/assets/githubLogo.svg";
import { SignupSchema, type SignupSchemaType } from "@/schema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "../ui/form";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      username: "",
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<SignupSchemaType> = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign Up New Account </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your details below to create a new account
          </p>
        </div>

        <div className="grid gap-6">
          {/* Username field */}
          <FormField
            control={form.control}
            name="username" 
            render={({ field }) => (
              <FormItem className="-mb-2">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="0xHuzaifa" {...field} />
                </FormControl>
                <FormDescription className="text-red-500">
                  {form.formState.errors.username?.message}
                </FormDescription>
              </FormItem>
            )}
          />

          {/* FullName field */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="-mb-2">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Huzaifa Ahmed" {...field} />
                </FormControl>
                <FormDescription className="text-red-500">
                  {form.formState.errors.fullName?.message}
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Email field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="-mb-2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Huzaifa@gmail.com"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-red-500">
                  {form.formState.errors.email?.message}
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Password field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="-mb-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={password ? "text" : "password"}
                      placeholder="******"
                      {...field}
                    />
                    {password ? (
                      <Eye
                        className="absolute top-0 mt-1.5 mr-2 right-0 cursor-pointer"
                        onClick={() => setPassword(!password)}
                      />
                    ) : (
                      <EyeOff
                        className="absolute top-0 mt-1.5 mr-2 right-0 cursor-pointer"
                        onClick={() => setPassword(!password)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormDescription className="text-red-500">
                  {form.formState.errors.password?.message}
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Confirm Password field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="-mb-2">
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={confirmPassword ? "text" : "password"}
                      placeholder="******"
                      {...field}
                    />
                    {confirmPassword ? (
                      <Eye
                        className="absolute top-0 mt-1.5 mr-2 right-0 cursor-pointer"
                        onClick={() => setConfirmPassword(!confirmPassword)}
                      />
                    ) : (
                      <EyeOff
                        className="absolute top-0 mt-1.5 mr-2 right-0 cursor-pointer"
                        onClick={() => setConfirmPassword(!confirmPassword)}
                      />
                    )}
                  </div>
                </FormControl>
                <FormDescription className="text-red-500">
                  {form.formState.errors.confirmPassword?.message}
                </FormDescription>
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            SignUp
          </Button>

          {/* OAuth section */}
          {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <img src={githubLogo} alt="GitHub Logo" className="w-4 h-4" />
          SignUp with GitHub
        </Button> */}
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to={"/login"} className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
}
