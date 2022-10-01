import http from "axios";

const actions = {
    async logIn(contex, payload) {
        http.post(`http://localhost:3001/user`,{
            name: payload.firstName,
            family: payload.lastName,
            email: payload.email
        })
        // contex.commit('SET_USER',payload)
    },

}
export default actions