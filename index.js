import { promises as fs } from "fs";

class ProductManager {
    constructor (){
        this.products = []
        this.path = "./productos.txt"
    }

    static id = 0;

    writeProducts = async (productos) => {
        await fs.writeFile(this.path, JSON.stringify(productos))
    }
    
    readProducts = async () => {
       let allProducts = await fs.readFile(this.path, "utf-8")
       return JSON.parse(allProducts)
    }
    
    addProduct = async(title, description, price, thumbnail, code, stock) => {
        let newProduct = {
            title, description, price, thumbnail, code, stock,
        }
        ProductManager.id++
        this.products.push({...newProduct, 
            id: ProductManager.id})
        await this.writeProducts(this.products)
    }

    getProducts = async () => {
        let read = await this.readProducts()
        console.log(read)
    }

    exists = async(id) => {
        let read = await this.readProducts()
        return read.find ((product) => product.id === id)
    }

    getProductsById = async (id) => {
        await this.exists(id) ? console.log(await this.exists(id)) : console.log("No se encontro")
    }

    deleteProduct = async (id) => {
        if ( await this.exists(id)) {
            let products= await this.readProducts();
            let filterProducts = products.filter((prod) => prod.id != id);
            await this.writeProducts(filterProducts)
        } else {
            console.log("El producto que intentas eliminar no existe")
        }
    }

    updateProduct = async ({id, ...product}) => {
        if ((await this.deleteProduct(id)) === false) {
            console.log("El producto que intenta modificar no existe");
        } else {
            let prod = await this.readProducts();
            let modifiedProduct = [
                { id: id, ...product,}, ...prod
            ];
            await this.writeProducts(modifiedProduct);
            console.log("El producto se modifico correctamente")
        }
    };
}

const productos = new ProductManager();

// PRODUCTOS

// productos.addProduct(
//     'Sol',
//     'cerveza',
//     60,
//     'sol.jpg',
//     'abc1',
//     6

// )

// productos.addProduct(
//     'Don Simon',
//     'Vino',
//     300, 
//     'donSimon.jpg',
//     'abc2',
//     3
// )

// productos.addProduct(
//     'Absolute',
//     'Vodka',
//     250,
//     'absolute.jpg',
//     'abc3',
//     7
// )

// productos.addProduct(
//     'Absolute',
//     'Vodka',
//     250,
//     'absolute.jpg',
//     7
// )


// productos.getProducts()

productos.getProductsById(1)

// productos.updateProduct({
//     title: 'nuevo titulo',
//     description: 'cerveza',
//     price: 60,
//     thumbnail: 'sol.jpg',
//     code: 'abc1',
//     stock: 6,
//     id: 1
// })

// productos.deleteProduct(1)