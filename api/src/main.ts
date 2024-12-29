import Koa from 'koa';
import bodyParser from '@koa/bodyparser';
import router from './routes';
import cors from '@koa/cors';

const app = new Koa();

app.use(bodyParser());

app.use(cors({ origin: 'http://localhost:5173' }));

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
