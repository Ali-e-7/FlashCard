import http from "axios";

const actions = {
  getQuestions(_contex, payload) {
    return http.get(
      `http://localhost:3001/cards?_page=${payload.page}&_limit=${payload.end}`
    );
  },
  setAnswers(_context, payload) {
    return http.put(`http://localhost:3001/cards/${payload.id}`, {
      ...payload,
    });
  },
  totalGame(_context,payload) {
    return http.post(`http://localhost:3001/totalGame`,{
      ...payload
    })
  },
  getResult(_contex,payload) {
    return http.get('http://localhost:3001/totalGame')
  }
};
export default actions;
