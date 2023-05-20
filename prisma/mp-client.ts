import { PrismaClient } from "@prisma/client";
import { nanoid } from 'nanoid'

const prisma = new PrismaClient();

export default prisma.$use(async (params, next) => {
  if (params.action === "create") {
    params.args.data.id = nanoid();  // Set 'id' to a nanoid on creation
  }

  return next(params);
});
