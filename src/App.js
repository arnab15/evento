import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Events from "./Pages/Events";
function App() {
   return (
      <div>
         <Navbar />
         <Switch>
            <Route path="/events" component={Events} />
            <Redirect to="/events" from="/" />
         </Switch>
      </div>
   );
}

export default App;
