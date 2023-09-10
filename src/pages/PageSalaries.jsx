import { useEffect, useState } from "react";
import configApi from "../config.api";
import WidgetNavbar from "../components/WidgetNavbar";
import { Col, Container, Row, Table } from "react-bootstrap";
import WidgetSalaryAdd from "../components/WidgetSalaryAdd";

import WidgetSalaryEdit from "../components/WidgetSalaryEdit";

const PageSalaries = () => {
  const [salaries, setSalaries] = useState([]);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/salary`, {
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
      setSalaries(content);
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    get();
    return () => {};
  }, []);

  const salaryAddListener = (e) => {
    if (e.detail.status) {
      get();
    } else {
      alert(e.detail.error)
    }
  }

  return (
    <>
      <WidgetNavbar />
      <Container className="mt-4">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Salaries</h3>
            <WidgetSalaryAdd eventListener={salaryAddListener} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>Employee ID</th>
                  <th>Payroll Date</th>
                  <th>Total Allowance</th>
                  <th>Total Deduction</th>
                  <th>Total Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {salaries.length > 0 && salaries.map((salary) => (
                  <tr key={salary._id}>
                    <td>{salary.employeeId}</td>
                    <td>{salary.payrollDate}</td>
                    <td>{salary.totalAllowance}</td>
                    <td>{salary.totalDeduction}</td>
                    <td>{salary.totalSalary}</td>
                    <td>
                      <WidgetSalaryEdit salaryId={salary._id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default PageSalaries;