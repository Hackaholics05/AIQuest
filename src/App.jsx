import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Sidebar from "./components/Sidebar";
import AskQuestionPage from "./components/AskQuestionPage/AskQuestion";
import VisitQuestion from "./components/VisitQuestion"
import Auth from "./components/Auth/auth";
import { useDispatch, useSelector } from "react-redux";
import { login , logout , selectUser } from "./feature/userSlice";
import { auth } from "./firebase";
import { useEffect } from "react";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
      // console.log(authUser);
    });
  }, [dispatch]);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path = '/' element={<Sidebar />} />
          <Route path = '/add-question' element={<AskQuestionPage />} />
          <Route path = '/question' element={<VisitQuestion />} />
          <Route path = '/auth' element={<Auth />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
