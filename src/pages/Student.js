import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

class Student extends Component {
  state = {
    students: [],
    loading: true,
  };
  async componentDidMount() {
    const res = await axios.get(`http://127.0.0.1:8000/api/v1/students`);
    if (res.data.status === 200) {
      this.setState({
        students: res.data.students,
        loading: false,
      });
    }
  }

  deleteStudent = async (e, id) => {
    const thidClickedFunda = e.currentTarget;
    thidClickedFunda.innerText = "Deleting";
    const res = await axios.delete(
      `http://127.0.0.1:8000/api/v1/delete-student/${id}`
    );
    if (res.data.status === 200) {
      thidClickedFunda.closest("tr").remove();

      Swal.fire({
        icon: "success",
        title: res.data.message,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  render() {
    const headingPage = {
      marginBottom: "50px",
      marginTop: "10px",
    };

    let student_HTML_TABLE = "";

    if (this.state.loading) {
      student_HTML_TABLE = (
        <tr>
          <td colSpan="7">
            <h2>Loading...</h2>
          </td>
        </tr>
      );
    } else {
      student_HTML_TABLE = this.state.students.map((item) => {
        return (
          <tr key={item.id}>
            <td class="px-6 py-4 text-gray-700 whitespace-nowrap">{item.id}</td>
            <td class="px-6 py-4 text-gray-700 whitespace-nowrap">{item.name}</td>
            <td class="px-6 py-4 text-gray-700 whitespace-nowrap">{item.course}</td>
            <td class="px-6 py-4 text-gray-700 whitespace-nowrap">{item.email}</td>
            <td class="px-6 py-4 text-gray-700 whitespace-nowrap">{item.phone}</td>
            <td class="px-6 py-4 text-gray-700 whitespace-nowrap">
              <Link
                className="text-indigo-600 hover:text-indigo-900"
                to={`edit-student/${item.id}`}
              >
                Edit
              </Link>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <button
                className="text-indigo-600 hover:text-indigo-900"
                onClick={(e) => this.deleteStudent(e, item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      });
    }

    return (
      <div className="min-h-screen px-10 py-10 justify-center bg-indigo-50">
        <div className="shadow overflow-hidden border-b border-indigo-500 sm:rounded-lg">
          <div style={headingPage}>
            <h4 className="text-indigo-600">
              <span class="font-bold text-xl mb-2 pl-6">Student Data</span>
              <Link
                to={"add-student"}
                className="float-right pr-6 text-indigo-600 hover:text-indigo-900"
              >
                Add Student
              </Link>
            </h4>
          </div>
          <table className="min-w-full divide-y divide-gray-200">
            <thead class="bg-indigo-600">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Course
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Phone
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Edit
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              {student_HTML_TABLE}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export { Student };
