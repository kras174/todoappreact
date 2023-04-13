import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import TodoPage from "./pages/TodoPage";
import { Navbar } from "./components/Navbar";
import { Alert } from "./components/Alert";
import { AlertState } from "./context/alert/AlertState";
import { FirebaseState } from "./context/firebase/FirebaseState";
import { ModalState } from "./context/modal/ModalState";

function App() {
  console.log("Render App");
  return (
    <FirebaseState>
      <AlertState>
        <ModalState>
          <BrowserRouter>
            <Navbar />
            <div className="main container pt-4">
              <Alert />
              <Routes>
                <Route path={"/"} exact='true' element={<Home />} />
                <Route path={"/about"} element={<About />} />
                <Route path={"/note"}>
                  <Route path={":id"} element={<TodoPage />} />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
        </ModalState>
      </AlertState>
    </FirebaseState>
  );
}

export default App;
