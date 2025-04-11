import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { Reset } from "../../db/migrations/Reset";

export class Delete {
  constructor(
    private readonly server: FastifyInstance,
    private readonly reset: Reset
  ) {}

  setupRoutes() {
    this.server.delete("/ebook/reset",async (req: FastifyRequest, res: FastifyReply) => {
        await this.reset.drop_table_subscriptions();
        await this.reset.drop_table_customers();
        await this.reset.drop_table_publishers();
        await this.reset.drop_table_authors();
        await this.reset.drop_publishers_authors_pivot_table();
        await this.reset.drop_books_table();
        await this.reset.drop_genres_table();
        await this.reset.drop_books_genres_pivot_table();
        res.status(201).send({ message: "Tables reseted" });
      }
    );
  }
}
