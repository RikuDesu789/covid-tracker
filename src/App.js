import React, {useState, useEffect} from "react";
import {Cards} from './Components';
import styles from "./App.modules.css";
import LoadingSpinner from "./Components/Spinner/LoadingSpinner";

function App() {

  const [patients, setPatients] = useState(null);
  const [all, setAll] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [cures, setCures] = useState(null);

  const [patientsl, setPatientsl] = useState(false)
  const [alll, setAlll] = useState(false)
  const [deathsl, setDeathsl] = useState(false)
  const [curesl, setCuresl] = useState(false);


useEffect(() => {
  setPatientsl(true)
  console.log(patientsl)
  fetch("https://data.corona.go.jp/converted-json/covid19japan-ndeaths.json")
    .then((response) => response.json())
    .then((data) => {
      data.reverse()
      setDeaths(data);
      setPatientsl(false)
    });
}, []);

useEffect(() => {
  setPatientsl(true)
    fetch("https://data.corona.go.jp/converted-json/covid19japan-npatients.json")
      .then((response) => response.json())
      .then((data) => {
        data.reverse()
        setPatients(data);
        setPatientsl(false)
      });
    
  }, []);

useEffect(() => {
  setCuresl(true)
    fetch("https://data.corona.go.jp/converted-json/covid19japan-ncures.json")
      .then((response) => response.json())
      .then((data) => {
        data.reverse()
        // data = data.slice(0,2)
        setAll(data);
        setCuresl(false)
      });
  }, []);

useEffect(() => {
  setAlll(true)
    fetch("https://data.corona.go.jp/converted-json/covid19japan-all.json")
      .then((response) => response.json())
      .then((data) => {
        data.reverse()
        setCures(data);
        setAlll(false)
      });
  }, []);

  const page =(
    <div className= {styles.container}>
      <Cards data={{patients, deaths, cures, all}}/>
    </div>
    );

  return (
    <div className="App">
      {(alll || patientsl || curesl || deathsl) ? <LoadingSpinner /> : page}
    </div>
  );
}

export default App;
 