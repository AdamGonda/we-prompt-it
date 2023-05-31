export default {
  include: {
    tags: { where: { isDeleted: false } },
    likes: { where: { isDeleted: false } },
    aiModel: true,
    author: true
  },
}