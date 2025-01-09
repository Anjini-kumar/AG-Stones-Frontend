import React, { useState, useEffect } from 'react';
import './warehouse.css';
import axios from 'axios';
import { fetchProducts ,loadProductImages,updateProductComment ,addProductImages,updateProductAction} from "./../Apis/endpoints";




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
    console.log(userType,"ytgjhb")


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
        const loadProducts = async () => {
          setLoading(true); // Start loading
          try {
            const data = await fetchProducts(); // Call the centralized fetchProducts function
            setProducts(data || []); // Set fetched data
            setError(null); // Clear any previous errors
          } catch (err) {
            setError(err.message); // Handle errors
          } finally {
            setLoading(false); // End loading
          }
        };

        loadProducts(); // Call the function to load products
    }, []);

    const fetchProductImages = async (productId) => {
        setLoadingImages(true); // Start loading
        try {
          const images = await loadProductImages(productId); // Call the centralized API function
          setSelectedImages(images || []); // Set fetched images
          setError(null); // Clear previous errors
          console.log(images, "Fetched images");
        } catch (err) {
          console.error("Error fetching images:", err);
          setSelectedImages([]); // Clear images if there’s an error
          setError(err.message); // Set error for display
        } finally {
          setLoadingImages(false); // End loading
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
          const updatedProduct = await updateProductComment(selectedProduct.id, newComment); // Use the centralized API function
      
          // Update the product list with the new comment
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === updatedProduct.id ? { ...product, comment: updatedProduct.comment } : product
            )
          );
      
          closeCommentPopup(); // Close the comment popup
        } catch (err) {
          console.error('Error updating comment:', err);
        }
      };
      

    // const handleAddImage = () => {
    //     const imageInput = document.createElement('input');
    //     imageInput.type = 'file';
    //     imageInput.accept = 'image/*';
    //     imageInput.multiple = true;

    //     imageInput.onchange = (event) => {
    //         const files = Array.from(event.target.files);
    //         const newImages = files.map(file => URL.createObjectURL(file));

    //         // Update the selected images
    //         setSelectedImages((prevImages) => [...prevImages, ...newImages]);

    //         // Optionally, upload the images to the server here
    //         uploadImages(files);
    //     };

    //     imageInput.click();
    // };

   
    // // Upload product images
    // const uploadImages = async (files) => {
    //     if (!selectedProduct) return;
      
    //     try {
    //       const data = await addProductImages(selectedProduct.id, files); // Use the centralized API function
      
    //       console.log('Images uploaded successfully:', data);
      
    //       // Refresh the page
    //       window.location.reload(); // Refresh the current page
    //     } catch (err) {
    //       console.error('Error uploading images:', err);
    //     }
    //   };
      
      

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
        if (!selectedProduct) return;
      
        try {
          await updateProductAction(selectedProduct.id, newAction); // Use the centralized API function
          console.log(`Updated status for ${selectedProduct.name}: ${newAction}`);
          setIsActionPopupOpen(false); // Close the action popup
          window.location.reload(); // Refresh the page
        } catch (error) {
          console.error('Failed to update Action:', error);
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

          await fetch(`https://crm.agstones.com/api/products/${selectedProduct.id}/status/`, {
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
            <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "1.5rem" }}>
                Welcome to the Offers <span style={{color:"#ffd200"}}>{user}</span> !!
            </h1>  
            <div className="header">
                <input
                    type="text"
                    placeholder="Search by Product Category..."
                    value={warehouseFilter}
                    onChange={(e) => setWarehouseFilter(e.target.value)}
                    style={{
                        padding: "0.8rem",
                        width: "50%",
                        maxWidth: "400px",
                        borderRadius: "10px",
                        fontSize: "16px",
                        border: "1px solid #ccc",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        marginLeft:"1rem"
            
                      }}
                />
            </div>
            <div className="table-container"
                style={{
                    marginTop:"1rem",
                    border:"none"
                }}>
                {/* <h2 style={{marginLeft:"2.2rem" , marginTop:"-6rem"}}>Products List</h2> */}
                {loading ? (
                    <p>Loading products...</p>
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : filteredProducts.length > 0 ? (
                    <table className="product-table">
                        <thead>
                            <tr>
                            <th>ID</th>
                            <th>Product<br />Category</th>
                            <th>Color/<br />Design</th>
                            <th>Block<br />No.</th>
                            <th>No of <br/>Slabs</th>
                            <th>Thickness<br/>(cm)</th>
                            <th>Length<br />(inches)</th>
                            <th>Width<br />(inches)</th>
                            <th>Quantity<br />(sft)</th>
                            <th>Note</th>
                            <th>Offer Date </th>
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
                                <td>{product.category || 'N/A'}</td>
                                <td>{product.color_design || 'N/A'}</td>
                                <td>{product.block_no || 'N/A'}</td>
                                <td>{product.bundles || 'N/A'}</td>
                                <td>{product.thickness || 'N/A'}</td>
                                <td>{product.length || 'N/A'}</td>
                                <td>{product.width || 'N/A'}</td>
                                <td>{product.quantity || 'N/A'}</td>
                                <td>{product.note || 'N/A'}</td>
                                <td>{product.offer_start || 'N/A'}</td>
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
                                        // onClick={() => handleStatusClick(product)}
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
                                        onClick={() => userType === "Warehouse" && handleActionClick(product)}>
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

            {/* Image Popup */}
            {isImagePopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <h3>Image Gallery</h3>
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
                        {/* {userType ==="Warehouse" &&
                        <button onClick={handleAddImage} className="add-image-button">
                            Add Image
                        </button>} */}
                        <button onClick={closeImagePopup} >Close</button>

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
                        <button onClick={handleSaveStatus} style={{backgroundColor:"green"}}>Save</button>
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
                        <button onClick={handleSaveAction} style={{backgroundColor:"#ffd200"}} >Save</button>
                        <button onClick={handleActionClosePopup}>Cancel</button>
                    </div>
                    </div>
                )}

            {/* Comment Popup */}
            {isCommentPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">

                        <h3>Add Comment for Product ID: {selectedProduct?.id}</h3>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            rows="5"
                            className="comment-textarea"
                        ></textarea>
                        <button className="submit-comment-button" onClick={handleCommentSubmit} style={{backgroundColor:"#ffd200"}} >
                            Submit
                        </button>
                        <button  onClick={closeCommentPopup}>Cancel</button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Warehouse;
