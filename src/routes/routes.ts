import { Post } from "./Post";
import { Get } from "./Get";
import { Delete } from "./Delete";

export class Routes {
  constructor(
    private readonly get: Get, 
    private readonly post: Post,
    private readonly delete_: Delete
  ){}

  setupRoutes() {
    this.get.setupRoutes();
    this.post.setupRoutes();
    this.delete_.setupRoutes();
  }
}
