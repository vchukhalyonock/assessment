import {ApiProperty} from "@nestjs/swagger";
import {ContactResponseDto} from "../../contact/dto/contact-response.dto";

export class ComposerResponseDto {
    @ApiProperty({ type: Number })
    id: number;

    @ApiProperty({ type: String })
    name: string;

    @ApiProperty({ type: String })
    img: string;

    @ApiProperty({ type: String })
    dateOfBirth: Date;

    @ApiProperty({ type: ContactResponseDto })
    contact: ContactResponseDto;
}
