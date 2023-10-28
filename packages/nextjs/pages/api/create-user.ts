import { NextApiRequest, NextApiResponse } from "next";
import prisma from "~~/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.send(400);
  }

  const { username, discordId, address } = req.body;
  if (!username || !discordId || !address) {
    console.log({ username, discordId, address });
    return res.send(400);
  }
  const user = await prisma.discordUser.create({
    data: {
      username,
      address,
      discordId,
    },
  });
  return res.status(200).json(user);
}
