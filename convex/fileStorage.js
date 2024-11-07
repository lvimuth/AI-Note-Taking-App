import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const AddFileEntryToDB = mutation({
  args: {
    fileID: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    createdBy: v.string(),
    fileURL: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("pdfFiles", {
      fileID: args.fileID,
      fileName: args.fileName,
      storageId: args.storageId,
      fileURL: args.fileURL,
      createdBy: args.createdBy,
    });
    return "success";
  },
});

export const getFileURL = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

export const GetFileRecord = query({
  args: {
    fileID: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileID"), args.fileID))
      .collect();
    console.log(result);
    return result[0];
  },
});

export const GetUserFiles = query({
  args: {
    userEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args?.userEmail) {
      return;
    }

    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createdBy"), args?.userEmail))
      .collect();
    return result;
  },
});
