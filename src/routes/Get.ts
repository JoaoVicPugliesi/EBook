import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Select } from "../../db/queries/selects/Select";

export class Get {
  constructor(
    private readonly server: FastifyInstance,
    private readonly select: Select
  ) {}

  setupRoutes() {
    this.server.route({
      method: 'get',
      url: '/ebook/books',
      handler: async (req: FastifyRequest, res: FastifyReply) => {
        const books: Record<string, any>[] = await this.select.select_books();

        if(books.length === 0) return res.status(404).send({ message: 'Books Not Found' });

        return res.status(200).send({ books: books });
      }
    })
 

    this.server.get('/ebook/books/:id',  async (req: FastifyRequest, res: FastifyReply) => {
          const { id } = req.params as { id: string };
          const book: Record<string, any>[] = await this.select.select_book_by_url_param({
            reference: 'auth_id',
            param: +id
          });

          if(book.length === 0) return res.status(404).send({ message: 'Book Not Found' });

          return res.status(200).send({ book: book });
    });
  }
}
