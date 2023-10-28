import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const [keyword,setKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = (e) =>{
        e.preventDefault();

        if(keyword.trim()){
            navigate(`/eats/stores/search/${keyword}`);
        }else{
            navigate("/");
        }
    }




    return (
        <div >
            <form onSubmit={searchHandler} className="mt-3">
                <input
                    type="search"
                    id="search_field"
                    className="form-control"
                    placeholder="Search Your Favorite Restaurant..."
                    onChange={(e)=> setKeyword(e.target.value)}
                />

                <div className="input-group-append">
                    <button id="search_btn" className="btn">
                        <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Search