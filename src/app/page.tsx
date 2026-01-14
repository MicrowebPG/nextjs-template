'use client';

import { useSession } from '@/features/auth';

export default function Home() {
  const { session, isLoading } = useSession();

  return (
    <main className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-4 py-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
          Feature-Based Design
        </h1>
        <p className="text-muted-foreground mt-4 text-xl">
          MicrowebPG Next.js Template with Feature-Based Architecture
        </p>
      </div>

      {/* Session Status */}
      <div className="w-full max-w-2xl rounded-lg border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="font-semibold">🔐 Session Status</h2>
        {isLoading ? (
          <p className="text-muted-foreground mt-2 text-sm">Loading session...</p>
        ) : session ? (
          <div className="mt-3 space-y-2 rounded bg-green-50 p-3 dark:bg-green-950">
            <p className="text-sm font-medium text-green-900 dark:text-green-100">
              ✅ Session Active
            </p>
            <pre className="overflow-auto rounded bg-white p-2 text-xs dark:bg-black">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="mt-3 rounded bg-yellow-50 p-3 dark:bg-yellow-950">
            <p className="text-sm text-yellow-900 dark:text-yellow-100">
              ⚠️ No session - User not authenticated
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
