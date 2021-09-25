import express, {Router} from 'express';
import {config} from "./config";
import {connectMongo} from "./utils";
import {Bark} from "./bark";
import * as bodyParser from "body-parser";
import ClientSubscribeModel from "./models/ClientSubscribes";
import {ClientService} from "./services/ClientService";
import eventRouter from "./routers/event.router";

const clientService = new ClientService(ClientSubscribeModel);

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.json({
    barkServer: config.BARK,
    list_events: {
      url: 'GET /api/events',
    },
    add_event: {
      url: 'PUT /api/events/:event_name',
      body: {
        remark: 'some remark of event',
      }
    },
    event_subscribers: {
      url: 'GET /api/events/:id/barks',
    },
    all_subscribes: {
      url: 'GET /api/bark/:bark_id/events',
    },
    subscribe: {
      url: 'PUT /api/events/:event_id/:bark_id[?barkServer=https://your.bark.domain]',
      remark: 'body will overwrite bark parameters',
      body: { overwrite: 'any bark parameters' },
      body_example: {
        isArchive: 0,
        sound: 'silence',
      }
    },
    unsubscribe: {
      remark: 'DELETE /api/events/:event_id/:bark_id',
    },
    notification_only_content: {
      url: 'GET /:event_id/:content',
      remark: 'query is the same of bark api',
    },
    notification_with_title: {
      url: 'GET /:event_id/:title/:content',
      remark: 'query is the same of bark api',
    },
  });
})
indexRouter.get('/:eId/:content', async (req, res) => {
  const { eId, content } = req.params;
  const subscribers = await clientService.getClients(eId);
  subscribers.map(s => {
    const bark = new Bark(s.barkServer, s.barkId);
    bark.notify(content, {
      ...req.query as any,
      ...s?.ext as any,
    });
  });
  res.json({ notified: subscribers.length });
});
indexRouter.get('/:eId/:title/:content', async (req, res) => {
  const { eId, title, content } = req.params;
  const subscribers = await clientService.getClients(eId);
  subscribers.map(s => {
    const bark = new Bark(s.barkServer, s.barkId);
    bark.notify(content, {
      title,
      ...req.query,
      ...s?.ext,
    });
  });
  res.json({ notified: subscribers.length });
});


async function main() {
  await connectMongo();
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
  app.use('/api', eventRouter);
  app.use(indexRouter);
  app.listen(config.PORT, () => {
    console.log(`http://${config.HOST}:${config.PORT}`);
  });
}

main().then()