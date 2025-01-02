import React, { useEffect, useState } from "react";
import { fetchApprovedProducts, updateProductStatus } from "../Apis/endpoints";
import "./cnfprod.css";
import axios from 'axios';


const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loadingImages, setLoadingImages] = useState(false);
  
  const [newStatus, setNewStatus] = useState("");
  const [statusText, setStatusText] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const userType = localStorage.getItem("user_type");
  const user = localStorage.getItem("user");
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApprovedProducts();
      setProducts(data);
    };
    fetchData();
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

    
const closeImagePopup = () => {
    setIsImagePopupOpen(false);
    setSelectedImages([]);
};
  
  const openImagePopup = (product) => {
    setSelectedProduct(product);
    fetchProductImages(product.id);
    setIsImagePopupOpen(true);
};

  const handleStatusClick = (product) => {
    setSelectedProduct(product);
    setNewStatus(product.status); // Pre-fill the current status
    setStatusText(product.status_text || ""); // Pre-fill the current status text
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (selectedProduct) {
      await updateProductStatus(selectedProduct.id, {
        status: newStatus,
        status_text: statusText,
      });
      setProducts((prev) =>
        prev.map((product) =>
          product.id === selectedProduct.id
            ? { ...product, status: newStatus, status_text: statusText }
            : product
        )
      );
      setIsModalOpen(false);
      setSelectedProduct(null);
      setNewStatus("");
      setStatusText("");
    }
  };


  return (
    <div className="Cns-prd">
        <div className="Cns-prd__header">
        <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "1.5rem" }}>
                Welcome to the Confirmed Orders <span style={{color:"#ffd200"}}>{user}</span> !!
            </h1>  
        </div>
    <div className="table-container"
    style={{
        marginTop:"1rem",
        border:"none"
    }}>
      <table className="product-table">
        <thead>
          <tr>
          <th>ID</th>
        <th>Product<br />Category</th>
        <th>Color/<br />Design</th>
        <th>Block<br />No.</th>
        <th>No. of Bundles</th>
        <th>Thick</th>
        <th>Dmsn<br />(In/cm)</th>
        <th>Length</th>
        <th>Width</th>
        <th>QTY<br />(SFT)</th>
        <th>Note</th>
        <th>Offer Date </th>
        <th>Price/<br />Sft</th>
        <th>Images</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.category || 'N/A'}</td>
            <td>{product.color_design || 'N/A'}</td>
            <td>{product.block_no || 'N/A'}</td>
            <td>{product.bundles || 'N/A'}</td>
            <td>{product.thickness || 'N/A'}</td>
            <td>inches</td>
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
                  className="status-btn"
                  style={{
                    backgroundColor:"#ffd200",
                    color:"black"
                  }}
                  onClick={() => handleStatusClick(product)}
                >
                  {product.status}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Status Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h3>Product Status</h3>
            <div>
              <strong>Current Status:</strong>
              <p>{newStatus}</p>
            </div>
            <div>
              <strong>Status Text:</strong>
              <p>{statusText || "No additional information provided."}</p>
            </div>
            {userType === "Procurement" && (
              <>
                <label>Status:</label>
                <select
                  className="status-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="PI Received">P.I Received</option>
                  <option value="PO Raised">P.O Raised</option>
                  <option value="In Production">In Production</option>
                  <option value="Container No">Container No</option>
                  <option value="ETD from Origin Port">ETD from Origin Port</option>
                  <option value="On-Water">On-Water</option>
                  <option value="ETA: US Port">ETA: US Port</option>
                </select>
                <label>Status Text:</label>
                <textarea
                  className="status-text"
                  rows="3"
                  value={statusText}
                  onChange={(e) => setStatusText(e.target.value)}
                ></textarea>
                <div className="modal-actions">
                  <button
                    className="btn cancel-btn"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button className="btn save-btn" onClick={handleSave}
                style={{
                    backgroundColor: "#4CAF50",
                }}>
                    Save
                  </button>
                </div>
              </>
            )}
            {userType !== "Procurement" && (
              <div className="modal-actions">
                <button
                  className="btn close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                &times;
                </button>
              </div>
            )}
          </div>
        </div>
      )}

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

                        <button onClick={closeImagePopup} >Close</button>

                    </div>
                </div>
            )}

    </div>
    </div>

  );
};

export default ProductTable;
