import axios from 'axios'

export default function getBusinessByMainCategoryService() {
    return new Promise((resolve, reject) => {

        axios
            .get(`/mainCategory/getAllBusinessByMainCategory`)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.error(error);
                reject(error)
            });
    })
}