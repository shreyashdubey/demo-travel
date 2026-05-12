// Inline JSON-LD <script> for structured data. Server-rendered (no "use client").
// Using a stringified payload + dangerouslySetInnerHTML is the React-recommended
// pattern for ld+json so the JSON isn't HTML-escaped.

// U+2028 (LINE SEPARATOR) and U+2029 (PARAGRAPH SEPARATOR) are valid in JSON but
// terminate statements in JavaScript, they would break out of the inline script.
// We escape these along with the ETAGO sequence ("</") and the HTML comment
// opener ("-->"). Defense-in-depth: current callers pass internal data only,
// but we never want a future caller to introduce an injection vector.
const ETAGO = /</g;
const COMMENT_CLOSE = /-->/g;
const LINE_SEPARATOR = new RegExp(String.fromCharCode(0x2028), "g");
const PARAGRAPH_SEPARATOR = new RegExp(String.fromCharCode(0x2029), "g");

function safeJson(data: unknown): string {
  return JSON.stringify(data)
    .replace(ETAGO, "\\u003c")
    .replace(COMMENT_CLOSE, "--\\u003e")
    .replace(LINE_SEPARATOR, "\\u2028")
    .replace(PARAGRAPH_SEPARATOR, "\\u2029");
}

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJson(data) }}
    />
  );
}
