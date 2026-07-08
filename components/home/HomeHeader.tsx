import Image from "next/image";

export default function HomeHeader() {
  return (
    <header className="pt-4 text-center">
      <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-3xl border border-yellow-500/20 bg-black shadow-[0_0_45px_rgba(250,204,21,0.22)]">
        <Image
          src="/logo.png"
          alt="Lion Coach"
          width={110}
          height={110}
          className="rounded-2xl"
          priority
        />
      </div>

      <h1 className="mt-5 text-4xl font-extrabold tracking-tight">
        Good Morning Marc
      </h1>

      <p className="mt-2 text-zinc-500">Become The Lion</p>
    </header>
  );
}