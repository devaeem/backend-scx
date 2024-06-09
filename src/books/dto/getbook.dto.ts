import { IsString } from 'class-validator';

export class GetBookIdDto {
  @IsString()
  id: string;
}
