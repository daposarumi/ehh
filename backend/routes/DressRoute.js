import express from "express"
import { addDress, listDress, removeDress } from "../controllers/dressController.js";

const dressRouter = express.Router();

dressRouter.post("/add", addDress)
dressRouter.get("/list", listDress)
dressRouter.post("/remove", removeDress)





export default dressRouter