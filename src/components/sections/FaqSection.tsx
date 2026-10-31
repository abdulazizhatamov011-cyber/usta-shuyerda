import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/content";

export function FaqSection() {
  return (
    <section id="faq" className="bg-surface py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Savollar"
          title="Ko‘p so‘raladigan savollar"
          description="Javob topolmadingizmi? Telegram orqali yozing, tez javob beramiz."
        />

        <div className="mx-auto mt-14 max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <details
              key={faq.question}
              open={index === 0}
              className="group rounded-2xl border border-line bg-white transition open:border-brand-300 open:shadow-md open:shadow-brand-900/5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-5 font-display text-base font-bold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 sm:text-lg [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  className="size-5 shrink-0 text-brand-600 transition duration-300 group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="px-6 pb-6 leading-7 text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
