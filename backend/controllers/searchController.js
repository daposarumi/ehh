// controllers/itemController.js
import searchModel from "../models/searchModel.js";

const searchItems = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).send('Query is required');
  }

  try {
    // Database query to find items matching the search query
    const results = await searchModel.find({
      $or: [
        { name: new RegExp(query, 'i') },
        { description: new RegExp(query, 'i') },
      ],
    });
    res.json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).send('Server error');
  }
};

export { searchItems };
