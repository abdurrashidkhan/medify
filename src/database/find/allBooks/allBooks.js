export default async function allBooksFind() {
  // console.log(email)
  const res = await fetch(`/api/add-book/`, {
    cache: 'no-store'
  });
  return res.json();
}
