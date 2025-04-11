import { Post } from "./Post";
import { Get } from "./Get";

export class Routes {
  constructor(
    private readonly get: Get, 
    private readonly post: Post
  ){}

  setupRoutes() {
    this.get.setupRoutes();
    this.post.setupRoutes();
  }
}
