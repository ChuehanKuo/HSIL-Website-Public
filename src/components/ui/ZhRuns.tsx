import type { ReactNode } from "react";

// Han, CJK punctuation and full-width forms. Digits and spaces join a run only between
// CJK characters, so "全球36國同步連線" stays one run while "Press · 媒體報導" splits.
const CJK = "\\p{Script=Han}\\u3000-\\u303f\\uff00-\\uffef";
const RUN = new RegExp(`[${CJK}](?:[${CJK}\\d\\s]*[${CJK}])?`, "gu");

// Marks the Chinese runs of a mixed string lang="zh-Hant" (the /2026 page is lang="en"),
// so screen readers switch voice for them and nothing else.
const ZhRuns = ({ text }: { text: string }) => {
  const parts: ReactNode[] = [];
  let last = 0;
  for (const match of text.matchAll(RUN)) {
    const start = match.index ?? 0;
    if (start > last) parts.push(text.slice(last, start));
    parts.push(
      <span key={start} lang="zh-Hant">
        {match[0]}
      </span>
    );
    last = start + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
};

export default ZhRuns;
