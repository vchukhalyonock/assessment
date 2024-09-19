import {ApiResponseProperty} from "@nestjs/swagger";
import {ContactResponseDto} from "../../contact/dto/contact-response.dto";

export class ComposerContactReponseDto {
    @ApiResponseProperty({ type: ContactResponseDto })
    contacts: ContactResponseDto;
}
