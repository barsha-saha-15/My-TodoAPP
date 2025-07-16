"use client";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AddPage() {
  const router = useRouter();
  const [task, setTask] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedtoken = sessionStorage.getItem("access_key"); // lowercase 'userId'
    if (!storedtoken) {
      console.log("No token found in session storage. Redirecting to login page.");
      router.push("/");
    }
  }, [router]);

  const handleAddTask = async () => {
    const userId = sessionStorage.getItem("userId"); // use same lowercase 'userId'
    if (!userId) return;

    // for validation
    if (!task.trim()) {
      setError("Title is error!");
      alert("Title is error");
      return;
    }
    const storedtoken = sessionStorage.getItem("access_key");

    try {
      await axios.post("http://localhost:5000/posts", {

        title: task,
      },
        {
          headers: {
            authorization: `Bearer ${storedtoken}`,
          },
        }
      );
      alert("Task added successfully!");
      setTask("");
    } catch (error) {
      console.error("Error adding task", error);
      alert("Failed to add task");
    }
  }; // <-- close the function here properly

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold my-4">Description</h2>
        <p className="mb-2">Add Your Task</p>
        <input
          type="text"
          placeholder="This is a Demo message..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>
    </div>
  );
}
