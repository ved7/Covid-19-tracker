import "./App.css";
import "@ionic/react/css/core.css";
import { IonApp} from "@ionic/react";

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import Home from "./Components/Home";
import State from "./Components/State";
import District from "./Components/District";
function App() {
  return (
    <div className="App">
      <IonApp>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/state" component={State} />
            <Route path="/district" component={District} />
          </Switch>
        </Router>
      </IonApp>
    </div>
  );
}

export default App;
