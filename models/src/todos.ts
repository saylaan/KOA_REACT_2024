import { z } from 'zod';

export const TodoResponseItemSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export type TodoResponseItem = z.infer<typeof TodoResponseItemSchema>;

export const KanbanItemStatusSchema = z.enum(['todo', 'in_progress', 'done']);
export type KanbanItemStatus = z.infer<typeof KanbanItemStatusSchema>;

export const KanbanItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  cost: z.number(),
  status: KanbanItemStatusSchema,
});
export type KanbanItem = z.infer<typeof KanbanItemSchema>;
