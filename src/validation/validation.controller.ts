import {Headers ,Controller, Delete, ForbiddenException, Get, Param, Post} from '@nestjs/common';
import {ValidationService} from "./validation.service";

@Controller('validation')
export class ValidationController {
    constructor(private readonly validationService: ValidationService) {}

    private apiKey = "a405f178-aacc-4973-a8a6-c29298140381";

    @Get()
    findAll(@Headers('token') token: string){
        this.validateApiKey(token);
        return this.validationService.findAll();
    }

    @Get(':key')
    findKey(@Param('key') key: string){
        return this.validationService.findKey({key: key}).catch((e) => {
            throw new ForbiddenException(e.message);
        });
    }

    @Post()
    create(@Headers('token') token: string){
        this.validateApiKey(token);
        return this.validationService.create();
    }

    @Delete(':key')
    delete(@Param('key',) key: string, @Headers('token') token: string){
        this.validateApiKey(token);
        return this.validationService.remove({key: key}).catch((e) => {
            throw new ForbiddenException(e.message);
        });
    }

    validateApiKey(auxApiKey: string){
        if(auxApiKey !== this.apiKey){
            throw new ForbiddenException('api key invalida');
        }
    }
}
