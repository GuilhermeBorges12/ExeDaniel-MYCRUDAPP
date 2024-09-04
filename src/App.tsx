import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddLivro from './pages/AddLivro';
import EditLivro from './pages/EditLivro';
function App() {
 return (
 <Router>
 <Routes>
 <Route path="/" element={<Home />} />
 <Route path="/add" element={<AddLivro />} />
 <Route path="/edit/:id" element={<EditLivro />} />
 </Routes>
 </Router>
 );
}
export default App;