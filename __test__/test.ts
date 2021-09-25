import EventModel from "../src/entity/EventModel";
import {logger} from "../src/utils";
import {Op} from "sequelize";


(async () => {
  // await sequelize.sync();
  const all = await EventModel.findAll({
    where: {
      name: { [Op.like]: 'test%' }
    },
  }).then(result => result.map(e => e.toJSON())).catch(() => []);
  logger.info({ all });
})()
