export async function getProducts(sort, param, setAllProducts) {
  try {
    console.log(process.env.STRAPI_BASE);
    const res = await fetch(
      'https://cms.artisancey.com/' +
        `products?category.name=${param}&_sort=${sort.method}:${
          sort.asc ? 'ASC' : 'DESC'
        }`
    );

    const products = await res.json();
    // console.log(res);

    setAllProducts(products);
  } catch (e) {
    console.log(e);
  }
}
