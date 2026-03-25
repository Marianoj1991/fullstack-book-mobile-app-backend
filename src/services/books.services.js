import { v2 as cloudinary } from 'cloudinary';
import { Book } from '../models/Book.js';

export const getAllBooksService = async () => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('user', 'username profileImage');

    const totalBooks = await Book.countDocuments();
    return {
      books,
      currentPage: page,
      totalBooks,
      totalPages: Math.ceil(totalBooks / limit)
    };
  } catch (error) {
    console.log('[getAllBooksService]: ', error);
    throw error;
  }
};

export const createBookService = async ({
  title,
  caption,
  rating,
  image,
  userId
}) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(image);
    const imageUrl = uploadResponse.secure_url;

    const newBook = new Book({
      title,
      caption,
      rating,
      image: imageUrl,
      user: userId
    });

    await newBook.save();

    return newBook;
  } catch (error) {
    console.log('[createBookService]: ', error);
    throw error;
  }
};

export const deleteBookService = async (book) => {
  try {
    if (book.image && book.image.includes('cloudinary')) {
      try {
        const publicId = book.image.split('/').pop().split('.')[0];
        await cloudinary.uploader.destroy(publicId);
        return { message: 'Book deleted succesfully' };
      } catch (error) {
        console.log('Error deleting image from cloudinary');
        throw error;
      }
    }

    await book.deleteOne();
  } catch (error) {
    console.log('[deleteBookService]: ', error);
    throw error;
  }
};

export const getRecommendedBooksService = async ({ userId }) => {
  try {
    const books = await Book.find({ user: userId }).sort({ createAt: -1 });

    return books;
  } catch (error) {
    console.log('[getRecommendedBooksService]: ', error);
    throw error;
  }
};
