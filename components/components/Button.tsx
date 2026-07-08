type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

export default function Button({
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl bg-yellow-400 py-4 text-lg font-bold text-black transition hover:scale-[1.02] hover:bg-yellow-300 active:scale-95"
    >
      {children}
    </button>
  )
}