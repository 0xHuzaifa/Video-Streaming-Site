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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "../ui/form";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
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

  const onSubmit: SubmitHandler<SignupSchemaType> = (data) => {};

  return (
    <Form {...form}>
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up New Account </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create a new account
        </p>
      </div>

      <FormField 
      control={form.control}
      name="username"
      render={({ field}) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="0xHuzaifa" {...field} />
          </FormControl>
          <FormDescription>
            {form.formState.errors.username}
          </FormDescription>
        </FormItem>
      )} 
      />

      <div className="grid gap-6">
        {/* Username field */}
        <div className="grid gap-3">
          <Label htmlFor="username">Username</Label>
          <Input id="Username" type="text" placeholder="0xHuzaifa" required />
        </div>

        {/* FullName field */}
        <div className="grid gap-3">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Huzaifa Ahmed"
            required
          />
        </div>

        {/* Email field */}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        {/* Password field */}
        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="********"
            required
          />
        </div>

        {/* Confirm Password field */}
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="********"
            required
          />
        </div>

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
