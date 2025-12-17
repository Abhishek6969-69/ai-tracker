import { z } from "zod";

export const createLearningSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  resourceUrl: z.string().url().optional(),
  difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  status: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]).optional(),
});
