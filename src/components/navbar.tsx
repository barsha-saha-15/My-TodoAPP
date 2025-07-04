'use client'
import Link from "next/link";
export default function Navbar(){
    return(
        <nav className="bg-blue-500 p-4 text-white flex gap-4 px-6 py-4 justify-between item-center shadow-md">
            <div className="text-2xl font-bold">Todo App</div>
            <div className="flex gap-6 text-base">
            <Link href="/home" className="hover:underline">Home</Link>
            <Link href="/add" className="hover:underline">Add</Link>
            <Link href="/" className="hover:underline">Logout</Link>
            </div>
        </nav>
    );
}