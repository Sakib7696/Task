import './App.css';
import Page1 from './Page1';
import Page2 from './Page2';
import { BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
       <Router>
             <Route exact path="/" component={Page1} />
             <Route exact path="/page2" component={Page2} />

      </Router>

    </div>
  );
}

export default App;
