import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { BASEURL, callApi, setSession } from '../api';

class Login extends Component {
  constructor(){
    super();
    this.signin = this.signin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signinResponse = this.signinResponse.bind(this);
    this.state = {
      errorMessage: '',
      email: '',
      password: ''
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  }

  forgotPassword = () => {
    const { email } = this.state;
    if(email === ""){
      this.setState({ errorMessage: "Please enter your email to reset password." });
      return;
    }
    let url = `${BASEURL}users/forgotpassword/${email}`;
    callApi("GET", url, "", this.forgotPasswordResponse);
  }

  forgotPasswordResponse = (res) => {
    let data = res.split('::');
    this.setState({ errorMessage: data[1] });
  }

  signin() {
    const { email, password } = this.state;
    if(email === "" || password === ""){
      this.setState({ errorMessage: "Email and password are required." });
      return;
    }
    let data = JSON.stringify({ email, password });
    callApi("POST", BASEURL + "users/signin", data, this.signinResponse);
  }

  signinResponse(res) {
    let rdata = res.split('::');
    if(rdata[0] === '200'){
      setSession("csrid", rdata[1], 1);
      window.location.replace("/restaurants");
    } else {
      this.setState({ errorMessage: rdata[1] });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.signin();
  }

  render() {
    return (
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login to QuickBite</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 hover:border-orange-300 transition-colors duration-300"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
              <div className="mt-1 text-right">
                <button type="button" onClick={this.forgotPassword} className="text-sm text-orange-500 hover:text-orange-600">
                  Forgot Password?
                </button>
              </div>
            </div>
            {this.state.errorMessage && (
              <div className="mb-4 text-center text-red-500">
                {this.state.errorMessage}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-orange-500 hover:text-orange-600">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Login;