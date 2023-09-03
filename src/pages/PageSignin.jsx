import { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import configApi from '../config.api';
import { useNavigate } from 'react-router-dom';

export default function PageSignin() {
  let navigate = useNavigate();
  const [user, setUser] = useState({email: "", password: ""});
  
  const onSignin = async () => {
    try {
      
      const response = await fetch(`${configApi.BASE_URL}/users/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      });

      if (!response.ok) {
        console.log(response);
        throw new Error(`Error! status: ${response.status}`);
      }
      
      const content = await response.json();
      localStorage.setItem("token", content.token);
      return navigate("/users");
    } catch (error) {
      alert(error);
    }
    
    
  }

  const onHandleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((values) => ({...values, [name]: value}))
  }
  
  return (
    <Container >
      <Row className='vh-100 d-flex justify-content-center align-items-center'>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title className='mb-3'>Payslip App</Card.Title>    
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control value={user.email} onChange={onHandleChange} name='email' type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  Jangan pernah membagikan email Anda kepada orang lain.
                </Form.Text>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control value={user.password} onChange={onHandleChange} name='password' type="password" placeholder="Password" />
              </Form.Group>
              <div className="d-grid gap-2">
                <Button onClick={onSignin} variant="primary" type="submit" >
                  Sign In
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}