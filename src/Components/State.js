import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
//ion files starts here
import "@ionic/react/css/core.css";
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
  IonCardTitle,
  useIonLoading,
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
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { numberFormat } from "../numberFormat";

function State() {
  const history = useHistory();
  const [stateName, setStateName] = useState("");
  const [district, setDistrict] = useState([]);
  const [data, setData] = useState([]);

  const { search } = useLocation();
  //variables
  const [tactive, setActive] = useState(0);
  const [tconfirmed, setConfirmed] = useState(0);
  const [trecovered, setRecovered] = useState(0);
  const [tdeaths, setDeaths] = useState(0);
  const CovidData = async () => {
    const { state } = queryString.parse(search);
    if (state === undefined || state === null) {
      history.push("/");
      return;
    }

    setStateName(state);
    try {
      const res = await fetch("https://api.covid19india.org/data.json");
      const data = await res.json();
      const finalData = data.statewise;

      const testRes = await fetch(
        "https://api.covid19india.org/state_district_wise.json"
      );
      const results = await testRes.json();
      const finalTest = results[state].districtData;

      const temp = [];
      for (var result in finalTest) {
        temp.push(result);
      }

      setDistrict(temp);

      for (var i = 0; i < finalData.length; i++) {
        if (finalData[i].state === state) {
          setActive(finalData[i].active);
          setConfirmed(finalData[i].confirmed);
          setDeaths(finalData[i].deaths);
          setRecovered(finalData[i].recovered);

          //data for chart
          const data = {
            labels: ["Confirmed", "Active", "Recovered", "Deaths"],
            datasets: [
              {
                label: "Covid-19 data",
                data: [
                  finalData[i].confirmed,
                  finalData[i].active,
                  finalData[i].recovered,
                  finalData[i].deaths,
                ],
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
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    CovidData();
  }, []);

  const onhandleClick = (index) => {
    console.log("distric name ==> ", district[index]);
    history.push(`/district/q?state=${stateName}&district=${district[index]}`);
  };
  const [present] = useIonLoading();
  return (
    <div>
      <IonApp>
        <IonHeader>
          <IonToolbar color="dark">
            <IonTitle>
              <h1>
                <b>Covid-19</b>
              </h1>
            </IonTitle>
            <IonTitle>
              <h1>
                <b>{stateName}</b>
              </h1>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent color="dark">
          <IonGrid>
            <IonRow>
              {/* Card-1 starts here*/}
              <IonCol>
                <IonCard color="warning">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(tconfirmed)}</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>Confirmed</IonCardContent>
                </IonCard>
              </IonCol>
              {/* Card-1 end here */}
              <IonCol>
                <IonCard color="primary">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(tactive)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>Active</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard color="success">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(trecovered)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>Recovered</IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard color="danger">
                  <IonCardHeader>
                    <IonCardTitle>{numberFormat(tdeaths)}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>Deaths</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <Bar
                data={data}
              
                height={100}
                options={{
                  responsive: true,
                  maintainAspectRatio: true,
                }}
              />
            </IonRow>
          </IonGrid>
          {/* <DistrictList /> */}
          {/* List of district component start here..... */}
          <IonHeader>
            <IonToolbar color="dark">
              <IonTitle>District List</IonTitle>
            </IonToolbar>
          </IonHeader>
          {/* district here */}
          <IonCol>
            {district.map((current, index) => {
              return (
                <IonRow
                  className="ion-padding"
                  key={index}
                  onClick={() => {
                    present({
                      duration: 300,
                    });
                    onhandleClick(index);
                  }}
                >
                  <IonCol>
                    <b>{current}</b>
                  </IonCol>
                </IonRow>
              );
            })}
          </IonCol>
          {/* List of district component ends here..... */}
        </IonContent>
      </IonApp>
    </div>
  );
}

export default State;
