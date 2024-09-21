import React, {createContext, useEffect} from "react";
import all_products from "../Components/Assets/all_products";
import { useState } from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

export const ShopContext = createContext(null);

// const getDefaultCart = () =>{
//     let cart = {};
//     for (let index = 0; index < all_products.length+1; index++) {
//         cart[index] = 0;
        
//     }
//     return cart;
// }

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < all_products.length; index++) {
        cart[index] = []; // Initialize an empty array for sizes
    }
    return cart;
};

const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());
    const url = "https://panache-backend.onrender.com"
    
    const [token, setToken] = useState("")
    const [userId, setUserId] = useState(null);


    
    // const addToCart = async (itemId) => {
    //     if (!itemId) {
    //         console.error('Invalid itemId');
    //         return;
    //     }
    
    //         setCartItems((prev) => ({
    //             ...prev,
    //         [itemId]: (prev[itemId] || 0) + 1,  // Initialize to 0 if undefined, then increment
    //         }));
    
    //     if (token) {
    //         try {
    //             await axios.post(
    //                 `${url}/api/cart/add`,
    //                 { itemId },
    //                 {
    //                     headers: {
    //                         Authorization: `Bearer ${token}`,
    //                     },
    //                 }
    //             );
    //         } catch (error) {
    //             console.error('Add to cart error:', error.response?.data || error.message);
    //         }
    //     } else {
    //         console.error('No token available');
    //     }
    // };
    

    const addToCart = async (itemId, size) => {
        if (!itemId || !size) {
            console.error('Invalid itemId or size');
            return;
        }
    
        setCartItems((prev) => {
            const updatedCart = { ...prev };
            
            // Check if the item exists in the cart
            if (!updatedCart[itemId]) {
                updatedCart[itemId] = []; // Initialize item if not in the cart
            }
    
            const itemCart = [...updatedCart[itemId]]; // Create a new array for immutability
            const itemIndex = itemCart.findIndex((entry) => entry.size === size);
    
            // If the item with the specific size exists, increase the quantity
            if (itemIndex > -1) {
                itemCart[itemIndex] = {
                    ...itemCart[itemIndex],
                    quantity: itemCart[itemIndex].quantity + 1,
                };
            } else {
                // If the item with the specific size doesn't exist, add it
                itemCart.push({ size, quantity: 1 });
            }
    
            updatedCart[itemId] = itemCart; // Assign the updated array to the cart
            return updatedCart;
        });
    
        // Sync with backend only if token is available
        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/add`,
                    { itemId, size },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (error) {
                console.error('Add to cart error:', error.response?.data || error.message);
            }
        } else {
            console.error('No token available');
        }
    };
    
    
    
    

        

    // const removeFromCart = async (itemId) => {
    //     setCartItems((prev) => {
    //         const newCartItems = { ...prev };
    //         if (newCartItems[itemId] > 1) {
    //             newCartItems[itemId] -= 1;
    //         } else {
    //             delete newCartItems[itemId];
    //         }
    //         return newCartItems;
    //     });
    //     if (token) {
    //         await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
    //     }
    // };


    const removeFromCart = async (itemId, size) => {
        setCartItems(prevCart => {
            // Create a shallow copy of the previous cart state
            const newCart = { ...prevCart };
    
            console.log("Before remove:", newCart);
    
            // Check if the itemId exists in the cart
            if (newCart[itemId]) {
                // Clone the array for immutability
                const itemCart = [...newCart[itemId]];
                const itemIndex = itemCart.findIndex(entry => entry.size === size);
    
                // Check if the item with the specified size exists in the cart
                if (itemIndex > -1) {
                    const currentQuantity = itemCart[itemIndex].quantity;
    
                    if (currentQuantity > 1) {
                        // Decrement quantity if more than 1
                        itemCart[itemIndex] = {
                            ...itemCart[itemIndex],
                            quantity: currentQuantity - 1
                        };
                    } else {
                        // Remove size if quantity is 1
                        itemCart.splice(itemIndex, 1);
                    }
    
                    // Update or remove the item in the cart
                    if (itemCart.length > 0) {
                        newCart[itemId] = itemCart; // Update the array for that item
                    } else {
                        delete newCart[itemId]; // Remove the item if no sizes are left
                    }
    
                    console.log("After remove:", newCart);
                }
            }
    
            return newCart;
        });
    
        if (token) {
            try {
                await axios.post(
                    `${url}/api/cart/remove`,
                    { itemId, size },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } catch (error) {
                console.error('Remove from cart error:', error.response?.data || error.message);
            }
        } else {
            console.error('No token available');
        }
    };
    
    
    
    

    
    

        // const clearCart = async (itemId) => {
        //     setCartItems((prevCartItems) => {
        //         const updatedCartItems = { ...prevCartItems };
        //         delete updatedCartItems[itemId];
        //         return updatedCartItems;
        //     });
        
        //     if (token) {
        //         try {
        //             await axios.post(url + "/api/cart/clear", { itemId }, { headers: { token } });
        //             console.log("Product removed from cart successfully.");
        //         } catch (error) {
        //             console.error("Error removing product from cart:", error);
        //         }
        //     }
        // };


        const clearCart = async (itemId, size) => {
            setCartItems((prevCartItems) => {
                const updatedCartItems = { ...prevCartItems };
                const itemCart = updatedCartItems[itemId] || [];
        
                if (size) {
                    const itemIndex = itemCart.findIndex((entry) => entry.size === size);
                    if (itemIndex > -1) {
                        itemCart.splice(itemIndex, 1);
                    }
                } else {
                    delete updatedCartItems[itemId];
                }
        
                updatedCartItems[itemId] = itemCart;
                return updatedCartItems;
            });
        
            if (token) {
                try {
                    await axios.post(url + "/api/cart/clear", { itemId, size }, { headers: { Authorization: `Bearer ${token}` } });
                } catch (error) {
                    console.error("Error removing product from cart:", error);
                }
            }
        };
        
        
        const getTotalCartAmount = () => {
            let totalAmount = 0;
        
            // Iterate over each itemId in cartItems
            for (const itemId in cartItems) {
                // Get the array of size and quantity for the current itemId
                const sizes = cartItems[itemId];
        
                // Find the product information for the current itemId
                const itemInfo = all_products.find((product) => product.id === Number(itemId));
        
                if (itemInfo) {
                    // Iterate over each size entry for the current itemId
                    for (const entry of sizes) {
                        // Add the price times quantity to the total amount
                        totalAmount += itemInfo.price * entry.quantity;
                    }
                }
            }
        
            return totalAmount;
        };
        

    // const getTotalCartAmount = () => {
    //     let totalAmount = 0;
    //     for (const item in cartItems) {
    //         if (cartItems[item] > 0) {
    //             let itemInfo = all_products.find((product) => product.id === Number(item));
    //             if (itemInfo) {
    //                 totalAmount += itemInfo.price * cartItems[item];
    //             }
    //         }
    //     }
    //     return totalAmount;
    // }

    // const getTotalCartAmount = () => {
    //     return Object.entries(cartItems).flatMap(([itemId, entries]) => 
    //         entries.map(entry => {
    //             const itemInfo = all_products.find(product => product.id === Number(itemId));
    //             return itemInfo ? itemInfo.price * entry.quantity : 0;
    //         })
    //     ).reduce((total, amount) => total + amount, 0);
    // };
    
    
    

    // const getTotalCartItems = () =>{
    //     let totalItem = 0;
    //     for (const item in cartItems) {
    //         if (cartItems[item]>0)
    //         {
    //             totalItem += cartItems[item];
    //         }
            
    //     }
    //     return totalItem;
    // }


    const getTotalCartItems = () => {
        let totalItem = 0;
    
        // Iterate over each itemId in cartItems
        for (const itemId in cartItems) {
            // Get the array of size and quantity for the current itemId
            const sizes = cartItems[itemId];
    
            // Iterate over each size entry for the current itemId
            for (const entry of sizes) {
                // Add the quantity to the total item count
                totalItem += entry.quantity;
            }
        }
    
        return totalItem;
    };
    
    
    
     const loadCartData = async (token) => {
         const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
         setCartItems(response.data.cartData)
     }




    useEffect(() => {
        const loadData = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                setToken(token);
                try {
                    // Decode token to get userId
                    const decodedToken = jwtDecode(token);
                    setUserId(decodedToken.id);
                    
                    await loadCartData(token);
                } catch (error) {
                    console.error("Error decoding token or loading cart data:", error);
                }
            } else {
                console.log("No token found, please log in.");
            }
        };

        loadData();
    }, []); // Empty dependency array ensures this runs only once on mount


    

    const contextValue = {setCartItems, getTotalCartItems, clearCart, getTotalCartAmount, all_products, cartItems, addToCart, removeFromCart, url, token, setToken, userId};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;
