import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({ log: ['info'] }); //Call super to use methods available to the PrismaClient
  }

  async onModuleInit() {
    //Connect with DB
    await this.$connect;
  }

  async onModuleDestroy() {
    //Disconnect from DB
    await this.$disconnect;
  }
}
