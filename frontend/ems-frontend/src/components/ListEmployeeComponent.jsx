
import React, { useEffect, useState } from 'react'
import {
    listEmployees,
    deleteEmployee
} from '../service/employeeService'

import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {

    const [employees, setEmployees] = useState([])

    const navigator = useNavigate()

    useEffect(() => {
        getAllEmployees()
    }, [])

    function getAllEmployees() {

        listEmployees()
            .then((response) => {
                console.log("Backend data:", response.data)
                setEmployees(response.data)
            })
            .catch((error) => {
                console.error(
                    "Error while fetching employees:",
                    error
                )
            })
    }

    function addNewEmployee() {
        navigator('/add-employee')
    }

    function updateEmployee(id) {
        navigator('/edit-employee/' + id)
    }

    function removeEmployee(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        )

        if (confirmDelete) {

            deleteEmployee(id)
                .then((response) => {

                    console.log(response.data)

                    getAllEmployees()

                })
                .catch((error) => {

                    console.error(
                        "Error while deleting employee:",
                        error
                    )

                })
        }
    }

    return (
        <div className="container">

            <h2 className="text-center">
                List of Employee
            </h2>

            <button
                className="btn btn-primary mb-2"
                onClick={addNewEmployee}
            >
                Add Employee
            </button>

            <table className="table table-striped table-bordered">

                <thead>
                    <tr>
                        <th>Employee Id</th>
                        <th>Employee First Name</th>
                        <th>Employee Last Name</th>
                        <th>Employee Email Id</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {employees.map((employee) => (

                        <tr key={employee.id}>

                            <td>
                                {employee.id}
                            </td>

                            <td>
                                {employee.firstName}
                            </td>

                            <td>
                                {employee.lastName}
                            </td>

                            <td>
                                {employee.email}
                            </td>

                            <td>

                                <button
                                    className="btn btn-info me-2"
                                    onClick={() =>
                                        updateEmployee(employee.id)
                                    }
                                >
                                    Update
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={() =>
                                        removeEmployee(employee.id)
                                    }
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    )
}

export default ListEmployeeComponent

