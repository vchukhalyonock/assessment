import {ApiProperty} from "@nestjs/swagger";
import {ComposerResponseDto} from "./composer-response.dto";

export class ComposerListResponseDto {
    @ApiProperty({ type: ComposerResponseDto, isArray: true })
    list: ComposerResponseDto[];
}
