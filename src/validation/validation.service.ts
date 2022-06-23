import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import {PrismaService} from "../prisma.service";
import {AutenticateKey ,Prisma} from '@prisma/client';

@Injectable()
export class ValidationService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<AutenticateKey[]>{
        return this.prisma.autenticateKey.findMany();
    }

    async findKey(where: Prisma.AutenticateKeyWhereUniqueInput): Promise<AutenticateKey>{
        const response = await this.prisma.autenticateKey.findUnique({where});

        if(response !== null){
            const creationDate = new Date(response.createdAt).getTime();
            const currentDate = new Date().getTime();
            const dateDiff = Math.abs(creationDate - currentDate);
            const diffDays = Math.ceil(dateDiff / (1000 * 3600 * 24));

            if(diffDays > 30){
                throw Error('Chave já expirada');
            }else {
                return response;
            }
        }else {
            throw Error('Chave não encontrada');
        }
    }

    async create(): Promise<AutenticateKey> {
        return this.prisma.autenticateKey.create({
            data: {
                key: uuidv4()
            }
        })
    }

    async remove(where: Prisma.AutenticateKeyWhereUniqueInput): Promise<AutenticateKey> {
        const response = await this.prisma.autenticateKey.findUnique({where});

        if(response !== null){
            return this.prisma.autenticateKey.delete({
                where,
            });
        }else {
            throw Error('Chave não já delatada ou nunca registrada');
        }
    }

}
