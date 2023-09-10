import { useEffect, useState } from "react";
import SalaryModel from "../models/SalaryModel";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import configApi from "../config.api";
import EmployeeModel from "../models/EmployeeModel";
import WidgetEmployeePreview from "./WidgetEmployeePreview";
import { Col, Row, Table } from "react-bootstrap";
import WidgetCommonHumanDate from "./WidgetCommonHumanDate";


const WidgetSalaryEdit = ({salaryId, eventListener}) => {
  const [show, setShow] = useState(false);
  const [salary, setSalary] = useState(SalaryModel);
  const [employee, setEmployee] = useState(EmployeeModel);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const get = async () => {
    try { 
      const response = await fetch(`${configApi.BASE_URL}/salary/${salaryId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'x-access-token': localStorage.getItem("token")
        }
      });

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      
      const content = await response.json();
      setSalary(content);
      eventListener && eventListener({detail: { content, status: true }})
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      eventListener && eventListener({detail: { error, status: false }})
    }
  }

  const salaryDetailListener = (e) => {
    if (e.detail.status) {
      setEmployee(e.detail.content)
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <FaSearch />
      </Button>

      <Modal show={show} onHide={handleClose} onShow={get} backdrop="static" keyboard={false} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {employee.firstName} {employee.lastName} <br />
            {" "} <WidgetCommonHumanDate date={salary.payrollDate}/>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <WidgetEmployeePreview employeeId={salary.employeeId} eventListener={salaryDetailListener} />
          <Row>
            <Col>
              <Table striped bordered hover>
                <caption style={{captionSide: "top"}}>Other Allowances</caption>
                <thead>
                  <tr>
                    <th>Allowance</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {salary.othersAllowance.map((allowance, index) => (
                    <tr key={index}>
                      <td>{allowance.name}</td>
                      <td>{allowance.total}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
            <Col>
              <Table striped bordered hover>
                <caption style={{captionSide: "top"}}>Other Deductions</caption>
                <thead>
                  <tr>
                    <th>Deduction</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {salary.othersDeduction.map((deduction, index) => (
                    <tr key={index}>
                      <td>{deduction.name}</td>
                      <td>{deduction.total}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <Table striped bordered hover>
                <caption style={{captionSide: "top"}}>Payslip</caption>
                <thead>
                  <tr>
                    <th>Total Allowance</th>
                    <th>Total Deduction</th>
                    <th>Total Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{salary.totalAllowance}</td>
                    <td>{salary.totalDeduction}</td>
                    <td>{salary.totalSalary}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Modal.Body>
       
      </Modal>
    </>
  )
}

export default WidgetSalaryEdit;