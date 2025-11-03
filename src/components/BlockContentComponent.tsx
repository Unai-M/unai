import type { PortableTextComponents } from "@portabletext/react";

export const BlockContentComponent: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 whitespace-pre-line">{children}</p>
    ),
  },
};
