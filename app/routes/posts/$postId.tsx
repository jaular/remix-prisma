import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import type { Post } from "@prisma/client";
import { json } from "@remix-run/node";
import { useLoaderData, useCatch } from "@remix-run/react";
import { getPost } from "~/models/post.server";
import { GradientTitle } from "~/components/GradientTitle";
import { ErrorMessage } from "~/components/ErrorMessage";

type LoaderData = {
  post: Post;
};

export const meta: MetaFunction = ({ data }: { data: LoaderData }) => {
  if (!data) {
    return {
      title: undefined,
    };
  }
  return {
    title: `${data.post.title}`,
  };
};

export const loader: LoaderFunction = async ({ params }) => {
  const { postId } = params as { postId: string };
  const post = await getPost({ id: postId });

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ post });
};

export default function Post() {
  const { post } = useLoaderData() as LoaderData;
  return (
    <>
      <GradientTitle text={`${post.title} `} />
      <div className="mt-4">
        <p>{post.content}</p>
      </div>
    </>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <ErrorMessage error={error} />;
}

export function CatchBoundary() {
  const caught = useCatch();
  return <h1>{caught.status} - We couldn't find that post page!</h1>;
}

// https://remix.run/docs/en/v1/guides/not-found#nested-catch-boundaries