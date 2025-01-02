import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api"; 

const token = localStorage.getItem("token"); 

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

export const CreateReorder = async (data) => {
  const response = await apiClient.post("/reorders/create/", data);
  return response.data;
};

export const fetchReorders = async () => {
  const response = await apiClient.get("/reorders/");
  return response.data;
  };


// Fetch Approved Products
export const fetchApprovedProducts = async () => {
  const response = await apiClient.get("/productsapproves/");
  return response.data;
};

// Update Product Status and Status Text
export const updateProductStatus = async (id, data) => {
  const response = await apiClient.put(`/productsstatus/${id}/`, data);
  return response.data;
};