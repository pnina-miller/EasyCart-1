import { createStore, applyMiddleware } from 'redux';
import reducer from './Index';
import { composeWithDevTools } from 'redux-devtools-extension';
import { getPopularCategories, getMainCategories,/*isMainCategoryExsist*/  } from './middleWares/MainCatgoryMiddleWare'
import { extractJwt, getUserByUserName, updateBusinessPerUser, deleteBussinessById, updateUserProfile,checkUserDetails ,saveOrder,getCart,getOrdersUserId} from './middleWares/UserMiddleWare'
import { sortedBusinessByPopularity, getPopularFilters, getFiltersNames, getResultofSearchByText,getServicesNames } from './middleWares/SearchMiddleWare'
import { getPlaceIdOfBusiness, getAllNearByPlacesBySearchText, getPlaceDetailsById,getPlacePhotosById,getAllPlacesByLocation } from './middleWares/PlacesMiddleWare'
import { getSubCategories,/*isCategoryExsist*/ } from './middleWares/CategoryMiddleWare'
import {createBusiness, getBusinessByKeyword, addUsersGaleryOfBusiness, checkKeyWordsOfBusinesses, getAllNamesOfBusinesses, getPromotedBusinesses,
    deleteFavoraitsByBussinessId, getAllFavoraits, addFavoraitsToBusiness, sendMail,sendSms,getBusinessRecommendations
    // ,addClickToBusiness
} from './middleWares/BusinessMiddleWare'
import {createBusinessStore, createProductsByStore,createProductCategory,getBusinessStore,getAllCategories,getOrdersByBusinessKeyWords,setOrderStatus} from './middleWares/BusinessStoreMiddleWare'
const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware
            (
                getBusinessRecommendations,
                saveOrder,
                getOrdersByBusinessKeyWords,
                getAllCategories,
                createBusinessStore,
                createProductsByStore,
                createProductCategory,
                getBusinessStore,
                getPopularCategories,
                getMainCategories,
                getUserByUserName,
                getOrdersUserId,
                updateBusinessPerUser,
                extractJwt,
                updateUserProfile,
                sortedBusinessByPopularity,
                getPopularFilters,
                getFiltersNames,
                getResultofSearchByText,
                createBusiness,
                getSubCategories,
                getBusinessByKeyword,
                getPlaceIdOfBusiness,
                getAllNearByPlacesBySearchText,
                addUsersGaleryOfBusiness,
                checkKeyWordsOfBusinesses,
                getAllNamesOfBusinesses,
                getPromotedBusinesses,
                deleteFavoraitsByBussinessId,
                getAllFavoraits,
                addFavoraitsToBusiness,
                // addClickToBusiness,
                sendMail,
                sendSms,
                getPlaceDetailsById,
                deleteBussinessById,
                checkUserDetails,
                getServicesNames,
                getPlacePhotosById,
                getCart,
                // getUserDetailsById,
                setOrderStatus,
                getAllPlacesByLocation,
                // isCategoryExsist,
                // isMainCategoryExsist
            )
    )
)
export default store;