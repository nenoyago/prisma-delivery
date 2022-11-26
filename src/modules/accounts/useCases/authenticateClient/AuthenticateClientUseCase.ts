import { compare } from 'bcrypt';
import { prisma } from '@shared/infra/database/prismaClient';
import { generateToken } from '@utils/jwt';
import { AppError } from '@shared/errors/AppError';

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: { username },
    });

    if (!client) {
      throw new AppError('Username or password incorrect');
    }

    const matchPassword = await compare(password, client.password);

    if (!matchPassword) {
      throw new AppError('Username or password incorrect');
    }

    const token = generateToken(
      username,
      {
        subject: client.id,
      },
      'clients'
    );

    return {
      token,
    };
  }
}
