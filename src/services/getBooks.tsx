export const getBooks = async () => {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/books`, {
    next: {
      revalidate: 30,
    },
  });
  const books = await res.json();
  return books;
};
