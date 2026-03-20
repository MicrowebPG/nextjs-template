import Architecture from '@/features/landing/components/architecture/architecture';
import AuthSection from '@/features/landing/components/auth/auth-section';
import DatabaseSection from '@/features/landing/components/database/database-section';
import Footer from '@/features/landing/components/footer/footer';
import Hero from '@/features/landing/components/hero/hero';
import Navbar from '@/features/landing/components/navbar/navbar';
import Stack from '@/features/landing/components/stack/stack';

function SectionDivider() {
  return (
    <div className="mx-auto h-px w-2/3 max-w-xl bg-linear-to-r from-transparent via-border to-transparent" />
  );
}

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <SectionDivider />
      <Stack />
      <SectionDivider />
      <Architecture />
      <SectionDivider />
      <AuthSection />
      <SectionDivider />
      <DatabaseSection />
      <Footer />
    </main>
  );
}
