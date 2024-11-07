import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const AddNotes = mutation({
  args: {
    fileID: v.string(),
    notes: v.any(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileID"), args.fileID))
      .collect();
    if (record?.length == 0) {
      await ctx.db.insert("notes", {
        fileID: args.fileID,
        notes: args.notes,
        createdBy: args.createdBy,
      });
      return "Inserted new notes successfully";
    } else {
      await ctx.db.patch(record[0]._id, { notes: args.notes });
    }
  },
});

export const GetNotes = query({
  args: {
    fileID: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileID"), args.fileID))
      .collect();
    return result[0]?.notes;
  },
});
