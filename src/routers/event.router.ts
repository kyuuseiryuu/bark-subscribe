import {Router} from "express";
import {config} from "../config";
import {eventService} from "../services/EventService";
import {subscribeService} from "../services/SubscribeService";

const eventRouter = Router()

eventRouter.get('/events', async (req, res) => {
  const events = await eventService.list();
  res.json({ result: events });
});
eventRouter.get('/bark/:bark_id/events', async (req, res) => {
  const barkId = req.params.bark_id;
  console.log({ bark: req.params.bark_id });
  res.json({
    result: await subscribeService.listEvent(barkId),
  });
});
eventRouter.get('/events/:id/barks', async (req, res) => {
  const events = await subscribeService.getClients(req.params.id);
  res.json({ result: events });
});
eventRouter.put('/events/:eventName', async (req, res) => {
  const remark = req.body.remark;
  const result = await eventService.create(req.params.eventName, remark);
  res.json({ result });
});
eventRouter.delete('/events/:eventId/:barkId', async (req, res) => {
  res.json({ result: await subscribeService.remove(req.params.eventId, req.params.barkId)});
});
eventRouter.put('/events/:eventId/:barkId', async (req, res) => {
  const eventId = req.params.eventId;
  const barkId = req.params.barkId;
  const barkServer = req.query.barkServer?.toString() || config.BARK;
  res.json({
    result: await subscribeService.subscribe(eventId, barkId, barkServer, req.body),
    notify_url: `${config.DOMAIN}/${eventId}`,
    id: eventId,
  });
});

export default eventRouter;