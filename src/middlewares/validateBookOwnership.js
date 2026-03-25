import { Book } from '../models/Book.js';

export const validateBookOwnership = async (req, res, next) => {
  const userId = req.user._id;
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);

    if (!book) return res.status(404).json({ message: 'No book found' });

    if (book.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    req.book = book;
    next();
  } catch (error) {
    console.log('ERROR [validateBookOwnership]: ', error);
  }
};
