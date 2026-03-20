import AnimateIn from '../shared/animate-in';
import { STACK } from './constants';

export default function Stack() {
  return (
    <section id="stack" className="relative min-h-screen overflow-hidden px-4 py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <AnimateIn className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 font-mono text-xs tracking-[0.3em] text-primary uppercase">
            {'// the stack'}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built on <span className="text-accent">proven tools</span>
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Every dependency is chosen for reliability, developer experience, and production
            readiness.
          </p>
        </AnimateIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STACK.map((item, i) => (
            <AnimateIn key={item.code} delay={0.06 * i}>
              <div className="group relative h-full rounded-lg border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card/80">
                <div
                  className="absolute top-4 bottom-4 left-0 w-px rounded-full opacity-60 transition-all duration-300 group-hover:opacity-100"
                  style={{
                    backgroundColor: item.color,
                    boxShadow: `0 0 6px 0px ${item.color}00`
                  }}
                />
                <div
                  className="absolute top-4 bottom-4 left-0 w-px rounded-full opacity-0 transition-all duration-300 group-hover:opacity-60"
                  style={{
                    boxShadow: `0 0 10px 2px ${item.color}`,
                    backgroundColor: item.color
                  }}
                />

                <span
                  className="inline-flex items-center justify-center rounded-md border px-2 py-1 font-mono text-[11px] font-bold tracking-wider"
                  style={{ borderColor: `${item.color}40`, color: item.color }}
                >
                  {item.code}
                </span>

                <h3 className="mt-3 text-sm font-semibold text-foreground">{item.name}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
