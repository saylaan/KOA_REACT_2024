export { KanbanColumn } from './kanban-column';
/* types */
import { KanbanItem } from '@models/todos';

export interface KanbanColumnProps {
  title: string;
  todos: KanbanItem[];
  onItemDrop: (id: number, newColumn: string) => void;
  columnKey: string;
}
