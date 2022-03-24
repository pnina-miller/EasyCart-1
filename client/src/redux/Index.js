
import { combineReducers } from 'redux';
import category from './reducers/category';
import business from './reducers/business'
import location from './reducers/location'
import places from './reducers/places'
import user from './reducers/user'
import search from './reducers/search'
import mainCategories from './reducers/mainCategory'
import businessStore from './reducers/businessStore'
export default combineReducers({
    category,
    business,
    location,
    places,
    user,
    search,
    mainCategories,
    businessStore
})