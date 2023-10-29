import { NextApiRequest, NextApiResponse } from "next";
import prisma from "~~/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.send(400);
  }

  const { username, email, address } = req.body;
  if (!username || !email || !address) {
    console.log({ username, email, address });
    return res.send(400);
  }
  const user = await prisma.user.update({
    where: {
      email,
      name: username,
    },
    data: {
      address,
    },
  });
  return res.status(200).json(user);
}
