import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold">
          Live Poll
        </h1>

        <p className="mt-4 max-w-xl text-lg text-gray-600">
          Create polls, share them with anyone, and
          see the results update live.
        </p>

        <div className="mt-8 flex gap-4">
          <Link
            href="/signup"
            className="rounded bg-black px-6 py-3 text-white"
          >
            Get Started
          </Link>

          <Link
            href="/login"
            className="rounded border px-6 py-3"
          >
            Login
          </Link>
        </div>
      </section>
    </main>
  );
}