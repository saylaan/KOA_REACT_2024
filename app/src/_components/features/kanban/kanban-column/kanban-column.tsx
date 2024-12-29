/* Third-party */
import { useDrop } from 'react-dnd';
/* Types */
import { ItemTypes } from '../../../../_types/todo';
/* Components */
import { KanbanItem } from '../kanban-item';
import { KanbanColumnProps } from '.';

export const KanbanColumn = ({
  title,
  todos,
  onItemDrop,
  columnKey,
}: KanbanColumnProps) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: ItemTypes.TODO,
    drop: (item: { id: number }) => {
      onItemDrop(item.id, columnKey);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={dropRef}
      style={{
        color: 'black',
        background: isOver ? '#e0ffee' : '#f0f0f0',
        padding: '16px',
        width: '250px',
        minHeight: '500px',
        margin: '0 12px',
        borderRadius: '4px',
      }}
    >
      <h2>{title}</h2>
      {todos.map((todo) => (
        <KanbanItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
