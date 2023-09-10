import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import configApi from '../config.api';
import { Col, InputGroup, Row, Table } from "react-bootstrap";
import { FaTrash } from 'react-icons/fa'
import EmployeeModel from "../models/EmployeeModel";
import AllowanceModel from "../models/AllowanceModel";
import DeductionModel from "../models/DeductionModel";

const WidgetEmployeeEdit = ({ employeeId, eventListener }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [employee, setEmployee] = useState(EmployeeModel)
  const [allowance, setAllowance] = useState(AllowanceModel);
  const [deduction, setDeduction] = useState(DeductionModel);

  const get = async () => {
    try { 
      const response = await fetch(`${configApi.BASE_URL}/employee/${employeeId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'x-access-token': localStorage.getItem("token")
        }
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      
      const content = await response.json();
      setEmployee(content);
      if (eventListener) eventListener({detail: { content, status: true }})
    } catch (error) {
      if (eventListener) eventListener({detail: { error, status: false }})
    }
  }

  const update = async () => {
    try { 
      const response = await fetch(`${configApi.BASE_URL}/employee/${employeeId}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem("token")
        },
        body: JSON.stringify(employee)
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      
      const content = await response.json();
      setEmployee(employeeInit)
      handleClose();
      if (eventListener) eventListener({detail: { content, status: true }})
    } catch (error) {
      if (eventListener) eventListener({detail: { error, status: false }})
    }
  }

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let type = e.target.type;

    if (type === 'number') {
      value = parseInt(value)
    }

    setEmployee((employee) => ({...employee, [name]: value}))
  }

  const handleAllowance = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "total") {
      value = parseInt(value)
    }

    setAllowance((values) => ({...values, [name]: value}));
  }

  const handleDeduction = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    
    if (name === "total") {
      value = parseInt(value)
    }

    setDeduction((values) => ({...values, [name]: value}));
  }

  const addAllowance = () => {
    setEmployee((employee) => {
      let currentEmployee = {...employee};
      let currentAllowance = {...allowance};
      currentEmployee.allowances.push(currentAllowance);
      setAllowance(allowanceAndDeductionInit);
      return currentEmployee;
    })
  }

  const addDeduction = () => {
    setEmployee((employee) => {
      let currentEmployee = {...employee};
      let currentDeduction = {...deduction};
      currentEmployee.deductions.push(currentDeduction);
      setDeduction(allowanceAndDeductionInit);
      return currentEmployee;
    })
  }

  const removeAllowance = (index) => {
    setEmployee((employee) => {
      let currentEmployee = {...employee};
      currentEmployee.allowances.splice(index, 1)
      return currentEmployee;
    })
  }

  const removeDeduction = (index) => {
    setEmployee((employee) => {
      let currentEmployee = {...employee};
      currentEmployee.deductions.splice(index, 1)
      return currentEmployee;
    })
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal 
        show={show} 
        onHide={handleClose} 
        onShow={get} 
        size="lg" 
        backdrop="static" 
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{employee.email}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email'   
                  value={employee.email} 
                  onChange={handleInput} 
                  placeholder="name@example.com" 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" name='firstName' 
                  value={employee.firstName} 
                  onChange={handleInput} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" name='lastName' 
                  value={employee.lastName} 
                  onChange={handleInput} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Department</Form.Label>
                <Form.Control type="text" name='department' 
                  value={employee.department} 
                  onChange={handleInput} 
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Basic Salary</Form.Label>
                <Form.Control type="number" name='basicSalary' 
                  value={employee.basicSalary} 
                  onChange={handleInput} 
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Allowances</Form.Label>
                <InputGroup className="mb-3">
                <Form.Control 
                  placeholder="Name" 
                  name="name" 
                  value={allowance.name} 
                  onChange={handleAllowance} 
                />
                  <Form.Control 
                    placeholder="Price" 
                    name="total" 
                    value={allowance.total} 
                    onChange={handleAllowance} 
                  />
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    onClick={addAllowance}
                  >
                    Add
                  </Button>
                </InputGroup>
              </Form.Group>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Allowance</th>
                    <th>Value</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {employee.allowances.length > 0 && employee.allowances.map((allowance, index) => (
                    <tr key={index}>
                      <td>{allowance.name}</td>
                      <td>{allowance.total}</td>
                        <td>
                          <Button size="sm" variant="secondary" onClick={() => removeAllowance(index)}>
                            <FaTrash />
                          </Button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
                <Form.Group className="mb-3">
                  <Form.Label>Deductions</Form.Label>
                  <InputGroup className="mb-3">
                    <Form.Control placeholder="Name" name="name" value={deduction.name} onChange={handleDeduction} />
                    <Form.Control placeholder="Price" name="total" value={deduction.total} onChange={handleDeduction} />
                    <Button variant="secondary" size="sm" onClick={addDeduction}>
                      Add
                    </Button>
                  </InputGroup>
                </Form.Group>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Deduction</th>
                    <th>Value</th>
                    {eventListener && (
                      <th>#</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {employee.deductions.length > 0 && employee.deductions.map((deduction, index) => (
                    <tr key={index}>
                      <td>{deduction.name}</td>
                      <td>{deduction.total}</td>
                      {eventListener && (
                        <td>
                          <Button size="sm" variant="secondary" onClick={() => removeDeduction(index)}>
                            <FaTrash />
                          </Button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {eventListener && (
            <Button variant="primary" onClick={update}>
              Save
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default WidgetEmployeeEdit;