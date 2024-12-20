export default async function allCatagories() {

  const res = await fetch(`/api/all-catagories/`, {
    cache: 'no-store'
  });
  return res.json();
}