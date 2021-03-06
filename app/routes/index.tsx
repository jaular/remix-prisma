import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getPosts } from "~/models/post.server";
import { GradientTitle } from "~/components/GradientTitle";

import { prisma } from "~/utils/db.server";

type LoaderData = {
  posts: Awaited<ReturnType<typeof getPosts>>;
};

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    posts: await getPosts(),
  });
};

const handleDelete = async (id: string) => {
  console.log(id);
  const res = await prisma.post.delete({ where: { id: id } });
  return res;
};

export default function Index() {
  const { posts } = useLoaderData() as LoaderData;

  return (
    <>
      <GradientTitle text="Remix with Prisma" />
      <div className="mt-8">
        {posts.length > 0 ? (
          <ul className="space-y-4 list-disc list-inside marker:text-[#0d1117]">
            {posts.map((post) => (
              <li key={post.id}>
                <Link to={`/posts/${post.id}`} className="hover:text-blue-500">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="">
            <p>No posts found</p>
          </div>
        )}
      </div>
    </>
  );
}
