import express from 'express'
import ProductManager from './ProductManager.js'
const app = express()
app.use(express.urlencoded({extended:true}))


app.get('/', (req,res) => {
  res.send('Bienvenido')
})

app.get('/products',  (req,res) => {
  let limit = parseInt(req.query.limit)
 try {
  if (limit === 0 || !limit) {
     res.json(ProductManager.getProducts())
  } else {
     const arrayOriginal = ProductManager.getProducts()
    let arrayConLimite = arrayOriginal.slice(0,limit) 
    res.json(arrayConLimite)
  }
 } catch (error) {
   console.log("Error", error)
   res.send("Ha ocurrido un error")
 }
  
})

app.get('/products/:prodid',  async (req,res) => {
   let prodid =   parseInt(req.params.prodid); 
  let response =  await ProductManager.getProductById(prodid)
  console.log(response)
   res.json(response || {"Error" : "No existe este producto"})
})

app.get('*', (req,res) => {
  res.send("Pagina no encontrada")
})



app.listen(8080, () => {
  console.log("Listening on port 8080")
})