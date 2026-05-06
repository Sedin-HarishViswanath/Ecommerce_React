import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import {generateStock} from '../../utils/stockHelper';

export const fetchProducts=createAsyncThunk(
    "products/fetchProducts",
    async()=>{
        const response=await fetch('https://fakestoreapi.com/products');
        const data=await response.json();

        return data.map((item)=>({
            ...item,
            stock:generateStock()
        }))
    }
)

const productSlice=createSlice({
    name:'products',
    initialState:{
        items:[],
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProducts.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchProducts.fulfilled,(state,action)=>{
            state.loading=false;
            state.items=action.payload;
        })
        .addCase(fetchProducts.rejected,(state)=>{
            state.loading=false;
            state.error='Failed to fetch products';
        })
    }
})

export default productSlice.reducer;
