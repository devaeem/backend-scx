import { IsString, IsOptional, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly author: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsString()
  @IsOptional()
  readonly image?: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsNotEmpty({ message: 'Price is required' })
  readonly price: number;
}
