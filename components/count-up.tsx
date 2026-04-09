"use client";

import { useEffect, useRef, useState } from "react";

function parse(str: string) {
  const m = str.match(/^([^0-9]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);
  if (!m) return { prefix: "", num: 0, suffix: str, dec: 0 };
  const dec = (m[2].split(".")[1] ?? "").length;
  return { prefix: m[1], num: parseFloat(m[2]), suffix: m[3], dec };
}

export function CountUp({ value, duration = 1800 }: { value: string; duration?: number }) {
  const { prefix, num, suffix, dec } = parse(value);
  const [display, setDisplay] = useState(`${prefix}${(0).toFixed(dec)}${suffix}`);
  const elRef = useRef<HTMLSpanElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || done.current) return;
        done.current = true;
        const t0 = performance.now();
        function frame(now: number) {
          const p = Math.min((now - t0) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(`${prefix}${(num * eased).toFixed(dec)}${suffix}`);
          if (p < 1) requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration, prefix, num, suffix, dec]);

  return <span ref={elRef}>{display}</span>;
}
