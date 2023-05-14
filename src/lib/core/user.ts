import prisma from '@prisma/client'

async function createUser(data) {
  return await prisma.user.create({
    data,
  })
}

async function getUser(id) {
  return await prisma.user.findUnique({
    where: { id },
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

export default {
  createUser,
  getUser,
  updateUser,
  deleteUser,
}
