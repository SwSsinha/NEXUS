//@ts-ignore
import { Signin } from "./pages/Signin"
//@ts-ignore
import { Signup } from "./pages/Signup"
import { Landing } from "./pages/Landing"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "./pages/dashboard"
import { Profile } from "./pages/Profile"
import { UserProvider } from "./contexts/UserContext"
import { ProtectedRoute } from "./components/ProtectedRoute"

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
