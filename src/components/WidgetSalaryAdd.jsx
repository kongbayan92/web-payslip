import { useMemo, useState } from "react";
import SalaryModel from "../models/SalaryModel";
import EmployeeModel from "../models/EmployeeModel";
import { Button, Card, Col, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import WidgetEmployeeChoice from "./WidgetEmployeeChoice";
import AllowanceModel from "../models/AllowanceModel";
import DeductionModel from "../models/DeductionModel";
import { FaTrash } from "react-icons/fa";

const WidgetSalaryAdd = ({ eventListener }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [salary, setSalary] = useState(SalaryModel);
  const [otherAllowance, setOtherAllowance] = useState(AllowanceModel);
  const [otherDeduction, setOtherDeduction] = useState(DeductionModel);
  const [employee, setEmployee] = useState(EmployeeModel);
  const [totalSalary, setTotalSalary] = useState(0); 

  const employeeChoiceListener = (e) => {
    setEmployee(e.detail.employee)
    setSalary((values) => ({...values, employeeId: e.detail.employee._id}))
  }

  const handleOtherAllowance = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'total') {
      value = parseInt(value);
    }

    setOtherAllowance((values) => ({...values, [name]: value}));
  }

  const handleOtherDeduction = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'total') {
      value = parseInt(value);
    }

    setOtherDeduction((values) => ({...values, [name]: value}));
  }

  const addOtherAllowance = () => {
    setSalary((values) => {
      let currentSalary = {...salary};
      let currentOtherAllowance = {...otherAllowance};
      currentSalary.othersAllowance.push(currentOtherAllowance);
      setOtherAllowance(AllowanceModel);
      return currentSalary;
    })
  }

  const addOtherDeduction = () => {
    setSalary((values) => {
      let currentSalary = {...salary};
      let currentOtherDeduction = {...otherDeduction};
      currentSalary.othersDeduction.push(currentOtherDeduction);
      setOtherDeduction(DeductionModel);
      return currentSalary;
    })
  }

  const removeOthersAllowance = (index) => {
    setSalary((salary) => {
      let currentSalary = {...salary};
      currentSalary.othersAllowance.splice(index, 1)
      return currentSalary;
    })
  }

  const removeOthersDeduction = (index) => {
    setSalary((salary) => {
      let currentSalary = {...salary};
      currentSalary.othersDeduction.splice(index, 1)
      return currentSalary;
    })
  }

  useMemo(() => {
    let total = () => {
      let totalAllowances = 0;
      let totalDeductions = 0;
      
      // sum all others allowance
      if (salary.othersAllowance.length > 0) {
        totalAllowances += salary.othersAllowance.reduce((t, item) => t + item.total, 0);
      }

      // sum all others deduction
      if (salary.othersDeduction.length > 0) {
        totalDeductions += salary.othersDeduction.reduce((t, item) => t + item.total, 0);
      }

      if (employee._id) {
        // sum all allowances
        totalAllowances += employee.allowances.reduce((t, item) => t + item.total, 0);
        // sum all deductions
        totalDeductions += employee.deductions.reduce((t, item) => t + item.total, 0);
        setTotalSalary(employee.basicSalary + (totalAllowances - totalDeductions));
      }

    }

    total()
    return () => {}
  }, [salary, employee]);

  const payslip = async () => {

  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Pay Slip
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Pay Slip {totalSalary}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <WidgetEmployeeChoice eventListener={employeeChoiceListener} />
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Other Allowances</Form.Label>
                <InputGroup className="mb-3">
                <Form.Control placeholder="Name" name="name" value={otherAllowance.name} onChange={handleOtherAllowance} />
                  <Form.Control placeholder="Price" name="total" value={otherAllowance.total} onChange={handleOtherAllowance} />
                  <Button variant="secondary" size="sm" onClick={addOtherAllowance}>
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
                  {salary.othersAllowance.length > 0 && salary.othersAllowance.map((allowance, index) => (
                    <tr key={index}>
                      <td>{allowance.name}</td>
                      <td>{allowance.total}</td>
                      <td>
                        <Button size="sm" variant="secondary" onClick={() => removeOthersAllowance(index)}>
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Form.Group className="mb-3">
                <Form.Label>Other Deductions</Form.Label>
                <InputGroup className="mb-3">
                <Form.Control placeholder="Name" name="name" value={otherDeduction.name} onChange={handleOtherDeduction} />
                  <Form.Control placeholder="Price" name="total" value={otherDeduction.total} onChange={handleOtherDeduction} />
                  <Button variant="secondary" size="sm" onClick={addOtherDeduction}>
                    Add
                  </Button>
                </InputGroup>
              </Form.Group>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Deduction</th>
                    <th>Value</th>
                    <th>#</th>
                  </tr>
                </thead>
                <tbody>
                  {salary.othersDeduction.length > 0 && salary.othersDeduction.map((deduction, index) => (
                    <tr key={index}>
                      <td>{deduction.name}</td>
                      <td>{deduction.total}</td>
                      <td>
                        <Button size="sm" variant="secondary" onClick={() => removeOthersDeduction(index)}>
                          <FaTrash />
                        </Button>
                      </td>
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
          <Button variant="primary" onClick={() => {}}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default WidgetSalaryAdd;