"use client";

import Navbar from "@/components/navbar";
import axios from "axios";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UpdatePage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = sessionStorage.getItem("userId");

    if (!userId) {
      router.push("/");
      return;
    }

    if (!id) {
      setError("Post ID not found in URL");
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/singlePost/${id}`);
        console.log("Fetched data:", res.data.post);

        // assuming res.data.post.title is a string
        setTask(res.data.post?.title || "");
      } catch (err) {
        setError("Failed to load post data");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, router]);

  const handleUpdate = async () => {
    try {
      const res = await axios.put(`http://localhost:5000/updateposts/${id}`, {
        title: task,
      });

      if (res.data.success) {
        router.replace("/home");
      }
    } catch (err) {
      setError("Failed to update post data");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">
        <p className="mb-2 font-semibold">Update Your Task</p>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <input
              type="text"
              placeholder="Update your task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="border p-2 w-full mb-2 rounded"
            />
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
            >
              Update
            </button>
          </>
        )}
      </div>
    </div>
  );
}
