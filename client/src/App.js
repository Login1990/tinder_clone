import logo from './logo.svg';
import './App.css';
import Register from './components/Register';
import Front from './components/Front'
import Login from "./components/Login"
import ChatComponent from './components/ChatComponent';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Layout from './components/Layout';
import Welcome from './components/Welcome';


function App() {
  return (
    /*<div className="App">
      <Register/>
    </div>*/
    <Router>
      <Layout>
        <Routes>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/chats" element={<ChatComponent/>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path="/swipe" element={<Front></Front>}></Route>
          <Route path="/" element={<Welcome/>}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
