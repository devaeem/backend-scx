import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma.service';
import { Books } from './entities/book.entity';
import { GetBookDto } from './dto/get-book.dto';
import { Rsort } from 'src/func/sort';
import { Lsearch } from 'src/func/search';
import { GetBookIdDto } from './dto/getbook.dto';
import { GetId } from 'src/func/interface/base.interface';
interface PaginatedBooks {
  rows: Books[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  create(createBookDto: CreateBookDto): Promise<Books> {
    const res = this.prisma.books.create({
      data: createBookDto,
    });

    return res;
  }

  // findAll() {
  //   return this.prisma.books.findMany();
  // }

  async findAll(getBookDto: GetBookDto): Promise<PaginatedBooks> {
    const { page, pageSize, search, sort } = getBookDto;

    const orderBy = Rsort(sort);
    const where = Lsearch(search);

    const totalBooks = await this.prisma.books.count({ where });
    const totalPages = await Math.ceil(totalBooks / pageSize);
    const books = await this.prisma.books.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      rows: books,
      page,
      pageSize,
      total: books.length,
      totalPages: totalPages,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
    };
  }

  async findOne(data: GetId): Promise<any> {
    const book = await this.prisma.books.findUnique({ where: { id: data.id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
