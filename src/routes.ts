import { Router } from "express";

import GamesController from "./controllers/GamesController";
import AdsController from "./controllers/AdsController";

const routes = Router();

routes.get('/games', GamesController.index);
routes.get('/games/:id/ads', AdsController.index);
routes.post('/games/:id/ads', AdsController.create);
routes.get('/ads/:id/discord', AdsController.discord);

export default routes;
