import { prisma } from '@shared/infra/database/prismaClient';

interface IUpdateDeliveryman {
  id_delivery: string;
  id_deliveryman: string;
}

export class UpdateEndDateUseCase {
  async execute({ id_delivery, id_deliveryman }: IUpdateDeliveryman) {
    const delivery = await prisma.deliveries.updateMany({
      where: {
        id: id_delivery,
        id_deliveryman: id_deliveryman,
      },
      data: {
        end_at: new Date(),
      },
    });

    const result = delivery.count > 0 ? true : false;

    return {
      updated: result,
      count: delivery.count,
    };
  }
}
