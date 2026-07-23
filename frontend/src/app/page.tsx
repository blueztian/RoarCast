import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
        <span className="block">Powering the</span>
        <span className="block text-blue-600">Triple Helix of Santa Rosa</span>
      </h1>
      
      <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl mb-10">
        RoarCast continuously aligns students, educational institutions, government, and industry through workforce intelligence in the PEZA ecosystem.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
        <Link href="/student/micro-audit" className="w-full sm:w-auto">
          <Button variant="primary" fullWidth className="text-lg py-3 px-8">
            Check My Alignment
          </Button>
        </Link>
        <Link href="/architecture" className="w-full sm:w-auto">
          <Button variant="outline" fullWidth className="text-lg py-3 px-8">
            Explore Platform
          </Button>
        </Link>
      </div>
    </div>
  );
}
