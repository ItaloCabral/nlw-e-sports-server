import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class GamesController {

  async index(request: Request, response: Response) {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true,
          },
        }
      },
    });

    return response.status(200).json(games);
  }

}

export default new GamesController();
