import { defineField, defineType } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({ name: "degree",      title: "Degree / Certificate",  type: "string", validation: (r) => r.required() }),
    defineField({ name: "major",       title: "Major / Group",          type: "string" }),
    defineField({ name: "institution", title: "Institution",            type: "string", validation: (r) => r.required() }),
    defineField({ name: "location",    title: "Location / Board",       type: "string" }),
    defineField({ name: "period",      title: "Period (e.g. Jan 2020 – Jan 2024)", type: "string" }),
    defineField({ name: "grade",       title: "Grade / CGPA",           type: "string", description: "e.g. 3.27 / 4.00 — leave blank if not applicable" }),
    defineField({
      name: "highlights",
      title: "Coursework / Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "order", title: "Sort Order (lower = first)", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "degree", subtitle: "institution" },
  },
});
