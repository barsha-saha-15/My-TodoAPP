'use client';

import Navbar from "@/components/navbar";
import Link from "next/link";

export default function HomePage(){
    return(
        <div className="p-4">
            <Navbar />
            <div className="bg-gray-100 p-4 rounded flex justify-between items-center">
                <p>This is a Demo task message</p>
                <div className="space-x-3 flex gap-6 mt-4">
                    <Link href="/update" className="text-blue-600 underline">Update</Link>
                    <button className="text-red-600">Delete</button>

                </div>
                
            </div>

        </div>
    );
}