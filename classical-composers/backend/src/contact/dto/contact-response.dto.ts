import {ApiResponseProperty} from "@nestjs/swagger";
import {AddressResponseDto} from "./address-response.dto";

export class ContactResponseDto {
    @ApiResponseProperty({ type: Number})
    id: number;

    @ApiResponseProperty({ type: String})
    email: string;

    @ApiResponseProperty({ type: String })
    phone: string;

    @ApiResponseProperty({ type: AddressResponseDto })
    address: AddressResponseDto
}
