import { defineType, defineField, defineArrayMember } from 'sanity'

export const transcriber = defineType({
  type: "document",
  name: "transcriber",
  fields: [
    defineField({
      type: "string",
      name: "name",
    }),
    defineField({
      type: "string",
      name: "email",
    }),
    defineField({
      type: "array",
      name: "transcriptions",
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            { type: "transcription" },
          ],
        }),
      ],
    }),
  ],
});

