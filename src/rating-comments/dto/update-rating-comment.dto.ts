import { PartialType } from '@nestjs/mapped-types';
import { CreateRatingCommentDto } from './create-rating-comment.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRatingCommentDto extends PartialType(CreateRatingCommentDto) {
    @IsString()
    @IsNotEmpty()
    content: string;
}
