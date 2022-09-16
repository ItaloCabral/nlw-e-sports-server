import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

import {convertMinutesToHours} from "../utils/convertMinutesToHours";
import {convertHourToMinutes} from "../utils/convertHourToMinutes";

const prisma = new PrismaClient();

class AdsController {

  async index(request: Request, response: Response) {
    const gameId = request.params.id;

    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        yearsPlaying: true,
        weekDays: true,
        hourStart: true,
        hourEnd: true,
        useVoiceChannel: true
      },
      where: {
        gameId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return response.status(200).json(ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHours(ad.hourStart),
        hourEnd: convertMinutesToHours(ad.hourEnd),
      }
    }));
  }

  async create(request: Request, response: Response) {
    const gameId = request.params.id;

    const body = request.body;

    const ad = await prisma.ad.create({
      data: {
        gameId,
        ...body,
        weekDays: body.weekDays.join(','),
        hourStart: convertHourToMinutes(body.hourStart),
        hourEnd: convertHourToMinutes(body.hourEnd),
      }
    });

    return response.status(201).json(ad);
  }

  async discord(request: Request, response: Response) {
    const adId = request.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
      where: {
        id: adId
      },
      select: {
        discord: true
      }
    });

    return response.status(200).json({
      discord: ad.discord
    });
  }
}

export default new AdsController();
