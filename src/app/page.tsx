import Hero from '@/features/landing/components/hero/hero';
import Navbar from '@/features/landing/components/navbar/navbar';

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
    </main>
  );
}
