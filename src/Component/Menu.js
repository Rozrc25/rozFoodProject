import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMenus } from '../Actions/menuACtion';
import { getRestaurants } from '../Actions/restaurantAction';
import Fooditem from './Fooditem';
import { setRestaurantId } from '../Actions/cartActions';


const Menu = (storeId) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    

    const { menus, loading, error } = useSelector((state) => state.menus);

    dispatch(setRestaurantId(id));

    useEffect(() => {
        dispatch(getMenus(id));
        dispatch(getRestaurants());
    }, [dispatch, id, storeId]);

    return (
        <div>
            {
                loading ? (
                    <p>Loading Menu..</p>
                ) : error ? (
                    <p>Error Cant Fetch: {window.alert(error)}</p>
                ) : menus && menus.length > 0 ? (
                    menus.map((menu) => (
                        <div key={menu._id}>
                            <h2>{menu.category}</h2>
                            <hr />
                            {menu.items && menu.items.length > 0 ? (
                                <div className='row'>
                                    {menu.items.map((fooditem) => (
                                        <Fooditem key={fooditem._id} fooditem={fooditem} />
                                    ))}
                                </div>
                            ) : (
                                <p>No Fooditem available</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No Menus avilable</p>
                )}
        </div>
    );
};

export default Menu;