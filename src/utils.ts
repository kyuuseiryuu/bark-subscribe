import * as path from "path";
import {Sequelize} from "sequelize";
import winston from 'winston';

export const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.json(),
    }),
  ],
  format: winston.format.json()
});
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database', 'database.db'),
});
