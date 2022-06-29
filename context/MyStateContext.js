import React, { useState, createContext, useContext } from 'react'
import { toast } from 'react-hot-toast';

export const Context = createContext();

export const StateContext = ({ children }) => {
    // console.log(children)
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [totalCartItems, setTotalCartItems] = useState(0);
    const [qty, setQty] = useState(1);

    const addItemToCart = (name, id, qty, price, image, what) => {
        const isAvailable = cartItems.find((val) => val._id === id);

        if (what == 'remove') {
            if (isAvailable.qty > 1) {
                setCartTotal(total => total - (price * qty));

                const newItems = cartItems.filter((item) => item._id !== id);

                setCartItems(item => [...newItems, { _id: id, name: name, qty: isAvailable.qty - qty, price: price, image: image }])

                toast.success(`${qty} ${name} removed from cart.`)
            }
        }
        else if (what == 'add') {

            setCartTotal(total => total + (price * qty));

            if (isAvailable) {
                const newItems = cartItems.filter((item) => item._id !== id);

                setCartItems(item => [...newItems, { _id: id, name: name, qty: isAvailable.qty + qty, price: price, image: image }])
            }
            else {
                setTotalCartItems(item => item + 1);
                setCartItems(item => [...item, { _id: id, name: name, qty: qty, price: price, image: image }]);
            }
            setQty(1);
            toast.success(`${qty} ${name} added to the cart.`);
        }
    }

    const removeCartItem = (item) => {
        if (confirm('Are you sure to remove this item ?')) {
            const newItems = cartItems.filter((val) => val._id !== item._id);
            setCartItems(newItems);
        }
    }

    const manageQty = (what) => {
        if (what == 'inc') setQty(prev => prev + 1);
        else if (what == 'dec') {
            setQty((prevQty) => {
                if (prevQty - 1 < 1) return 1;

                return prevQty - 1;
            });
        }
    }

    return (
        <Context.Provider value={{ setCartItems, setCartTotal, setTotalCartItems, qty, manageQty, showCart, setShowCart, cartItems, cartTotal, addItemToCart, removeCartItem }}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);