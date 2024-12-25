import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productmanagement.css';

// const productTypeOptions = ["Natural", "Engineered"];
const warehouseOptions = ["All","Cincinnati", "Raleigh", "Dallas", "Austin"]; // Corrected spelling of "Cincinnati" and "Raleigh"

const ProductManagement = () => {
    const [data, setData] = useState([]);

    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
const [productMasters, setProductMasters] = useState([]);
const [selectedProductMaster, setSelectedProductMaster] = useState(null); // To store selected ProductMaster details
const [selectedProduct, setSelectedProduct] = useState(null);
const [isPopupOpen, setIsPopupOpen] = useState(false);
const [isActionPopupOpen, setIsActionPopupOpen] = useState(false);
// const [selectedProduct, setSelectedProduct] = useState(null);
const [newStatus, setNewStatus] = useState('');
const [newAction, setNewAction] = useState('');

const [newProduct, setNewProduct] = useState({
  productMaster: "", // ID of the selected product master
  blockNo: "",
  bundles: "",
  uom: "",
  thickness: "",
  dimension: "",
  length: "",
  width: "",
  quantity: "",
  note: "",
  offerStart: "",
  offerEnd: "",
  price: "",
  warehouse: "All", // Default value for warehouse is "All"
});

const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [products, setProducts] = useState([]);



    
    const STATUS_CHOICES = [
        'Available',
        'Out of Stock',
        'Not Produced',
        'Awaiting Stock',
      ];
      const ACTION_CHOICES = [
          'Approve',
          'Reject',
      ]



    useEffect(() => {
        fetchProducts();
        // fetchProductMasterData();
    }, []);

    const fetchProducts = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) { 
                // If token is not found, 
                // redirect to login page 
                window.location.href = '/';
                return; 
            }
            const response = await fetch('http://localhost:8000/api/product/', {
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
            console.log(data);
            setProducts(data);
            setData(data);  
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };


useEffect(() => {
    const fetchProductMasterData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await axios.get("http://localhost:8000/api/product-master/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProductMasters(response.data);
      } catch (error) {
        console.error("Error fetching product master data:", error);
        setErrorMessage("Failed to fetch product masters.");
      }
    };

    fetchProductMasterData();
  }, []);


    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setNewProduct({
            productType: '',
            productCategory: '',
            colorDesign: '',
            blockNo: '',
            bundles: '',
            uom: '',
            thickness: '',
            dimension: '',
            length: '',
            width: '',
            quantity: '',
            note: '',
            offerStart: '',
            offerEnd: '',
            price: '',
            warehouse: '',
        });
    };

              // Handle Input Change
              const handleInputChange = (e) => {
                const { name, value } = e.target;
                setNewProduct({ ...newProduct, [name]: value });
              };

             // Handle Product Master Selection
             const handleProductMasterChange = (e) => {
                const selectedId = e.target.value;
                const selectedMaster = productMasters.find((master) => master.id === parseInt(selectedId));
                setNewProduct({ ...newProduct, productMaster: selectedId });
                setSelectedProductMaster(selectedMaster || null); // Store selected ProductMaster details
              
                console.log(newProduct.productMaster);  // Check the value of productMaster
              };
              

