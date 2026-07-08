import Image from "next/image";

type HomeHeaderProps = {
  selectedDate: string;
};

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
}

function formatSelectedDate(dateKey: string) {
  const date = new Date(dateKey);

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export default function HomeHeader({ selectedDate }: HomeHeaderProps) {
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
        {getGreeting()} Marc
      </h1>

      <p className="mt-2 text-zinc-500">{formatSelectedDate(selectedDate)}</p>

      <p className="mt-1 text-zinc-500">Become The Lion</p>
    </header>
  );
}