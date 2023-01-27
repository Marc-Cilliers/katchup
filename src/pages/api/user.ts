import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") await handleGet(req, res);
}

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = String(req.query["userId"]);

  if (!userId) {
    res.status(400).send({ error: "Property: [userId] missing" });
    return;
  }

  const user = await prisma.user.findFirst({ where: { id: userId } });
  res.status(200).send({ user });
};
