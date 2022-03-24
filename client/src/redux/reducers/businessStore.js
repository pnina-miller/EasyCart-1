import { produce } from 'immer'
import createReducer from '../ReducerUtils'

const initialState = {
    store: {},
    allCategories: [],
    orders: [],
    storeId: ""
}

const businessStoreFunctions = {
    // createBusinessStore(state, action) {
    //     if (action.payload)
    //         alert('created store successfully')
    // },
    createProductCategoriesByStore(state, action) {
        if (action.payload)
            alert('created products category successfully')
    },
    createProductsByStore(state, action) {
        if (action.payload){
            state.store.product = state.store.product?.concat(action.payload);
        alert('add products successfully')
        }
    },
    addProduct(state, action) {
        
        if (action.payload)
            state.store.product = state.store.product?.concat(action.payload);
        alert('add products successfully')
    },
    setBusinessStore(state, action) {
        if (action.payload !== undefined) {
            state.store = action.payload;
            // state.orders = action.payload.orders;
        }
        else {
            state.store = "";
            state.orders = ""
        }
    },
    setStoreId(state, action) {
        if (action.payload !== undefined) {
            state.storeId = action.payload;
        }
    },
    setProductCategories(state, action) {
        if (action.payload === undefined) {
            state.allCategories = []
        }
        else {
            state.allCategories = action.payload;
        }
    },
    setOrders(state, action) {
        if (action.payload !== undefined) {
            state.orders = action.payload;
        }
    },
    deleteProduct(state, action) {
        if (action.payload !== undefined) {
            
            state.store.product = action.payload;
        }
    }
    ,
    updateProduct(state, action) {
        let arr = state.store.product
        let index = 0
        if (action.payload !== undefined) {
            state.store.product.forEach((element, i) => {
                if (element._id === action.payload._id)
                    index = i
            });
            arr[index] = action.payload
        }
    }
}
export default produce((state, action) => createReducer(state, action, businessStoreFunctions), initialState);
