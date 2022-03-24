
import axios from "axios";
import { actions } from '../Action'
import { GET_ALL_CATEGORIES } from '../constants/category'

export const getSubCategories = ({ dispatch, getState }) => next => action => {
    if (action.type === GET_ALL_CATEGORIES) {
        
        axios.get("/category/getAllCategories")
            .then((response) => {
                dispatch(actions.setSubCategories(response.data.categories))
            })
            .catch((error) => {
                console.error(error);
            });
    }
    return next(action);
}
// export const isCategoryExsist = ({ dispatch, getState }) => next => async action => {

//     if (action.type === EXSIST_CATEGORY) {
//         let nameCategory = action.payload;
//         
//         await axios({
//             method: "post",
//             url: "/category/isSubCategoryExsist",
//             data: { nameCategory },
//         }).then(function (response) {
//             
//             dispatch(actions.setIsCategoryExsist(response.data))
//         }).catch((err) => {
//             console.error(err);
//         });
//     }
//     return next(action);
// }
