import { Fragment, type ReactNode } from "react";

/**
 * Render a string with a tiny Markdown subset: `**bold**` → <strong>.
 * Unmatched markers are left as plain text.
 */
export function renderBoldText(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      return (
        <strong
          key={index}
          className="font-semibold text-neutral-900"
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={index}>{part}</Fragment>;
  });
}
