import {BadRequestException, Injectable} from "@nestjs/common";
import {Composer} from "./entities/composer.entity";
import * as composers from "./data/composers.json";
import {ComposerSearchDto} from "./dto/composer-search.dto";
import {SortingDirection} from "./enums/sorting-direction.enum";

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

    search(dto: ComposerSearchDto): Composer[] {
        const { name, sort } = dto;
        const direction = sort ?? SortingDirection.ASC;
        return this.composersDataSource
            .filter(composer => {
                if(!name) return true;
                return composer.name.match(new RegExp('(^| )' + name, 'i')) !== null
            })
            .sort((a, b) => {
                if( sort === SortingDirection.ASC) {
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                } else {
                    if(a.name < b.name) return 1;
                    if(a.name > b.name) return -1;
                }
                return 0;
            });
    }
}
