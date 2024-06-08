import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma.service';
import { Books } from './entities/book.entity';
import { GetBookDto } from './dto/get-book.dto';
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

    let where = {};
    if (search) {
      where = {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { author: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    let orderBy = {};
    if (sort) {
      switch (sort) {
        case 'title_ASC':
          orderBy = { title: 'asc' };
          break;
        case 'title_DESC':
          orderBy = { title: 'desc' };
          break;
        case 'author_ASC':
          orderBy = { author: 'asc' };
          break;
        case 'author_DESC':
          orderBy = { author: 'desc' };
          break;
        case 'createdAt_ASC':
          orderBy = { createdAt: 'asc' };
          break;
        case 'createdAt_DESC':
          orderBy = { createdAt: 'desc' };
          break;
        default:
          break;
      }
    }

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

  findOne(id: number) {
    return `This action returns a #${id} book`;
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return `This action updates a #${id} book`;
  }

  remove(id: number) {
    return `This action removes a #${id} book`;
  }
}
