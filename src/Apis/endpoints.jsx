import { HttpStatusCode } from "axios"

export const BASE_URL = "http://127.0.0.1:8000";



export const endpoints = {
   INDEX: "/index_view/",
   SIGNIN:  "/api/login/",
   SIGNUP: "/api/register/",

}


import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; // Replace with your backend URL

const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const fetchRequests = async () => {
  const response = await apiClient.get("/requests/");
  return response.data;
};

export const createRequest = async (data) => {
  const response = await apiClient.post("/requests/create/", data);
  return response.data;
};

export const createReply = async (data) => {
  const response = await apiClient.post("/replies/create/", data);
  return response.data;
};
