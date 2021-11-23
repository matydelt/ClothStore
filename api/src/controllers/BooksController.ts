import { Request, Response } from "express"

import BookModel, { Book } from "../models/book"

class BooksController {

    static async setBook(req: Request, res: Response) {
        try {
            const { title, author } = req.body
            const book: Book = new BookModel({ title: title, author: author });
            await book.save();
            res.sendStatus(200);
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }
    static async getBook(req: Request, res: Response) {
        try {
            const books: Book[] = await BookModel.find();
            res.json(books);
        } catch (e) {
            console.log(e)
            res.sendStatus(500)
        }
    }

}

export default BooksController

