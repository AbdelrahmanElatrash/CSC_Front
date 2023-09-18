import './App.css';
import Home from './components/Home';
import { Routes, Route } from 'react-router-dom'
import Admin from './components/Admin';
import Registration from './components/Registration';
import Login from './components/Login';
import SubjectList from './components/Subjectlist';
import StudentList from './components/StudentList';
import AssignSubject from './components/AssignSubject';


function App() {
  return (
    <>
        <Routes>
          <Route path='/home' element={<Home />} ></Route>
          {/* <Route path='/admin' element={<Admin />} ></Route> */}
          <Route path='/registration' element={<Registration />} ></Route>
          <Route path='/' element={<Login />} ></Route>
          <Route path='/subjectlist' element={<SubjectList />} ></Route>
          <Route path='/studentlist' element={<StudentList />} ></Route>
          <Route path='/asignsubject' element={<AssignSubject />} ></Route>
        </Routes>
   </>
  );
}

export default App;
