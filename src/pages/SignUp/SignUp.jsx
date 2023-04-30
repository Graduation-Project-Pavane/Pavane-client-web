import React, { useState } from 'react'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as EyeOPen } from "../../assets/eye_open.svg";
import { ReactComponent as EyeClose } from "../../assets/eye_close.svg";
import LoginImage from '../../assets/Login.png'
import { Link, useNavigate } from 'react-router-dom'
import Joi from 'joi';
import toastPopup from '../../helpers/toastPopup';
import customerServices from '../../services/customerServices';
import './SignUp.scss'

export default function SignUp() {

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let type = "password"

  const [customerData, setCustomerData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    dateOfBirth: "",
    gender: "",
    location: ""
  })

  function getCustomerData(e) {
    let newCustomerData = { ...customerData }
    newCustomerData[e.target.name] = e.target.value
    setCustomerData(newCustomerData)
  }

  function signupCustomerValidation(customerData) {
    const schema = Joi.object({
      fname: Joi.string()
        .min(3)
        .max(30)
        .required(),
      lname: Joi.string()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .required()
        .pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        .messages({
          "string.base": "please enter a valid password",
          "any.required": "password must be entered",
          "string.empty": "password cannot be empty",
          "string.pattern.base": "Wrong Password(Capital letter, small letter, one special character, and at least length of 8.)"
        }),
      confirm_password: Joi.ref('password'),
      phone: Joi.string().required(),
      dateOfBirth: Joi.string().required(),
      gender: Joi.string().required(),
      location: Joi.string().required()
    });
    return schema.validate(customerData);
  }

  async function signupCustomerHandler(e) {
    e.preventDefault();
    let validationResult = signupCustomerValidation(customerData);
    setLoading(true);
    if (validationResult?.error) {
      setLoading(false);
      toastPopup.error(validationResult?.error?.details[0]?.message)
    } else {
      setLoading(true);

      const finalCustomerData = {
        name: customerData.fname,
        email: customerData.email,
        password: customerData.password,
        phone: customerData.phone,
        dateOfBirth: customerData.dateOfBirth,
        gender: customerData.gender,
        location: customerData.location,
      }

      try {
        setLoading(true)
        const { data } = await customerServices.addCustomer(finalCustomerData)
        if (data.success) {
          setLoading(false);
          navigate("/loginCustomer");
          toastPopup.success("Signup completed successfully")
        }
        // else {
        //   console.log(data);
        // }
      } catch (error) {
        setLoading(false);
        console.log(error);
        toastPopup.error(error.message)
      }
    }
  };

  return <>
    <div className="row">
      <div className="col-md-6">
        <div className="signup-data">
          <div className="logo">
            <Logo className='pavane-logo' />
          </div>
          <h1>Welcome to <span>PAVANE.</span></h1>
          <p>Already a member? <Link to={"/loginCustomer"}>Login</Link></p>
          <form onSubmit={signupCustomerHandler}>
            <div className="wrapper">
              <div className="input-label-half-container">
                <input
                  className='signup-input form-control'
                  type="fname"
                  name="fname"
                  id="fname"
                  placeholder=' '
                  onChange={getCustomerData}
                />
                <label htmlFor="fname" className='signup-label'>First name</label>
              </div>

              <div className="input-label-half-container">
                <input
                  className='signup-input form-control'
                  type="lname"
                  name="lname"
                  id="lname"
                  placeholder=' '
                  onChange={getCustomerData}
                />
                <label htmlFor="lname" className='signup-label'>Last name</label>
              </div>
            </div>

            <div className="input-label-container">
              <input
                className='signup-input form-control'
                type="email"
                name="email"
                id="email"
                placeholder=' '
                onChange={getCustomerData}
              />
              <label htmlFor="email" className='signup-label'>Email</label>
            </div>

            <div className="input-label-container">
              {type === "password" ? (
                showPassword ? (
                  <EyeOPen
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                    className="show-password-icon"
                  />
                ) : (
                  <EyeClose
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                    className="show-password-icon"
                  />
                )
              ) : null}
              <input
                className='signup-input form-control'
                type={!type === "password" ? type : showPassword ? "text" : type}
                name="password"
                id="password"
                placeholder=' '
                onChange={getCustomerData}
              />
              <label htmlFor="password" className='signup-label'>Password</label>
            </div>

            <div className="input-label-container">
              {type === "password" ? (
                showPassword ? (
                  <EyeOPen
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                    className="show-password-icon"
                  />
                ) : (
                  <EyeClose
                    onClick={() => {
                      setShowPassword((prev) => !prev);
                    }}
                    className="show-password-icon"
                  />
                )
              ) : null}
              <input
                className='signup-input form-control'
                type={!type === "password" ? type : showPassword ? "text" : type}
                name="confirm_password"
                id="confirm_password"
                placeholder=' '
                onChange={getCustomerData}
              />
              <label htmlFor="confirm_password" className='signup-label'>Confirm password</label>
            </div>

            <div className="input-label-container">
              <input
                className='signup-input form-control'
                type="number"
                name="phone"
                id="phone"
                placeholder=' '
                onChange={getCustomerData}
              />
              <label htmlFor="phone" className='signup-label'>Phone</label>
            </div>

            <div className="input-label-container">
              <i className="fa-solid fa-angle-down"></i>
              <select
                className='signup-input form-control'
                name="location"
                id="location"
                onChange={getCustomerData}
              >
                <option defaultValue='Location'>-- Location --</option>
                <option value="Alexandria">Alexandria</option>
                <option value="Cairo">Cairo</option>
                <option value="Giza">Giza</option>
              </select>
              <label htmlFor="location" className='signup-label'>Location</label>
            </div>

            <div className="wrapper">
              <div className="input-label-half-container">
                <i className="fa-solid fa-angle-down"></i>
                <select
                  className='signup-input form-control'
                  name="gender"
                  id="gender"
                  onChange={getCustomerData}
                >
                  <option defaultValue='Gender'>-- Gender --</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <label htmlFor="gender" className='signup-label'>Gender</label>
              </div>

              <div className="input-label-half-container">
                <i className="fa-regular fa-calendar-days"></i>
                <input
                  className='signup-input form-control'
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  placeholder=' '
                  onChange={getCustomerData}
                />
                <label htmlFor="dateOfBirth" className='signup-label'>Date of Birth</label>
              </div>
            </div>
            <div className="button-container">
              <button className='signup-button'>
                {loading ?
                  (<i className="fas fa-spinner fa-spin "></i>)
                  : "Create account"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-md-6">
        <div className="signup-image">
          <img src={LoginImage} alt="signup background image" />
        </div>
      </div>
    </div>
  </>
}
