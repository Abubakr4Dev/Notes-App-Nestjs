import { Request as HttpRequest } from 'express';
import { ObjectId } from 'mongoose';

interface UserJwtPayload {
  id: ObjectId;
  email: string;
}
export type AuthRequest = HttpRequest & { user: UserJwtPayload };
