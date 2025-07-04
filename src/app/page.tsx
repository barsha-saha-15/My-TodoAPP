'use client';
import Link from "next/link";

export default function LoginPage(){
  return(
    <div className="min-h-screen flex flex-col items-center justify-center p-4" >
      <h1 className="text-4xl font-bold text-blue-600 mb-10 ">Todo App</h1>

      <div className="bg-gray-100 border rounded-lg shadow-md p-8 w-full max-w-md flex flex-col gap-5">
        <h2 className="text-2xl font-semibold text-center">Login</h2>

        <div className="flex flex-col gap-1">
         <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input type="email" placeholder="Email" className="border p-3 rounded  w-full" />
        </div>


         <div className="flex flex-col gap-1">
           <label htmlFor="password" className="text-sm font-medium">Password</label>
            <input type="password" placeholder="Password" className="border p-3 rounded w-full"/>
        </div>
     
      <Link href="/home" className="bg-blue-600 text-white text-center py-3 rounded hover:bg-blue-700">Log In </Link>
      <p className="text-sm text-center">Don't have an account?{' '}<Link href="/signup" className="text-blue-500 underline">Sign Up</Link></p>
      
      </div>
    </div>
  );
}
