import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingWrapper } from "./components/LoadingWrapper";
import AnimatedLoader from "./components/AnimatedLoader";

const Home = React.lazy(() => import("./pages/Home"));
const Welcome = React.lazy(() => import("./pages/Welcome"));
const Chat = React.lazy(() => import("./pages/Chat"));
const Login = React.lazy(() => import("./pages/LoginRedirect"))
const Register = React.lazy(() => import("./pages/RegisterRedirect"))
const NotFound = React.lazy(() => import("./pages/Notfound"));

const App: React.FC = () => {
  return (
    <Router>
      <LoadingWrapper>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense
                fallback={<AnimatedLoader message="loading" variant="fun" />}
              >
                <Home />
              </Suspense>
            }
          />

          <Route
            path="/chat"
            element={
              <Suspense
                fallback={<AnimatedLoader message="loading" variant="fun" />}
              >
                <Chat />
              </Suspense>
            }
          />

          <Route
            path="/welcome"
            element={
              <Suspense
                fallback={
                  <AnimatedLoader message="welcome" variant="default" />
                }
              >
                <Welcome />{" "}
              </Suspense>
            }
          />

        <Route path="/login" element={
          <Suspense fallback={<AnimatedLoader message='Loading' variant="default"/>}>
            <Login/>
          </Suspense>
        }/>

        <Route path="/register" element={
          <Suspense fallback={<AnimatedLoader message='Loading' variant="default"/>}>
            <Register/>
          </Suspense>
        }/>

          <Route
            path="*"
            element={
              <Suspense
                fallback={<AnimatedLoader message="loading" variant="fun" />}
              >
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </LoadingWrapper>
    </Router>
  );
};

export default App;
