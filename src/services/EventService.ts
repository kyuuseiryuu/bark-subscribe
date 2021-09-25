import EventModel from "../entity/EventModel";
import {Op} from "sequelize";
import {Types} from 'mongoose';

export default class EventService {
  public async list(ids?: string[]) {
    if (!ids) {
      return await EventModel.findAll({ order: [['createdAt', 'desc']] });
    }
    return await EventModel.findAll({
      where: {
        id: {
          [Op.in]: ids,
        }
      },
      order: [['createdAt', 'desc']],
    });
  }
  public async create(name: string, remark?: string) {
    const o = await EventModel.findOne({ where: { name }});
    if (o) {
      o.set('remark', remark);
      await o.save();
      return o;
    }
    return await EventModel.create({
      id: (new Types.ObjectId().toString()),
      name,
      remark,
    });
  }
}

export const eventService = new EventService();