import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[92%] max-w-md -translate-x-1/2 rounded-3xl border border-zinc-800 bg-zinc-950/90 p-3 backdrop-blur">
      <div className="grid grid-cols-5 text-center text-xs text-zinc-400">
        <Link href="/" className="text-yellow-400">
          🏠
          <br />
          Home
        </Link>

        <Link href="/nutrition">
          🍽️
          <br />
          Food
        </Link>

        <Link href="/training">
          🏋️
          <br />
          Train
        </Link>

        <Link href="/progress">
          📈
          <br />
          Progress
        </Link>

        <Link href="/profile">
          👤
          <br />
          Profile
        </Link>
      </div>
    </nav>
  );
}