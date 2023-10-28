import React, { useEffect } from "react";
import { getRestaurants, sortByRatings, sortByReviews, toggleVegOnly } from "../Actions/restaurantAction";
import { Restaurant } from "./Restaurant";
import { Loader } from "./Loader";
import { Message } from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { CountRestaurant } from "./CountRestaurant";
import { useParams } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const {
    loading: restaurantsLoading,
    error: restaurantsError,
    restaurants,
    showVegOnly,
  } = useSelector((state) => state.restaurants);

  useEffect(() => {
    if (restaurantsError) {
      return alert.error(restaurantsError);
    }
    dispatch(getRestaurants(keyword));
  }, [dispatch, restaurantsError, keyword]);


  const handleToggleVegOnly = () => {
    dispatch(toggleVegOnly);
  };

  const handleSortByRatings = () => {
    dispatch(sortByRatings());
  };

  const handleSortByReviews = () => {
    dispatch(sortByReviews());
  };

  return (
    <>
      <CountRestaurant />
      {restaurantsLoading ? (
        <Loader />
      ) : restaurantsError ? (
        <Message variant="danger"> {restaurantsError}</Message>
      ) : (
        <>

          <section>
            <div className="sort">
              <button className="sort_veg p-3" onClick={handleToggleVegOnly} >{showVegOnly ? "Show ALL" : "Pure Veg"}</button>
              <button className="sort_rev p-3" onClick={handleSortByReviews}>Sort By Reviews</button>
              <button className="sort_rate p-3" onClick={handleSortByRatings}>Sort By Ratings</button>
            </div>
            <div className="row mt-4">

              {restaurants && restaurants.restaurants ? (restaurants.restaurants.map((restaurant) =>
                !showVegOnly || (showVegOnly && restaurant.isVeg) ? (
                  <Restaurant key={restaurant._id} restaurant={restaurant} />
                ) : null
              )
              ) : (
                <Message variant='info'>No Restaurant Found.</Message>
              )}

            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;