import { defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title",       title: "Project Title",   type: "string",  validation: (r) => r.required() }),
    defineField({ name: "year",        title: "Year",            type: "string",  validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description",     type: "text",    rows: 4 }),
    defineField({
      name: "tools",
      title: "Technologies",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "github",  title: "GitHub URL",   type: "url" }),
    defineField({ name: "live",    title: "Live Demo URL", type: "url",     description: "Leave blank if no live demo" }),
    defineField({ name: "color",   title: "Accent Color (hex)", type: "string", initialValue: "#6c63ff" }),
    defineField({ name: "order",   title: "Sort Order (lower = first)", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "year" },
  },
});
