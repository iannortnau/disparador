import {Injectable} from '@nestjs/common';
import {PrismaService} from "../prisma.service";
import {Email, Prisma} from "@prisma/client";

@Injectable()
export class EmailService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<Email[]>{
        return this.prisma.email.findMany();
    }

    async findKey(where: Prisma.EmailWhereUniqueInput): Promise<Email>{
        const response = await this.prisma.email.findUnique({where});

        if(response !== null){
            return response;
        }else {
            throw Error('Email não encontrado');
        }
    }

    async create(data: Prisma.EmailCreateInput): Promise<Email> {
        const response = await this.prisma.email.findUnique({where:{email: data.email}});

        if(response === null){
            return this.prisma.email.create({
                data
            })
        }else {
            throw new Error("Email já registrado");
        }
    }

    async remove(where: Prisma.EmailWhereUniqueInput): Promise<Email> {
        const response = await this.prisma.email.findUnique({where});

        if(response !== null){
            return this.prisma.email.delete({
                where,
            });
        }else {
            throw Error('Email já removido ou nunca registrado');
        }
    }
}
