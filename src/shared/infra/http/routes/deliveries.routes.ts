import { Router } from 'express';

import { ensureAuthenticate } from '../middlewares/ensureAuthenticate';

import { CreateDeliveryController } from '@modules/deliveries/useCases/createDelivery/CreateDeliveryController';
import { FindAllAvailableController } from '@modules/deliveries/useCases/findAllAvailable/FindAllAvailableController';
import { UpdateDeliverymanController } from '@modules/deliveries/useCases/updateDeliveryman/UpdateDeliverymanController';
import { UpdateEndDateController } from '@modules/deliveries/useCases/updateEndDate/UpdateEndDateController';

const deliveriesRoutes = Router();

const updateDeliverymanController = new UpdateDeliverymanController();
const updateEndDateController = new UpdateEndDateController();
const findAllAvailableController = new FindAllAvailableController();
const createDeliveryController = new CreateDeliveryController();

deliveriesRoutes.patch(
  '/updateDeliveryman/:id',
  ensureAuthenticate('deliverymen'),
  updateDeliverymanController.handle
);
deliveriesRoutes.patch(
  '/updateEndDate/:id',
  ensureAuthenticate('deliverymen'),
  updateEndDateController.handle
);
deliveriesRoutes.get(
  '/available',
  ensureAuthenticate('deliverymen'),
  findAllAvailableController.handle
);
deliveriesRoutes.post(
  '/',
  ensureAuthenticate('clients'),
  createDeliveryController.handle
);

export { deliveriesRoutes };
