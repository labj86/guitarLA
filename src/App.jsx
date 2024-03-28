// Un componente debe ser reutilizable o debe de separar funcionalidad
import { useEffect, useState } from 'react'
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db";

function App() {

  // const initialCart = () => {
  //   const localStorageCart = localStorage.getItem('cart')
  //   return localStorageCart ? JSON.parse(localStorageCart) : []
  // }

  // State
  const [data] = useState(db)
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) ?? [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])
  

  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  function addToCart(item) {

    const itemExists = cart.findIndex( itemCart => itemCart.id === item.id )
    
    if(itemExists >= 0) { // Item existe en el carrito
      
      if(cart[itemExists].quantity < MAX_ITEMS){
        const updatedCart = [...cart]
        updatedCart[itemExists].quantity++
        setCart(updatedCart)
      }

    } else { // No existe en el carrito
      
      item.quantity = 1
      setCart([...cart, item])
      //setCart(prevState => [...prevState, item])

    }
  }

  function removeFromCart(id) {
    //setCart( prevState => prevState.filter(item => item.id !== id))
    setCart(cart.filter(item => item.id !== id))
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item 
    })
    setCart(updatedCart)
  }

  function decreaseQuantity(id) {
    const updatedCart = cart.map( item => {
      if(item.id === id && item.quantity > MIN_ITEMS) {
        return {
          ...item,
          quantity: item.quantity -1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

  function clearCart() {
    setCart([])
  }

  return (
    <>
      <Header 
        cart = {cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart={clearCart}
      />
      
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map( guitar => (
            <Guitar 
              key = {guitar.id}
              guitar = {guitar}
              addToCart = {addToCart}
            />
          ))}
          
        </div>

      </main>


      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
      </footer>
    </>
  )
}

export default App
