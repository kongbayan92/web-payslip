import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./pages/PageLayout";
import PageSignin from "./pages/PageSignin";
import PageUsers from "./pages/PageUsers";
import PageEmployees from "./pages/PageEmployees";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<PageSignin />} />
          <Route path="/users" element={<PageUsers />} />
          <Route path="/employees" element={<PageEmployees />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
