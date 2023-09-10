import prisma from "../../../../prisma/client";

export async function GET(req, res) {
  const users = await prisma.user.findMany();

  return new Response(JSON.stringify(users));
}
