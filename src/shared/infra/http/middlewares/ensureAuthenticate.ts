import { Request, Response, NextFunction } from 'express';

import { AppError } from '@shared/errors/AppError';
import { verifyToken } from '@utils/jwt';
import { HttpStatus } from '@shared/enums/HttpStatus';

export function ensureAuthenticate(user_type: 'clients' | 'deliverymen') {
  return async function (request: Request, _: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError('Token is missing', HttpStatus.UNAUTHORIZED);
    }

    const [, token] = authHeader.split(' ');

    try {
      const { sub: user_id } = verifyToken(token, user_type);
      const requestType =
        user_type === 'clients' ? 'id_client' : 'id_deliveryman';

      request[requestType] = user_id;

      return next();
    } catch {
      throw new AppError('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  };
}
