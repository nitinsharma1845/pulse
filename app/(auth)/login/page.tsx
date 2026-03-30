"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useForm } from "react-hook-form";
import z from "zod";
import { loginSchema } from "@/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed, InfoIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/components/common/FullScreenLoader";

type formData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<formData>({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  async function submitHandler(data: formData) {
    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      setError("root", {
        type: "manual",
        message: res.error,
      });
      return;
    }
    setLoading(true);

    console.log("Login success");
    router.push("/dashboard");
  }

  if (loading) {
    return <FullScreenLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-300 flex flex-col md:flex-row items-center md:items-stretch justify-between gap-12 md:gap-8">
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left max-w-md">
            <div className="mb-8">
              <Image
                src="/1-removebg-preview.png"
                width={120}
                height={120}
                alt="Pulse Logo"
                className="object-contain"
              />
            </div>

            <h1 className="text-4xl md:text-[42px] font-medium text-foreground leading-[1.2] mb-10">
              See what&apos;s going on with{" "}
              <span className="bg-linear-to-r from-primary via-ring to-destructive bg-clip-text text-transparent font-semibold">
                close ones.
              </span>
            </h1>

            <div className="w-full flex justify-center md:justify-start">
              <img
                src="https://static.cdninstagram.com/rsrc.php/yN/r/-erGonz07kB.webp"
                alt="Pulse Moments"
                className="w-[280px] h-auto object-contain drop-shadow-xl"
              />
            </div>
          </div>

          <div className="hidden md:block w-px bg-border my-4"></div>

          <div className="flex-1 flex flex-col justify-center w-full max-w-xl md:pl-10">
            <h2 className="text-lg font-semibold mb-6 text-foreground">
              Log into Pulse
            </h2>

            {errors.root && (
              <div className="grid w-full max-w-xl mb-5 items-start gap-4">
                <Alert className="bg-transparent border border-destructive text-primary">
                  <InfoIcon />
                  <AlertTitle>{errors.root.message}</AlertTitle>
                </Alert>
              </div>
            )}

            <form
              className="w-full flex flex-col gap-3"
              onSubmit={handleSubmit(submitHandler)}
            >
              <div>
                <Input
                  {...register("identifier")}
                  type="text"
                  placeholder="Mobile number, username or email"
                  className="h-15 w-full rounded-xl bg-transparent border-border focus-visible:ring-1 focus-visible:ring-ring text-[15px]"
                />
                {errors.identifier && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.identifier.message}
                  </p>
                )}
              </div>

              <div>
                <div className="relative">
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="h-15 w-full rounded-xl bg-transparent border-border focus-visible:ring-1 focus-visible:ring-ring text-[15px]"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-5 right-4 cursor-pointer"
                    type="button"
                  >
                    {showPassword ? (
                      <EyeClosed className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                disabled={isSubmitting}
                className="w-full h-11.5 rounded-full font-semibold mt-2 text-[15px] cursor-pointer"
                type="submit"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : "Log in"}
              </Button>
            </form>

            <div className="text-center mt-5 mb-6">
              <Link
                href="#"
                className="text-[14px] font-medium text-foreground hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                className="w-full h-11.5 rounded-full font-semibold text-[15px] border-border text-primary hover:bg-muted/50 cursor-pointer"
                type="button"
              >
                Create new account
              </Button>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-6 mt-auto">
        <div className="text-center mt-4 text-[12px] text-muted-foreground">
          © 2026 Pulse
        </div>
      </footer>
    </div>
  );
}
