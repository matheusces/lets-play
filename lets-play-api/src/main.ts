import express from "express";
import cors from 'cors';
import { router } from "./router";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);


app.listen(3333, () => console.log("App is running in port 3333"));