import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function createUser(data) {
  return await prisma.user.create({
    data,
  })
}

async function getUserByEmail(email) {
  return await prisma.user.findUnique({
    where: { email },
  })
}

async function updateUser(id, data) {
  return await prisma.user.update({
    where: { id },
    data,
  })
}

async function deleteUser(id) {
  return await prisma.user.delete({
    where: { id },
  })
}

export {
  createUser,
  getUserByEmail,
  updateUser,
  deleteUser,
}
