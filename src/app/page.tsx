"use client";

import { useForm, Controller } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  interface LoginFormInputs {
    email: string;
    password: string;
  }

  const [error, setError] = useState<string | null>(null); // Uncomment if you add error handling
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>({
    defaultValues: {
      // Ensure default values are always defined
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormInputs) => {
    setError(null); // Clear previous errors on new submission attempt
    try {
      const res = await axios.post("http://localhost:5000/login", data);
      if (res.data.success) {
        console.log(res.data.token);
        sessionStorage.setItem("access_key", res.data.token);
        router.push("/home");
      } else {
        // Set error message from the API response if success is false
        setError(res.data.message || "Sign up failed. Please try again.");
      }
    } catch (err) {
      // Use 'any' for error type or define a more specific error interface
      console.error("Error during sign up:", err);
    } finally {
      // Explicitly reset form fields to their default (empty string) values
      reset({
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-blue-600 mb-10">Todo App</h1>

      <div className="bg-gray-100 border rounded-lg shadow-md p-8 w-full max-w-md flex flex-col gap-5">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        {error && ( // Uncomment if you add error handling
          <p className="text-red-600 text-center text-sm font-medium">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="email"
                  placeholder="Email"
                  className="border p-3 rounded w-full"
                  value={field.value ?? ""} // Ensure value is always a defined string
                />
              )}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  placeholder="Password"
                  className="border p-3 rounded w-full"
                  value={field.value ?? ""} // Ensure value is always a defined string
                />
              )}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
