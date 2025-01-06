import React from "react"     
import './AddProduct.css';


                
                
const  AddProduct = () =>{
    const warehouseOptions = ["All","Cincinnati", "Raleigh", "Dallas", "Austin"]; 
    const [newProduct, setNewProduct] = useState({
        color_design:"",
        blockNo: "",
        bundles: "",
        uom: "sft",
        thickness: "",
        dimension: "",
        length: "",
        width: "",
        quantity: "sft",
        note: "",
        offerStart: "",
        price: "",
        warehouse: "All", // Default value for warehouse is "All"
      });

        const [productType, setProductType] = useState("");
        const [category, setCategory] = useState("");
        const [images, setImages] = useState([]);

        
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
            price: '',
            warehouse: '',
        });
    };

              // Handle Input Change
              const handleInputChange = (e) => {
                const { name, value } = e.target;
                setNewProduct({ ...newProduct, [name]: value });
              };


              const handleAddProduct = async (e) => {
                e.preventDefault();
              
                // Create a FormData object to handle file uploads along with other data
                const formData = new FormData();
              
                // Append all form data fields to FormData
                formData.append("block_no", newProduct.blockNo);
                formData.append("bundles", newProduct.bundles);
                formData.append("uom", newProduct.uom);
                formData.append("thickness", parseFloat(newProduct.thickness));
                formData.append("dimension", newProduct.dimension);
                formData.append("length", parseFloat(newProduct.length));
                formData.append("width", parseFloat(newProduct.width));
                formData.append("quantity", parseInt(newProduct.quantity));
                formData.append("note", newProduct.note);
                formData.append("offer_start", new Date(newProduct.offerStart).toISOString());
                formData.append("price", parseFloat(newProduct.price));
                formData.append("warehouse", newProduct.warehouse);
                formData.append("color_design", newProduct.color_design);
                formData.append("category", category);
                formData.append("product_type", productType);
              
                // Append each image to FormData
                images.forEach((image) => {
                  formData.append("images", image);
                });
              
                try {
                  const token = localStorage.getItem("token");
                  if (!token) throw new Error("Authentication token not found");
              
                  // Make the POST request with FormData
                  const response = await axios.post(
                    "https://crm.agstones.com/api/product/create/",
                    formData,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data", // Important for file uploads
                      },
                    }
                  );
              
                  // Handle success
                  setSuccessMessage("Product added successfully!");
                  setErrorMessage("");
                  setNewProduct({}); // Reset form data
                  resetForm(); // Call your reset form function if defined
                  handleCloseModal();
                } catch (error) {
                  console.error("Error adding product:", error);
                  setErrorMessage("Failed to add product. Please check your input.");
                  setSuccessMessage("");
                }
              };
              

const resetForm = () => {
    setNewProduct({
        color_design:"",
        blockNo: "",
        bundles: "",
        uom: "sft",
        thickness: "",
        dimension: "",
        length: "",
        width: "",
        quantity: "sft",
        note: "",
        offerStart: "",
        price: "",
        warehouse: "All",
    });
    setProductType("");
    setCategory("");
    setImages([]);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]); // Store selected files
  };



    return(
<div className="modal">
        <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>Add New Product</h2>
            <br/>
            <br/>

            <form onSubmit={handleAddProduct}>
                <div className="form-group">
                    <label>Select Product Type</label>
                    <select value={productType} onChange={handleProductTypeChange} className="select-option">
                        <option value="">Select</option>
                        <option value="Natural">Natural</option>
                        <option value="Engineered">Engineered</option>
                    </select>
                </div>
                <div className="form-group"> 
                    <label>Select Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="select-option">
                        <option value="">Select</option>
                        {getCategoryOptions().map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Color Design:</label>
                    <input
                    type="text"
                    name="color_design"
                    value={newProduct.color_design}
                    onChange={handleInputChange}
                    required
                    />
                </div>
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
                    <label>Slabs:</label>
                    <input
                    type="text"
                    name="bundles"
                    value={newProduct.bundles}
                    onChange={handleInputChange}
                    required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="uom">Unit Of Measure (UOM):</label>
                    <select
                        name="uom"
                        value={newProduct.uom} // Ensure this is initialized to "square feet"
                        onChange={handleInputChange}
                        className="select-option"
                        readonly
                    >
                        <option value="square feet">Square Feet</option> {/* Default selected option */}
                    </select>
                </div>

                <div className="form-group">
                    <label>Thickness(cm):</label>
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
                    <select
                    type="text"
                    name="dimension"
                    value={newProduct.dimension}
                    onChange={handleInputChange}
                    required
                    className='select-option'
                    >
                        <option value="">Select</option>
                        <option value="inches">Inches</option>
                        <option value="cm">Centimeters</option>
                    </select>
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
                    <label>Quantity(sqft):</label>
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
                    <label>Offer</label>
                    <input
                    type="datetime-local"
                    name="offerStart"
                    value={newProduct.offerStart}
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
                    className="select-option"
                    >
                    {warehouseOptions.map((option) => (
                        <option key={option} value={option}>
                        {option}
                        </option>
                    ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Images:</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleImageChange}
                        accept="image/*"
                        />
                </div>
                <div className="form-group">
                    <button type="submit" className="submit-btn">
                    Add Product
                    </button>
                </div>
                </form>
        </div>
    </div>
    )
}   
                
                
export default AddProduct;
