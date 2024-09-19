import {BadRequestException, Injectable} from "@nestjs/common";
import {Composer} from "./entities/composer.entity";
import * as composers from "./data/composers.json";

@Injectable()
export class ComposerRepository {
    private readonly composersDataSource: Composer[] = [];

    constructor() {
        this.composersDataSource = this.loadComposers();
    }

    private loadComposers(): Composer[] {
        return composers.map(composer => ({
            id: composer.id,
            name: composer.name,
            img: composer.img,
            dateOfBirth: new Date(composer.dateOfBirth),
        }))
    }

    findAll(): Composer[] {
        return this.composersDataSource;
    }

    getOne(id: number): Composer {
        const composer = this.composersDataSource.find(composer => composer.id === id);
        if(!composer) throw new BadRequestException('Composer did not exist');
        return composer;
    }
}
