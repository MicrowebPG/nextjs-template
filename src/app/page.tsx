import Hero from '@/features/landing/components/hero';
import Navbar from '@/features/landing/components/navbar';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-start">
      <Navbar />
      <Hero />
      <Hero />
      <Hero />
    </main>
  );
}
