import "bootstrap/dist/css/bootstrap.min.css";
import useLocalStorage from "use-local-storage";
import { UserContext } from "./contexts/UserContext";
import { AuthContext } from "./contexts/AuthContext";
import { TodoContext } from "./contexts/TodoContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/SignUp";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardMain from "./pages/DashboardMain";
import HomeLayout from "./pages/HomeLayout";
import HomeMain from "./pages/HomeMain";
import ErrorPage from "./pages/ErrorPage";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import RequireAuth from "./components/RequireAuth";
import CheckId from "./components/CheckId";
import CheckLogin from "./components/CheckLogin";

export default function App() {
  const [users, setUsers] = useLocalStorage("users", []);
  const [currentUser, setCurrentUser] = useLocalStorage("currentUser", null);
  const [todos, setTodos] = useLocalStorage("todos", []);

  return (
    <div>
      <UserContext.Provider value={{ users, setUsers }}>
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
          <TodoContext.Provider value={{ todos, setTodos }}>
            <BrowserRouter>
              <Routes>
                <Route index element={<HomeMain />} />

                <Route
                  path="/login"
                  element={
                    <CheckLogin>
                      <Login />
                    </CheckLogin>
                  }
                />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<ErrorPage />} />

                <Route
                  path="/dashboard"
                  element={
                    <RequireAuth>
                      <DashboardLayout />
                    </RequireAuth>
                  }
                >
                  <Route index element={<DashboardMain />} />
                  <Route path="add" element={<AddTodo />} />
                  <Route
                    path="edit/:id"
                    element={
                      <CheckId>
                        <EditTodo />
                      </CheckId>
                    }
                  />
                </Route>
              </Routes>
            </BrowserRouter>
          </TodoContext.Provider>
        </AuthContext.Provider>
      </UserContext.Provider>
    </div>
  );
}
