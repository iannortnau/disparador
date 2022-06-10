import {Body, Controller, Delete, ForbiddenException, Get, Headers, Param, Post} from '@nestjs/common';
import {EmailService} from "./email.service";


@Controller('email')
export class EmailController {
    constructor(private readonly emailService : EmailService) {}

    private apiKey = "a405f178-aacc-4973-a8a6-c29298140381";

    @Get()
    findAll(@Headers('token') token: string){
        this.validateApiKey(token);
        return this.emailService.findAll();
    }

    @Get(':email')
    findKey(@Param('email') email: string){
        return this.emailService.findKey({email: email}).catch((e) => {
            throw new ForbiddenException(e.message);
        });
    }

    @Post()
    create(@Body() data: {email:string},@Headers('token') token: string){
        this.validateApiKey(token);
        const {email} = data
        return this.emailService.create({email:email}).catch((e) => {
            throw new ForbiddenException(e.message);
        });
    }

    @Delete(':email')
    delete(@Param('email',) email: string, @Headers('token') token: string){
        this.validateApiKey(token);
        return this.emailService.remove({email: email}).catch((e) => {
            throw new ForbiddenException(e.message);
        });
    }

    validateApiKey(auxApiKey: string){
        if(auxApiKey !== this.apiKey){
            throw new ForbiddenException('api key invalida');
        }
    }

}
