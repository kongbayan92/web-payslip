import { useEffect, useState } from "react"
import configApi from "../config.api";
import { Col, Container, Row, Table } from "react-bootstrap";
import WidgetUserAdd from "../components/WidgetUserAdd";
import WidgetNavbar from "../components/WidgetNavbar";
import WidgetUserEdit from "../components/WidgetUserEdit";

export default function PageUsers() {
  const [users, setUsers] = useState([]);

  const get = async () => {
    try {
      const response = await fetch(`${configApi.BASE_URL}/users`, {
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
      setUsers(content);
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    get();
    return () => {}
  }, [])

  const userAddListener = (e) => {
    if (e.detail.status) {
      get();
    } else {
      alert(e.detail.error)
    }
  }

  const userDetailListener = (e) => {
    if (e.detail.status) {
      get();
    } else {
      alert(e.detail.error);
    }
  }

  return (
    <>
      <WidgetNavbar />
      <Container className="mt-4">
        <Row>
          <Col className="d-flex justify-content-between align-items-center">
            <h3>Users</h3>
            <WidgetUserAdd eventListener={userAddListener} />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover className="mt-4">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                { users.length > 0  && users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <WidgetUserEdit userId={user._id} eventListener={userDetailListener} />
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