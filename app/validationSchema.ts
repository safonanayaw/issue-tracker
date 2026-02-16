import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, 'Title is required').max(65535),
    description: z.string().min(1, 'Description is required')
});

export const patchIssueSchema = z.object({
    title: z.string().min(5, "Title is required").optional(),
    description: z.string().min(5, "description is required").max(65535).optional(),
    assignToUserId: z.string().min(1, "AssignToUserId is required").max(255).optional().nullable()
})