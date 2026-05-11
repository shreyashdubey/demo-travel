// Inline JSON-LD <script> for structured data. Server-rendered (no "use client").
// Using a stringified payload + dangerouslySetInnerHTML is the React-recommended
// pattern for ld+json so the JSON isn't HTML-escaped.

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Compact JSON keeps payload small; crawlers don't need whitespace.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
