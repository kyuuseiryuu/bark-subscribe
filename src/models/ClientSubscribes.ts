import { Schema, model } from 'mongoose';

const schema = new Schema({
  eventId: String,
  barkId: String,
  barkServer: String,
  ext: Object,
});

interface ClientSubscribes {
  eventId: string;
  barkId: string;
  barkServer: string;
  ext?: Object;
}

const ClientSubscribeModel = model<ClientSubscribes>('client_subscribe', schema);
export default ClientSubscribeModel;