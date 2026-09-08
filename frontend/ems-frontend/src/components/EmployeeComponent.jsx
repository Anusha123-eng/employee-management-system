import React, { useEffect, useState } from 'react'
import {
    createEmployee,
    getEmployee,
    updateEmployee
} from '../service/employeeService'

import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState({})

    const navigator = useNavigate()

    const { id } = useParams()

    useEffect(() => {

        if (id) {

            getEmployee(id)
                .then((response) => {

                    setFirstName(response.data.firstName)
                    setLastName(response.data.lastName)
                    setEmail(response.data.email)

                })
                .catch((error) => {
                    console.error("Error fetching employee:", error)
                })
        }

    }, [id])


    function handleFirstName(e) {
        setFirstName(e.target.value)
    }

    function handleLastName(e) {
        setLastName(e.target.value)
    }

    function handleEmail(e) {
        setEmail(e.target.value)
    }


    function saveEmployee(e) {

        e.preventDefault()

        const validationErrors = {}

        // First Name validation
        if (!firstName.trim()) {
            validationErrors.firstName = 'First Name is required'
        }

        // Last Name validation
        if (!lastName.trim()) {
            validationErrors.lastName = 'Last Name is required'
        }

        // Email validation
        if (!email.trim()) {
            validationErrors.email = 'Email is required'
        }

        // If there are validation errors
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        // Clear previous errors
        setErrors({})


        const employee = {
            firstName: firstName,
            lastName: lastName,
            email: email
        }


        if (id) {

            // UPDATE employee

            updateEmployee(id, employee)
                .then((response) => {

                    console.log(response.data)

                    navigator('/employees')

                })
                .catch((error) => {

                    console.error(
                        "Error updating employee:",
                        error
                    )

                })

        } else {

            // CREATE employee

            createEmployee(employee)
                .then((response) => {

                    console.log(response.data)

                    navigator('/employees')

                })
                .catch((error) => {

                    console.error(
                        "Error creating employee:",
                        error
                    )

                })
        }
    }


    return (

        <div className="container">

            <div className="row">

                <div className="card">

                    <h2 className="text-center">

                        {id ? 'Update Employee' : 'Add Employee'}

                    </h2>

                    <div className="card-body">

                        <form onSubmit={saveEmployee}>

                            {/* First Name */}

                            <div className="form-group mb-2">

                                <label className="form-label">
                                    First Name:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Employee First Name"
                                    name="firstName"
                                    value={firstName}
                                    className="form-control"
                                    onChange={handleFirstName}
                                />

                                {errors.firstName && (

                                    <div className="text-danger">
                                        {errors.firstName}
                                    </div>

                                )}

                            </div>


                            {/* Last Name */}

                            <div className="form-group mb-2">

                                <label className="form-label">
                                    Last Name:
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter Employee Last Name"
                                    name="lastName"
                                    value={lastName}
                                    className="form-control"
                                    onChange={handleLastName}
                                />

                                {errors.lastName && (

                                    <div className="text-danger">
                                        {errors.lastName}
                                    </div>

                                )}

                            </div>


                            {/* Email */}

                            <div className="form-group mb-2">

                                <label className="form-label">
                                    Email:
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter Employee Email"
                                    name="email"
                                    value={email}
                                    className="form-control"
                                    onChange={handleEmail}
                                />

                                {errors.email && (

                                    <div className="text-danger">
                                        {errors.email}
                                    </div>

                                )}

                            </div>


                            {/* Submit Button */}

                            <button
                                type="submit"
                                className="btn btn-success"
                            >

                                {id ? 'Update' : 'Submit'}

                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default EmployeeComponent