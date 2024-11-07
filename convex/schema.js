import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    userName: v.string(),
    email: v.string(),
    imageURL: v.string(),
  }),

  pdfFiles: defineTable({
    fileID: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileURL: v.string(),
    createdBy: v.string(),
  }),
  documents: defineTable({
    embedding: v.array(v.number()),
    text: v.string(),
    metadata: v.any(),
  }).vectorIndex("byEmbedding", {
    vectorField: "embedding",
    dimensions: 768,
  }),
  notes: defineTable({
    fileID: v.string(),
    notes: v.any(),
    createdBy: v.string(),
  }),
});
