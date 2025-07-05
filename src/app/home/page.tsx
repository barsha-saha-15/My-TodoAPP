"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      console.log(
        "No userId found in session storage. Redirecting to login page."
      );
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">
        <p>This is a Demo task message...</p>
        <div className="space-x-3 flex gap-6 mt-4">
          <Link href="/update" className="text-blue-600 underline">
            Update
          </Link>
          <button className="text-red-600">Delete</button>
        </div>
      </div>
    </div>
  );
}
