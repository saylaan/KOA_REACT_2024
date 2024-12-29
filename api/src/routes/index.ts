import Router from '@koa/router';

import { TodoController } from 'src/controllers/todo.controller';

const router = new Router();

router.get('/todos', TodoController.index);

export default router;
