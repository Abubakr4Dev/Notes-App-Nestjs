import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Note {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  content: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: mongoose.Types.ObjectId;
}

export type NoteDocument = HydratedDocument<Note>;
export const NoteSchema = SchemaFactory.createForClass(Note);
