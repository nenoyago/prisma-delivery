import { Router } from 'express';

import { deliverymenRoutes } from './deliverymen.routes';
import { clientsRoutes } from './clients.routes';
import { deliveriesRoutes } from './deliveries.routes';

const routes = Router();

routes.use('/clients', clientsRoutes);
routes.use('/deliverymen', deliverymenRoutes);
routes.use('/deliveries', deliveriesRoutes);

export { routes };
