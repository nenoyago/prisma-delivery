import { sign, SignOptions, verify } from 'jsonwebtoken';
import auth from '@config/auth';

interface IPayload {
  sub: string;
  username?: string;
}

const { secret_clients_token, secret_deliverymen_token, expires_in_token } =
  auth;

export function generateToken(
  username: string,
  payload: SignOptions = {
    subject: username,
  },
  type: 'clients' | 'deliverymen'
) {
  const secret_token =
    type === 'clients' ? secret_clients_token : secret_deliverymen_token;

  const token = sign({ username }, secret_token, {
    ...payload,
    expiresIn: expires_in_token,
  });

  return token;
}

export function verifyToken(
  token: string,
  type: 'clients' | 'deliverymen'
): IPayload {
  const secret_token =
    type === 'clients' ? secret_clients_token : secret_deliverymen_token;

  const decode = verify(token, secret_token) as IPayload;

  return decode;
}
