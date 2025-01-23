import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

//server always check the auth token from the header, so we have to do some
//interception after calling the axios api

export {api};


