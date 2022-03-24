import { produce } from 'immer'
import createReducer from '../ReducerUtils'

const initialState = {
    category: {},
    selectedCategoryId: "",
    flagOpen: false,
    popularCategories: [],
    subCategories: [],
    isCategoryExsist:{}

}

const categoryFunctions = {
    SetSelectedCategoryId(state, action) {
        state.selectedCategoryId = action.payload;
    },
    SetFalgOpen(state, action) {
        state.flagOpen = action.payload
    },
    setSubCategories(state, action) {
        state.subCategories = action.payload
    },
    setIsCategoryExsist(state, action) {
        state.isCategoryExsist = action.payload
    },
}
export default produce((state, action) => createReducer(state, action, categoryFunctions), initialState);
