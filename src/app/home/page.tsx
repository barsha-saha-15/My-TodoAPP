"use client";

import Navbar from "@/components/navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Post = {
  id: string;
  title: string;
  content: string;
  userID: string;
};

type ApiResponse = {
  posts: Post[];
  success?: boolean;
  message?: string;
};

export default function HomePage() {
  const router = useRouter();
  const [posts, setPost] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // ✅ spelling thik


  useEffect(() => {
    const storedUserId = sessionStorage.getItem("userId");

    if (!storedUserId) {
      console.log("No userId found in session storage. Redirecting to login page.");
      router.push("/");
    } else {
      setUserId(storedUserId);
      console.log("User ID set from sessionStorage:", storedUserId);
    }
  }, [router]);

  // ✅ userId change hole fetch koro
  useEffect(() => {
    const fetchPosts = async () => {
      if (!userId) {
        console.log("No userId available, skipping fetch");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        //console.log("Fetching posts for:", userId);
        const response = await axios.get<ApiResponse>(
          `http://localhost:5000/allPost/${userId}`
        );
        setPost(response.data.posts || []);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          if (err.response) {
            setError(
              err.response.data.message ||
              `Server error: ${err.response.status}`
            );
          } else if (err.request) {
            setError("No response from server. Is backend running?");
          } else {
            setError("Network error.");
          }
        } else {
          setError("Unexpected error.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);


  const handleDelete = async (postId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/deleteposts/${postId}`
      );

      if (response.data.success) {
        alert("Deleted Successfully.....")
        // again call all post of the user
        try {
          const response = await axios.get<ApiResponse>(
            `http://localhost:5000/allPost/${userId}`
          );
          setPost(response.data.posts || []);
        } catch (err) {
          if (axios.isAxiosError(err)) {
            if (err.response) {
              setError(
                err.response.data.message ||
                `Server error: ${err.response.status}`
              );
            } else if (err.request) {
              setError("No response from server. Is backend running?");
            } else {
              setError("Network error.");
            }
          } else {
            setError("Unexpected error.");
          }
        } finally {
          setLoading(false);
        }

      } else {
        alert("Something goes wrong")
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(
            err.response.data.message ||
            `Server error: ${err.response.status}`
          );
        } else if (err.request) {
          setError("No response from server. Is backend running?");
        } else {
          setError("Network error.");
        }
      } else {
        setError("Unexpected error.");
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-md mx-auto mt-16 bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Posts</h2>

        {loading && <p>Loading posts...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && posts.length === 0 && <p>No post found.</p>}
        {!loading && !error && posts.length > 0 && (
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className="mb-4 p-4 border rounded-md shadow-2xl-sm"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <div className="flex justify-end space-x-2 mt-2">
                  <Link href={`/update/${post.id}`} className="text-blue-500 hover:underline">Edit</Link>
                  <button className="text-red-500 hover:underline" onClick={() => handleDelete(post.id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
