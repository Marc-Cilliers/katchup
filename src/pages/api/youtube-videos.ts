import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const videos = await prisma.youtubeVideo.findMany({
    where: { userId: String(req.query["userId"]), archived: null },
    include: {
      chatter: {
        select: { username: true },
      },
    },
  });

  res.status(200).json({ videos });
}
