import axios from 'axios'

export function businessDetailesSrvice(keyWord) {
    return new Promise((resolve, reject) => {
        axios
            .get(`/mainCategory/getAllBusinessByMainCategory/${keyWord}`)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.error(error);
                resolve()
            });

    })
}
export function businessDetailesSrvice2(keyWord) {
    return new Promise((resolve, reject) => {
        axios
            .get(`/business/getBusinessByKeyWord/${keyWord}`)
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.error(error);
                resolve()
            });

    })
}
export function loadMoreReccomandationService(businessId, numResults) {
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: "/recommendation/getRecommendationByBusiness",
            data: { businessId: businessId, numResults: numResults },
          })
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
                console.error(error);
                resolve()
            });

    })
}