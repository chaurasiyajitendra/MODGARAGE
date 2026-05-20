import { Route, Routes } from "react-router"
import Landing from "./pages/Lending"
import Vehicles from "./pages/Vehicles"
import VehicleDetails from "./pages/SingleVehicles"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Vehicles" element={<Vehicles />} />
        <Route path="/single/:id" element={<VehicleDetails />} />
      </Routes>
    </>
  )
}

export default App
