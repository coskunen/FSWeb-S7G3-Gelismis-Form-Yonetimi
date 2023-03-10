import logo from './logo.svg';
import './App.css';
import Form from './components/form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Form/>
        <img src={logo} className="App-logo" width="25px"  alt="logo" />
     
      </header>
      
    </div>
  );
}

export default App;
