/* Third-party */
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
/* Types */
import { KanbanItem, KanbanItemStatus } from '@models/todos';
/* Components */
import { KanbanColumn } from './kanban-column';
import { KanbanProps } from '.';

export const Kanban = ({ loading, error, todos, setTodos }: KanbanProps) => {
  if (loading) return <div>Loading todos...</div>;
  if (error) return <div>Error: {error}</div>;

  const onItemDrop = (id: number, newColumn: string) => {
    setTodos((prev) => {
      const updatedTodos = prev.map((todo: KanbanItem) =>
        todo.id === id
          ? { ...todo, status: newColumn as KanbanItemStatus }
          : todo,
      );
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const todoItems = todos.filter((t) => t.status === 'todo');
  const inProgressItems = todos.filter((t) => t.status === 'in_progress');
  const doneItems = todos.filter((t) => t.status === 'done');

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', padding: '20px' }}>
        <KanbanColumn
          title="Todo"
          todos={todoItems}
          onItemDrop={onItemDrop}
          columnKey="todo"
        />
        <KanbanColumn
          title="In Progress"
          todos={inProgressItems}
          onItemDrop={onItemDrop}
          columnKey="in_progress"
        />
        <KanbanColumn
          title="Done"
          todos={doneItems}
          onItemDrop={onItemDrop}
          columnKey="done"
        />
      </div>
    </DndProvider>
  );
};
