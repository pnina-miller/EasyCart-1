import axios from 'axios'


export function getOrdersByBusinessKeyWords(keyWord) {
    return new Promise((resolve, reject) => {
        axios
            .get(`/order/byBusinessKeyWord/${keyWord}`)
            .then((response) => {
                resolve(response.data.orders)
            })
            .catch((error) => {
                console.error(error);
                reject([])
            });

    })
}
export function getOrdersByUserId(userId) {
    return new Promise((resolve, reject) => {
        axios
            .get(`/order/byUserId/${userId}`)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.error(error);
                reject([])
            });

    })
}