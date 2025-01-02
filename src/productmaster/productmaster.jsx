import React, { useState, useEffect } from 'react';
import './productmaster.css';

const ProductMaster = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', product_category: '', color_design: '' });
    const [message, setMessage] = useState('');
    const user = localStorage.getItem('user')
    const userType = localStorage.getItem('user_type')

    // Fetch products from the backend
    const fetchProducts = async () => {
        const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
        if (!token) { 
            // If token is not found, 
            // redirect to login page 
            window.location.href = '/';
            return; 
        }
        const response = await fetch('http://localhost:8000/api/product-master/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
            },
        });
        if (response.status === 401) { 
            // If token is expired or invalid, redirect to login page 
            window.location.href = '/'; 
          return;
          }
        const data = await response.json();
        setProducts(data);
    };
    

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const addProduct = async () => {
        const token = localStorage.getItem('token'); // Get the token
        // Ensure all fields are filled before making the request
        if (newProduct.name && newProduct.product_category && newProduct.color_design) {
            const response = await fetch('http://localhost:8000/api/product-master/create/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Add the token to the Authorization header
                },
                body: JSON.stringify(newProduct),
            });
    
            if (response.ok) {
                setMessage('Product added successfully!');
                fetchProducts(); // Refresh product list
                setNewProduct({ name: '', product_category: '', color_design: '' }); // Clear input fields
            } else {
                setMessage('Failed to add product');
            }
            setTimeout(() => setMessage(''), 1000); // Clear message after 3 seconds
        } else {
            setMessage('Please fill in all fields');
        }
    };
    

    const deleteProduct = async (id) => {
        const token = localStorage.getItem('token'); 
        if (window.confirm('Are you sure you want to delete this product?')) {
            const response = await fetch(`http://localhost:8000/api/product-master/delete/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                },
            });
    
            if (response.ok) {
                setMessage('Product deleted successfully!');
                fetchProducts(); 
            } else {
                setMessage('Failed to delete product');
            }
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
        }
    };
    return (
        <div className="product-master-container">
            <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "1.5rem" }}>
                Welcome to the Product Master <span style={{color:"#ffd200"}}>{user}</span> !!
            </h1>  
            {userType === 'Procurement' &&      
            <div className="product-inputs">
           {message && <p className="message" style={{
            color:"green",
            maxHeight:"20px",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"
           }}>{message}</p>}
            <select
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="product-input"
                >
                    <option value="">Select Product Category</option>
                    <option value="Natural">Natural</option>
                    <option value="Engineered">Engineered</option>
                </select>
                <input
                    type="text"
                    name="product_category"
                    placeholder="Enter Product Name"
                    value={newProduct.product_category}
                    onChange={handleInputChange}
                    className="product-input"
                />
               
                <input
                    type="text"
                    name="color_design"
                    placeholder="Enter Color/Design"
                    value={newProduct.color_design}
                    onChange={handleInputChange}
                    className="product-input"
                />
                <button onClick={addProduct} className="add-category-button">Add Product</button>
            </div>}
            <div className="productmaster-list-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Color/Design</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.product_category}</td>
                                <td>{product.color_design}</td>
                                <td>
                                    <button onClick={() => deleteProduct(product.id)} className="delete-button"
                                        style={{
                                            backgroundColor: '#ffd200',
                                            color: '#000',
                                        }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductMaster;
