import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchProducts = createAsyncThunk(
  'store/fetchProducts',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch('https://dummyjson.com/products');

      if (!response.ok) {
        throw new Error('server error')
      }
      const data = await response.json()

      return data.products;
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  products: [],
  cart: [],
  fetchStatus: null,
  fetchError: null,
  isContactInfoAvaliable: false,
  isShipmentInfoAvaliable: false,
  userContactInfo: {},
  userShipmentInfo: {}
}

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = state.products.find(({ id }) => id === action.payload.id)
      const existingProduct = state.cart.find(({ id }) => id === product.id)

      if (existingProduct) {
        existingProduct.quantity++;
        state.cart = [...state.cart, existingProduct]

      } else {
        const newProduct = { ...product, quantity: 1 }
        state.cart = [...state.cart, newProduct]
      }
    },
    deleteFromCart(state, action) {
      state.cart = state.cart.filter(({ id }) => id != action.payload.id)
    },
    clearAllCart(state) {
      state.cart = []
    },
    decreaseProductQuantity(state, action) {
      const product = state.cart.find(({ id }) => id === action.payload.id)
      product.quantity--;
      const index = state.cart.findLastIndex(({ id }) => id === action.payload.id)
      state.cart.splice(index, 1)
    },
    setContactInfo(state) {
      state.isContactInfoAvaliable = true;
    },
    setShipmentInfo(state) {
      state.isShipmentInfoAvaliable = true;
    },
    setUserContactInfo(state, action) {
      state.userContactInfo = action.payload
    },
    setUserShipmentInfo(state, action) {
      state.userShipmentInfo = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.fetchStatus = 'loading';
      state.fetchError = null;
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.fetchStatus = 'resolved';
      state.fetchError = null;
      state.products = action.payload;
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.fetchError = 'rejected';
      state.fetchError = action.payload;
    })
  }
})

export const { addToCart, decreaseProductQuantity, deleteFromCart, clearAllCart,setContactInfo, setShipmentInfo, setUserContactInfo, setUserShipmentInfo } = storeSlice.actions

export default storeSlice.reducer;