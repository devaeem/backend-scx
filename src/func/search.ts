export const Lsearch = (search: any) => {
  let where = {};
  if (search) {
    where = {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ],
    };
  }

  return where;
};
