'use client';
import Link from "next/link";

export default function LoginPage(){
  return(
    <div className="min-h-full flex flex-col items-center justify-center p-4" >
      <h1 className="text-4xl font-bold text-blue-600 mb-10 ">Todo App</h1>

      <div className="bg-gray-100 border rounded-1g shadow-md p-5 w-full max-w-sm flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center">Login</h2>
        <input type="email" placeholder="Email" className="border p-2 rounded  w-full" />

        <input type="password" placeholder="Password" className="border p-2 rounded w-full"/>
        
     
      <Link href="/home" className="bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700">Log In </Link>
      <p className="text-sm text-center">Don't have an account?{' '}<Link href="/signup" className="text-blue-500 underline">Sign Up</Link></p>
      
      </div>
    </div>
  );
}
