var products = fetch("http://localhost:3000/products").then(data => data.json());
console.log(products);
