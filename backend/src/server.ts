import app from './app.js';
const port: number = 6767; //so we dont interefere local testing with front end at the port 3000

app.listen(port, () => {
  `Server is running on port ${port}`;
});
