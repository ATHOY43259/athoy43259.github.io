"use client";

import { useState, useEffect } from "react";

export type Duration = { years: number; months: number; label: string };

function calcDuration(startDate: Date): Duration {
  const now = new Date();
  let years  = now.getFullYear() - startDate.getFullYear();
  let months = now.getMonth()    - startDate.getMonth();

  if (months < 0) { years -= 1; months += 12; }

  const parts: string[] = [];
  if (years  > 0) parts.push(`${years} yr${years  > 1 ? "s" : ""}`);
  if (months > 0) parts.push(`${months} mo${months > 1 ? "s" : ""}`);
  if (parts.length === 0) parts.push("< 1 mo");

  return { years, months, label: parts.join(" ") };
}

/**
 * Returns a live-updating duration string from `startDate` to now.
 * Re-evaluates every 60 seconds so it ticks forward on long sessions.
 */
export function useLiveDuration(startDate: Date): Duration {
  const [duration, setDuration] = useState<Duration>(() => calcDuration(startDate));

  useEffect(() => {
    setDuration(calcDuration(startDate));          // sync immediately after hydration
    const id = setInterval(() => setDuration(calcDuration(startDate)), 60_000);
    return () => clearInterval(id);
  }, [startDate]);

  return duration;
}
