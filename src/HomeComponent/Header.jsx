import { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { Modal, Button, FormControl, ListGroup } from 'react-bootstrap';
import productsData from '../data/productsData';
import { useNavigate } from 'react-router-dom';
import {useCart} from '../ProductsComponent/cartContext';


const Header = () => {
    const navigate = useNavigate(); 
    const [showSearch, setShowSearch] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isLogin, setIsLogin] = useState(true);  // toggle between login & register
    const [showDialog, setShowDialog] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const {cartCount} = useCart();    

    const handleModalClose = () => {
        setShowModal(false);
        setIsLogin(true);
    };

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchInput(query); 

        const filteredProducts = productsData.filter(product =>
            product.title.toLowerCase().includes(query)
        );
        setSuggestions(filteredProducts.length ? filteredProducts : [{ title: 'No products found' }]);
    };


    const handleMouseEnter = () => {
        setShowDialog(true);
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setTimeout(() => {
            if (!isHovered) setShowDialog(false);
        }, 200);
    };

    const handleDialogButtonClick = () => {
        setShowDialog(false);
        setShowModal(true);
    };

    const handleCartClick = () =>{
        navigate('/CartPage');
    }

    return (
        <>
        <div className={showSearch ? 'dimmed-bg': ''}>
            <header className="bg-black text-white">
                <nav className="d-flex justify-content-between align-items-center p-3">
                    <h1 className='navbar-brand'>TechShop</h1>
                   
                    <div className="d-flex justify-content-between align-items-center w-25 position-relative" style={{ gap: '30px' }}>
                      <div className='search-container'>
                        {showSearch && (
                            <div className="search-bar position-absolute justify-content-center align-items-center" 
                             >
                                <FormControl
                                    type="text"
                                    value={searchInput}
                                    onChange={handleSearchChange}
                                    className="search-input ml-5 bg-black text-white"
                                    placeholder='Search...'
                                />
                                {searchInput && (
                                    <ListGroup className="position-absolute search-suggestion" style={{ zIndex: 1, top: '40px' }}>
                                        {suggestions.map((suggestion, index) => (
                                            <ListGroup.Item key={index} className=" bg-black text-white">
                                                {suggestion.title}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                            </div>
                        )}
                      </div>
                    <div className="nav-link" data-toggle="tooltip" title="Search">
                            <FaSearch onClick={() => setShowSearch(!showSearch)} />
                        </div>

                        {/* cart icon functionality */}
                        <div className="nav-link ml-3" data-toggle="tooltip" title="Cart" onClick={handleCartClick}>
                            <FaShoppingCart />   
                            {cartCount > 0 && (
                            <span className="cart-count-badge position-absolute" style={{ background: 'red', borderRadius: '80%', padding: '2px 5px', top: '-15px', right: '35px', color: 'white' }}>
                                {cartCount}
                            </span>
                        )}
                        </div>   

                        {/* User Icon and Dialog Box */}
                        <div className="nav-link"
                            data-toggle="tooltip"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <FaUserAlt />
                        </div>

                        {/* Persisting modal-dialog box */}
                        {showDialog && 
                        ( <div className="position-absolute dialog-box"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave} >
                            
                                <h4>Hello</h4>
                                <p>Access your account and manage orders.</p>
                                <div>
                                    <Button variant="primary" onClick={handleDialogButtonClick}>
                                        {isLogin ? 'Login' : 'Register'}
                                    </Button>
                                    <br />
                                    <p>Please Login</p>
                                </div>
                            </div>
                            
                        )}
                    </div>
                </nav>

                {/* Modal for login/signup */}
                <Modal show={showModal} onHide={handleModalClose} className="custom-modal">
                    <Modal.Header closeButton>
                        <Modal.Title>{isLogin ? 'Login' : 'Register'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {isLogin ? (
                            <>
                                <FormControl type="email" placeholder="Enter email" className="mb-3" />
                                <FormControl type="password" placeholder="Enter password" className="mb-3" />
                            </>
                        ) : (
                            <>
                                <FormControl type="text" placeholder="Enter username" className="mb-3" />
                                <FormControl type="email" placeholder="Enter email" className="mb-3" />
                                <FormControl type="password" placeholder="Enter password" className="mb-3" />
                                <FormControl type="password" placeholder="Confirm password" className="mb-3" />
                                <FormControl type="text" placeholder="Enter mobile number" className="mb-3" />
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <Button variant="secondary" onClick={() => setIsLogin(!isLogin)}>
                            {isLogin ? 'Register' : 'Login'}
                        </Button>
                        <Button variant="primary" onClick={handleModalClose}>
                            {isLogin ? 'Login' : 'Register'}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </header>
            </div>
        </>
    );
};

export default Header;