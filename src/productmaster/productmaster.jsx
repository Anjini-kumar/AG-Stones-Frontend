// import React, { useState } from 'react';
// import './ProductMaster.css';

// const ProductMaster = () => {
//     const [products, setProducts] = useState([
//         { id: 1, type: 'Engineered', category: 'Quartz', subCategory: 'MultiColor' },
//         { id: 2, type: 'Natural', category: 'Granite', subCategory: 'Absolute Black' },
//         { id: 3, type: 'Natural', category: 'Granite', subCategory: 'Valle Nevado' },
//         { id: 4, type: 'Natural', category: 'Onyx', subCategory: 'Rosa Onyx' },
//         { id: 5, type: 'Natural', category: 'Dolomite', subCategory: 'Matarazzo' },
//         { id: 6, type: 'Engineered', category: 'Quartz', subCategory: 'Quartz1212' },
//     ]);

//     const [newProduct, setNewProduct] = useState({ type: '', category: '', subCategory: '' });

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewProduct({ ...newProduct, [name]: value });
//     };

//     const addProduct = () => {
//         if (newProduct.type && newProduct.category && newProduct.subCategory) {
//             setProducts([...products, { ...newProduct, id: Date.now() }]);
//             setNewProduct({ type: '', category: '', subCategory: '' });
//         }
//     };

//     const deleteProduct = (id) => {
//         setProducts(products.filter(product => product.id !== id));
//     };

//     return (
//         <div className="product-master-container">
//             <h3 className="product-master-title">ProductMaster</h3>
//             <div className="product-inputs">
//                 <select
//                     name="type"
//                     value={newProduct.type}
//                     onChange={handleInputChange}
//                     className="product-input"
//                 >
//                     <option value="">Select Product Type</option>
//                     <option value="Natural">Natural</option>
//                     <option value="Engineered">Engineered</option>
//                 </select>
//                 <input
//                     type="text"
//                     name="category"
//                     placeholder="Enter Category"
//                     value={newProduct.category}
//                     onChange={handleInputChange}
//                     className="product-input"
//                 />
//                 <input
//                     type="text"
//                     name="subCategory"
//                     placeholder="Enter Color/Design"
//                     value={newProduct.subCategory}
//                     onChange={handleInputChange}
//                     className="product-input"
//                 />
//                 <button onClick={addProduct} className="add-category-button">Add Category</button>
//             </div>
//             <table className="product-table">
//                 <thead>
//                     <tr>
//                         <th>Product Name</th>
//                         <th>Category</th>
//                         <th>Sub Category</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map((product) => (
//                         <tr key={product.id}>
//                             <td>{product.type}</td>
//                             <td>{product.category}</td>
//                             <td>{product.subCategory}</td>
//                             <td>
//                                 <button onClick={() => deleteProduct(product.id)} className="delete-button">Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
import React, { useState, useEffect } from 'react';
import './productmaster.css';

const ProductMaster = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: '', product_category: '', color_design: '' });
    const [message, setMessage] = useState('');

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
            setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
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
            <h3 className="product-master-title">Product Master</h3>
            {message && <p className="message">{message}</p>}
            <div className="product-inputs">
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
            </div>
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
                                <button onClick={() => deleteProduct(product.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductMaster;
