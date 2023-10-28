import React, { useState, useEffect } from 'react';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, forgotPassword } from '../../Actions/userActions';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const alert = useAlert();
    const dispatch = useDispatch();

    // eslint-disable-next-line no-unused-vars
    const { error, loading, message } = useSelector((state) => state.forgotPassword);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (message) {
            alert.success(message);
        }
    }, [dispatch, error, message, alert]);

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.set("email", email);

        dispatch(forgotPassword(formData));
    };
    return (
        <>
            <div className="row wrapper">
                <div className="col-10 col-lg-5"></div>
                <form className='shadow-lg' onSubmit={submitHandler}>
                    <h1 className='mb-3'>Forgot Password</h1>
                    <div className='form-group'>
                        <label htmlFor='email_field'>Enter your Email Address:</label>
                        <input type='email' className='form-control' id='email_field' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <button id='forgot_password_button' type='submit' className='btn btn-block py-3' disabled={loading? true:false}>
                        {/* <i class="fa fa-paper-plane" aria-hidden="true"></i> */} Send Email
                    </button>
                </form>
            </div>

        </>
    )
}

export default ForgotPassword;