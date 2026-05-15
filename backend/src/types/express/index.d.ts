import { AuthenticatedUser } from "../../shared/interfaces/auth.interface";

declare global{
  namespace Express{
    interface Request{
      user?: AuthenticatedUser;
    }
  }
}