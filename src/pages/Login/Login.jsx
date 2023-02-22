import React, { useState } from 'react'
import { ReactComponent as Logo } from '../../assets/logo.svg'
import { ReactComponent as EyeOPen } from "../../assets/eye_open.svg";
import { ReactComponent as EyeClose } from "../../assets/eye_close.svg";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth-slice'
import LoginImage from '../../assets/Login.png'
import customerServices from '../../services/customerServices';
import toastPopup from '../../helpers/toastPopup'
import Joi from 'joi';
import './Login.scss'

export default function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  let type = "password"

  const [customerData, setCustomerData] = useState({
    email: "",
    password: ""
  })

  function getCustomerData(e) {
    let newCustomerData = { ...customerData }
    newCustomerData[e.target.name] = e.target.value
    setCustomerData(newCustomerData)
  }

  function loginCustomerValidation(customerData) {
    const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .required()
        .messages({
          "string.base": "please enter a valid password",
          "any.required": "password must be entered",
          "string.empty": "password cannot be empty"
        })
    });
    return schema.validate(customerData);
  }

  async function loginCustomerHandler(e) {
    e.preventDefault();
    let validationResult = loginCustomerValidation(customerData);
    setLoading(true);
    if (validationResult?.error) {
      setLoading(false);
      toastPopup.error(validationResult?.error?.details[0]?.message)
    } else {
      setLoading(true);
      try {
        const { data } = await customerServices.loginCustomer(customerData)
        if (data.message === "Success") {
          setLoading(false);
          dispatch(
            authActions.login({
              customerToken: data.token
            })
          );
          navigate("/");
          toastPopup.success(data.message)
        }
      } catch (error) {
        setLoading(false);
        toastPopup.error(error.response.data.message)
      }
    }
  };

  return <>
    <div className="row">
      <div className="col-md-6">
        <div className="login-data">
          <div className="logo">
            <Logo className='pavane-logo' />
          </div>
          <h1>Login</h1>
          <form onSubmit={loginCustomerHandler}>
            <div className="input-label-container">
              <input
                className='login-input form-control'
                type="email"
                name="email"
                id="email"
                placeholder=' '
                onChange={getCustomerData}
              />
              <label htmlFor="email" className='login-label'>Email</label>
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
                className='login-input form-control'
                type={!type === "password" ? type : showPassword ? "text" : type}
                name="password"
                id="password"
                placeholder=' '
                onChange={getCustomerData}
              />
              <label htmlFor="password" className='login-label'>Password</label>
            </div>
            <div className="button-container">
              <button className='login-button'>
                {loading ?
                  (<i className="fas fa-spinner fa-spin "></i>)
                  : "Login"}
              </button>
            </div>
          </form>
          <p>Don't have an account? <Link to={"/sign-up"}>Sign up</Link> now!</p>
        </div>
      </div>
      <div className="col-md-6">
        <div className="login-image">
          <img src={LoginImage} alt="Login background image" />
        </div>
      </div>
    </div>
  </>
}
