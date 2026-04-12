import { defineField, defineType } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({ name: "company",   title: "Company",      type: "string",  validation: (r) => r.required() }),
    defineField({ name: "role",      title: "Job Title",    type: "string",  validation: (r) => r.required() }),
    defineField({ name: "type",      title: "Type",         type: "string",  options: { list: ["Full-time", "Part-time", "Internship", "Contract", "Freelance"] } }),
    defineField({ name: "startDate", title: "Start Date",   type: "date",    validation: (r) => r.required() }),
    defineField({ name: "endDate",   title: "End Date",     type: "date",    description: "Leave blank if this is your current role" }),
    defineField({ name: "current",   title: "Current Role", type: "boolean", initialValue: false }),
    defineField({ name: "location",  title: "Location",     type: "string" }),
    defineField({ name: "color",     title: "Accent Color (hex)", type: "string", initialValue: "#6c63ff" }),
    defineField({
      name: "points",
      title: "Responsibilities / Achievements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tags",
      title: "Tech Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "order", title: "Sort Order (lower = first)", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "role", subtitle: "company" },
  },
});
