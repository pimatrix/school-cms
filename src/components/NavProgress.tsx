'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

// Slim saffron progress bar at the very top of the viewport, shown while
// an internal navigation is in flight — so a click never looks "stuck".
// It starts when a same-origin link is clicked, trickles towards ~90%
// while the next page loads, and completes as soon as the new route
// renders (pathname change). No external packages: a capture-phase
// click listener + an effect on the pathname.
export default function NavProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);
  const firstRender = useRef(true);

  function clearTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
  }

  function start() {
    clearTimers();
    setVisible(true);
    setProgress(10);
    document.body.classList.add('page-loading');
    // Trickle: quick at first, then slower, never quite reaching 100%.
    interval.current = setInterval(() => {
      setProgress((p) => {
        if (p >= 90) return p;
        return p + Math.max(1, (90 - p) * 0.12);
      });
    }, 180);
    // Safety: if the route change never lands (cancelled navigation),
    // do not leave the bar on screen forever.
    timers.current.push(setTimeout(finish, 10000));
  }

  function finish() {
    clearTimers();
    setProgress(100);
    document.body.classList.remove('page-loading');
    timers.current.push(
      setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 350)
    );
  }

  // Start on internal link clicks.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const anchor = (e.target as HTMLElement | null)?.closest?.('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#')) return;
      if (anchor.target && anchor.target !== '_self') return;
      if (anchor.hasAttribute('download')) return;
      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Same page (only the hash differs) — no navigation happens.
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }
      start();
    }
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Complete when the new route has rendered.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    finish();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Never leave the body class behind if the component unmounts.
  useEffect(
    () => () => {
      clearTimers();
      document.body.classList.remove('page-loading');
    },
    []
  );

  if (!visible) return null;
  return (
    <div
      className="fixed inset-x-0 top-0 z-[100] h-[3px] bg-navy-950/10 pointer-events-none"
      role="progressbar"
      aria-hidden
    >
      <div
        className="h-full bg-saffron shadow-[0_0_10px_rgba(245,158,11,0.8)] transition-[width] duration-200 ease-out"
        style={{ width: `${progress}%`, opacity: progress >= 100 ? 0 : 1 }}
      />
    </div>
  );
}
