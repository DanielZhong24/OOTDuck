import { GalleryVerticalEnd } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLocation, type Location } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
export function UserForm({
  className,
  onSubmit,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
} & { children: React.ReactNode } & { errorMsg?: string }) {
  const location: Location = useLocation();
  const url: string = location.pathname;
  const { signInWithGoogle } = useAuth();

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
          <div className="mt-4 w-full">
            <div className="after:border-border relative my-4 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              <span className="relative z-10 bg-gray-50 px-2 text-gray-500">Or</span>
            </div>
            <Button
              variant="outline"
              type="button"
              className="flex w-full items-center justify-center gap-2"
              onClick={signInWithGoogle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Continue with Google
            </Button>
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
