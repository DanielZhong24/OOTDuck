import app from "./src/app.js";

const port: number = 5000;//so we dont interefere local testing with front end at the port 3000

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});