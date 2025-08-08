//@ts-ignore
import { Signin } from "./pages/Signin"
//@ts-ignore
import { Signup } from "./pages/Signup"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { BACKEND_URL } from "./config"
import { Profile } from "./pages/Profile"
function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element = {<Signup/>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
}

export default App
