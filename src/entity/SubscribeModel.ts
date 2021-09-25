import {sequelize} from "../utils";
import {DataTypes} from "sequelize";

const SubscribeModel = sequelize.define('subscribe', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barkId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  barkServer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ext: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});
SubscribeModel.sync().then();
export default SubscribeModel;