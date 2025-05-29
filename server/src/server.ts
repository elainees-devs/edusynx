//src/server.ts
import express,{Request, Response }from 'express';
import { configDotenv } from 'dotenv';
configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req:Request, res:Response) => {
    res.send('server is running....!');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});