import {SortingDirection} from "../enums/sorting-direction.enum";
import {ApiPropertyOptional} from "@nestjs/swagger";
import {IsEnum, IsOptional, IsString} from "class-validator";

export class ComposerSearchDto {
    @ApiPropertyOptional({ type: 'string' })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({ type: SortingDirection, enum: SortingDirection })
    @IsOptional()
    @IsEnum(SortingDirection)
    sort?: SortingDirection;
}
