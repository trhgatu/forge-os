"use client";

import { useEffect, useRef, useState } from "react";

interface UseTypewriterOptions {
  minSpeed?: number;
  maxSpeed?: number;
}

export function useTypewriter(text: string | null, options?: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  // 🟦 Destructure once → stable primitive values
  const minSpeed = options?.minSpeed ?? 20;
  const maxSpeed = options?.maxSpeed ?? 50;

  useEffect(() => {
    if (!text) {
      queueMicrotask(() => {
        setDisplayed("");
        setIsTyping(false);
      });
      return;
    }

    let index = 0;

    queueMicrotask(() => {
      setDisplayed("");
      setIsTyping(true);
    });

    const typeNext = () => {
      if (index < text.length) {
        setDisplayed(text.slice(0, index + 1));
        index++;
        const speed = Math.random() * (maxSpeed - minSpeed) + minSpeed;
        timeoutRef.current = window.setTimeout(typeNext, speed);
      } else {
        setIsTyping(false);
      }
    };

    typeNext();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, minSpeed, maxSpeed]);

  return { displayed, isTyping };
}
