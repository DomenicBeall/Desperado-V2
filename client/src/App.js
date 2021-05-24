import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

// Elements
import Background from './components/Background';

// Pages
import Landing from './pages/landing';
import Login from './pages/login';
import Register from './pages/register';
import CreateGame from './pages/createGame';
import User from './pages/user';

import './App.css';
import { AuthProvider } from './context/auth';
import AntiAuthRoute from './context/AntiAuthRoute';
import AuthRoute from './context/AuthRoute';

function App() {
  return (
    <AuthProvider>
      <Background/>
      <div style={{ height: "100%" }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <AntiAuthRoute exact path="/login" component={Login} />
            <AntiAuthRoute exact path="/register" component={Register} />
            <AuthRoute exact path="/createGame" component={CreateGame} />
            <AuthRoute exact path="/user/:id" component={User} />
            <Route>
              <h1 style={{ color: "white", textAlign: "center" }}>Oh dear, looks like this page doesn't exist :(</h1>
              <div style={{ color: "white", textAlign: "center" }}>Click <Link to="/">here</Link> to go home.</div>
            </Route>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
