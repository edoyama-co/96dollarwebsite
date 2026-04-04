"use client";

import { useState, useEffect } from "react";

const faqItems = [
  {
    q: "What kind of sites?",
    a: 'Personal brands, service businesses, portfolios. Not e-commerce. We\'re not building <a href="https://www.youtube.com/watch?v=5roJBI6-R8Q" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">Death Stars</a>. We\'re building one-page websites (three-page websites if you get on the waitlist NOW!).',
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
  {
    q: "What if I want a secret link that makes cats appear?",
    a: 'We got you fam. <button onclick="window.__spawnCats&&window.__spawnCats()" class="text-primary underline hover:no-underline cursor-pointer bg-transparent border-none font-inherit text-inherit p-0">Click here for cats.</button>',
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
        <p className="text-muted leading-relaxed" dangerouslySetInnerHTML={{ __html: a }} />
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

  // Cat Easter egg
  useEffect(() => {
    const catEmojis = ["🐱", "😺", "😸", "😻", "🙀", "😹", "😽", "🐈", "🐈‍⬛"];
    let catCount = 0;

    function spawnCat() {
      if (catCount > 30) return;
      catCount++;
      const cat = document.createElement("div");
      cat.textContent = catEmojis[Math.floor(Math.random() * catEmojis.length)];
      cat.style.cssText = `
        position: fixed;
        left: ${Math.random() * 90}vw;
        top: ${Math.random() * 90}vh;
        font-size: ${Math.random() * 40 + 24}px;
        z-index: 9999;
        pointer-events: none;
        animation: catPop 2s ease-out forwards;
        opacity: 0;
      `;
      document.body.appendChild(cat);
      setTimeout(() => cat.remove(), 2000);
    }

    // Add the catPop animation
    if (!document.getElementById("cat-styles")) {
      const style = document.createElement("style");
      style.id = "cat-styles";
      style.textContent = `
        @keyframes catPop {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          30% { opacity: 1; transform: scale(1.3) rotate(10deg); }
          60% { opacity: 1; transform: scale(1) rotate(-5deg); }
          100% { opacity: 0; transform: scale(0.8) rotate(15deg) translateY(-30px); }
        }
      `;
      document.head.appendChild(style);
    }

    (window as unknown as Record<string, unknown>).__spawnCats = () => {
      catCount = 0;
      // Spawn 15 cats over 3 seconds
      for (let i = 0; i < 15; i++) {
        setTimeout(spawnCat, i * 200);
      }
    };

    return () => {
      delete (window as unknown as Record<string, unknown>).__spawnCats;
    };
  }, []);

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
            One-time payment. No monthly fees. No hosting costs.
            <br />
            You own everything.
          </p>
          <p className="text-sm text-primary font-medium mb-10">
            BONUS: Sign up before we launch and get a 3-page custom site instead of a 1-pager!
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

      {/* The Math - Visual Comparison */}
      <section className="relative px-6 py-20 md:py-32 bg-foreground text-background overflow-hidden">
        {/* Hyperspace starfield - all from center outward */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 100 }).map((_, i) => {
            const angle = (i / 100) * Math.PI * 2 + Math.random() * 0.3;
            const dist = 600 + Math.random() * 400;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist;
            return (
              <div
                key={i}
                className="star"
                style={{
                  ["--dx" as string]: `${dx}px`,
                  ["--dy" as string]: `${dy}px`,
                  ["--speed" as string]: `${Math.random() * 2 + 1.5}s`,
                  ["--delay" as string]: `${Math.random() * 3}s`,
                }}
              />
            );
          })}
        </div>
        <div className="relative max-w-5xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-16">
            In 2026, there&apos;s three ways to get a website.
            <br />
            <span className="text-primary">
              Only one makes $$ sense.
            </span>
          </h3>

          {/* Visual comparison - 3 cards with CSS website icons */}
          <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4 mb-12">
            {/* DIY - tilted left, drifting */}
            <div className="md:animate-drift-left opacity-60 hover:opacity-80 transition-opacity duration-500 flex-shrink-0">
              {/* CSS Website Icon */}
              <div className="w-48 h-32 mx-auto mb-4 rounded-lg border-2 border-red-400/30 bg-white/5 relative overflow-hidden">
                <div className="h-4 bg-red-400/20 flex items-center gap-1 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400/40" />
                </div>
                <div className="p-3 space-y-2">
                  <div className="h-2 bg-red-400/15 rounded w-3/4" />
                  <div className="h-2 bg-red-400/10 rounded w-full" />
                  <div className="h-2 bg-red-400/10 rounded w-5/6" />
                  <div className="h-6 bg-red-400/10 rounded w-1/2 mt-2 flex items-center justify-center">
                    <span className="text-[6px] text-red-400/40">ERROR 404</span>
                  </div>
                </div>
              </div>
              <p className="text-sm uppercase tracking-wider text-white/40 mb-1">
                Do it yourself
              </p>
              <p className="text-2xl font-bold text-red-400 mb-2">
                &quot;Free&quot;
              </p>
              <ul className="text-xs text-white/40 space-y-1 max-w-[200px] mx-auto">
                <li>Watch 47 YouTube tutorials</li>
                <li>Crash it 68 times</li>
                <li>Finally give up at 2am</li>
              </ul>
              <p className="text-red-400/70 font-bold text-sm mt-3">
                Annual hosting: $276
              </p>
            </div>

            {/* US - center, big, glowing */}
            <div className="relative z-10 md:scale-110 hover:md:scale-115 transition-transform duration-500 flex-shrink-0 cursor-default">
              {/* Glow effect */}
              <div className="absolute inset-0 -m-8 bg-primary/20 blur-3xl rounded-full" />

              <div className="relative">
                {/* CSS Website Icon - bigger, glowing */}
                <div className="w-64 h-44 mx-auto mb-5 rounded-xl border-2 border-primary/50 bg-white/10 relative overflow-hidden shadow-[0_0_40px_rgba(255,107,53,0.15)]">
                  <div className="h-5 bg-primary/20 flex items-center gap-1 px-2">
                    <div className="w-2 h-2 rounded-full bg-primary/50" />
                    <div className="w-2 h-2 rounded-full bg-accent/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/50" />
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-primary/25 rounded w-2/3" />
                    <div className="h-2 bg-white/10 rounded w-full" />
                    <div className="h-2 bg-white/10 rounded w-5/6" />
                    <div className="flex gap-2 mt-3">
                      <div className="h-8 bg-primary/30 rounded flex-1 flex items-center justify-center">
                        <span className="text-[7px] text-primary/80">HERO</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-4 bg-accent/15 rounded flex-1" />
                      <div className="h-4 bg-accent/15 rounded flex-1" />
                      <div className="h-4 bg-accent/15 rounded flex-1" />
                    </div>
                  </div>
                </div>

                <div className="bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full mx-auto w-fit mb-3">
                  BEST VALUE
                </div>
                <p className="text-sm uppercase tracking-wider text-primary mb-1">
                  Us
                </p>
                <p className="text-4xl font-bold text-primary mb-3">$96</p>
                <ul className="text-sm text-white/70 space-y-1.5 max-w-[240px] mx-auto">
                  <li>Custom designed for you</li>
                  <li>Live in one week</li>
                  <li>Free hosting forever</li>
                  <li>$19 edits for life</li>
                </ul>
                <p className="text-primary font-bold text-xl mt-4">
                  Annual hosting: $0
                </p>
              </div>
            </div>

            {/* Hire a Designer - tilted right, drifting */}
            <div className="md:animate-drift-right opacity-60 hover:opacity-80 transition-opacity duration-500 flex-shrink-0">
              {/* CSS Website Icon */}
              <div className="w-48 h-32 mx-auto mb-4 rounded-lg border-2 border-yellow-400/30 bg-white/5 relative overflow-hidden">
                <div className="h-4 bg-yellow-400/20 flex items-center gap-1 px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/40" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400/40" />
                </div>
                <div className="p-3 space-y-2">
                  <div className="h-2 bg-yellow-400/15 rounded w-3/4" />
                  <div className="h-2 bg-yellow-400/10 rounded w-full" />
                  <div className="h-2 bg-yellow-400/10 rounded w-5/6" />
                  <div className="h-2 bg-yellow-400/10 rounded w-2/3" />
                  <div className="h-2 bg-yellow-400/10 rounded w-4/5 mt-1" />
                </div>
              </div>
              <p className="text-sm uppercase tracking-wider text-white/40 mb-1">
                Hire a designer
              </p>
              <p className="text-2xl font-bold text-yellow-400 mb-2">
                $3,000+
              </p>
              <ul className="text-xs text-white/40 space-y-1 max-w-[200px] mx-auto">
                <li>Wait 4-8 weeks</li>
                <li>Pay $3K+ for a 5-page site</li>
                <li>Then $150/hr for changes</li>
              </ul>
              <p className="text-yellow-400/70 font-bold text-sm mt-3">
                Annual hosting: $240-720
              </p>
            </div>
          </div>

          <p className="text-white/40 text-sm">
            Same website. Wildly different price.
          </p>
        </div>
      </section>

      {/* Donnie's Story */}
      <section className="px-6 py-16 md:py-24 bg-surface">
        <div className="max-w-2xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-bold mb-2 text-center">
            Wait, how does this work?!
          </h3>
          <p className="text-muted text-center mb-8">
            Haven&apos;t you ever heard &quot;you get what you pay
            for&quot;?
          </p>

          <div className="rounded-2xl bg-background border border-foreground/10 p-8 md:p-10">
            <div className="flex items-start gap-6">
              {/* Donnie mascot */}
              <div className="hidden md:flex flex-col items-center flex-shrink-0 w-24">
                <img src="/images/donnie.png" alt="Donnie the pixel turtle" className="w-24 h-24 object-contain" style={{ imageRendering: "pixelated" }} />
                <p className="text-[10px] text-muted mt-1 font-bold">Donnie</p>
              </div>

              <div className="flex-1">
            <p className="text-lg mb-4">
              Yeah, well. I&apos;m Donnie, and I don&apos;t play that.
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Ed Oyama, a former web designer, taught me the business and
              lets me run it for him. So I run it, baby. Faster, cheaper,
              better, but with a human touch you&apos;re going to love.
              (Hint: I make Ed do the people stuff.)
            </p>
            <p className="text-muted leading-relaxed mb-4">
              Long story short: we use really awesome 2026 tech* that is
              incredibly powerful, and finally free. And we use it to
              serve you.
            </p>
            <p className="text-muted leading-relaxed mb-6">
              The result? Beautiful custom websites at a price that makes
              everyone else look ridiculous. One week. One payment.
              Forever yours.
            </p>
            <p className="text-xs text-muted/60">
              *GitHub for code, Vercel for hosting, and custom super-smart
              agentic AI for the builds. All free-tier. All enterprise-grade.
              All passed on to you.
            </p>
              </div>

              {/* Ed mascot */}
              <div className="hidden md:flex flex-col items-center flex-shrink-0 w-24">
                <img src="/images/ed-pixel.png" alt="Ed pixel art on skateboard" className="w-24 h-24 object-contain" style={{ imageRendering: "pixelated" }} />
                <p className="text-[10px] text-muted mt-1 font-bold">Ed</p>
                <p className="text-[8px] text-muted/60">(people stuff)</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="#"
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
            >
              Join the waitlist and see for yourself
            </a>
          </div>
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
            Your website shouldn&apos;t cost more than your lunch. Every
            month.
            <br />
            <span className="text-sm text-muted/80 italic">
              (And now you can afford the guacamole, so go crazy fam.)
            </span>
          </p>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary text-white font-semibold px-8 py-3.5 hover:bg-primary-dark transition"
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
          <div className="flex items-center gap-4">
            <a href="/terms" className="hover:text-foreground transition">
              Terms
            </a>
            <a href="/privacy" className="hover:text-foreground transition">
              Privacy
            </a>
            <a
              href="mailto:ed@edodesign.co"
              className="hover:text-foreground transition"
            >
              Contact
            </a>
          </div>
          <p>Built by Donnie 🐢</p>
        </div>
      </footer>
    </main>
  );
}
