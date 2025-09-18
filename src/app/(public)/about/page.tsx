import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default async function AboutPage() {
  return (
    <div className="container max-w-4xl mx-auto py-12 md:py-20">
      <header className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tighter">
          About the Author
        </h1>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
        <div className="md:col-span-1"></div>
        <div className="md:col-span-2">
          <h2 className="font-headline text-3xl font-bold mb-4">
            Dagna Corona Holdbrook
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none font-body leading-relaxed text-foreground"></div>
        </div>
      </div>
    </div>
  );
}
