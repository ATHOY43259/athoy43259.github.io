import { defineField, defineType } from "sanity";

export const certification = defineType({
  name: "certification",
  title: "Certification",
  type: "document",
  fields: [
    defineField({ name: "title",  title: "Certificate Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "issuer", title: "Issued By",         type: "string", validation: (r) => r.required() }),
    defineField({ name: "date",   title: "Date (e.g. Feb 2026)", type: "string" }),
    defineField({ name: "link",   title: "Verify Link (URL)", type: "url" }),
    defineField({ name: "color",  title: "Accent Color (hex)", type: "string", initialValue: "#6c63ff" }),
    defineField({ name: "order",  title: "Sort Order (lower = first)", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "issuer" },
  },
});
