import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

class AddStudent extends Component {
  state = {
    name: "",
    course: "",
    email: "",
    phone: "",
    error_list: [],
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  saveStudent = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://127.0.0.1:8000/api/v1/add-student",
      this.state
    );

    if (res.data.status === 200) {
      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 3000,
      });

      this.setState({
        name: "",
        course: "",
        email: "",
        phone: "",
      });

      this.props.history.push("/");
    } else {
      this.setState({
        error_list: res.data.validate_err,
      });
    }
  };

  render() {
    const fontError = {
      fontSize: "12px",
      color: "#F34213",
    };
    const headingPage = {
      marginBottom: "50px",
      marginTop: "10px",
    };

    return (
      <div className="min-h-screen px-10 py-10 justify-center bg-gray-100">
        <div className="shadow overflow-hidden border-b border-indigo-600 sm:rounded-lg ">
          <div style={headingPage}>
            <h4>
              <span class="font-bold text-xl text-indigo-600 mb-2 pl-6">Add Student</span>
              <Link
                to={"/"}
                className="float-right pr-6 text-indigo-600 hover:text-indigo-900"
              >
                Back
              </Link>
            </h4>
          </div>
          <div className="w-full">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={this.saveStudent}
            >
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  name="name"
                  onChange={this.handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={this.state.name}
                />
                <span style={fontError} className="text-danger">
                  {this.state.error_list.name}
                </span>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Student Course
                </label>
                <input
                  type="text"
                  name="course"
                  onChange={this.handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={this.state.course}
                />
                <span style={fontError} className="text-danger">
                  {this.state.error_list.course}
                </span>
              </div>
              <div className="mb-4">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Student Email
                </label>
                <input
                  type="text"
                  name="email"
                  onChange={this.handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={this.state.email}
                />
                <span style={fontError} className="text-danger">
                  {this.state.error_list.email}
                </span>
              </div>
              <div className="form-group mb-3">
                <label className="block text-gray-600 text-sm font-bold mb-2">
                  Student Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  onChange={this.handleInput}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={this.state.phone}
                />
                <span style={fontError} className="text-danger">
                  {this.state.error_list.phone}
                </span>
              </div>
              <div className="form-group mb-3">
                <button
                  type="submit"
                  className="h-10 px-5 text-indigo-600 transition-colors duration-150 border border-indigo-600 rounded-lg focus:shadow-outline hover:bg-indigo-600 hover:text-white"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export { AddStudent };
