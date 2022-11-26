import { compare } from 'bcrypt';
import { prisma } from '@shared/infra/database/prismaClient';
import { generateToken } from '@utils/jwt';
import { AppError } from '@shared/errors/AppError';

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliverymen.findFirst({
      where: { username },
    });

    if (!deliveryman) {
      throw new AppError('Username or password incorrect');
    }

    const matchPassword = await compare(password, deliveryman.password);

    if (!matchPassword) {
      throw new AppError('Username or password incorrect');
    }

    const token = generateToken(
      username,
      {
        subject: deliveryman.id,
      },
      'deliverymen'
    );

    return {
      token,
    };
  }
}
