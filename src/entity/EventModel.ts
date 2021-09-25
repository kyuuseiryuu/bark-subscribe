import {sequelize} from "../utils";
import {DataTypes} from "sequelize";

const EventModel = sequelize.define('event', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
EventModel.sync().then();
export default EventModel;