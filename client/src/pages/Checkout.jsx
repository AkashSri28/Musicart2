import React, { useState } from 'react'
import TopBar from '../components/TopBar'
import HorizontalBar from '../components/HorizontalBar';
import { useNavigate } from 'react-router-dom';
import '../styles/Checkout.css'; // Import the CSS file
import { useAuth } from '../context/authContext';
import { useCart } from '../context/cartContext';

function Checkout() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { cartItems, cartTotal } = useCart();

    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleImageClick = (productName, color) => {
        setSelectedProduct({ productName, color });
    };

  return (
    <div>

        <TopBar/>
        <div className='content-wrapper'>

            <HorizontalBar/>
            <button className="back-to-products-button" onClick={() => navigate('/cart')}>Back to cart</button>
            <h2 className='checkout-title'>Checkout</h2>
            <div className="checkout-content">
                <div className="checkout-section">
                    <div className="delivery-form-section">
                        <form>
                            <div className="form-group">
                                <label htmlFor="name">1. Delivery address</label>
                                <div>
                                    <input type="text" id="name" value={user.name} readOnly className="styled-input" />
                                    <textarea id="address" name="address" rows="4"></textarea>
                                </div>
                            </div>
                            <hr/>

                            <div className="form-group">
                                <label htmlFor="payment-method">2. Payment Method:</label>
                                <select id="payment-method" name="payment-method">
                                    <option> Mode of payment</option>
                                    <option value="pay-on-delivery">Pay on Delivery</option>
                                    <option value="upi">UPI</option>
                                    <option value="card">Card</option>
                                </select>
                            </div>
                            <hr/>

                            <div className="form-group">
                                <label htmlFor="name">3. Review items and delivery</label>
                                <div>
                                    <div className="cart-item-images">
                                        {cartItems.map((item) => (
                                            <div className='cart-image-container'
                                                key={item.productId} 
                                                onClick={() => handleImageClick(item.productName, item.color)}
                                                >
                                                <img 
                                                    src={item.imageUrl} 
                                                    alt={item.productName}  
                                                    className={selectedProduct && selectedProduct.productName === item.productName ? 'cart-item-image-selected' : 'cart-item-image'} 
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {selectedProduct && (
                                        <div>
                                            <p style={{ fontSize: '18px', fontWeight: 'bold' }}>{selectedProduct.productName}</p>
                                            <p style={{ color: '#797979' }}>Color: {selectedProduct.color}</p>
                                            <p>Estimated delivery : Monday — FREE Standard Delivery</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <hr/>
                        </form>
                    </div>
                    <div className="place-order-section">
                        <button className="place-order-button">Place your order</button>
                        <div className="order-details">
                            <p className="order-total">Order Total: ₹{cartTotal}</p>
                            <p className="order-terms">By placing your order, you agree to our Terms of Use and Privacy Notice.</p>
                        </div>
                    </div>
                </div>
              

                <div className="order-summary-section">
                    <button className="place-order-button">Place your order</button>
                    <p className="order-terms">By placing your order, you agree to our Terms of Use and Privacy Notice.</p>
                    <hr/>
                    <div className="order-items">
                        <p className="order-summary-title">Order Summary</p>
                        {/* Repeat this div for each item in the cart */}

                        <div className="order-total-vertical">
                            <div className="order-details-vertical">
                                <p>Items:</p>
                                <p>₹{cartTotal}</p>
                            </div>
                            <div className="order-details-vertical">
                                <p>Delivery:</p>
                                <p>₹45.00</p>
                            </div>
                            <hr />
                            <div className="order-details-vertical" style={{color:'#B52B00', fontSize: '15px', fontWeight:'bold'}}>
                                <p>Order Total:</p>
                                <p>₹{(cartTotal + 45.00).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>


                   
                 </div>
            </div>
        </div>
    </div>
  )
}

export default Checkout