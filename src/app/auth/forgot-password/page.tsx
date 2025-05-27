"use client";

import { useState, useEffect } from "react";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CustomInput from "@/components/ui/customInput";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setForgotPasswordTimer } from "@/store/features/timerReducer";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const forgotPasswordTimer = useSelector(
    (state: RootState) => state.timer.forgotPasswordTimer
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (forgotPasswordTimer !== null && forgotPasswordTimer > 0) {
      interval = setInterval(() => {
        dispatch(setForgotPasswordTimer(forgotPasswordTimer - 1));
      }, 1000);
    } else if (forgotPasswordTimer === 0) {
      dispatch(setForgotPasswordTimer(null));
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [forgotPasswordTimer, dispatch]);

  const forgotPassword = trpc.authRoutes.forgotPassword.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setError("");
      dispatch(setForgotPasswordTimer(60)); // Set timer to 60 seconds
    },
    onError: (error) => {
      setError(error.message);
      setSuccess(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    forgotPassword.mutate({ email });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[rgba(224,205,39,0.2)] to-[rgba(231,228,22,0.73)]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-blue mb-6">
          Reset Password
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Password reset instructions have been sent to your email.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <CustomInput
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Button
            type="submit"
            className="w-full bg-blue text-white hover:bg-blue/90"
            disabled={forgotPassword.isPending || forgotPasswordTimer !== null}
          >
            {forgotPassword.isPending
              ? "Sending..."
              : forgotPasswordTimer !== null
              ? `Resend in ${formatTime(forgotPasswordTimer)}`
              : "Send Reset Instructions"}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-blue hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
