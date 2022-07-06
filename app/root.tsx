import TailwindCSS from "./styles/app.css";
import type { MetaFunction, LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
} from "@remix-run/react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ErrorMessage } from "./components/ErrorMessage";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  description: "Welcome to our Remix app",
  keywords: "Remix, Prisma, TypeScript",
  viewport: "width=device-width, initial-scale=1",
});

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", as: "style", href: TailwindCSS }];
};

type DocumentProps = {
  title?: string;
  children: React.ReactNode;
};

function Document({ title = "Remix with Prisma", children }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body className="flex flex-col min-h-screen text-[#fafafa] bg-[#010409]">
        <Header />
        <main className="container flex-grow max-w-3xl px-4 mx-auto my-10 antialiased leading-relaxed sm:px-6 md:my-12 lg:px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document>
      <ErrorMessage error={error} />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <Document title={`${caught.status} - ${caught.statusText}`}>
      <h1>
        {caught.status} - {caught.statusText}
      </h1>
      <Scripts />
    </Document>
  );
}
