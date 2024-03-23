import { Exclude, Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';
// import { ObjectId } from 'mongoose';

export class NoteResponseDto {
  @Expose()
  title: string;
  @Expose()
  content: string;
  @Expose()
  updatedAt: string;
  @Expose()
  @Transform((value) => value.obj._id.toString())
  _id: ObjectId;

  @Exclude()
  createdBy: ObjectId;
  @Exclude()
  createdAt: string;
  @Exclude()
  __v: number | null;

  constructor(partial: Partial<NoteResponseDto>) {
    Object.assign(this, partial);
  }
}
