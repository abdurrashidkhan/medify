export default async function allProductFind() {
  // console.log(email)
  const res = await fetch(`/api/add-product/`, {
    cache: 'no-store'
  });
  return res.json();
}
