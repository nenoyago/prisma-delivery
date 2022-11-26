import { hash } from 'bcrypt';
import { prisma } from '@shared/infra/database/prismaClient';
import { AppError } from '@shared/errors/AppError';

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    const deliverymanExists = await prisma.deliverymen.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        username: true,
      },
    });

    if (deliverymanExists) {
      throw new AppError(`Deliveryman ${username} already exists`);
    }

    const hashPassword = await hash(password, 10);

    const deliveryman = await prisma.deliverymen.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return deliveryman;
  }
}