const handleAddProduct = async (e) => {
    e.preventDefault();
    
    const productData = {
    product_master: newProduct.productMaster,  // Directly use the ID of the selected ProductMaster
    block_no: newProduct.blockNo,
    bundles: newProduct.bundles,
    uom: newProduct.uom,
    thickness: parseFloat(newProduct.thickness),
    dimension: newProduct.dimension,
    length: parseFloat(newProduct.length),
    width: parseFloat(newProduct.width),
    quantity: parseInt(newProduct.quantity),
    note: newProduct.note,
    offer_start: new Date(newProduct.offerStart).toISOString(),
    offer_end: new Date(newProduct.offerEnd).toISOString(),
    price: parseFloat(newProduct.price),
    warehouse: newProduct.warehouse
    };
    
    try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Authentication token not found");

    const response = await axios.post("http://localhost:8000/api/product/create/", productData, {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    });

    setSuccessMessage("Product added successfully!");
    setErrorMessage("");
    setNewProduct({ /* Reset form data here */ });
    setSelectedProductMaster(null);
    } catch (error) {
    console.error("Error adding product:", error);
    setErrorMessage("Failed to add product. Please check your input.");
    setSuccessMessage("");
    }
};


    const filteredProducts = products.filter((product) => {
        const productName = product.product_master?.name?.toLowerCase() || '';
        const productCategory = product.product_master?.product_category?.toLowerCase() || '';
        
        const matchesSearchQuery = productName.includes(searchQuery.toLowerCase());
        const matchesWarehouseFilter = productCategory.includes(searchQuery.toLowerCase());

        return matchesSearchQuery && matchesWarehouseFilter;
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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


    return (
        <div className="product-management">
            <h2>Product Management</h2>
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div className="prod-and-add">
                <input
                    type="text"
                    placeholder="Search by Name, Type, Category..."
                    className="search-inputs"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button onClick={handleOpenModal} className="product-management-btn">
                    + PRODUCT MANAGEMENT FORM
                </button>
            </div>
             {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
                        <h2>Add New Product</h2>
                        <form onSubmit={handleAddProduct}>
                            <div className="form-group">
                                <label>Product Master:</label>
                                <select
                                className="form-control"
                                name="productMaster"
                                value={newProduct.productMaster}
                                onChange={handleProductMasterChange}
                                required
                                >
                                <option value="">Select Product Master</option>
                                {productMasters.map((master) => (
                                    <option key={master.id} value={master.id}>
                                    {master.name} - {master.color_design}
                                    </option>
                                ))}
                                </select>
                            </div>

                            {selectedProductMaster && (
                                <>
                                <div className="form-group">
                                    <label>Product Category:</label>
                                    <input
                                    type="text"
                                    value={selectedProductMaster.product_category}
                                    readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Color Design:</label>
                                    <input
                                    type="text"
                                    value={selectedProductMaster.color_design}
                                    readOnly
                                    />
                                </div>
                                </>
                            )}

                            <div className="form-group">
                                <label>Block No:</label>
                                <input
                                type="text"
                                name="blockNo"
                                value={newProduct.blockNo}
                                onChange={handleInputChange}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label>Bundles:</label>
                                <input
                                type="text"
                                name="bundles"
                                value={newProduct.bundles}
                                onChange={handleInputChange}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label>UOM:</label>
                                <input
                                type="text"
                                name="uom"
                                value={newProduct.uom}
                                onChange={handleInputChange}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label>Thickness:</label>
                                <input
                                type="number"
                                name="thickness"
                                value={newProduct.thickness}
                                onChange={handleInputChange}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label>Dimension:</label>
                                <input
                                type="text"
                                name="dimension"
                                value={newProduct.dimension}
                                onChange={handleInputChange}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label>Length:</label>
                                <input
                                type="number"
                                name="length"
                                value={newProduct.length}
                                onChange={handleInputChange}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label>Width:</label>
                                <input
                                type="number"
                                name="width"
                                value={newProduct.width}
                                onChange={handleInputChange}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label>Quantity:</label>
                                <input
                                type="number"
                                name="quantity"
                                value={newProduct.quantity}
                                onChange={handleInputChange}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label>Note:</label>
                                <input
                                type="text"
                                name="note"
                                value={newProduct.note}
                                onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Offer Start:</label>
                                <input
                                type="datetime-local"
                                name="offerStart"
                                value={newProduct.offerStart}
                                onChange={handleInputChange}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label>Offer End:</label>
                                <input
                                type="datetime-local"
                                name="offerEnd"
                                value={newProduct.offerEnd}
                                onChange={handleInputChange}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label>Price:</label>
                                <input
                                type="number"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="warehouse">Warehouse</label>
                                <select
                                id="warehouse"
                                name="warehouse"
                                value={newProduct.warehouse}
                                onChange={handleInputChange}
                                className="form-control"
                                >
                                {warehouseOptions.map((option) => (
                                    <option key={option} value={option}>
                                    {option}
                                    </option>
                                ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="submit-btn">
                                Add Product
                                </button>
                            </div>
                            </form>

                    </div>
                </div>
            )}
            <div className="table-container">
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Product Type</th>
                            <th>Product Category</th>
                            <th>Color / Design</th>
                            <th>Block No</th>
                            <th>Bundles</th>
                            <th>UOM</th>
                            <th>Thickness</th>
                            <th>Dimension</th>
                            <th>Length</th>
                            <th>Width</th>
                            <th>Quantity</th>
                            <th>Note</th>
                            <th>Offer</th>
                            {/* <th>Offer End</th> */}
                            <th>Status</th>
                            <th>Action</th>
                            <th>Price</th>
                            <th>Warehouse</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.product_master?.name}</td>
                                <td>{item.product_master?.product_category}</td>
                                <td>{item.product_master?.color_design}</td>
                                <td>{item.block_no}</td>
                                <td>{item.bundles}</td>
                                <td>{item.uom}</td>
                                <td>{item.thickness}</td>
                                <td>{item.dimension}</td>
                                <td>{item.length}</td>
                                <td>{item.width}</td>
                                <td>{item.quantity}</td>
                                <td>{item.note}</td>
                                <td>{item.offer_start}</td>
                                {/* <td>{item.offer_end}</td> */}
                                <td>
                                    <button
                                        className="status-button"
                                        onClick={() => handleStatusClick(item)}
                                        >
                                        {item.status || 'N/A'}
                                    </button>
                                    </td>
                                    <td>
                                    <button
                                        className="action-button"
                                        onClick={() => handleActionClick(item)}>    
                                        {item.action || 'N/A'}
                                    </button>
                                    </td>
                                <td>{item.price}</td>
                                <td>{item.warehouse}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Prev</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
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

        </div>
    );
};

export default ProductManagement;



    // const fetchProductMasterData = async () => {
    //     try {
    //         const token = localStorage.getItem('token');
    //         if (!token) throw new Error('Authentication token not found');
    
    //         const response = await axios.get('http://localhost:8000/api/product-master/', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    
    //         // Parse the flat response structure into productCategories and colorDesigns
    //         const productCategories = [...new Set(response.data.map(item => item.product_category))];
    //         const colorDesigns = [...new Set(response.data.map(item => item.color_design))];
    
    //         setProductMaster({
    //             productCategories,
    //             colorDesigns,
    //         });
    //     } catch (error) {
    //         console.error('Error fetching product master data:', error);
    //     }
    // };
    

         {/* <input
                type="text"
                name="productType"
                placeholder="Product Type"
                value={newProduct.productType}
                onChange={handleInputChange}
                required
            />
            <select
                name="productCategory"
                value={newProduct.productCategory}
                onChange={handleInputChange}
                required
            >
                <option value="">Select Product Category</option>
                {productCategoriesForSelectedType.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
            <select
                name="colorDesign"
                value={newProduct.colorDesign}
                onChange={handleInputChange}
                required
            >
                <option value="">Select Color/Design</option>
                {colorDesignsForSelectedCategory.map((design) => (
                    <option key={design} value={design}>
                        {design}
                    </option>
                ))}
            </select> */}

            //              const warehouseOptions = ["All", "Cincinatti", "Relaigh", "Dallas", "Austin"]; // Fixed spelling of "Raleigh" and "Cincinnati"

            // import React, { useState, useEffect } from "react";
            // import axios from "axios";
            
            // const ProductManagement = () => {
            // // const warehouseOptions = ["All", "Cincinatti", "Relaigh", "Dallas", "Austin"]; // Corrected spelling of "Cincinnati" and "Raleigh"
            
            // //   const [productMasters, setProductMasters] = useState([]);
            // //   const [selectedProductMaster, setSelectedProductMaster] = useState(null); // To store selected ProductMaster details
            // //   const [newProduct, setNewProduct] = useState({
            // //     productMaster: "", // ID of the selected product master
            // //     blockNo: "",
            // //     bundles: "",
            // //     uom: "",
            // //     thickness: "",
            // //     dimension: "",
            // //     length: "",
            // //     width: "",
            // //     quantity: "",
            // //     note: "",
            // //     offerStart: "",
            // //     offerEnd: "",
            // //     price: "",
            // //     warehouse: "All", // Default value for warehouse is "All"
            // //   });
            
            // //   const [successMessage, setSuccessMessage] = useState("");
            // //   const [errorMessage, setErrorMessage] = useState("");
            
            // //   // Fetch Product Masters from API
            // //   useEffect(() => {
            // //     const fetchProductMasterData = async () => {
            // //       try {
            // //         const token = localStorage.getItem("token");
            // //         if (!token) throw new Error("Authentication token not found");
            
            // //         const response = await axios.get("http://localhost:8000/api/product-master/", {
            // //           headers: {
            // //             Authorization: `Bearer ${token}`,
            // //           },
            // //         });
            
            // //         setProductMasters(response.data);
            // //       } catch (error) {
            // //         console.error("Error fetching product master data:", error);
            // //         setErrorMessage("Failed to fetch product masters.");
            // //       }
            // //     };
            
            // //     fetchProductMasterData();
            // //   }, []);
            
            // //   // Handle Input Change
            // //   const handleInputChange = (e) => {
            // //     const { name, value } = e.target;
            // //     setNewProduct({ ...newProduct, [name]: value });
            // //   };
            
            // //   // Handle Product Master Selection
            // //   const handleProductMasterChange = (e) => {
            // //     const selectedId = e.target.value;
            // //     const selectedMaster = productMasters.find((master) => master.id === parseInt(selectedId));
            // //     setNewProduct({ ...newProduct, productMaster: selectedId });
            // //     setSelectedProductMaster(selectedMaster || null); // Store selected ProductMaster details
              
            // //     console.log(newProduct.productMaster);  // Check the value of productMaster
            // //   };
              
            
            // //   // Handle Form Submit
            // //   // Handle Form Submit
            // //     const handleAddProduct = async (e) => {
            // //         e.preventDefault();
                    
            // //         const productData = {
            // //         product_master: newProduct.productMaster,  // Directly use the ID of the selected ProductMaster
            // //         block_no: newProduct.blockNo,
            // //         bundles: newProduct.bundles,
            // //         uom: newProduct.uom,
            // //         thickness: parseFloat(newProduct.thickness),
            // //         dimension: newProduct.dimension,
            // //         length: parseFloat(newProduct.length),
            // //         width: parseFloat(newProduct.width),
            // //         quantity: parseInt(newProduct.quantity),
            // //         note: newProduct.note,
            // //         offer_start: new Date(newProduct.offerStart).toISOString(),
            // //         offer_end: new Date(newProduct.offerEnd).toISOString(),
            // //         price: parseFloat(newProduct.price),
            // //         warehouse: newProduct.warehouse
            // //         };
                    
            // //         try {
            // //         const token = localStorage.getItem("token");
            // //         if (!token) throw new Error("Authentication token not found");
                
            // //         const response = await axios.post("http://localhost:8000/api/product/create/", productData, {
            // //             headers: {
            // //             Authorization: `Bearer ${token}`,
            // //             },
            // //         });
                
            // //         setSuccessMessage("Product added successfully!");
            // //         setErrorMessage("");
            // //         setNewProduct({ /* Reset form data here */ });
            // //         setSelectedProductMaster(null);
            // //         } catch (error) {
            // //         console.error("Error adding product:", error);
            // //         setErrorMessage("Failed to add product. Please check your input.");
            // //         setSuccessMessage("");
            // //         }
            // //     };
                
              
            
            //   return (
            //     <div>
            //       <h2>Add New Product</h2>
            //       {/* {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            //       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>} */}
            
            //       {/* <form onSubmit={handleAddProduct}>
            //         <div>
            //           <label>Product Master:</label>
            //           <select
            //             name="productMaster"
            //             value={newProduct.productMaster}
            //             onChange={handleProductMasterChange}
            //             required
            //           >
            //             <option value="">Select Product Master</option>
            //             {productMasters.map((master) => (
            //               <option key={master.id} value={master.id}>
            //                 {master.name} - {master.color_design}
            //               </option>
            //             ))}
            //           </select>
            //         </div>
            
            //         {selectedProductMaster && (
            //           <>
            //             <div>
            //               <label>Product Category:</label>
            //               <input
            //                 type="text"
            //                 value={selectedProductMaster.product_category}
            //                 readOnly
            //               />
            //             </div>
            //             <div>
            //               <label>Color Design:</label>
            //               <input
            //                 type="text"
            //                 value={selectedProductMaster.color_design}
            //                 readOnly
            //               />
            //             </div>
            //           </>
            //         )}
            
            //         <div>
            //           <label>Block No:</label>
            //           <input
            //             type="text"
            //             name="blockNo"
            //             value={newProduct.blockNo}
            //             onChange={handleInputChange}
            //             required
            //           />
            //         </div>
            //         <div>
            //           <label>Bundles:</label>
            //           <input
            //             type="text"
            //             name="bundles"
            //             value={newProduct.bundles}
            //             onChange={handleInputChange}
            //             required
            //           />
            //         </div>
            //         <div>
            //           <label>UOM:</label>
            //           <input
            //             type="text"
            //             name="uom"
            //             value={newProduct.uom}
            //             onChange={handleInputChange}
            //             required
            //           />
            //         </div>
            //         <div>
            //           <label>Thickness:</label>
            //           <input
            //             type="number"
            //             name="thickness"
            //             value={newProduct.thickness}
            //             onChange={handleInputChange}
            //             required
            //           />
            //         </div>
            //         <div>
            //           <label>Dimension:</label>
            //           <input
            //             type="text"
            //             name="dimension"
            //             value={newProduct.dimension}
            //             onChange={handleInputChange}
            //             required
            //           />
            //         </div>
            //         <div>
            //           <label>Length:</label>
            //           <input
            //             type="number"
            //             name="length"
            //             value={newProduct.length}
            //             onChange={handleInputChange}
            //             required
            //           />
            //         </div>
            //         <div>
            //           <label>Width:</label>
            //           <input
            //             type="number"
            //             name="width"
            //             value={newProduct.width}
            //             onChange={handleInputChange}
            //             required
            //           />
            //         </div>
            //         <div>
            //           <label>Quantity:</label>
            //           <input
            //             type="number"
            //             name="quantity"
            //             value={newProduct.quantity}
            //             onChange={handleInputChange}
            //             required
            //           />
            //         </div>
            //         <div>
            //           <label>Note:</label>
            //           <input
            //             type="text"
            //             name="note"
            //             value={newProduct.note}
            //             onChange={handleInputChange}
            //           />
            //         </div>
            //         <div>
            //           <label>Offer Start:</label>
            //           <input
            //             type="datetime-local"
            //             name="offerStart"
            //             value={newProduct.offerStart}
            //             onChange={handleInputChange}
            //             required
            //           />
            //         </div>
            //         <div>
            //           <label>Offer End:</label>
            //           <input
            //             type="datetime-local"
            //             name="offerEnd"
            //             value={newProduct.offerEnd}
            //             onChange={handleInputChange}
            //             required
            //           />
            //         </div>
            //         <div>
            //           <label>Price:</label>
            //           <input
            //             type="number"
            //             name="price"
            //             value={newProduct.price}
            //             onChange={handleInputChange}
            //             required
            //           />
            //         </div>
            //         <div>
            //           <label htmlFor="warehouse">Warehouse</label>
            //           <select
            //             id="warehouse"
            //             name="warehouse"
            //             value={newProduct.warehouse}
            //             onChange={handleInputChange}
            //           >
            //             {warehouseOptions.map((option) => (
            //               <option key={option} value={option}>
            //                 {option}
            //               </option>
            //             ))}
            //           </select>
            //         </div>
            //         <div>
            //           <button type="submit">Add Product</button>
            //         </div>
            //       </form> */}
            //     </div>
            //   );
            // };
            
            // export default ProductManagement;
            