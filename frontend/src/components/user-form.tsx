import { GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation, type Location } from "react-router-dom";

export function UserForm({
  className,
  onSubmit,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
} & { children: React.ReactNode }) {
  const location: Location = useLocation();
  const url: string = location.pathname;
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Dressify</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Dressify</h1>
            <div className="text-center text-sm">
              {url === "/login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <Link to="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <Link to="/login" className="underline underline-offset-4">
                    Log in
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-3">{children}</div>
            {url === "/login" ? (
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
            ) : (
              <Button type="submit" className="w-full cursor-pointer">
                Create Account
              </Button>
            )}
          </div>
        </div>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
