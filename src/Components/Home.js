import React, { useEffect, useState } from "react";
import StateList from "./StateList";
//ion files starts here
import "@ionic/react/css/core.css";
import { numberFormat } from "../numberFormat";

import {
  IonTitle,
  IonRow,
  IonApp,
  IonHeader,
  IonToolbar,
  IonContent,
  IonGrid,
  IonCol,
  IonCardContent,
  IonCard,
  IonCardHeader,
  IonCardTitle
} from "@ionic/react";
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
function Home() {
  const [info, setInfo] = useState([]);
  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();

  const CovidData = async () => {
    try {
      const res = await fetch("https://api.covid19india.org/data.json");
      const data = await res.json();
      const finalData = data.statewise[0];
      setInfo(finalData);
      //   console.log(finalData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CovidData();
  }, []);

  return (
    <div className="home">
      <IonApp>
        <IonHeader>
          <IonToolbar color="dark">
            <IonTitle>
              <h1>
                <b>Covid-19 INDIA</b>
              </h1>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="dark" className="ion-padding">
          <IonGrid>
            <IonRow>
              {/* Card-1 starts here*/}
              <IonCol>
                <IonCard color="warning">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(info.confirmed)}</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent className="content">Total Cases</IonCardContent>
                </IonCard>
              </IonCol>
              {/* Card-1 end here */}
              <IonCol>
                <IonCard color="primary" className="card">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(info.active)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>Active</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard color="success">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(info.recovered)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <h3>Recovered</h3>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard color="danger">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(info.deaths)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>Deaths</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <p>
                  Refreshed at {currentTime},{currentDate}
                </p>
              </IonCol>
            </IonRow>
          </IonGrid>
          <StateList />
        </IonContent>
      </IonApp>
    </div>
  );
}

export default Home;
