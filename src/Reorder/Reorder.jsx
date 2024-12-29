import React, { useEffect, useState } from 'react';
import { fetchReorders, CreateReorder } from "../Apis/endpoints";
import './Reorder.css';

const ReorderList = () => {
    const [reorders, setReorders] = useState([]);
    const [filteredReorders, setFilteredReorders] = useState([]);
    const [newReorder, setNewReorder] = useState({
        category: '',
        color: '',
        thickness: '',
        bundles: ''
    });
    const [filterCategory, setFilterCategory] = useState('');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const userType = localStorage.getItem('user_type');
    const user = localStorage.getItem('user')

    const CATEGORY_CHOICES = [
        'Granite',
        'Marble',
        'Quarzite',
        'Dolomite',
        'Onyx',
        'Quartz',
        'Porcelain',
        'Semi-Precious',
        'Printed Quartz'
    ];

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchReorders();
            setReorders(data);
            setFilteredReorders(data);
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (filterCategory) {
            setFilteredReorders(reorders.filter(r => r.category === filterCategory));
        } else {
            setFilteredReorders(reorders);
        }
    }, [filterCategory, reorders]);

    const handleCreateReorder = async () => {
        try {
            const createdReorder = await CreateReorder(newReorder);
            setReorders([...reorders, createdReorder]);
            setNewReorder({ category: '', color: '', thickness: '', bundles: '' });
            setIsPopupOpen(false);
        } catch (error) {
            console.error("Error creating reorder:", error);
        }
    };

    return (
        <div className="container">
            <h1 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "1.5rem" }}>
                Welcome to the Reorder <span style={{color:"blue"}}>{user}</span> !!
            </h1> 
            <div className="header"
            style={{
                marginTop:"-1.5rem"
            }}>
                <select
                    className="filter"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    style={{
                        padding: "0.8rem",
                        width: "50%",
                        maxWidth: "400px",
                        borderRadius: "25px",
                        border: "1px solid #ccc",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                      }}
                >
                    <option value="">Filter by Category</option>
                    {CATEGORY_CHOICES.map(choice => (
                        <option key={choice} value={choice}>{choice}</option>
                    ))}
                </select>
                {userType === 'Warehouse' && (
                    <button className="create-button" onClick={() => setIsPopupOpen(true)}
                    style={{
                        padding: "0.8rem 1.2rem",
                        backgroundColor: "#3498db",
                        color: "#fff",
                        border: "none",
                        borderRadius: "25px",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                      onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
                      onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}>
                        Create Reorder
                    </button>
                )}
            </div>
            <div className='table-container'>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Color/Design</th>
                        <th>Thickness(cm)</th>
                        <th>Bundles</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReorders.map(reorder => (
                        <tr key={reorder.id}>
                            <td>{reorder.category}</td>
                            <td>{reorder.color}</td>
                            <td>{reorder.thickness}</td>
                            <td>{reorder.bundles}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            {isPopupOpen && (
                <div className="popup">
                    <div className="popup-content">
                        <h2>Create New Reorder</h2>
                        <button
                        style={{
                            position: "absolute",
                            top: "5px",
                            right: "-11rem",
                            background: "transparent",
                            border: "none",
                            fontSize: "1.5rem",
                            cursor: "pointer",
                            color:"black",
                        }}
                        onClick={() => setIsPopupOpen(false)}
                        >
                        ×
                        </button>
                        <select
                            value={newReorder.category}
                            onChange={(e) => setNewReorder({ ...newReorder, category: e.target.value })}
                        >
                            <option value="" disabled>Select Category</option>
                            {CATEGORY_CHOICES.map((choice) => (
                                <option key={choice} value={choice}>{choice}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Color"
                            value={newReorder.color}
                            onChange={(e) => setNewReorder({ ...newReorder, color: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Thickness"
                            value={newReorder.thickness}
                            onChange={(e) => setNewReorder({ ...newReorder, thickness: e.target.value })}
                        />
                        <input
                            type="number"
                            placeholder="Bundles"
                            value={newReorder.bundles}
                            onChange={(e) => setNewReorder({ ...newReorder, bundles: e.target.value })}
                        />
                        <button onClick={handleCreateReorder} style={{
                            backgroundColor:"blue",
                            color:"white"
                        }}>Create</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReorderList;
