import AnimateIn from '../shared/animate-in';
import { AUTH_FEATURES } from './constants';

export default function AuthSection() {
  return (
    <section id="auth" className="relative min-h-screen overflow-hidden px-4 py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-125 w-125 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/4 blur-[100px]" />
      </div>

      <div className="relative mx-auto">
        <AnimateIn className="mb-16 flex flex-col items-center text-center">
          <span className="mb-4 font-mono text-xs tracking-[0.3em] text-primary uppercase">
            {'// authentication'}
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Auth that <span className="text-primary">just works</span>
          </h2>
          <p className="mt-4 max-w-lg text-muted-foreground">
            Better Auth handles the complexity. Email/password, roles, sessions — configured and
            ready to go.
          </p>
        </AnimateIn>

        <div className="grid gap-3 sm:grid-cols-2">
          {AUTH_FEATURES.map((feature, i) => (
            <AnimateIn key={feature.tag} delay={0.08 * i}>
              <div className="group relative h-full rounded-lg border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80">
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_6px_1px_rgba(34,197,94,0.4)]" />
                  <span className="font-mono text-[10px] tracking-wider text-primary/70">
                    {feature.tag}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{feature.desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
