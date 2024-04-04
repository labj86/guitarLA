// Es js porque solo debe contener lógica
import { useEffect, useState, useMemo } from 'react'
import { db } from "../data/db";

export function useCart() {

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

      const itemExists = cart.findIndex(itemCart => itemCart.id === item.id)

      if (itemExists >= 0) { // Item existe en el carrito

         if (cart[itemExists].quantity < MAX_ITEMS) {
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
      const updatedCart = cart.map(item => {
         if (item.id === id && item.quantity < MAX_ITEMS) {
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
      const updatedCart = cart.map(item => {
         if (item.id === id && item.quantity > MIN_ITEMS) {
            return {
               ...item,
               quantity: item.quantity - 1
            }
         }
         return item
      })
      setCart(updatedCart)
   }

   function clearCart() {
      setCart([])
   }

   // State Derivado (Header)
   //const isEmpty = () => cart.length === 0
   const isEmpty = useMemo(() => cart.length === 0, [cart])
   const cartTotal = useMemo(() => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart])

   return {
      data,
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      isEmpty,
      cartTotal
   }
}