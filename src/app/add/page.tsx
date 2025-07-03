'use client'
import Navbar from "@/components/navbar"

export default function (){
    return(
        <div className="p-4">
            <Navbar/>
            <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold my-4">Description</h2>
            <p className="mb-2">This is a Demo message</p>
            <input type="text" placeholder="Enter new task..." className="border p-2 w-full mb-2 rounded"/>
            <button className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Add</button>
        </div>
        </div>
    )
}