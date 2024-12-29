/* Third-party */
import { Context } from 'koa';
/* Models */
import { TodoResponseItemSchema } from '@models/todos';
/* Utils */
import { formatTodoInKanbanItem, removeEmptyTodo } from 'src/utils/todos.utils';

export const TodoController = {
  async index(res: Context) {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
      );
      const todos = await response.json();

      if (!response.ok) {
        res.body = {
          error: 'Error fetching /todos',
          message: 'Please contact admin for further information',
        };
      }

      const cleanTodos = removeEmptyTodo(todos);

      for (const cleanTodo in cleanTodos) {
        TodoResponseItemSchema.safeParse(cleanTodo);
      }

      const formattedTodos = formatTodoInKanbanItem(cleanTodos);

      res.body = formattedTodos;
      res.status = 200;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      res.status = 500;
      res.body = {
        error: 'Internal Server Error',
        message: err.message || 'An unexpected error occurred',
      };
      console.error('Error in TodoController.index:', err);
    }
  },
};
