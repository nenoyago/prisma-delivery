import { Router } from 'express';

import { AuthenticateClientController } from '@modules/accounts/useCases/authenticateClient/AuthenticateClientController';
import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { FindAllDeliveriesController } from '@modules/clients/useCases/deliveries/FindAllDeliveriesController';
import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

const clientsRoutes = Router();

const authenticateClientController = new AuthenticateClientController();
const createClientController = new CreateClientController();
const findAllDeliveriesController = new FindAllDeliveriesController();

clientsRoutes.post('/authenticate', authenticateClientController.handle);
clientsRoutes.post('/', createClientController.handle);
clientsRoutes.get(
  '/deliveries',
  ensureAuthenticate('clients'),
  findAllDeliveriesController.handle
);

export { clientsRoutes };
