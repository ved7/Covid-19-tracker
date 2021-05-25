import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCol,
  IonRow,
  useIonLoading,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//ion files starts here
import "@ionic/react/css/core.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./statelist.css";
function StateList() {
  const history = useHistory();
  const [stateName, setStateName] = useState([]);
  const getData = async () => {
    try {
      const res = await fetch("https://api.covid19india.org/data.json");
      const data = await res.json();
      const useData = data.statewise;
      setStateName(useData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onhandleClick = (index1) => {
    history.push(`/state/q?state=${stateName[index1].state}`);
  };
  const [present] = useIonLoading();
  return (
    <div className="statelist">
      <IonHeader className="ion-padding">
        <IonToolbar color="dark">
          <IonTitle size="large">States of India</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonRow className="ion-padding">
        <IonCol>States</IonCol>
        <IonCol>Total Cases</IonCol>
        <IonCol>Recovered</IonCol>
        <IonCol>Deaths</IonCol>
        <IonCol>Active Cases</IonCol>
      </IonRow>

      <IonCol>
        {stateName.map((current, index) => {
          if (index !== 0) {
            return (
              <IonRow
                className="ion"
                key={index}
                onClick={() => {
                  present({
                    duration: 300,
                  });
                  onhandleClick(index);
                }}
              >
                <IonCol className="ion-padding cell-class">
                  {current.state}
                </IonCol>
                <IonCol className="cell-class">{current.confirmed}</IonCol>
                <IonCol className="cell-class">{current.recovered}</IonCol>
                <IonCol className="cell-class">{current.deaths}</IonCol>
                <IonCol className="cell-class">{current.active}</IonCol>
              </IonRow>
            );
          } 
        })}
      </IonCol>
    </div>
  );
}

export default StateList;
