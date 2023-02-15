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
  const clipId = req.body["clipId"];
  const userChatterId = req.body["userChatterId"];
  const rating = req.body["rating"] ?? 0;

  if (!clipId) {
    res.status(400).send({ error: "Property: [clipId] missing" });
    return;
  }

  await prisma.twitchClip.update({
    data: { archived: DateTime.utc().toISO() },
    where: { id: clipId },
  });

  if (userChatterId && rating) {
    await prisma.chatterRating.create({
      data: { userChatterId, rating },
    });
  }

  res.status(200).send({});
};
