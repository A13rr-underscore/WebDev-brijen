import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <NavBar/>
    <Routes>
    <Route path = "/about" element={<About />}/>
    <Route path = "/contact" element={<Contact/>}/>
    <Route path = "/" element={<Home/>}/>
    <Route path = "*" element={<ErrorFound/>}/>
    </Routes>
      </BrowserRouter>
  );
}
export default App;
