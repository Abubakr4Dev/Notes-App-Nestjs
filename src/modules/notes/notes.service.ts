import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schema/note.schema';
import { Model, ObjectId } from 'mongoose';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { FindNoteDto } from './dto/find-note.dto';
import { NoteResponseDto } from './dto/note-response.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>) {}

  async addNewNote(createdBy: ObjectId, newNote: CreateNoteDto) {
    return await this.noteModel.create({ ...newNote, createdBy });
  }

  async getNoteByNoteId(noteInfo: FindNoteDto): Promise<NoteResponseDto> {
    return await this.noteModel.findOne(noteInfo);
  }

  async updateNote(
    noteInfo: FindNoteDto,
    updatedFields: UpdateNoteDto,
  ): Promise<NoteResponseDto> {
    return await this.noteModel.findOneAndUpdate(
      noteInfo,
      {
        $set: updatedFields,
      },
      { new: true },
    );
  }

  async deleteNote(noteInfo: FindNoteDto) {
    const result = await this.noteModel.findOneAndDelete(noteInfo);
    return result;
  }

  async getAllNotesByUserId(createdBy: ObjectId) {
    console.log('here we goo');
    console.log(createdBy);
    return await this.noteModel.find({ createdBy: { $eq: createdBy } });
  }

  async searchForNotesByTitle(createdBy: ObjectId, noteTitle: string) {
    return await this.noteModel.findOne({
      createdBy,
      title: { $regex: new RegExp(noteTitle, 'i') },
    });
  }
}
