import express from "express"
import ProductManager from "./components/productManager.js"

const app = express();
app.use(express.urlencoded({extended : true}));

console.log(ProductManager)

const productos = new ProductManager();
const readProducts = productos.readProducts();

app.get("/products", async (req, res) => {
    let limit = parseInt(req.query.limit);
    if (!limit) return res.send( await readProducts)
    let allProducts = await readProducts;
    let productLimit = allProducts.slice(0, limit)
 res.send(productLimit)
});

app.get("/products/:id", async (req, res) => {
    let id = parseInt(req.params.id)
    let allProducts = await readProducts;
    let getProductsById = allProducts.find(product => product.id === id)
    res.send(getProductsById)
});

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`express por local host ${PORT}`)
})

server.on("error", (error) => console.log(`error del servidor ${error}`))