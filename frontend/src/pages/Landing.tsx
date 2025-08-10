import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import neural1 from '../assets/neural-1.svg';
import neural2 from '../assets/neural-2.svg';

export function Landing() {
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openOverlay = (i: number) => {
    setFocusedIdx(i);
    setIsClosing(false);
    setOverlayOpen(true);
  };

  // Auto-close overlay after 2 seconds
  useEffect(() => {
    if (!overlayOpen) return;
    const t = setTimeout(() => {
      closeOverlay();
    }, 2000);
    return () => clearTimeout(t);
  }, [overlayOpen, focusedIdx]);

  const closeOverlay = () => {
    setIsClosing(true);
    setTimeout(() => {
      setOverlayOpen(false);
      setFocusedIdx(null);
      setIsClosing(false);
    }, 380);
  };

  const features = [
    {
      title: 'Think in links',
      desc: 'Connect notes, links, and media into living knowledge graphs.',
    },
    {
      title: 'Recall instantly',
      desc: 'Semantic and full-text search across your entire second brain.',
    },
    {
      title: 'Create together',
      desc: 'Share, collaborate, and publish from one beautiful workspace.',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-200 via-white to-white">
      {/* Ambient gradient orbs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-[28rem] w-[28rem] rounded-full bg-indigo-400/20 blur-3xl animate-blob [animation-delay:2s]" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-purple-600/10 blur-3xl animate-blob [animation-delay:4s]" />

      {/* Header */}
      <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 shadow-lg" />
          <span className="text-xl font-extrabold tracking-tight text-gray-800">NEXUS</span>
        </div>
        <div className="hidden items-center gap-4 sm:flex">
          <Link to="/signin" className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900">
            Sign in
          </Link>
          <Link to="/signup" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-indigo-700">
            Create account
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-6 sm:pt-12 md:grid-cols-2">
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-white/70 px-3 py-1 text-xs font-semibold text-purple-600 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-600" />
            Second Brain for Creators
          </div>
          <h1 className="mt-4 pb-2 bg-gradient-to-br from-gray-900 via-purple-800 to-indigo-700 bg-clip-text text-transparent text-4xl font-extrabold tracking-tight leading-[1.25] sm:text-5xl sm:leading-[1.18] md:text-6xl md:leading-[1.12]">
            Remember everything. Create anything.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-[1.7] text-gray-600 sm:text-lg">
            Nexus is your AI-powered second brain: capture ideas, organize knowledge, and turn sparks into masterpieces.
            Sync links, notes, and media. Surface insights instantly.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link to="/signup" className="group relative inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white shadow-lg transition-all hover:translate-y-[-1px] hover:bg-indigo-700">
              <span className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-0 blur transition-opacity group-hover:opacity-60" />
              Start free
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14" />
                <path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link to="/signin" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
              I already have an account
            </Link>
          </div>

          {/* Feature bullets */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-sm text-gray-700 sm:max-w-lg">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" /> Smart capture
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" /> AI summaries
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" /> Instant search
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-600" /> Shareable knowledge
            </div>
          </div>
        </div>

        {/* Right: Animated brain + orbiting image cards */}
        <div className="relative mx-auto aspect-square w-full max-w-lg">
          {/* Glowing ring */}
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-tr from-purple-200 via-white to-indigo-200 p-[1px]">
            <div className="h-full w-full rounded-full bg-white/70 backdrop-blur" />
          </div>

          {/* SVG Brain */}
          <div className="relative grid h-full w-full place-items-center">
            {/* Starfield */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              {Array.from({ length: 18 }).map((_, i) => (
                <span
                  key={i}
                  className="absolute h-1 w-1 rounded-full bg-purple-400/70 animate-twinkle"
                  style={{
                    top: `${(i * 37) % 90 + 5}%`,
                    left: `${(i * 53) % 90 + 5}%`,
                    animationDelay: `${(i % 7) * 0.3}s`,
                  }}
                />
              ))}
            </div>
            <svg className="h-72 w-72 animate-float" viewBox="0 0 200 200" fill="none">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7164c0" />
                  <stop offset="100%" stopColor="#9492db" />
                </linearGradient>
              </defs>
              <path
                d="M80 40c-20 0-35 15-35 35 0 10 5 20 12 26-2 10 2 20 10 26 4 3 10 5 15 5h45c15 0 28-12 28-28 0-8-3-16-9-21 0-20-17-43-43-43-8 0-16 2-23 6-3-4-7-6-10-6Z"
                stroke="url(#g1)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="[stroke-dasharray:6_10] animate-dash"
              />
              {/* Nodes */}
              <g className="animate-pulseGlow">
                <circle cx="70" cy="60" r="3" fill="#7164c0" />
                <circle cx="95" cy="50" r="3" fill="#9492db" />
                <circle cx="120" cy="60" r="3" fill="#7164c0" />
                <circle cx="140" cy="85" r="3" fill="#9492db" />
                <circle cx="110" cy="100" r="3" fill="#7164c0" />
                <circle cx="85" cy="95" r="3" fill="#9492db" />
              </g>
            </svg>

            {/* Orbiting neural image cards - elliptical, speed-varied, pause-on-hover */}
            <div className="absolute inset-0 group/orbits">
              {/* Faint orbit guide */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[92%] w-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/10" />

              {/* Orbit A - tall ellipse */}
              <div className="absolute inset-4 transform-gpu animate-[spin_14s_linear_infinite] group-hover/orbits:[animation-play-state:paused] scale-y-[1.2]">
                <div className="absolute left-1/2 top-0 -translate-x-1/2">
                  <div className="w-28 overflow-hidden rounded-xl border border-purple-500/20 bg-white/80 p-2 shadow-lg backdrop-blur [transform:scaleY(0.833)]">
                    <img src={neural1} alt="neural" className="h-24 w-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Orbit B - wide ellipse, opposite direction */}
              <div className="absolute inset-8 transform-gpu animate-[spin_18s_linear_infinite_reverse] group-hover/orbits:[animation-play-state:paused] scale-x-[1.25]">
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                  <div className="w-28 overflow-hidden rounded-xl border border-purple-500/20 bg-white/80 p-2 shadow-lg backdrop-blur [transform:scaleX(0.8)]">
                    <img src={neural2} alt="neural" className="h-24 w-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Orbit C - medium ellipse */}
              <div className="absolute inset-10 transform-gpu animate-[spin_16s_linear_infinite] group-hover/orbits:[animation-play-state:paused] scale-y-[0.85]">
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
                  <div className="w-28 overflow-hidden rounded-xl border border-purple-500/20 bg-white/80 p-2 shadow-lg backdrop-blur [transform:scaleY(1.176)]">
                    <img src={neural1} alt="neural" className="h-24 w-full object-cover" />
                  </div>
                </div>
              </div>

              {/* Orbit D - small ellipse, opposite direction */}
              <div className="absolute inset-12 transform-gpu animate-[spin_12s_linear_infinite_reverse] group-hover/orbits:[animation-play-state:paused] scale-x-[0.9]">
                <div className="absolute left-0 top-1/2 -translate-y-1/2">
                  <div className="w-28 overflow-hidden rounded-xl border border-purple-500/20 bg-white/80 p-2 shadow-lg backdrop-blur [transform:scaleX(1.111)]">
                    <img src={neural2} alt="neural" className="h-24 w-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof marquee */}
      <section className="relative z-10 mt-20 border-y border-gray-200/60 bg-white/60 py-6 backdrop-blur">
        <div className="relative mx-auto max-w-[2000px] overflow-hidden">
          <div className="flex select-none items-center text-gray-600">
            {/* Outer track animates; inner halves are identical to avoid seams */}
            <div className="flex w-[200%] animate-[marquee_18s_linear_infinite] will-change-transform">
              <div className="flex w-1/2 min-w-[100%] items-center gap-12">
                <span>Capture ideas</span>
                <span>Summarize anything</span>
                <span>Organize knowledge</span>
                <span>Collaborate effortlessly</span>
                <span>Search across everything</span>
                <span>Your second brain</span>
                <span>Capture ideas</span>
                <span>Summarize anything</span>
                <span>Organize knowledge</span>
                <span>Collaborate effortlessly</span>
                <span>Search across everything</span>
                <span>Your second brain</span>
              </div>
              <div className="flex w-1/2 min-w-[100%] items-center gap-12" aria-hidden>
                <span>Capture ideas</span>
                <span>Summarize anything</span>
                <span>Organize knowledge</span>
                <span>Collaborate effortlessly</span>
                <span>Search across everything</span>
                <span>Your second brain</span>
                <span>Capture ideas</span>
                <span>Summarize anything</span>
                <span>Organize knowledge</span>
                <span>Collaborate effortlessly</span>
                <span>Search across everything</span>
                <span>Your second brain</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-transform hover:-translate-y-1 cursor-pointer"
              onMouseEnter={() => openOverlay(i)}
              onFocus={() => openOverlay(i)}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-200/0 via-purple-200/0 to-purple-200/0 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 text-white shadow-md" />
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Focus overlay for feature cards */}
      {overlayOpen && focusedIdx !== null && (
        <div
          className={`fixed inset-0 z-[60] flex items-center justify-center bg-gradient-to-br from-white/70 to-purple-50/60 backdrop-blur-md transition-opacity duration-500 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        >
          <div
            className={`pointer-events-auto relative mx-auto w-[92vw] max-w-5xl md:w-[60vw] transform-gpu transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}
          >
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-purple-200/60 to-indigo-200/60 blur" />
            <div className="relative rounded-3xl border border-gray-200 bg-white p-10 shadow-[0_40px_80px_-20px_rgba(113,100,192,0.35)]">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 shadow" />
              <h3 className="mt-6 text-3xl font-extrabold text-gray-900">{features[focusedIdx].title}</h3>
              <p className="mt-3 max-w-3xl text-lg text-gray-600">{features[focusedIdx].desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="relative z-10 mx-auto mb-24 max-w-4xl px-6">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-1 shadow-xl">
          <div className="rounded-2xl bg-white/10 p-8 text-center backdrop-blur">
            <h2 className="bg-gradient-to-br from-white to-gray-200 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
              Your ideas deserve a second brain
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-purple-50/90">
              Build a Nexus of everything you know. Search it, remix it, and share it.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link to="/signup" className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-md transition-transform hover:scale-[1.02]">
                Get started free
              </Link>
              <Link to="/signin" className="rounded-xl border border-white/60 px-6 py-3 text-sm font-semibold text-white/90 hover:bg-white/10">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-200/60 bg-white/60 py-8 text-center text-sm text-gray-600 backdrop-blur">
        Made with ❤️ for creators. © {new Date().getFullYear()} NEXUS
      </footer>
    </div>
  );
}


