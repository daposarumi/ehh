

import userModel from '../models/userModel.js';




//add to cart 


const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Initialize the cart for the given item if it doesn't exist
        if (!cartData[itemId]) {
            cartData[itemId] = {};
        }

        // Initialize the specific size entry if it doesn't exist
        if (!cartData[itemId][size]) {
            cartData[itemId][size] = 1;
        } else {
            // If size exists, increment the quantity
            cartData[itemId][size] += 1;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added to cart" });
    } catch (error) {
        console.log("Add to cart error:", error);
        res.status(500).json({ success: false, message: "Error occurred", error: error.message });
    }
};



// const addToCart = async (req, res) => {
//     try {
//         let userData = await userModel.findOne({_id:req.body.userId});
//         let cartData =  await userData.cartData;
//         if (!cartData[req.body.itemId])
//         {
//             cartData[req.body.itemId] = 1
//         }
//         else {
//             cartData[req.body.itemId] += 1;
//         }
//         await userModel.findByIdAndUpdate(req.body.userId, {cartData});
//         res.json({ success: true, message: "Added to cart" });

       
       

       
//     } catch (error) {
//         console.log("Add to cart error:", error);
//         res.status(500).json({ success: false, message: "Error occurred" });
//     }
// };

// export default addToCart;



//remove from cart 


const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        // Check if the item with the specific size exists in the cart
        if (cartData[itemId] && cartData[itemId][size]) {
            if (cartData[itemId][size] > 1) {
                // Decrease the quantity for the specific size
                cartData[itemId][size] -= 1;
            } else {
                // If quantity is 1, remove that size entry
                delete cartData[itemId][size];

                // If no sizes are left for that item, remove the item from the cart
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }
            }

            await userModel.findByIdAndUpdate(userId, { cartData });
            res.json({ success: true, message: "Removed from cart" });
        } else {
            res.json({ success: false, message: "No such product with the specified size in cart" });
        }
    } catch (error) {
        console.log("Remove from cart error:", error);
        res.status(500).json({ success: false, message: "Error occurred", error: error.message });
    }
};


// const removeFromCart = async (req,res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         if (cartData[req.body.itemId]>0) {
//             cartData[req.body.itemId] -= 1;
//         }
//         else{
//             console.log("No such product in cart")
//         }
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true,message:"Removed from cart"})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }




//clear all items



const clearCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;
        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {};

        if (itemId && size) {
            if (cartData[itemId] && cartData[itemId][size]) {
                delete cartData[itemId][size];

                // Remove itemId if no sizes are left
                if (Object.keys(cartData[itemId]).length === 0) {
                    delete cartData[itemId];
                }

                await userModel.findByIdAndUpdate(userId, { cartData });
                res.json({ success: true, message: "Item removed from cart" });
            } else {
                res.json({ success: false, message: "Item or size not found in cart" });
            }
        } else {
            res.json({ success: false, message: "ItemId and size must be provided" });
        }
    } catch (error) {
        console.log("Clear cart error:", error);
        res.status(500).json({ success: false, message: "Error occurred", error: error.message });
    }
};


// const clearCart = async (req, res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId);

//         let cartData = userData.cartData;

//         if (cartData[req.body.itemId]) {
//             delete cartData[req.body.itemId];
//         } 
//         await userModel.findByIdAndUpdate(req.body.userId, { cartData });
//         res.json({ success: true, message: "Item removed from cart" });
//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: "Error removing item from cart", error: error.message });
//     }
// }


// fetch user cart data



const getCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = userData.cartData;
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving cart data", error: error.message });
    }
};

// const getCart = async (req,res) => {
//     try {
//         let userData = await userModel.findById(req.body.userId);
//         let cartData = await userData.cartData;
//         res.json({success:true,cartData})
//     } catch (error) {
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

export {addToCart,removeFromCart,clearCart,getCart}