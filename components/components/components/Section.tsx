type SectionProps = {
  title: string
  children: React.ReactNode
}

export default function Section({
  title,
  children,
}: SectionProps) {
  return (
    <section className="rounded-3xl bg-zinc-900 p-6 mt-6">

      <h2 className="text-2xl font-bold mb-4">
        {title}
      </h2>

      {children}

    </section>
  )
}