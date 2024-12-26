import React, { useState, useEffect } from 'react';
import './warehouse.css';
import axios from 'axios';
import CreateRequest from '../message/CreateRequest';
import RequestsList from '../message/RequestsList';


const Warehouse = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [warehouseFilter, setWarehouseFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [loadingImages, setLoadingImages] = useState(false);
    const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [newComment, setNewComment] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isActionPopupOpen, setIsActionPopupOpen] = useState(false);
    // const [selectedProduct, setSelectedProduct] = useState(null);
    const [newStatus, setNewStatus] = useState('');
    const [newAction, setNewAction] = useState('');
    const user = localStorage.getItem('user')
    const userType = localStorage.getItem('user_type'); // Assuming user_type is stored in localStorage


    const STATUS_CHOICES = [
      'Available',
      'Out of Stock',
      'Not Produced',
      'Awaiting Stock',
    ];
    const ACTION_CHOICES = [
        'Approved',
        'Rejected',
    ]

    // Fetch products from the backend
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Start loading
            try {
                const token = localStorage.getItem('token');
                if (!token) { 
                    // If token is not found, 
                    // redirect to login page 
                    window.location.href = '/';
                    return; 
                }
                const response = await fetch('http://localhost:8000/api/products/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.status === 401) { 
                    // If token is expired or invalid, redirect to login page 
                    window.location.href = '/'; 
                return;
                }

                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                setProducts(data);
                setError(null); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false); 
            }
        };

        fetchProducts();
    }, []);

    const fetchProductImages = async (productId) => {
        try {
            setLoadingImages(true);
            const response = await axios.get(`http://localhost:8000/api/products/${productId}/images/`);
            setSelectedImages(response.data);
            console.log(response.data,"dswd")
        } catch (error) {
            console.error('Error fetching images:', error);
            setSelectedImages([]);
        } finally {
            setLoadingImages(false);
        }
    };

    const [expandedImage, setExpandedImage] = useState(null);

    // Handle click to expand an image
    const handleImageClick = (image) => {
        setExpandedImage(image);
    };

    // Handle closing the expanded image
    const handleCloseExpandedImage = () => {
        setExpandedImage(null);
    };

    

    // const openImagePopup = (product) => {
    //     setSelectedProduct(product);
    //     setIsImagePopupOpen(true);
    //     setSelectedImages(product.images || []); 
    // };

    const openImagePopup = (product) => {
        setSelectedProduct(product);
        fetchProductImages(product.id);
        setIsImagePopupOpen(true);
    };
    
    
    const closeImagePopup = () => {
        setIsImagePopupOpen(false);
        setSelectedImages([]);
    };

    const openCommentPopup = (product) => {
        setSelectedProduct(product);
        setNewComment(product.comment || ''); 
        setIsCommentPopupOpen(true);
    };

    const closeCommentPopup = () => {
        setIsCommentPopupOpen(false);
        setSelectedProduct(null);
        setNewComment('');
    };

    const handleCommentSubmit = async () => {
        try {
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:8000/api/product/${selectedProduct.id}/comment/`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: newComment }),
            });

            if (!response.ok) {
                throw new Error('Failed to update comment');
            }

            const updatedProduct = await response.json();

            // Update the product list with the new comment
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.id === updatedProduct.id ? { ...product, comment: updatedProduct.comment } : product
                )
            );

            closeCommentPopup();
        } catch (err) {
            console.error('Error updating comment:', err);
        }
    };

    const handleAddImage = () => {
        const imageInput = document.createElement('input');
        imageInput.type = 'file';
        imageInput.accept = 'image/*';
        imageInput.multiple = true;

        imageInput.onchange = (event) => {
            const files = Array.from(event.target.files);
            const newImages = files.map(file => URL.createObjectURL(file));

            // Update the selected images
            setSelectedImages((prevImages) => [...prevImages, ...newImages]);

            // Optionally, upload the images to the server here
            uploadImages(files);
        };

        imageInput.click();
    };

    const uploadImages = async (files) => {
        if (!selectedProduct) return;

        const formData = new FormData();
        files.forEach((file) => {
            formData.append('images', file);
        });

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:8000/api/product/${selectedProduct.id}/add-images/`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload images');
            }

            const data = await response.json();
            console.log('Images uploaded successfully:', data);

            // Refresh the page
            window.location.reload(); // Refresh the current page
            
        } catch (err) {
            console.error('Error uploading images:', err);
        }
    };

    //Action
    const handleActionClick = (product) => {
        console.log("action clicked")    
        setSelectedProduct(product);
        setNewAction(product.action || 'N/A');
        setIsActionPopupOpen(true);
    }

    const handleActionChange = (action) => {
        setNewAction(action);
    };

    const handleSaveAction = async () => {
        try {
           const token = localStorage.getItem('token');

          await fetch(`http://localhost:8000/api/products/${selectedProduct.id}/action/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: newAction }),
          });
          console.log(`Updated status for ${selectedProduct.name}: ${newAction}`);
          setIsActionPopupOpen(false);
          window.location.reload();
        } catch (error) {
          console.error('Failed to update Action', error);
        }
      };
      
      const handleActionClosePopup = () => {
        setIsActionPopupOpen(false);
      };


    //status 
    const handleStatusClick = (product) => {
        setSelectedProduct(product);
        setNewStatus(product.status || 'N/A');
        setIsPopupOpen(true);
      };
    


      const handleChangeStatus = (status) => {
        setNewStatus(status);
      };
    

    const handleSaveStatus = async () => {
        try {
           const token = localStorage.getItem('token');

          await fetch(`http://localhost:8000/api/products/${selectedProduct.id}/status/`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: newStatus }),
          });
          console.log(`Updated status for ${selectedProduct.name}: ${newStatus}`);
          setIsPopupOpen(false);
          window.location.reload();
        } catch (error) {
          console.error('Failed to update status', error);
        }
      };
      
      const handleStatusClosePopup = () => {
        setIsPopupOpen(false);
      };

    const filteredProducts = products.filter((product) => {
        const productName = product.product_type?.toLowerCase() || '';
        const productCategory = product.category?.toLowerCase() || '';

        const matchesSearchQuery = productName.includes(searchQuery.toLowerCase());
        const matchesWarehouseFilter = productCategory.includes(warehouseFilter.toLowerCase());

        return matchesSearchQuery && matchesWarehouseFilter;
    });

    return (
        <div className="warehouse-container">
            <h3 className="warehouse-title">Welcome {user} to the Warehouse!</h3>
            <div className="search-filters">
                <input
                    type="text"
                    placeholder="Search by Product Name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
                <input
                    type="text"
                    placeholder="Search by Product Category..."
                    value={warehouseFilter}
                    onChange={(e) => setWarehouseFilter(e.target.value)}
                    className="search-input"
                />
            </div>
            <div className="table-container">
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : filteredProducts.length > 0 ? (
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Product<br />Type</th>
                                <th>Product<br />Category</th>
                                <th>Color/<br />Design</th>
                                <th>Block<br />No.</th>
                                <th>No. of Bundles</th>
                                <th>UOM</th>
                                <th>Thick</th>
                                <th>Dmsn<br />(In/cm)</th>
                                <th>Length</th>
                                <th>Width</th>
                                <th>QTY<br />(SFT)</th>
                                <th>Note</th>
                                <th>Offer </th>
                                {/* <th>Offer End Time</th> */}
                                <th>Price/<br />Sft</th>
                                <th>Img</th>
                                <th>Status</th>
                                <th>Action</th>
                                <th>Cmnt</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProducts.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.product_type|| 'N/A'}</td>
                                    <td>{product.category || 'N/A'}</td>
                                    <td>{product.color_design || 'N/A'}</td>
                                    <td>{product.block_no || 'N/A'}</td>
                                    <td>{product.bundles || 'N/A'}</td>
                                    <td>{product.uom || 'N/A'}</td>
                                    <td>{product.thickness || 'N/A'}</td>
                                    <td>inches</td>
                                    <td>{product.length || 'N/A'}</td>
                                    <td>{product.width || 'N/A'}</td>
                                    <td>{product.quantity || 'N/A'}</td>
                                    <td>{product.note || 'N/A'}</td>
                                    <td>{product.offer_start || 'N/A'}</td>
                                    {/* <td>{product.offer_end || 'N/A'}</td> */}
                                    <td>{product.price || 'N/A'}</td>
                                    <td>
                                        <button
                                            className="gallery-button"
                                            onClick={() => openImagePopup(product)}
                                        >
                                            🖼️
                                        </button>
                                    </td>
                                    <td>
                                    <button
                                        className="status-button"
                                        onClick={() => handleStatusClick(product)}
                                        >
                                        {product.status || 'N/A'}
                                    </button>
                                    </td>
                                    <td>
                                    <button
                                        className="action-button"
                                        style={{
                                            backgroundColor: 
                                                product.action === "Approved" ? "green" : 
                                                product.action === "Rejected" ? "red" : 
                                                "orange"
                                        }}
                                        onClick={() => handleActionClick(product)}>
                                        {product.action || 'N/A'}
                                    </button>
                                    </td>
                                    <td>
                                        <button
                                            className="comment-button"
                                            onClick={() => openCommentPopup(product)}
                                        >
                                            💬
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No products found.</p>
                )}
            </div>
            {/* <div className="Request-container">
                {userType === 'Warehouse' && <CreateRequest />} 
                <hr />
                <RequestsList />
            </div> */}

            {/* Image Popup */}
            {isImagePopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button onClick={closeImagePopup} className="close-popup">✖</button>
                        <h3>Images</h3>
                        <div>
                            <div className="image-gallery">
                                {selectedImages.length > 0 ? (
                                    selectedImages.map((image, index) => (
                                        <img
                                            key={index}
                                            src={image.image} 
                                            alt={`Image ${index}`}
                                            className="popup-image"
                                            onClick={() => handleImageClick(image.image)}
                                        />
                                    ))
                                ) : (
                                    <p>No images available</p>
                                )}
                          </div>
                        
                            {/* Expanded image modal */}
                            {expandedImage && (
                                <div className="modal">
                                    <div className="modal-image-content">
                                        <span className="close" onClick={handleCloseExpandedImage}>
                                            &times;
                                        </span>
                                        <img src={expandedImage} alt="Expanded view" className="expanded-image" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Add Image Button */}
                        <button onClick={handleAddImage} className="add-image-button">
                            Add Image
                        </button>
                    </div>
                </div>
            )}

            {isPopupOpen && (
                    <div className="popup">
                    <div className="popup-content">
                        <h3>Change Status</h3>
                        <p>Current status: {selectedProduct.status || 'N/A'}</p>
                        <ul>
                        {STATUS_CHOICES.map((status) => (
                            <li key={status}>
                            <button
                                className={`status-option ${
                                status === newStatus ? 'selected' : ''
                                }`}
                                onClick={() => handleChangeStatus(status)}
                            >
                                {status}
                            </button>
                            </li>
                        ))}
                        </ul>
                        <button onClick={handleSaveStatus}>Save</button>
                        <button onClick={handleStatusClosePopup}>Cancel</button>
                    </div>
                    </div>
                )}
            {/* Action */}

            {isActionPopupOpen && (
                    <div className="popup">
                    <div className="popup-content">
                        <h3>Change Action</h3>
                        <p>Current action: {selectedProduct.action || 'N/A'}</p>
                        <ul>
                        {ACTION_CHOICES.map((action) => (
                            <li key={action}>
                            <button
                                className={`status-option ${
                                action === newAction ? 'selected' : ''
                                }`}
                                onClick={() => handleActionChange(action)}
                            >
                                {action}
                            </button>
                            </li>
                        ))}
                        </ul>
                        <button onClick={handleSaveAction}>Save</button>
                        <button onClick={handleActionClosePopup}>Cancel</button>
                    </div>
                    </div>
                )}

            {/* Comment Popup */}
            {isCommentPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-popup" onClick={closeCommentPopup}>
                            ✖
                        </button>
                        <h3>Add Comment for Product ID: {selectedProduct?.id}</h3>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows="5"
                            className="comment-textarea"
                        ></textarea>
                        <button className="submit-comment-button" onClick={handleCommentSubmit}>
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Warehouse;
