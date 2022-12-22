import fs from 'fs'

class ProductManager {
  constructor(ruta) {
    this.products = [];
    this.path = ruta;
  }
  addProduct(title, description, price, thumbnail, code, stock) {
    let product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    let errorCode = "";
    this.products.forEach((producto) => {
      // console.log(code);
      //console.log(producto.code);
      //console.log(codeId === code)
      if (producto.code === code) {
        // console.log(producto.code === code)

        errorCode = "error codigo invalido";
      }
    });
    //console.log(errorCode.length !== 0)
    if (errorCode.length !== 0) {
      return errorCode;
    }
    console.log(errorCode);

    if (this.products.length === 0) {
      product["id"] = 1;
    } else {
      product["id"] = this.products[this.products.length - 1]["id"] + 1;
    }
    this.products.push(product);
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
    return product;
  }

  getProducts() {
    const producto = fs.readFileSync(this.path, "utf-8");
    // console.log(producto)
    return producto;
  }

  getProductById(id) {
  
    return JSON.parse(fs.readFileSync(this.path, 'utf-8')).find(e => e.id === id) || "Error, No encontrado"
    
  }
  deleteProduct(id){
    if(!id || !this.products.find(e => e.id === id))
      return "Error, id no encontrado"
    else {
      let products = this.products.filter(e => e.id !== id)
      fs.writeFileSync(this.path, JSON.stringify(products, null, '\t'))
      return "Producto eliminado"
    }
  }
  updateProduct = (id, obj) => {
    let sigleProduct = this.products.find((prod) => prod.id == id);
    let index = this.products.findIndex((p) => p.id == id);
    let anyId = Object.keys(obj).some((k) => k == "id");

    if (sigleProduct) {
      if (!anyId) {
        this.products[index] = { ...sigleProduct, ...obj };
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, "\t"));
        console.log("Producto actualizado");
      } else {
        console.log("ERROR: no puede modificar el id de un producto");
      }
    } else {
      console.log(`ERROR no se encuentra producto con el ID: ${id}`);
    }
  };
 }





//pruebas
const productManager = new ProductManager("Products.json");
//creo nuevos productos
//console.log(
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  "200",
  "Sin imagen",
  "abc123",
  "25"
);
//);
//console.log(
productManager.addProduct(
  "producto prueba2",
  "Este es un producto prueba2",
  "200",
  "Sin imagen",
  "abd2020",
  "35"
);
//);
productManager.addProduct(
  "producto prueba3",
  "Este es un producto prueba3",
  "2230",
  "Sin imagen",
  "ahh2020",
  "28"
);
productManager.addProduct(
    "producto prueba4",
    "Este es un producto prueba4",
    "2110",
    "Sin imagen",
    "azz33",
    "60"
  );
  productManager.addProduct(
    "producto prueba5",
    "Este es un producto prueba5",
    "600",
    "Sin imagen",
    "acc233",
    "45"
  );
  productManager.addProduct(
    "producto prueba6",
    "Este es un producto prueba6",
    "2580",
    "Sin imagen",
    "akk156",
    "89"
  );
  productManager.addProduct(
    "producto prueba7",
    "Este es un producto prueba7",
    "022",
    "Sin imagen",
    "all873",
    "944"
  );
  productManager.addProduct(
    "producto prueba8",
    "Este es un producto prueba8",
    "505",
    "Sin imagen",
    "zsd233",
    "12"
  );
  productManager.addProduct(
    "producto prueba9",
    "Este es un producto prueba9",
    "257",
    "Sin imagen",
    "klj584",
    "40"
  );
  productManager.addProduct(
    "producto prueba10",
    "Este es un producto prueba10",
    "415",
    "Sin imagen",
    "fgh547",
    "45"
  );
  productManager.addProduct(
    "producto prueba11","Este es un producto prueba11","471","Sin imagen","mnb152","71"
  );
//obtengo por consola los productos ya existentes/creados
//console.log(productManager.getProducts())
// Busco por id un producto
//console.log(productManager.getProductById(2))
//Actualizo el stock en el producto con id 3
//productManager.updateProduct(3, {stock: 150})
//borramos el producto con id 3
//console.log(productManager.deleteProduct(3));
export default new ProductManager('./Products.json')