import { connect } from 'mongoose';
import {config} from "./config";
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import * as path from "path";

// you would have to import / invoke this in another file

export async function openDb () {
  return open({
    filename: path.resolve(__dirname, '../data/database.db'),
    driver: sqlite3.Database
  });
}
// export async function initTables() {
//   const db = await openDb();
//   const result = db.exec(`
//   CREATE TABLE IF NOT EXISTS
//   `);
// }
export async function connectMongo() {
  return connect(config.MONGODB, {
  });
}
