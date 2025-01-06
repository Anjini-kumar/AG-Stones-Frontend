import axios from "axios";

const API_BASE_URL = "https://crm.agstones.com/api";
// const API_BASE_URL = "http://127.0.0.1:8000/api";

// Create an axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export default API_BASE_URL;

export const RECAPTCHA_SITE_KEY = "6LcAMK0qAAAAAGQiBFgjo3eMrVIU5R34llbmPYI4"; 



// Function to check the token and redirect if not found or expired
const checkTokenAndRedirect = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    // Redirect to login page if token is not found
    window.location.href = "/";
    return null;
  }
  return token;
};

// Set the Authorization header if the token is valid
apiClient.interceptors.request.use((config) => {
  const token = checkTokenAndRedirect();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


//messages
// Fetch Requests
export const fetchRequests = async () => {
  try {
    const response = await apiClient.get("/requests/");
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error);
  }
};

// Create Request
export const createRequest = async (data) => {
  try {
    const response = await apiClient.post("/requests/create/", data);
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error);
  }
};

// Create Reply
export const createReply = async (data) => {
  try {
    const response = await apiClient.post("/replies/create/", data);
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error);
  }
};

//reorders
// Create Reorder
export const CreateReorder = async (data) => {
  try {
    const response = await apiClient.post("/reorders/create/", data);
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error);
  }
};

// Fetch Reorders
export const fetchReorders = async () => {
  try {
    const response = await apiClient.get("/reorders/");
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error);
  }
};

//confirmed orders
// Fetch Approved Products
export const fetchApprovedProducts = async () => {
  try {
    const response = await apiClient.get("/productsapproves/");
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error);
  }
};

// Update Product Status and Status Text
export const updateProductStatus = async (id, data) => {
  try {
    const response = await apiClient.put(`/productsstatus/${id}/`, data);
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error);
  }
};


//user management
// Fetch Users
export const fetchUsers = async () => {
  const token = checkTokenAndRedirect(); // Check token before fetching
  if (!token) return; // Return if the token is invalid or missing

  try {
    const response = await apiClient.get("/users/");
    return response.data;
  } catch (error) {
    handleUnauthorizedError(error);
  }
};

// Centralized API function to create a user
export const createUser = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await apiClient.post('/create-user/', userData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data; // Return the created user data
  } catch (error) {
    handleUnauthorizedError(error); // Handle unauthorized errors, if any
    throw error; // Re-throw the error for handling in the main function
  }
};


// Delete User
export const deleteUser = async (userId) => {
  try {
    const response = await apiClient.delete(`/users1/${userId}/`);
    if (response.status === 204) {
      return true; // Indicate successful deletion
    }
  } catch (error) {
    handleUnauthorizedError(error);
    throw error; // Re-throw error for further handling in the main code
  }
};


// Update User
export const updateUser = async (updatedUser) => {
  try {
    const response = await apiClient.patch(`/users/${updatedUser.id}/`, updatedUser);
    return response.data; // Return the updated user data
  } catch (error) {
    handleUnauthorizedError(error);
    throw error; // Re-throw the error for handling in the main code
  }
};

//warehouse
// Fetch Products
export const fetchProducts = async () => {
  try {
    const response = await apiClient.get("/products/");
    return response.data; // Return the fetched products data
  } catch (error) {
    handleUnauthorizedError(error); // Handle token expiration or unauthorized access
    throw error; // Re-throw the error for handling in the main code
  }
};


// Fetch Product Images
export const loadProductImages = async (productId) => {
  try {
    const response = await apiClient.get(`/products/${productId}/images/`);
    return response.data; // Return fetched images
  } catch (error) {
    handleUnauthorizedError(error); // Handle token expiration or unauthorized access
    throw error; // Re-throw the error for handling in the main code
  }
};

// Update product comment
export const updateProductComment = async (productId, comment) => {
  try {
    const response = await apiClient.patch(`/product/${productId}/comment/`, { comment });
    return response.data; // Return updated product data
  } catch (error) {
    handleUnauthorizedError(error); // Handle token expiration or unauthorized access
    throw error; // Re-throw the error for handling in the main code
  }
};


// Upload product images
export const addProductImages = async (productId, files) => {
  try {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('images', file); // Append each file to the form data
    });

    const response = await apiClient.post(`/product/${productId}/add-images/`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data; // Return response data
  } catch (error) {
    handleUnauthorizedError(error); // Handle token expiration or unauthorized access
    throw error; // Re-throw the error for handling in the main code
  }
};


// Update product action
export const updateProductAction = async (productId, action) => {
  try {
    const response = await apiClient.patch(`/products/${productId}/action/`, { action });
    return response.data; // Return the updated product data
  } catch (error) {
    handleUnauthorizedError(error); // Handle token expiration or unauthorized access
    throw error; // Re-throw the error for handling in the main code
  }
};


//product management
// Centralized API function to fetch products
export const fetchProductsData = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      // If token is not found, redirect to login page
      window.location.href = '/';
      return null; // Return null if no token is found
    }

    const response = await apiClient.get('/product/', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 401) {
      // If token is expired or invalid, redirect to login page
      window.location.href = '/';
      return null; // Return null if token is invalid
    }

    return response.data; // Return fetched product data
  } catch (error) {
    handleUnauthorizedError(error); // Handle unauthorized errors if any
    throw error; // Re-throw the error for handling in the main function
  }
};



 export const addProductData = async (formData, token) => {
  try {
    // Make the POST request with FormData
    const response = await apiClient.post('/product/create/', formData,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    throw error; // Throw the error to be handled in the main function
  }
};



// Handle Unauthorized Error (Expired or Invalid Token)
const handleUnauthorizedError = (error) => {
  if (error.response && error.response.status === 401) {
    // Redirect to login page if token is expired or invalid
    window.location.href = "/";
  } else {
    console.error("Error:", error);
  }
};
