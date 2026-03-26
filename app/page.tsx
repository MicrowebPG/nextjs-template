import { getServerSession } from '@/lib/auth/session';
import { cn } from '@/lib/utils';

export default async function Home() {
  const data = await getServerSession();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-10 px-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tighter">MicrowebPG</h1>
        <p className="mt-3 text-neutral-500">Next.js template with feature-based architecture</p>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-neutral-200 shadow-sm">
        <div className="flex items-center border-b border-neutral-200 bg-neutral-50 px-5 py-3">
          <span className="text-sm font-medium">Session</span>
          <span
            className={cn(
              'ml-auto rounded-full px-2 py-0.5 text-xs font-medium',
              data?.session ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'
            )}
          >
            {data?.session ? 'Active' : 'Unauthenticated'}
          </span>
        </div>

        <div className="p-5 text-sm">
          {data?.session ? (
            <pre className="overflow-auto rounded-lg bg-neutral-50 p-4 text-xs leading-relaxed">
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : (
            <p className="text-neutral-500">No active session — sign in to continue.</p>
          )}
        </div>
      </div>
    </main>
  );
}
