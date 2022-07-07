import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { useTransition, Form } from "@remix-run/react";
import { createPost } from "~/models/post.server";

export const meta: MetaFunction = () => ({
  title: "Create post",
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  const post = await createPost({ title, content });
  return redirect(`/posts/${post.id}`);
};

export default function CreatePost() {
  const transition = useTransition();
  const isSubmitting = transition.state === "submitting";

  return (
    <>
      <Form
        method="post"
        className="mx-auto mt-8 space-y-6 max-w-none md:max-w-lg"
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            className="w-full px-4 py-1.5 mt-0.5 bg-[#0d1117] rounded placeholder:text-gray-600 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            placeholder="Content"
            rows={8}
            required
            className="w-full px-4 py-1.5 mt-0.5 bg-[#0d1117] rounded placeholder:text-gray-600 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-1.5 bg-gradient-to-r from-blue-700 to-emerald-700 rounded text-sm font-medium${
            isSubmitting ? " disabled:opacity-30" : ""
          }`}
        >
          Add new post
        </button>
      </Form>
    </>
  );
}

// https://github.com/remix-run/remix/blob/main/examples/blog-tutorial/app/routes/posts/admin/new.tsx
