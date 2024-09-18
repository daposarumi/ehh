// routes/itemRoutes.js
import express from 'express';
import { searchItems } from '../controllers/searchController.js';


const searchRouter = express.Router();

// Search route
searchRouter.get('/search', searchItems);

export default searchRouter;
