import { describe, expect, it } from "vitest";
import { redactAnalyticsUrl } from "@/lib/analytics";

describe("analytics URL redaction", () => {
  it("removes query values and fragments from page views", () => {
    expect(redactAnalyticsUrl({
      type: "pageview",
      url: "https://www.hsilhackathontaiwan.com/2026?email=example%40example.com&token=test#contact",
    })).toEqual({
      type: "pageview",
      url: "https://www.hsilhackathontaiwan.com/2026",
    });
  });

  it("preserves the public homepage URL", () => {
    expect(redactAnalyticsUrl({
      type: "pageview",
      url: "https://www.hsilhackathontaiwan.com/",
    })?.url).toBe("https://www.hsilhackathontaiwan.com/");
  });

  it("drops malformed URLs instead of transmitting their contents", () => {
    expect(redactAnalyticsUrl({ type: "pageview", url: "invalid" })).toBeNull();
  });
});
