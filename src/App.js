import React from "react";
import "./App.css";
import Home from "./Home";
import Login from "./components/Login";
import Event from "./Event";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// function App() {
//   return (
//     <Router>
//       <Switch>
//         <div className="app">
//           <Route exact path="/" component={Home} />
//           <Route exact path="/event/:id" component={Event} />
//         </div>
//       </Switch>
//     </Router>
//   );
// }

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/event/:id" component={Event} />
        </div>
      </Router>
    );
  }
}

export default App;
