import { useEffect, useState } from "react";
import EmployeeModel from "../models/EmployeeModel";
import configApi from "../config.api";
import { Card, Col, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";

const WidgetEmployeePreview = ({ employeeId, eventListener }) => {
  const [employee, setEmployee] = useState(EmployeeModel);

  const get = async () => {
    try { 
      const response = await fetch(`${configApi.BASE_URL}/employee/${employeeId}`, {
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
      setEmployee(content)
      eventListener && eventListener({detail: { content, status: true }})
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error,
        icon: 'error'
      });
      eventListener && eventListener({detail: { content, status: true }})
    }
  }

  useEffect(() => {
    get();

    return () => {}
  }, [employeeId])

  return (
    <>
      <Row>
        <Col>
          <Table striped bordered hover>
            <caption style={{captionSide: "top"}}>Employee</caption>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Basic Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.department}</td>
                <td>{employee.basicSalary}</td>
              </tr>
            </tbody>
          </Table>
        </Col>      
      </Row>
      <Row>
        <Col>  
          <Table striped bordered hover>
            <caption style={{captionSide: "top"}}>Employee Allowances</caption>
            <thead>
              <tr>
                <th>Allowance</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              { employee.allowances && employee.allowances.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.total}</td>
                </tr>
              )) }
            </tbody>
          </Table>
        </Col>
        <Col>  
          <Table striped bordered hover>
            <caption style={{captionSide: "top"}}>Employee Deductions</caption>
            <thead>
              <tr>
                <th>Deduction</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              { employee.deductions && employee.deductions.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.total}</td>
                </tr>
              )) }
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
  
}

export default WidgetEmployeePreview;