import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Res,
  Query,
} from '@nestjs/common';
import { Response } from 'express';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { GetBookDto } from './dto/get-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(
    @Body() createBookDto: CreateBookDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const createdBook = await this.booksService.create(createBookDto);
      return response.status(HttpStatus.CREATED).json({
        httpStatus: HttpStatus.CREATED,
        message: 'Book created successfully',
        data: createdBook,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to create book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll(
    @Res() response: Response,
    @Query() getBookDto: GetBookDto,
  ): Promise<any> {
    try {
      const res = await this.booksService.findAll(getBookDto);
      return response.status(HttpStatus.OK).json({
        httpStatus: HttpStatus.OK,
        message: 'Book successfully',
        data: res,
      });
    } catch (error) {
      throw new HttpException(
        'Failed to list book',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(+id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }
}
