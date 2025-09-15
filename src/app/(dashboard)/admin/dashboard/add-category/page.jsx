"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import axios from "axios";
import toast from "react-hot-toast";

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");

const AddCategory = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  // 🔹 auto generate slug when title changes
  useEffect(() => {
    if (title) {
      setSlug(slugify(title));
    } else {
      setSlug("");
    }
  }, [title]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      toast.error("Category title is required");
      return;
    }

    const category = {
      title,
      slug,
    };

    setLoading(true);
    try {
      const res = await axios.post("/api/products/admin/add-category", category);

      console.log(res);

      if (res.data.success) {
        toast.success(res.data.message || "Category created successfully");
        setTitle("");
      } else {
        toast.error(res.data.message || "Failed to create category");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="w-full max-w-md shadow-lg rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Create Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="Enter category title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Auto-generated slug"
              value={slug}
              disabled
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Create Category"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategory;
