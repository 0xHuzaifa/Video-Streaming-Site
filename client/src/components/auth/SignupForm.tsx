import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import githubLogo from "@/assets/githubLogo.svg";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Sign Up New Account </h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create a new account
        </p>
      </div>
      <div className="grid gap-6">
        {/* FullName field */}
        <div className="grid gap-3">
          <Label htmlFor="email">Full Name</Label>
          <Input id="fullName" type="text" placeholder="Huzaifa Ahmed" required />
        </div>

        {/* Username field */}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="username" type="text" placeholder="0xHuzaifa" required />
        </div>

        {/* Email field */}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>

        {/* Password field */}
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>

        <Button type="submit" className="w-full">
          Login
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
  );
}
