import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
// import githubLogo from "@/assets/githubLogo.svg";
import { LoginSchema, type LoginSchemaType } from "@/schema";
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
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { loginMutationOptions } from "@/queries/authQueries";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  // states
  const [password, setPassword] = useState(false);

  // useForm hook for form handling
  // This hook integrates with Zod for schema validation
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      nameOrEmail: "",
      password: "",
    },
  });

  // Mutation for login
  // This uses React Query's useMutation hook to handle the login process
  const loginMutation = loginMutationOptions();

  const onSubmit: SubmitHandler<LoginSchemaType> = async (data) => {
    console.log("on submit", data);
    await loginMutation.mutateAsync(data);
  };

  console.log("login mutation paused", loginMutation.isPending);

  return (
    <Form {...form}>
      <form
        className={cn("flex flex-col gap-6", className)}
        {...props}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>

        <div className="grid gap-6">
          {/* Username or Email field */}
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="nameOrEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username or email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-red-500">
                    {form.formState.errors.nameOrEmail?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>

          {/* Password field */}
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={password ? "text" : "password"}
                        placeholder="******"
                        {...field}
                      />
                      {password ? (
                        <Eye
                          className="w-5 h-5 absolute top-0 mt-2 mr-2 right-0 cursor-pointer"
                          onClick={() => setPassword(!password)}
                        />
                      ) : (
                        <EyeOff
                          className="w-5 h-5 absolute top-0 mt-2 mr-2 right-0 cursor-pointer"
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
          </div>
          <Button
            type="submit"
            className="w-full disabled:opacity-50 disabled:cursor-none relative"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending && (
              <Loader2Icon className="absolute left-[33%] sm:left-[37%] animate-spin" />
            )}
            Login
          </Button>

          {/* OAuth Section */}
          {/* <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <img src={githubLogo} alt="GitHub Logo" className="w-4 h-4" />
          Login with GitHub
        </Button> */}
        </div>
        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={"/signup"} className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </form>
    </Form>
  );
}
