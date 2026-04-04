"use client";

import { useState } from "react";

const faqItems = [
  {
    q: "What kind of sites?",
    a: "Personal brands, service businesses, portfolios. Not e-commerce. We're not building Death Stars. We're building one-page websites.",
  },
  {
    q: "What about hosting fees?",
    a: "There are none. Ever. You own your site. We set you up on sophisticated but free-forever platforms that you'll never need to pay for.",
  },
  {
    q: "How long does it take?",
    a: "One week from intake to launch.",
  },
  {
    q: "What if I already have a site?",
    a: "We can clone it and kill your hosting bill. That starts at $396.",
  },
  {
    q: "What's included?",
    a: "Your page, a terms of service page, a privacy policy page, and a contact form. All yours. Forever.",
  },
  {
    q: "What if I need changes later?",
    a: "$19 per edit. For life.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-foreground/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left text-lg font-medium hover:text-primary transition-colors cursor-pointer"
      >
        {q}
        <span
          className={`ml-4 text-2xl transition-transform duration-200 ${open ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-5" : "max-h-0"}`}
      >
        <p className="text-muted leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [formState, setFormState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [business, setBusiness] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, business }),
      });

      if (res.ok) {
        setFormState("success");
        setName("");
        setEmail("");
        setBusiness("");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16 md:pt-32 md:pb-24">
        {/* Animated background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Large gradient blobs that float */}
          <div className="absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl animate-blob" />
          <div className="absolute bottom-[-100px] left-[-60px] w-[400px] h-[400px] rounded-full bg-accent/15 blur-3xl animate-blob animation-delay-2000" />
          <div className="absolute top-[40%] left-[50%] w-[350px] h-[350px] rounded-full bg-yellow-300/10 blur-3xl animate-blob animation-delay-4000" />

          {/* Floating shapes */}
          <div className="absolute top-[15%] left-[10%] w-16 h-16 rounded-xl bg-primary/20 rotate-12 animate-float" />
          <div className="absolute top-[25%] right-[15%] w-10 h-10 rounded-full bg-accent/25 animate-float animation-delay-1000" />
          <div className="absolute bottom-[20%] left-[20%] w-8 h-8 rounded-lg bg-yellow-400/20 rotate-45 animate-float animation-delay-3000" />
          <div className="absolute top-[60%] right-[10%] w-12 h-12 rounded-xl bg-primary/15 -rotate-12 animate-float animation-delay-2000" />
          <div className="absolute top-[10%] left-[45%] w-6 h-6 rounded-full bg-accent/20 animate-float animation-delay-4000" />
          <div className="absolute bottom-[35%] right-[30%] w-14 h-14 rounded-2xl bg-primary/10 rotate-[30deg] animate-float animation-delay-1500" />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Launching soon
          </div>

          {/* Price as hero */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-2">
            <span className="text-primary">$96.</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
            Beautiful custom one-page websites.{" "}
            <span className="text-accent">Free hosting. Forever.</span>
          </h2>

          <p className="text-lg md:text-xl text-muted max-w-xl mx-auto mb-4">
            One-time payment. No monthly fees. No hosting costs. You own
            everything.
          </p>
          <p className="text-sm text-primary font-medium mb-10">
            Sign up before we launch and get a 3-page custom site instead of 1.
          </p>

          {/* Waitlist Form */}
          <div className="max-w-md mx-auto">
            {formState === "success" ? (
              <div className="rounded-2xl bg-accent/10 border border-accent/20 p-8 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <p className="text-xl font-semibold mb-1">You&apos;re in!</p>
                <p className="text-muted">
                  We&apos;ll reach out when we&apos;re ready for our first
                  round.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-xl border border-foreground/10 bg-surface px-4 py-3.5 text-base placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-foreground/10 bg-surface px-4 py-3.5 text-base placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
                <input
                  type="text"
                  placeholder="What do you do?"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  required
                  className="w-full rounded-xl border border-foreground/10 bg-surface px-4 py-3.5 text-base placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                />
                <button
                  type="submit"
                  disabled={formState === "submitting"}
                  className="w-full rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 text-base transition-colors disabled:opacity-60 cursor-pointer"
                >
                  {formState === "submitting"
                    ? "Joining..."
                    : "Join the Waitlist"}
                </button>
                {formState === "error" && (
                  <p className="text-red-500 text-sm text-center">
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-foreground/5 bg-surface py-6">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-sm text-muted">
          <span>
            <strong className="text-foreground">$96</strong> one-page website
          </span>
          <span className="hidden sm:inline text-foreground/20">|</span>
          <span>
            <strong className="text-foreground">$19</strong> edits for life
          </span>
          <span className="hidden sm:inline text-foreground/20">|</span>
          <span>
            <strong className="text-foreground">$0</strong> hosting forever
          </span>
          <span className="hidden sm:inline text-foreground/20">|</span>
          <span>
            <strong className="text-foreground">1 week</strong> to launch
          </span>
        </div>
      </section>

      {/* The Math */}
      <section className="px-6 py-16 md:py-24 bg-foreground text-background">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-10">
            Three ways to get a website.
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* DIY */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-left">
              <p className="text-sm uppercase tracking-wider text-white/40 mb-2">
                Do it yourself
              </p>
              <p className="text-3xl font-bold text-red-400 mb-3">
                &quot;Free&quot;
              </p>
              <ul className="text-sm text-white/50 space-y-2">
                <li>Watch 47 YouTube tutorials</li>
                <li>Crash it 68 times</li>
                <li>Finally give up at 2am</li>
                <li>Still paying $23/mo for hosting</li>
                <li className="text-red-400/80">
                  Cost: your sanity + $276/yr
                </li>
              </ul>
            </div>

            {/* Traditional */}
            <div className="rounded-2xl bg-white/5 border border-white/10 p-6 text-left">
              <p className="text-sm uppercase tracking-wider text-white/40 mb-2">
                Hire a designer
              </p>
              <p className="text-3xl font-bold text-yellow-400 mb-3">
                $3,000+
              </p>
              <ul className="text-sm text-white/50 space-y-2">
                <li>Wait 4-8 weeks</li>
                <li>Pay $3K+ for a 5-page site</li>
                <li>Then $20-60/mo for hosting</li>
                <li>Then $150/hr for every change</li>
                <li className="text-yellow-400/80">
                  3-year cost: $3,720 - $5,160
                </li>
              </ul>
            </div>

            {/* Us */}
            <div className="rounded-2xl bg-white/5 border border-primary/40 p-6 text-left ring-2 ring-primary/20 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                BEST VALUE
              </div>
              <p className="text-sm uppercase tracking-wider text-primary mb-2">
                Us
              </p>
              <p className="text-3xl font-bold text-primary mb-3">$96</p>
              <ul className="text-sm text-white/50 space-y-2">
                <li className="text-white/80">Custom designed for you</li>
                <li className="text-white/80">Live in one week</li>
                <li className="text-white/80">Free hosting forever</li>
                <li className="text-white/80">$19 edits for life</li>
                <li className="text-primary font-medium">
                  3-year cost: $96. That&apos;s it.
                </li>
              </ul>
            </div>
          </div>
          <p className="text-white/40 text-sm">
            Same website. Wildly different price. You do the math.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">
            Questions? We got you.
          </h3>
          <p className="text-muted text-center mb-10">
            The short version: it&apos;s exactly what it sounds like.
          </p>
          <div>
            {faqItems.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 pb-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl md:text-2xl font-semibold mb-2">
            Stop paying for hosting.
          </p>
          <p className="text-muted mb-6">
            Your website shouldn&apos;t cost more than your lunch. Every month.
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-foreground text-background font-semibold px-8 py-3.5 hover:opacity-90 transition"
          >
            Join the Waitlist ↑
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-foreground/5 px-6 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <p>
            &copy; {new Date().getFullYear()} Edo Design Co. All rights
            reserved.
          </p>
          <p>Built by Donnie 🐢</p>
        </div>
      </footer>
    </main>
  );
}
