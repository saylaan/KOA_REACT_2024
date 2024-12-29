/* Third-party */
import { useDrag } from 'react-dnd';
/* Types */
import { ItemTypes } from '../../../../_types/todo';
/* Components */
import { KanbanItemProps } from '.';

export const KanbanItem = ({ todo }: KanbanItemProps) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: ItemTypes.TODO,
    item: { id: todo.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={dragRef}
      style={{
        color: 'black',
        padding: '8px',
        marginBottom: '8px',
        backgroundColor: isDragging ? '#aaa' : '#fff',
        border: '1px solid #ccc',
        cursor: 'move',
      }}
    >
      {todo.title}
    </div>
  );
};
