import {
  createBookService,
  deleteBookService,
  getAllBooksService,
  getRecommendedBooksService
} from '../services/books.services.js';

export const getAllBooksController = async (req, res) => {
  try {
    const totalBooksInfo = getAllBooksService();

    return res.status(200).json(totalBooksInfo);
  } catch (error) {
    console.log('ERROR getting all books');
    res.status(500).json(error.message);
  }
};

export const createBookController = (req, res) => {
  try {
    const { title, caption, rating, image } = req.body;
    const { _id: userId } = req.user;

    if (!image) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const newBook = createBookService({
      title,
      caption,
      rating,
      image,
      userId
    });

    res.status(201).json({
      newBook
    });
  } catch (error) {
    console.log('ERROR creating new Book');
    res.status(500).json(error.message);
  }
};

export const deleteBookController = async (req, res) => {
  try {
    const book = req.book;
    const response = await deleteBookService({ book });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const getRecommendedBooksController = async (req, res) => {
  try {
    const userId = req.user._id;

    const books = await getRecommendedBooksService({ userId });

    return res.json(books);
  } catch (error) {
    console.log('[getRecommendedBooksController]: ', error);
    res.status(500).json({ message: 'Server error' });
  }
};
