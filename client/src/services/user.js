import axios from 'axios'
export const getUserByUserName=(userName)=>{
    return new Promise((resolve,reject)=>{
        axios.get(`/user/getDetailsByUserName/${userName}`)
        .then(response => {
            resolve(response.data.user)
        })
        .catch(error => {
            reject(error);
        })
    })
}