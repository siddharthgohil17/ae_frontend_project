import axios from 'axios';

//http://localhost:8080

const BASE_URL_HOSTED = "https://ae-docker-backend-service.onrender.com";


const GET_EVENT_LIST_URL = `${BASE_URL_HOSTED}/get_all_events`;
const ADD_EVENT_URL = `${BASE_URL_HOSTED}/createEvent`;
const ADD_USER_URL = `${BASE_URL_HOSTED}/add-new-user.php`;
const GET_USER_LIST_URL = `${BASE_URL_HOSTED}/list-all-users.php`;
const GET_ALL_CATEGORY = `${BASE_URL_HOSTED}/collect_all_category`;
const GET_ALL_CITY = `${BASE_URL_HOSTED}/collect_all_city`;
const GET_EVENT_BY_CATEGORY = `${BASE_URL_HOSTED}/category`;
const GET_EVENT_BY_CITY =`${BASE_URL_HOSTED}/location`;

class eventService {
  
  static saveEvent(event) {
    return axios.post(ADD_EVENT_URL, event);
  }

  static getEventList(pageNum) {
  
    return axios.get(`${GET_EVENT_LIST_URL}`+`?pageNo=${pageNum}`);
  }

  static getAllCity() {
    return axios.get(GET_ALL_CITY);
  }

  static getAllCategory() {
    return axios.get(GET_ALL_CATEGORY);
  }

  static getEventByCategory(category) {
    return axios.get(`${GET_EVENT_BY_CATEGORY}`+`/${category}`)
  }
  static getEventByLocation(city) {
    return axios.get(`${GET_EVENT_BY_CITY}`+`?city=${city}`)
  }

  static saveUser(user) {
    return axios.post(ADD_USER_URL, user);
  }

  static getUserList() {
    return axios.get(GET_USER_LIST_URL);
  }
}

export default eventService;
