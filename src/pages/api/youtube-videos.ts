import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const videos = await prisma.youtubeVideo.findMany({
    where: {
      userChatter: {
        userId: String(req.query["userId"]),
      },
      archived: null,
    },
    include: {
      userChatter: {
        select: {
          badges: true,
          color: true,
          mod: true,
          subscriber: true,
          turbo: true,
          chatter: {
            select: {
              username: true,
            },
          },
        },
      },
    },
    orderBy: { timestamp: "asc" },
  });

  res.status(200).json({ videos });
}
