import { FastifyInstance } from "fastify";
import { Migrations } from "../../db/migrations/Migrations";
import { Insert } from "../../db/queries/inserts/Insert";
import { Select } from "../../db/queries/selects/Select";
import { Post } from "./Post";
import { Get } from "./Get";

export class Routes {

    private readonly get: Get;
    private readonly post: Post;
    constructor(
        private readonly server: FastifyInstance,
        private readonly migrations: Migrations,
        private readonly insert: Insert,
        private readonly select: Select,
    ) {
        this.get = new Get(server, select);
        this.post = new Post(this.server, this.migrations, this.insert, this.select);
    }

    setupRoutes() {
        this.get.setupRoutes();
        this.post.setupRoutes();    
    }
}