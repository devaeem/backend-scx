import {
  IsString,
  IsOptional,
  IsNumber,
  IsNotEmpty,
  Min,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
export class GetBookDto {
  @Type(() => Number)
  @IsNumber({}, { message: 'page must be a number' })
  @IsNotEmpty({ message: 'page is required' })
  @Min(1)
  readonly page: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'pageSize must be a number' })
  @IsNotEmpty({ message: 'pageSize is required' })
  @Min(1)
  readonly pageSize: number;

  @IsString()
  @IsOptional()
  readonly search?: string;

  @IsOptional()
  @IsString()
  @IsIn([
    'title_ASC',
    'title_DESC',
    'author_ASC',
    'author_DESC',
    'createdAt_ASC',
    'createdAt_DESC',
  ])
  sort?: string;
}
