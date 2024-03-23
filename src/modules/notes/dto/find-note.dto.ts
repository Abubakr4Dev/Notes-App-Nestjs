import { IsString } from 'class-validator';
import { ObjectId } from 'mongoose';

export class FindNoteDto {
  @IsString()
  readonly _id: ObjectId;
  @IsString()
  readonly createdBy: ObjectId;
}
