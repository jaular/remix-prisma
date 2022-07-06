import { Link } from "@remix-run/react";

export const Header = () => {
  return (
    <header className="w-full max-w-3xl px-4 mx-auto sm:px-6 lg:px-8">
      <div className="flex items-center justify-between py-4 border-b border-emerald-700">
        <Link to="/" className="text-xl font-bold">
          💿Remix
        </Link>
        <Link to="/posts/create">
          <a className="text-sm font-medium hover:text-blue-500">
            [Create post]
          </a>
        </Link>
      </div>
    </header>
  );
};
