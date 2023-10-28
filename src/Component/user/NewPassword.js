import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, resetPassword } from '../../Actions/userActions';
import { useParams, useNavigate } from 'react-router-dom';

const NewPassword = () => {

    const [password, setPassword] = useState("");
    const [passwordConfirm, setpasswordConfirm] = useState("");
    const alert = useAlert();
    const dispatch = useDispatch();

    const { error, success } = useSelector((state) => state.forgotPassword);

    const { token } = useParams();
    const navigate = useNavigate();



    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated successfully");
            navigate("/users/login");
        }
    }, [dispatch, error, success, alert, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("Password", password);
        formData.set("PasswordConfirm", passwordConfirm);


        dispatch(resetPassword(token,formData));
    };

    return (
        <>
        <div className="row wrapper">
            <div className="col-10 col-lg-5"></div>
            <form className='shadow-lg' onSubmit={submitHandler}>
                <h1 className='mb-3'>New Password</h1>
                <div className='form-group'>
                    <label htmlFor='password_field'>Enter your Password:</label>
                    <input type='password' className='form-control' id='password_field' 
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='form-group'>
                    <label htmlFor='confirm_password_field'>Confirm Password:</label>
                    <input type='password' className='form-control' id='confirm_password_field' 
                    value={passwordConfirm} onChange={(e) => setpasswordConfirm(e.target.value)} />
                </div>
                <button id='new_password_button' type='submit' className='btn btn-block py-3'>
                    <i class="fa fa-paper-plane" aria-hidden="true"></i> Set Password
                </button>
            </form>
        </div>

    </>
    )
}

export default NewPassword;