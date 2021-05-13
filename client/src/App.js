import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Elements
import Background from './components/background';

// Pages
import Landing from './pages/landing';
import Login from './pages/login';
import Register from './pages/register';

import './App.css';
import { AuthProvider } from './context/auth';


function App() {
  return (
    <AuthProvider>
      <Background/>
      <div style={{ padding: "1rem" }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route>
              <h1 style={{ color: "white", textAlign: "center" }}>Oh dear, looks like this page doesn't exist :(</h1>
            </Route>
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
