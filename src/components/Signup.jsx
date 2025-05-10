import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Signup extends Component {
  constructor(props) {
    super(props);
    this.userRegistration = this.userRegistration.bind(this);
    this.getResponse = this.getResponse.bind(this);
  }

  showsignup(){
    let popup=document.getElementById('popup');
    let signin=document.getElementById('signin');
    let signup=document.getElementById('signup');
    let popupHeader=document.getElementById('popupHeader');
    popupHeader.innerHTML="Sign Up";
    signin.style.display="none";
    signup.style.display="block";
    popup.style.display="block"; 

    let fullname=document.getElementById("fullname");
    let email=document.getElementById("email");
    let role=document.getElementById("role");
    let signuppassword=document.getElementById("signuppassword");
    let confirmpassword=document.getElementById("confirmpassword");
    fullname.value="";
    email.value="";
    role.value="";
    signuppassword.value="";
    confirmpassword.value="";
  }

  closesignin(event){
    if(event.target.id==='popup'){
      let popup=document.getElementById('popup');
      popup.style.display='none';
    }
  }

  async userRegistration() {
    let fullname = document.getElementById("fullname");
    let email = document.getElementById("email");
    let role = document.getElementById("role");
    let signuppassword = document.getElementById("signuppassword");
    let confirmpassword = document.getElementById("confirmpassword");

    fullname.style.border = "";
    email.style.border = "";
    role.style.border = "";
    signuppassword.style.border = "";
    confirmpassword.style.border = "";

    // Validation checks
    if(fullname.value==="") {
      fullname.style.border = "1px solid red";
      fullname.focus();
      return;
    }
    if(email.value==="") {
      email.style.border = "1px solid red";
      email.focus();
      return;
    }
    if(role.value==="") {
      role.style.border = "1px solid red";
      role.focus();
      return;
    }
    if(signuppassword.value==="") {
      signuppassword.style.border = "1px solid red";
      signuppassword.focus();
      return;
    }
    if(confirmpassword.value==="") {
      confirmpassword.style.border = "1px solid red";
      confirmpassword.focus();
      return;
    }
    if(signuppassword.value !== confirmpassword.value) {
      signuppassword.style.border = "1px solid red";
      signuppassword.focus();
      return;
    }

    const data = {
      fullname: fullname.value,
      email: email.value,
      role: role.value,
      password: signuppassword.value
    };

    try {
      const response = await fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.text();
      this.getResponse(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  getResponse(res){
    let resp = res.split('::');
    alert(resp[1]);
    if (resp[0] === "200") {
      let signin = document.getElementById("signin");
      let signup = document.getElementById("signup");
      signin.style.display = "block";
      signup.style.display = "none";
    }
  }
  render() {
    return (
      <div className="max-w-md mx-auto mt-10">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                Are you a
              </label>
              <select
                id="role"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              >
                <option value="">Select role</option>
                <option value="1">Admin</option>
                <option value="2">Restaurant</option>
                <option value="3">Employee</option>
                <option value="4">User</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="signuppassword">
                Password
              </label>
              <input
                type="password"
                id="signuppassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmpassword">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmpassword"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>

            <button
              type="button"
              onClick={this.userRegistration}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-500 hover:text-orange-600">
              Login
            </Link>
          </p>
        </div>
      </div>
    )
  }
}

export default Signup;