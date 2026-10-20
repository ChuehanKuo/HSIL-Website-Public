import type { BeforeSendEvent } from "@vercel/analytics";

// Count page visits without retaining query parameters or fragment contents.
export function redactAnalyticsUrl(event: BeforeSendEvent): BeforeSendEvent | null {
  try {
    const url = new URL(event.url);
    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString() };
  } catch {
    return null;
  }
}
