import Link from 'next/link';
import { Button } from '../ui/button';

export default function Hero() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-red-500 text-center">
      <div className="space-y-7">
        <h1 className="text-5xl font-semibold">The Easiest Way To Create A</h1>
        <h1 className="text-5xl font-semibold text-green-500 uppercase">
          Readme
        </h1>
        <Link href={'/make-readme'}>
          {' '}
          <Button className="mx-auto w-56 rounded-full bg-green-500 px-8 py-6 text-2xl hover:bg-green-600">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
