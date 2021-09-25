import EventModel from "../entity/EventModel";
import SubscribeModel from "../entity/SubscribeModel";
import {Types} from "mongoose";
import {Op} from "sequelize";

export class SubscribeService {
  public async subscribe(eventId: string, barkId: string, barkServer?: string, ext?: Object) {
    const e = await EventModel.findOne({ where: { id: eventId } });
    if (!e) { return null }
    const old = await SubscribeModel.findOne({
      where: {
        eventId,
        barkId,
      }
    });
    if (old) {
      old.set('barkServer', barkServer);
      old.set('ext', JSON.stringify(ext));
      await old.save();
      return old;
    }
    return await SubscribeModel.create({
      eventId, barkId, barkServer, ext: JSON.stringify(ext), id: (new Types.ObjectId().toString()),
    });
  }
  public remove(eventId: string, barkId: string) {
    return SubscribeModel.destroy({
      where: {
        eventId, barkId,
      }
    });
  }
  public async listEvent(barkId: string) {
    const subscribers: any[] = await SubscribeModel.findAll({ where: { barkId } })
      .then(e => e.map(e => e.toJSON())).catch(() => []);
    return EventModel.findAll({
      where: { id: { [Op.in]: subscribers.map(e => e.eventId) } }
    });
  }
  public async getClients(eventId: string) {
    return SubscribeModel.findAll({
      where: { eventId },
    }).then(r => r.map(e => e.toJSON())).catch(() => []);
  }
}

export const subscribeService = new SubscribeService();
