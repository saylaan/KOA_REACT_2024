export { Kanban } from './kanban';
/* Models */
import { KanbanItem } from '@models/todos';

export interface KanbanProps {
  loading: boolean;
  error: string | null;
  todos: KanbanItem[] | [];
  setTodos: React.Dispatch<React.SetStateAction<KanbanItem[]>>;
}
