import {ApiResponseProperty} from "@nestjs/swagger";

export class AddressResponseDto {
    @ApiResponseProperty({ type: String })
    streetAddr: string;

    @ApiResponseProperty({ type: String })
    city: string;

    @ApiResponseProperty({ type: String })
    stateCode: string;

    @ApiResponseProperty({ type: String })
    postalcode: string;
}
