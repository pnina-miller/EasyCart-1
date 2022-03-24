import { produce } from 'immer'
import createReducer from '../ReducerUtils'
const initialState = {
    currentUserDetails: undefined,
    UserOfBusiness: {},
    checkUser: "",
    cart: [],
    orders:null
    //[{_id:10,quantity:10,name:"lorem ipsum",price:299,image:"data:image/webp;base64,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"}]
}
const userFunctions = {
    setCurrentUserDetails(state, action) {
        
        state.currentUserDetails = action.payload
    },
    setOwnerBusinessDetails(state, action) {
        state.UserOfBusiness = action.payload
    },
    setCheckUser(state, action) {
        state.checkUser = action.payload
    },
    
    deleteBussinessById(state, action) {
        const user = action.payload
        let currentUser = { ...state.currentUserDetails }
        let business = []
        currentUser.business.forEach((item) => {
            if (item._id !== user) {
                business.push(item)
            }
        });
        currentUser.business = business;
        state.currentUserDetails = currentUser
    },

    setStoreIdToUserBusiness(state, action) {
        const business = action.payload
        let currentUser = { ...state.currentUserDetails }
        currentUser.business.forEach((item) => {
            if (item._id === business._id) {
              item.storeId=business.storeId
            }
        });
        state.currentUserDetails = currentUser
    },
    setUserBusiness(state, action) {
        const business = action.payload
        let currentUser = { ...state.currentUserDetails }
        let businesses = currentUser.business
        businesses.push(business);
        currentUser.business = businesses;
        state.currentUserDetails = currentUser
    },
    
    setUpdateUserProfile(state, action) {
        
        state.currentUserDetails = action.payload
    },
    setFavoritesUser(state, action) {
        state.currentUserDetails.favorites.push(action.payload._id);
    },
    //////try
    setDeleteFavoritsUser(state, action) {
        const business = action.payload
        let currentUser = { ...state.currentUserDetails }
        let favoritesArr = []
        state.currentUserDetails.favorites.forEach((item) => {
            if (item !== business._id) {
                favoritesArr.push(item)
            }
        });
        currentUser.favorites = favoritesArr;
        state.currentUserDetails = currentUser
    },

    setUpdateBussinesUser(state, action) {
        let currentUser = { ...state.currentUserDetails }
        let business = []
        const business1 = action.payload
        currentUser.business.forEach((item) => {
            if (item._id === business1._id) {
                business.push(business1)
            }
            else {
                business.push(item)
            }
        });
        currentUser.business = business;
        state.currentUserDetails = currentUser
    },
    setCart(state, action) {
        state.cart = action.payload;
    },
    setUserOrders(state, action) {
        state.orders = action.payload;
    },
    addProductToCart(state, action) {
        let flag = false;
        const { businessId, productToOrder } = action.payload
        state.cart?.forEach((item) => {
            if (item.businessId === businessId) {
                item.products?.forEach((element) => {
                    if (element.productId._id === productToOrder.productId._id) {
                        element.count += productToOrder.count
                        flag = true;
                    }
                })
                if (!flag) {
                    item.products.push(productToOrder)
                    flag = true
                }
            }
        })
        if (!flag) {
            state.cart.push({ businessId: businessId, products: [productToOrder], status: 0 })
        }
        flag = false;
    },
}
export default produce((state, action) => createReducer(state, action, userFunctions), initialState);


