import React, { Fragment } from 'react';
import { useNavigate, } from 'react-router-dom';
import CheckoutSteps from './CheckoutSteps';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";


const ConfirmOrder = () => {
    const { cartItems, deliveryInfo } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    //calculate oeder price
    const itemsPrice = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

    let delivery = 35;
    const deliveryPrice = itemsPrice > 200 ? delivery : 25;
    const texPrice = Number((0.05 * itemsPrice).toFixed(2));
    const finalTotal = (itemsPrice + deliveryPrice + texPrice).toFixed(2);

    const processToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            deliveryPrice,
            texPrice,
            finalTotal
        };
        sessionStorage.setItem("orderInfo", JSON.stringify(data));
        navigate("/payment");
    };

    return (
        <>
            <CheckoutSteps delivery confirmOrder />
            <div className='row d-flex justify-content-between'>
                <div className='col-12 col-lg-8 mt-5 order-confirm cartt'>
                    <h3 className='mb-3'> Delivery Info</h3>
                    <p>
                        <b> Name:</b> {user && user.name}
                    </p>
                    <p>
                        <b>Phone:</b> {deliveryInfo.phoneNo}
                    </p>
                    <p className='mb-4'>
                        <b>Address:</b> {`${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.postalCode}, ${deliveryInfo.country}`}
                    </p>
                    <hr />
                    <h4 className='mt-4'>Your Cart Items:</h4>
                    {
                        cartItems.map((item) => (
                            <Fragment key={item.id} >
                                <hr />
                                <div className='cart-tem my-1'>
                                    <div className='row'>
                                        <div className='col-4 col-lg-2'>
                                            <img src={item.image} alt='item' height="45" width='65'></img>
                                        </div>
                                        <div className='col-5 col-lg-6' >{item.name}</div>
                                        <div className='col-4 col-lg-4 my-lg-0' >
                                            <p>
                                                {item.quantity} x {""}
                                                <FontAwesomeIcon icon={faIndianRupeeSign} size='xs' />
                                                {item.price} = {""}
                                                <b>
                                                    <FontAwesomeIcon icon={faIndianRupeeSign} size='xs' />
                                                    {(item.quantity * item.price).toFixed(2)}
                                                </b>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    }
                </div>
                <div className='col-12 col-lg-3 my-5 cartt'>
                    <div id='order_summary'>
                        <h4>Order Summary</h4>
                        <hr />
                        <p>
                            SubTotal:
                            <span className='order-summary-values'>
                                <FontAwesomeIcon icon={faIndianRupeeSign} size='xs' />
                                {itemsPrice}
                            </span>
                        </p>
                        <p>
                            Delivery Charges:
                            <span className='order-summary-values'>
                                <FontAwesomeIcon icon={faIndianRupeeSign} size='xs' />
                                {deliveryPrice}
                            </span>
                        </p>
                        <p>
                            Tax:
                            <span className='order-summary-values'>
                                <FontAwesomeIcon icon={faIndianRupeeSign} size='xs' />
                                {texPrice}
                            </span>
                        </p>
                        <hr />
                        <p>
                            Total:
                            <span className='order-summary-values'>
                                <FontAwesomeIcon icon={faIndianRupeeSign} size='xs' />
                                {finalTotal}
                            </span>
                        </p>
                        <hr />
                        <button className='btn btn-primary btn-block' id='checkout_btn'
                            onClick={processToPayment}>
                            Procced To Payment
                        </button>
                        <br />
                    </div>
                </div>
            </div>
        </>
    )
};

export default ConfirmOrder;
