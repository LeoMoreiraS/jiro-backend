import { app } from './app';

app.listen(process.env.PORT || 3333, async () => {
  console.log('Server is running');
});
