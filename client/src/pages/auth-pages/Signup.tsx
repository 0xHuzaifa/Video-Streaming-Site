import { GalleryVerticalEnd } from "lucide-react";
import SignupPageImg from "@/assets/signup-page-img.webp";
import { SignupForm } from "@/components/auth/SignupForm";
import logo from "@/assets/logo.svg";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10 overflow-y-auto">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            {/* <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div> */}
            <img src={logo} alt="logo" className="w-12 h-12" />
            Video & Social Platform
          </a>
        </div>
        <div className="h-full flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted fixed top-0 right-0 bottom-0 hidden lg:block w-1/2">
        <img
          src={SignupPageImg}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
