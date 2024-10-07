'use client';
import Lenis from 'lenis';
import { useEffect } from 'react';

export default function SmoothScrollWrapper({ children }) {
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on('scroll', (e) => {
      console.log(e);
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  });
  return <>{children}</>;
}
