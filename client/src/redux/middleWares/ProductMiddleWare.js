import axios from "axios";
import { actions } from '../Action'
import {
    CREATE_NEW_PRODUCT
} from '../constants/product'
export const createProduct = ({ dispatch, getState }) => next => action => {
    
    if (action.type === CREATE_NEW_PRODUCT) {
        let newProduct = action.payload
        // let citiesForAdvertising = action.payload.citiesToAdvertise
        ///////////////
        axios({
            method: 'post',
            url: '/product/createProduct',
            data: {
                newProduct
            }
        }).then(function (response) {
        }).catch(err => {
            console.error(err)
        });
    }
    return next(action);
}