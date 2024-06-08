export const Rsort = (sort: any) => {
  let orderBy = {};
  if (sort) {
    switch (sort) {
      case 'title_ASC':
        orderBy = { title: 'asc' };
        break;
      case 'title_DESC':
        orderBy = { title: 'desc' };
        break;
      case 'author_ASC':
        orderBy = { author: 'asc' };
        break;
      case 'author_DESC':
        orderBy = { author: 'desc' };
        break;
      case 'createdAt_ASC':
        orderBy = { createdAt: 'asc' };
        break;
      case 'createdAt_DESC':
        orderBy = { createdAt: 'desc' };
        break;
      default:
        break;
    }
  }

  return orderBy;
};
