import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { DateTime } from "luxon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") await handleDelete(req, res);
}

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  const videoId = req.body["videoId"];
  const chatterId = req.body["chatterId"];
  const userId = req.body["userId"];
  const rating = req.body["rating"] ?? 0;

  if (!videoId) {
    res.status(400).send({ error: "Property: [videoId] missing" });
    return;
  }

  await prisma.user.findMany({
    where: { sessions: { some: { id: { not: "" } } } },
    include: { sessions: true },
  });

  await prisma.youtubeVideo.update({
    data: { archived: DateTime.utc().toISO() },
    where: { id: videoId },
  });

  if (chatterId && userId && rating) {
    await prisma.chatterRating.create({
      data: { chatterId, userId, rating },
    });
  }

  res.status(200).send({});
};