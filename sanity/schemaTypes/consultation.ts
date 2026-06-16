import { defineType, defineField } from "sanity";

export default defineType({
  name: "consultation",
  title: "Consultation Request",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "Full Name", type: "string" }),
    defineField({ name: "state", title: "State", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "loanType", title: "Loan Type", type: "string" }),
    defineField({
      name: "createdAt",
      title: "Created At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "loanType" },
  },
});
