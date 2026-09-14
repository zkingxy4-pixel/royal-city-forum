import { Button } from "@/components/ui/Button";
import { faq } from "@/data/team";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  return (
    <div className="space-y-3">
      {faq.map((item, i) => (
        <details key={item.q} className="faq-item glass rounded-xl" {...(i === 0 ? { defaultOpen: true } : {})}>
          <summary className="cursor-pointer px-4 py-4 text-left font-medium marker:content-none [&::-webkit-details-marker]:hidden">
            <span className="flex items-center justify-between gap-3">
              <span className="pr-2">
                {i + 1}. {item.q}
              </span>
              <ChevronDown className="faq-chevron h-[18px] w-[18px] shrink-0 text-white/70" />
            </span>
          </summary>
          <div className="space-y-3 px-4 pb-5">
            {item.a.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-white/70">
                {paragraph}
              </p>
            ))}
            {item.href && item.cta ? (
              <div className="pt-2">
                <Button href={item.href} variant={item.variant || "primary"}>
                  {item.cta}
                </Button>
              </div>
            ) : null}
          </div>
        </details>
      ))}
    </div>
  );
}
