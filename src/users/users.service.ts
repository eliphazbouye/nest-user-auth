import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput, 
  ): Promise<User | null> {
    return await this.prisma.user.findUniqueOrThrow({ where: userWhereUniqueInput })
  }

  async users(params: {
    skip?: number,
    take?: number,
    cursor?: Prisma.UserWhereUniqueInput,
    where?: Prisma.UserWhereInput,
    orderBy?: Prisma.UserOrderByWithRelationInput,
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.user.findMany({
     skip,
     take,
     cursor,
     where,
     orderBy
    });
  }

}
