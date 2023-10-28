import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurants } from '../Actions/restaurantAction';
import "./CSS/Count.css"


export const CountRestaurant = () => {

    const dispatch = useDispatch();

    const {
        count, pureVegRestaurantsCount, showVegOnly, loading, error } =
        useSelector((state) => state.restaurants);

    useEffect(() => {
        dispatch(getRestaurants());
    }, [dispatch, showVegOnly])

    return (
        <div>
            {loading ? (<p>Loading restaurant count...</p>)
                : error ? (<p>Error:
                    {error}</p>) :
                    (<p className='NumOfRestro'>{showVegOnly ? pureVegRestaurantsCount : count}
                        <span className='Restro'>
                            {
                                showVegOnly ?
                                    pureVegRestaurantsCount === 1
                                        ? " restaurant"
                                        : " restaurants"
                                    : count === 1
                                        ? " restaurant"
                                        : " restaurants"
                            }
                        </span>
                    </p>)
            }
        </div>
    );
}

