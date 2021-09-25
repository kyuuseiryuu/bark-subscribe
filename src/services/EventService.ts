import SubscribeEventModel from "../models/SubscribeEvent";

export default class EventService {
  constructor(private model: typeof SubscribeEventModel) {}
  public async list(ids?: string[]) {
    if (ids) {
      console.log(ids, await this.model.find({
        _id: { $in: ids },
      }));
      return this.model.find({
        _id: { $in: ids },
      });
    }
    return this.model.find({});
  }
  public async create(name: string, remark?: string) {
    return this.model.findOneAndUpdate({
      name,
    },{ name, remark }, { upsert: true, new: true });
  }
}

export const eventService = new EventService(SubscribeEventModel);