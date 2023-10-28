import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";

import { MDBDataTable } from "mdbreact";
import Loader from "../Loader";
import { getRestaurants } from "../../Actions/restaurantAction";
import { myOrders, clearErrors } from "../../Actions/orderActions";

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);

  const { restaurants } = useSelector((state) => state.restaurants);

  const restaurantList = Array.isArray(restaurants.restaurants)
    ? restaurants.restaurants
    : [];

  useEffect(() => {
    dispatch(myOrders());
    dispatch(getRestaurants());
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Restaurant Name",
          field: "restaurant",
          sort: "asc",
        },
        {
          label: "Order Items",
          field: "orderItems",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Order Date",
          field: "orderDate",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    //check if orders array is not empty or undefined
    if (orders && orders.length > 0 && restaurantList.length > 0) {
      const sortedOrders = orders.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      sortedOrders.forEach((order) => {
        const orderItemNames = order.orderItems
          .map((item) => item.name)
          .join(",");

        const restaurant = restaurantList.find(
          (restaurant) => restaurant._id.toString() === order.restaurant._id
        );
        data.rows.push({
          restaurant: restaurant?.name || "Unknown Restaurant",
          numOfItems: order.orderItems.length,
          amount: (
            <span>
              <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
              {order.finalTotal}
            </span>
          ),
          status:
            order.orderStatus &&
            String(order.orderStatus).includes("Delivered") ? (
              <p style={{ color: "green" }}>{order.orderStatus}</p>
            ) : (
              <p style={{ color: "red" }}>{order.orderStatus}</p>
            ),
          orderItems: orderItemNames,
          orderDate: new Date(order.createdAt).toLocaleDateString(),
          actions: (
            <Link to={`/eats/orders/${order._id}`} className="btn btn-primary">
              <i className="fa fa-eye"></i>
            </Link>
          ),
        });
      });
    }
    return data;
  };

  return (
    <>
      <div className="cartt">
        <h1 className="my-5">My Orders</h1>

        {loading ? (
          <Loader />
        ) : (
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        )}
      </div>
    </>
  );
};

export default ListOrders;


// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faIndianRupeeSign } from "@fortawesome/free-solid-svg-icons";
// import { useAlert } from "react-alert";
// import { useDispatch, useSelector } from "react-redux";
// import { getOrderDetails } from "../../Actions/orderActions";
// import Loader from "../Loader";
// import { useParams } from "react-router-dom";
// import { Fragment
//  } from "react";
// import {  clearErrors } from "../../Actions/orderActions";


// const OrderDetails = ({}) => {
//   const alert = useAlert();
//   const dispatch = useDispatch();
//   const {id} = useParams();
//   const {
//     loading, error, order = {},
//   }= useSelector((state)=>state.orderDetails);

//   const {
//     deliveryInfo,
//     orderItems,
//     paymentInfo,
//     user,finalTotal,
//     orderStatus,
//   } = order;

//   useEffect(()=>{
//     dispatch(getOrderDetails(id));
//     if(error){
//       alert.error(error)
//       dispatch(clearErrors())
//     }
//   }, [dispatch, alert, error, id]);

//   const deliveryDetails = deliveryInfo &&
//    `${deliveryInfo.address}, ${deliveryInfo.city},
//    ${deliveryInfo.postalCode}, ${deliveryInfo.country}`;

//    const isPaid =
//    paymentInfo && paymentInfo.status === "succeeded" ? true:false;

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <div className="row d-flex justify-content-between orderdetails">
//             <div className="col-12 col-lg-8 mt-1 order-details">
//               <h1 className="my-5">Order # {order._id}</h1>

//               <h4 className="mb-4">Delivery Info</h4>
//               <p>
//                 <b>Name:</b> {user && user.name}
//               </p>
//               <p>
//                 <b>Phone:</b> {deliveryInfo && deliveryInfo.phoneNo}
//               </p>
//               <p className="mb-4">
//                 <b>Address:</b>
//                 {deliveryDetails}
//               </p>
//               <p>
//                 <b>Amount:</b>{" "}
//                 <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
//                 {finalTotal}
//               </p>

//               <hr />

//               <h4 className="my-4">
//                 Payment :
//                 <span className={isPaid ? "greenColor" : "redColor"}>
//                   <b>{isPaid ? " PAID" : " NOT PAID"}</b>
//                 </span>
//               </h4>
//               <h4 className="my-4">
//                 Order Status :
//                 <span
//                   className={
//                     order.orderStatus &&
//                     String(order.orderStatus).includes(" Delivered")
//                       ? "greenColor"
//                       : "redColor"
//                   }
//                 >
//                   <b>{orderStatus}</b>
//                 </span>
//               </h4>
//               <h4 className="my-4">Order Items:</h4>

//               <hr />
//               <div className="cart-item my-1">
//                 {orderItems &&
//                   orderItems.map((item) => (
//                     <div key={item.fooditem} className="row my-5">
//                       <div className="col-4 col-lg-2">
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           height="45"
//                           width="65"
//                         />
//                       </div>

//                       <div className="col-5 col-lg-5">
//                         <Link to={`/products/${item.product}`}>
//                           {item.name}
//                         </Link>
//                       </div>

//                       <div className="col-4 col-lg-2 mt-4 mt-lg-0">
//                         <p>
//                           <FontAwesomeIcon icon={faIndianRupeeSign} size="xs" />
//                           {item.price}
//                         </p>
//                       </div>

//                       <div className="col-4 col-lg-3 mt-4 mt-lg-0">
//                         <p>{item.quantity} Item(s)</p>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//               <hr />
//             </div>
//           </div>
//         </Fragment>
//       )}
//     </>
//   );
// };

// export default OrderDetails;
