'use client';
import Navbar from "@/components/navbar";

export default function UpdatePage(){
    return(
        <div>

            <Navbar/>
            <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">

            <p className="mb-2 ">Update Your Task</p>
            <input type="text" placeholder="This is a Demo message..." className="border p-2 w-full mb-2 rounded" />
            <button className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">Update</button>
        </div>
        </div>
    )
}