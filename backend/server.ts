import app from './src/app.js';
import cors from 'cors';
const port: number = 6767; //so we dont interefere local testing with front end at the port 3000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
