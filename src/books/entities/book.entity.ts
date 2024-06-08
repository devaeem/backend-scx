import { Prisma } from '@prisma/client';

export class Books implements Prisma.booksCreateInput {
  title: string;
  author: string;
  description?: string;
  image?: string;
  price: number;
}
