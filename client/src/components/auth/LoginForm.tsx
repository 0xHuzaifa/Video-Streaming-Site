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
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [password, setPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginSchemaType> = (data) => {
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
              name="usernameOrEmail"
              render={(field) => (
                <FormItem>
                  <FormLabel>Username or Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your username or email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.formState.errors.usernameOrEmail?.message}
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
              render={(field) => (
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
                    <Input
                      placeholder="Enter your username or email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {form.formState.errors.password?.message}
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
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
