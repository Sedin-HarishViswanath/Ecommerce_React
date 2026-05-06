import {createSlice} from '@reduxjs/toolkit';

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:[]
    },
    reducers:{
        addToCart:(state,action)=>{
            const item=action.payload;

            if(item.stock <= 0){
                return;
            }

            const existing=state.cartItems.find(
                (cartitem)=>cartitem.id===item.id
            );
            if(existing){
                if(existing.quantity<existing.stock){
                    existing.quantity+=1;
                }
                return;
            }

            state.cartItems.push({
                ...item,
                quantity:1
            });
        },

        removeFromCart:(state,action)=>{
            state.cartItems=state.cartItems.filter(
                (item)=>item.id!==action.payload
            );
        },

        increaseQty:(state,action)=>{
            const item=state.cartItems.find(
                (cartItem)=>cartItem.id===action.payload
            );
            if(item && item.quantity <item.stock){
                item.quantity+=1;
            }
        },

        decreaseQty:(state,action)=>{
            const item=state.cartItems.find(
                (item)=>item.id===action.payload
            );
            if(item && item.quantity>1){
                item.quantity-=1;
            }
        }

    }
});

export const {
    addToCart, removeFromCart, increaseQty, decreaseQty
}=cartSlice.actions;

export default cartSlice.reducer;
