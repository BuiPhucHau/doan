import { IsArray, IsBoolean, IsString } from 'class-validator';

export class UpdateStatusDto {
    @IsArray()
    @IsString({ each: true })
    ids: string[];
  }