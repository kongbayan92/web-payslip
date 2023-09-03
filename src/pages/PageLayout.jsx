import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function PageLayout() {
  return (
    <>
      <Outlet />
    </>
  )
}