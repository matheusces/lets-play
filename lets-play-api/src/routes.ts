import { Router } from "express";
import { createUserController } from "./modules/user/use-cases/create-use-case";

const router = Router();

router.post("/users", (request, response) => {
  return createUserController.handle(request, response);
});

export { router };
