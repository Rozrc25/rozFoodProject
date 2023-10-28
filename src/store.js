import {
    legacy_createStore as
        createStore,
    combineReducers,
    applyMiddleware,
    compose
} from "redux";
import thunk from "redux-thunk";
import { restaurantReducer } from "./Reducers/restaurantReducer";
import { menuReducer } from "./Reducers/menuReducer";
import { cartReducer } from "./Reducers/cartReducer";
import { authReducer, forgotPasswordReducer, userReducer } from "./Reducers/userReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./Reducers/orderReducers";


const reducer = combineReducers({
    restaurants: restaurantReducer,
    menus: menuReducer,
    cart: cartReducer,
    auth:authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
});

let initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItem")
            ? JSON.parse(localStorage.getItem('cartItem')) : [],
        deliveryInfo: localStorage.getItem("deliveryInfo")
            ? JSON.parse(localStorage.getItem("deliveryInfo")) : [],
    }
};


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middleware))
);
export default store;