import Express  from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Routes from "./routes/Routes.js";
import Connection from "./database/db.js";

const port = 8000;
const app=Express();

dotenv.config();

app.use(Express.json());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.use("/",Routes);

Connection(process.env.MONGOURL);

app.listen(port || process.env.PORT, () =>
  console.log(`Server is running on PORT ${port}`)
);
