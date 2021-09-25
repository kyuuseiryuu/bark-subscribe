import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: String,
  remark: String,
});

interface SubscribeEvent {
  name: string;
  remark: string;
}


const SubscribeEventModel = model<SubscribeEvent>('event', schema);

export default SubscribeEventModel;