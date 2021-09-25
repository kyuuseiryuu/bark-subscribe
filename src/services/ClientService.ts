import ClientSubscribeModel from "../models/ClientSubscribes";
import EventService, {eventService} from "./EventService";

export class ClientService {
  constructor(private model: typeof ClientSubscribeModel) {}
  public async subscribe(eventId: string, barkId: string, barkServer?: string, ext?: Object) {
    if ((await eventService.list([eventId])).length !== 1) {
      return null;
    }
    return this.model.findOneAndUpdate({
      eventId,
      barkId,
    }, {
      barkServer,
      eventId,
      barkId,
      ext,
    }, { upsert: true, new: true });
  }
  public remove(eventId: string, barkId: string) {
    return this.model.findOneAndDelete({
      eventId,
      barkId,
    });
  }
  public async listEvent(barkId: string, es: EventService) {
    const clients = await this.model.find({
      barkId,
    });
    return await es.list(clients.map(e => e.eventId));
  }
  public async getClients(eventId: string) {
    return this.model.find({
      eventId,
    });
  }
}

export const clientService = new ClientService(ClientSubscribeModel);
