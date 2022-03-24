import { produce } from 'immer'
import createReducer from '../ReducerUtils'

const initialState = {
    category: undefined,
    popularCategories: [],
    isMainCategoryExsist:{}

}
const mainCategoryFunctions = {
    setCategory(state, action) {
        state.category = action.payload
    },
    setPopular(state, action) {
        state.popularCategories = action.payload;
    },
    setIsMainCategoryExsist(state, action) {
        state.isMainCategoryExsist = action.payload;
    }
}
export default produce((state, action) => createReducer(state, action, mainCategoryFunctions), initialState);
