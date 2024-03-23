import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { NotesService } from './notes.service';
import { AuthRequest } from '../auth/interfaces/jwt-payload.interface';
import { ObjectId } from 'mongoose';
import { ParseObjectIdPipe } from 'src/common/pipes/parse-object-id.pipe';
import { UpdateNoteDto } from './dto/update-note.dto';
import { FindNoteDto } from './dto/find-note.dto';
import { NoteResponseDto } from './dto/note-response.dto';
import { NoteResponseInterceptor } from './interceptors/note-response.interceptor';

@Controller('notes')
export class NotesController {
  constructor(private noteService: NotesService) {}

  @Post()
  async createNote(
    @Body() newNote: CreateNoteDto,
    @Req() authReq: AuthRequest,
  ) {
    const createdBy = authReq.user.id;
    return this.noteService.addNewNote(createdBy, newNote);
  }

  // Technically any one who owns any token can access all Notes, Even if he is not the owner of notes
  // And because of that we must make sure that each user is the owner of Note before performing any operation,
  // I used the userId in the token payload to ensure that the user is the owner of note he tries to access it.
  @UseInterceptors(NoteResponseInterceptor)
  @Get('/:id')
  async getNote(
    @Param('id', ParseObjectIdPipe) noteId: ObjectId,
    @Req() authReq: AuthRequest,
  ): Promise<NoteResponseDto> {
    const userId: ObjectId = authReq.user.id;
    return await this.noteService.getNoteByNoteId({
      createdBy: userId,
      _id: noteId,
    });
  }

  @UseInterceptors(NoteResponseInterceptor)
  @Patch('/:id')
  async updateNote(
    @Param('id', ParseObjectIdPipe)
    noteId: ObjectId,
    @Body() updatedFields: UpdateNoteDto,
    @Req() authReq: AuthRequest,
  ): Promise<NoteResponseDto> {
    const userId: ObjectId = authReq.user.id;
    const noteInfo: FindNoteDto = {
      createdBy: userId,
      _id: noteId,
    };

    const updatedNote = await this.noteService.updateNote(
      noteInfo,
      updatedFields,
    );

    return updatedNote;
  }

  @Delete('/:id')
  async deleteNote(
    @Param('id', ParseObjectIdPipe) noteId: ObjectId,
    @Req() authReq: AuthRequest,
  ) {
    const userId: ObjectId = authReq.user.id;
    return await this.noteService.deleteNote({
      _id: noteId,
      createdBy: userId,
    });
  }

  // get all notes for a specific user using user id in token payload
  @UseInterceptors(NoteResponseInterceptor)
  @Get()
  async getAllNotes(
    @Query('title') noteTitle: string,
    @Req() authReq: AuthRequest,
  ) {
    // this user id is taken from jwt payload in jwt token
    const userId: ObjectId = authReq.user.id;
    console.log(userId);
    console.log(noteTitle);
    if (noteTitle) {
      // return await this.noteService.getAllNotesByUserId(userId);
      return await this.noteService.searchForNotesByTitle(userId, noteTitle);
    } else {
      console.log('else');
      return await this.noteService.getAllNotesByUserId(userId);
    }
  }
}
