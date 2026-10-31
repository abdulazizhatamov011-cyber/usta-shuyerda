import { Container } from "./Container";

/** Ichki sahifalar uchun umumiy yuqori banner. */
export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-brand-50 to-white">
      <div
        className="pattern-star absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
        aria-hidden
      />
      <div className="absolute -right-24 -top-24 size-80 rounded-full bg-brand-200/50 blur-3xl" aria-hidden />
      <Container className="relative py-14 text-center sm:py-20">
        {eyebrow && (
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-600">
            <span aria-hidden className="h-1.5 w-6 rounded-full bg-accent-400" />
            {eyebrow}
          </p>
        )}
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">{description}</p>
      </Container>
    </section>
  );
}
