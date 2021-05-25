import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import {
  IonApp,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { numberFormat } from "../numberFormat";
import { Bar } from "react-chartjs-2";
function District() {
  const history = useHistory();
  const [info, setInfo] = useState({});
  const [data, setData] = useState([]);
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");

  const { search } = useLocation();

  useEffect(() => {
    const { state, district } = queryString.parse(search);

    setState(state);
    setDistrict(district);

    if (
      state === undefined ||
      state === null ||
      district === undefined ||
      district === null
    ) {
      history.push("/");
      return;
    }

    fetch("https://api.covid19india.org/state_district_wise.json")
      .then((res) => res.json())
      .then((results) => {
        const info = {
          active: results[state].districtData[district].active,
          confirmed: results[state].districtData[district].confirmed,
          deaths: results[state].districtData[district].deceased,
          recovered: results[state].districtData[district].recovered,
        };

        const data = {
          labels: ["Confirmed", "Active", "Recovered", "Deaths"],
          datasets: [
            {
              label: "Covid-19 data",
              data: [info.confirmed, info.active, info.recovered, info.deaths],
              backgroundColor: [
                "rgb(255,196,9)",
                " rgb(56,128,255)",
                "rgb(45,211,111)",
                "rgb(235,68,90)",
              ],
              fill: true, // Don't fill area under the line
              borderColor: "black", // Line color
            },
          ],
        };

        setData(data);
        setInfo(info);
      });
  }, []);

  return (
    <div className="district">
      <IonApp>
        <IonHeader>
          <IonToolbar color="dark">
            <IonTitle>
              <h1>Covid-19</h1>
            </IonTitle>
            <IonTitle>
              <h1>
                <b>
                  {district} ( {state} )
                </b>
              </h1>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="dark" className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonCard color="warning" className="ion-padding">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(info.confirmed)}</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>Confirmed</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard color="primary" className="ion-padding">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(info.active)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>Active</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard color="success" className="ion-padding">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(info.recovered)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>Recovered</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard color="danger" className="ion-padding">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(info.deaths)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>Deaths</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <Bar data={data} />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonApp>
    </div>
  );
}

export default District;
