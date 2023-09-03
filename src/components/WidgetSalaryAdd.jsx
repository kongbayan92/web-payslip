import { useState } from "react";
import SalaryModel from "../models/SalaryModel";
import EmployeeModel from "../models/EmployeeModel";
import { Button, Card, Col, Form, InputGroup, Modal, Row, Table } from "react-bootstrap";
import WidgetEmployeeChoice from "./WidgetEmployeeChoice";

const WidgetSalaryAdd = ({ eventListener }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [salary, setSalary] = useState(SalaryModel);
  const [employee, setEmployee] = useState(EmployeeModel);

  const employeeChoiceListener = (e) => {
    setEmployee(e.detail.employee)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Pay Slip
      </Button>

      <Modal show={show} onHide={handleClose} size="lg" backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Pay Slip</Modal.Title>
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
                <Form.Control placeholder="Name" name="name" />
                  <Form.Control placeholder="Price" name="total" />
                  <Button variant="secondary" size="sm">
                    Add
                  </Button>
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Other Deductions</Form.Label>
                <InputGroup className="mb-3">
                <Form.Control placeholder="Name" name="name" />
                  <Form.Control placeholder="Price" name="total" />
                  <Button variant="secondary" size="sm">
                    Add
                  </Button>
                </InputGroup>
              </Form.Group>
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