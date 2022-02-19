import axios from 'axios';

export async function getProducts(sort, param, setAllProducts) {
  try {
    const { data } = await axios.get(
      'https://cms.artisancey.com/' +
        `products?category.name_contains=${param}&_sort=${sort.method}:${
          sort.asc ? 'ASC' : 'DESC'
        }`
    );

    const products = data;
    // console.log(res);

    setAllProducts(products);
  } catch (e) {
    console.log(e);
  }
}
