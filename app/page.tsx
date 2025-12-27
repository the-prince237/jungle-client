import { HomeHero } from "@/presentation";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <HomeHero />
      {/* <div className="w-screen h-[700vh]" /> */}
    </div>
  );
}
