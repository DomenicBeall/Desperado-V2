import Background from './components/background';
import Header from './components/header';

function App() {
  return (
    <div>
      <Background/>
      <div style={{ padding: "1rem" }}>
        <Header/>
        <h1 style={{ color: "white", textAlign: "center", fontSize: "2rem" }}>Welcome to Desperado... again...</h1>
      </div>
    </div>
  );
}

export default App;
