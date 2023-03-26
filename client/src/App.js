import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";

function App() {
    return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route exact path="/Register" element={<Register />} />
                    <Route exact path="/Reset" element={<Reset />} />
                    <Route exact path="/Dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </div>
    );
}
export default App;