import { Router } from 'express';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

import { AuthenticateDeliverymanController } from '@modules/accounts/useCases/authenticateDeliveryman/AuthenticateDeliverymanController';
import { CreateDeliverymanController } from '@modules/deliverymen/useCases/createDeliverymen/CreateDeliverymanController';
import { FindAllDeliveriesDeliverymanController } from '@modules/deliverymen/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController';

const deliverymenRoutes = Router();

const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createDeliverymenController = new CreateDeliverymanController();
const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController();

deliverymenRoutes.post(
  '/authenticate',
  authenticateDeliverymanController.handle
);
deliverymenRoutes.post('/', createDeliverymenController.handle);
deliverymenRoutes.get(
  '/deliveries',
  ensureAuthenticate('deliverymen'),
  findAllDeliveriesDeliverymanController.handle
);

export { deliverymenRoutes };
