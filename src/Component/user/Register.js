// import React, { useEffect, useState } from "react";
// import { useAlert } from "react-alert";
// import { useDispatch, useSelector } from "react-redux";
// import { register, clearErrors } from "../../Actions/userActions";


// const Register = () => {
//     const alert = useAlert();
//     const [user, setUser] = useState({
//         name: "",
//         email: "",
//         password: "",
//         passwordConfirm: "",
//         phoneNumber: "",
//     });

//     const { name, email, password, passwordConfirm, phoneNumber } = user;

//     const [avatar, setAvatar] = useState("");
//     const [avatarPreview, setAvatarPreview] = useState("/images/images.png");

//     const dispatch = useDispatch();

//     const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

//     //useEffect to handle redir and error alerts
//     useEffect(() => {
//         if (isAuthenticated) {
//             window.location.href = "/"
//         }
//         if (error) {
//             alert.error(error);
//             dispatch(clearErrors());
//         }
//     }, [dispatch, alert, isAuthenticated, error]);

//     const submitHandler = (e) => {
//         e.preventDefault();
//         if (password !== passwordConfirm) {
//             alert.error("password Do Not Match")
//             return;
//         }

//         const formData = new FormData();
//         formData.set("name", name);
//         formData.set("email", email);
//         formData.set("password", password);
//         formData.set("passwordConfirm", passwordConfirm);
//         formData.set("phoneNumber", phoneNumber);
//         formData.set("avatar", avatar);

//         dispatch(register(formData));
//     };

//     const onChange = (e) => {
//         if (e.target.name === "avatar") {
//             const reader = new FileReader();
//             reader.onload = () => {
//                 if (reader.readyState === 2) {
//                     setAvatarPreview(reader.result);
//                     setAvatar(reader.result);
//                 }
//             };
//             reader.readAsDataURL(e.target.files[0])
//         } else {
//             setUser({
//                 ...user, [e.target.name]: e.target.value
//             });
//         }
//     }

//     return (
//         <>
//             <div className="row wrapper">
//                 <div className="col-10 col-lg-5 registration-form">
//                     <form className="shadow-lg"
//                         onSubmit={submitHandler}
//                         encType="multipart/form-data"
//                     >
//                         <h1 className="mb-3">Register</h1>
//                         <div className="form-group">
//                             <label htmlFor="name_field">Name</label>
//                             <input type="text"
//                                 id="name_field"
//                                 className="form-control"
//                                 name="name"
//                                 value={name}
//                                 onChange={onChange} />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="email_field">Email</label>
//                             <input type="email"
//                                 id="email;_field"
//                                 className="form-control"
//                                 name="email"
//                                 value={email}
//                                 onChange={onChange} />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="password_field">Password</label>
//                             <input type="password"
//                                 id="password_field"
//                                 className="form-control"
//                                 name="password"
//                                 value={password}
//                                 onChange={onChange} />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="passwordConfirm_field">Confirm Password </label>
//                             <input type="password"
//                                 id="passwordConfirm_field"
//                                 className="form-control"
//                                 name="passwordConfirm"
//                                 value={passwordConfirm}
//                                 onChange={onChange} />
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="phoneNumber_field">Phone No</label>
//                             <input type="phone"
//                                 id="phoneNumber_field"
//                                 className="form-control"
//                                 name="phoneNumber"
//                                 value={phoneNumber}
//                                 onChange={onChange} />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="avatar_uplode">Avatar</label>
//                             <div className="d-flex align-items-center">
//                                 <div>
//                                     <figure className="avatar mr-3 item-rtl">
//                                         <img
//                                             src={avatarPreview}
//                                             className="rounded-circle"
//                                             alt="Avatar Preview"
//                                         />
//                                     </figure>
//                                 </div>
//                                 <div class="input-group mb-3">
//                                     <input type="file" name="avatar" className="custom-form-control" id="customFile"
//                                         accept="images/*"
//                                         onChange={onChange} />
//                                     <label for="formFile" class="custom-file-lable" htmlFor="customFile">Choose Avatar</label>

//                                 </div>
//                             </div>
//                         </div>
//                         <button className="btn btn-block py-3" id="register_button" type="submit" disabled={loading ? true : false}>Register</button>
//                     </form>
//                 </div>


//             </div>

//         </>
//     )
// }

// export default Register;
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { register, clearErrors } from "../../Actions/userActions";

const Register = () => {
    const alert = useAlert();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phoneNumber: "",
    });

    const { name, email, password, passwordConfirm, phoneNumber } = user;

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState("/images/images.png");

    const dispatch = useDispatch();

    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

    // useEffect to handle redirection and error alerts
    useEffect(() => {
        if (isAuthenticated) {
            window.location.href = "/";
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isAuthenticated, error]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            alert.error("Passwords Do Not Match");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("passwordConfirm", passwordConfirm);
        formData.append("phoneNumber", phoneNumber);
        formData.append("avatar", avatar);

        dispatch(register(formData));
    };

    const onChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setUser({
                ...user,
                [e.target.name]: e.target.value,
            });
        }
    };

    return (
        <>
            <div className="row wrapper">
                <div className="col-10 col-lg-5 registration-form">
                    <form
                        className="shadow-lg"
                        onSubmit={submitHandler}
                        encType="multipart/form-data"
                    >
                        <h1 className="mb-3">Register</h1>
                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input
                                type="text"
                                id="name_field"
                                className="form-control"
                                name="name"
                                value={name}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name="email"
                                value={email}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name="password"
                                value={password}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordConfirm_field">Confirm Password</label>
                            <input
                                type="password"
                                id="passwordConfirm_field"
                                className="form-control"
                                name="passwordConfirm"
                                value={passwordConfirm}
                                onChange={onChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber_field">Phone No</label>
                            <input
                                type="tel"
                                id="phoneNumber_field"
                                className="form-control"
                                name="phoneNumber"
                                value={phoneNumber}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="avatar_upload">Avatar</label>
                            <div className="d-flex align-items-center">
                                <div>
                                    <figure className="avatar mr-3 item-rtl">
                                        <img
                                            src={avatarPreview}
                                            className="rounded-circle"
                                            alt="Avatar Preview"
                                        />
                                    </figure>
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                        type="file"
                                        name="avatar"
                                        className="custom-file-control"
                                        id="avatar_upload"
                                        accept="image/*"
                                        onChange={onChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn btn-block py-3"
                            id="register_button"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;
