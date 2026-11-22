// app/(marketing)/pricing/page.tsx  ->  /pricing
// ISR: the page is static (fast, cached HTML) but is regenerated at most once every
// 60 seconds, because prices change a few times a day. After 60 s the next visitor
// still gets the cached (stale) page instantly while Next.js re-renders in the
// background; the visit after that gets the fresh page ("stale-while-revalidate").
//   revalidate = false -> cache forever (pure SSG, the default)
//   revalidate = 0     -> never cache (same as dynamic rendering / SSR)
export const revalidate = 60;

import { getPricing } from "@/lib/pricing";
import { refreshPrices } from "./actions";

export default async function PricingPage() {
  const pricing = await getPricing();

  return (
    <section>
      <h1>Pricing</h1>
      <p style={{ opacity: 0.7, fontSize: "0.9rem" }}>
        Generated at: <code>{pricing.generatedAt}</code> · price list v{pricing.version} · revalidates every 60 s
      </p>
      <ul>
        {pricing.plans.map((plan) => (
          <li key={plan.name}>
            {plan.name}: ${plan.price}/month
          </li>
        ))}
      </ul>
      {/* On-demand revalidation via a Server Action */}
      <form action={refreshPrices}>
        <button type="submit" style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
          Update prices &amp; revalidate now
        </button>
      </form>
    </section>
  );
}
