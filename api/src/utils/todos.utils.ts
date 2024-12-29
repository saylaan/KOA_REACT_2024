/* Third-party */
import _ from 'lodash';
/* Models */
import { TodoResponseItem, KanbanItem } from '@models/todos';

export function removeEmptyTodo(todos: TodoResponseItem[]) {
  const verifyTodos = _.filter(todos, (todo) =>
    _.every(_.values(todo), (value) => value !== null && value !== undefined),
  );
  return verifyTodos;
}

export function formatTodoInKanbanItem(
  todos: TodoResponseItem[],
): KanbanItem[] {
  return _.map(todos, (todo) => ({
    id: todo.id as number,
    title: todo.title as string,
    description: '',
    cost: 0,
    status: todo.completed ? 'done' : 'todo',
  }));
}
