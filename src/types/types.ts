type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

// type GuitarID = Guitar['id'] // look up

// type CartItem = Pick< Guitar, 'id' | 'name' | 'price' > & {
//     quantity: number
// }
// type CartItem = Omit< Guitar, 'image' | 'description' > & {
//     quantity: number
// }

type CartItem = Guitar & { //herencia
    quantity: number
}

// interface CartItem extends Guitar { //herencia
//     quantity: number
// }

