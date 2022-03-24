
import axios from "axios";
import { actions } from '../Action'
import { SET_POPULAR_CATEGORIES, GET_MAIN_CATEGORIES } from '../constants/mainCategory'

export const getMainCategories = ({ dispatch, getState }) => next => action => {

    if (action.type === GET_MAIN_CATEGORIES) {
        axios.get("/mainCategory/getAllMainCategories")
            .then((response) => {
                dispatch(actions.setCategory(response.data.mainCategory))
            })
            .catch((error) => {
                console.error(error);
            });
    }
    return next(action);
}

// export const isMainCategoryExsist = ({ dispatch, getState }) => next => async action => {

//     if (action.type === EXSIST_MAIN_CATEGORY) {
//         
//         let nameCategory = action.payload;
//         await axios({
//             method: "post",
//             url: "/mainCategory/isMainCategoryExsist",
//             data: { nameCategory },
//         }).then(function (response) {
//             
//             dispatch(actions.setIsMainCategoryExsist(response.data))
//         }).catch((err) => {
//             console.error(err);
//         });
//     }
//     return next(action);
// }

export const getPopularCategories = ({ dispatch, getState }) => next => action => {

    if (action.type === SET_POPULAR_CATEGORIES) {
        axios.get("/mainCategory/getPopularCategories")
            .then((response) => {
                dispatch(actions.setPopular(response.data))
            }).catch((error) => {
                console.error(error);
            })
    }
    return next(action);
}