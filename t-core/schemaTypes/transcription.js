import { defineType, defineField, defineArrayMember } from 'sanity'

export const transcription = defineType({
  type: "document",
  name: "transcription",
  fields: [
    defineField({
      type: "string",
      name: "title",
    }),
    defineField({
      type: "slug",
      name: "slug",
      options: { source: "title" },
    }),
    defineField({
      type: "file",
      name: "audioFile",
      options: { accept: "audio/*" },
    }),
    defineField({
      type: "array",
      name: "transcription",
      of: [
        defineArrayMember({
          type: "block",
        }),
      ],
    }),
    defineField({
      type: "string",
      name: "language",
      options: {
        list: [
          {
            title: "English",
            value: "en-US",
          },
          {
            title: "Spanish",
            value: "es-ES",
          },
          {
            title: "French",
            value: "fr-FR",
          },
        ],
      },
    }),
    defineField({
      type: "reference",
      name: "transcriber",
      to: [{ type: "transcriber" }],
    }),
  ],
});

