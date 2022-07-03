import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  ThemeProvider,
  makeStyles,
  Paper,
} from "@material-ui/core";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Chart from "../Chart/Chart";
import styles from "./Cards.module.css";
import CountUp from "react-countup";
import cx from "classnames";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme();
theme = responsiveFontSizes(theme);

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "#d3d3d3",
    color: "#FFFFFF",
    margin: "3%",
    "&:hover": {
      border: "3px dotted #77A6F7",
      color: "#77A6F7",
      background: "#fff",
    },
  },
}));

const Cards = (data) => {
  const [json, setJson] = useState(null);
  const [deaths, setDeaths] = useState(null);
  const [cures, setCures] = useState(null);
  const [prefCures, setPrefCures] = useState(null);
  const [patients, setPatients] = useState(null);

  const loading = "Loading...";

  useEffect(() => {
    setJson(data);
    setDeaths(
      data.data.deaths ? data.data.deaths.slice(0, 14) : data.data.deaths
    );
    setCures(data.data.all ? data.data.all.slice(0, 14) : data.data.all);
    setPrefCures(data.data.cures);
    setPatients(
      data.data.patients ? data.data.patients.slice(0, 13) : data.data.patients
    );
    console.log(prefCures);
  }, [json]);

  return (
    <div className={styles.container}>
      <Grid container spacing={1} justifyContent="center">
        <Grid
          item
          xs={10}
          md={3}
          component={Card}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent align="center" style={{ border: "2px solid grey" }}>
            <ThemeProvider theme={theme}>
              <Typography
                color="textSecondary"
                align="center"
                variant="h6"
                gutterBottom
              >
                日別{bull}新規感染者数
              </Typography>
              <Typography variant="h2" display="inline" gutterBottom>
                <CountUp
                  start={0}
                  end={patients == null ? 0 : patients[0]["adpatients"]}
                  duration={1.0}
                  separator=","
                />
              </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                最終更新日 :{" "}
                {patients == null ? "loading..." : patients[0]["date"]}
              </Typography>
            </ThemeProvider>
          </CardContent>
        </Grid>

        <Grid
          item
          xs={10}
          md={3}
          component={Card}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent align="center" style={{ border: "2px solid grey" }}>
            <ThemeProvider theme={theme}>
              <Typography
                color="textSecondary"
                align="center"
                variant="h6"
                gutterBottom
              >
                日別{bull}新規死亡者数
              </Typography>
              <Typography variant="h2" display="inline" gutterBottom>
                <CountUp
                  start={0}
                  end={
                    deaths == null
                      ? 0
                      : deaths[0]["ndeaths"] - deaths[1]["ndeaths"]
                  }
                  duration={1.0}
                  separator=","
                />
              </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                最終更新日 : {deaths == null ? "loading..." : deaths[0]["date"]}
              </Typography>
            </ThemeProvider>
          </CardContent>
        </Grid>

        <Grid
          item
          xs={10}
          md={3}
          component={Card}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent align="center" style={{ border: "2px solid grey" }}>
            <ThemeProvider theme={theme}>
              <Typography
                color="textSecondary"
                align="center"
                variant="h6"
                gutterBottom
              >
                日別{bull}要入院患者数
              </Typography>
              <Typography variant="h2" display="inline" gutterBottom>
                <CountUp
                  start={0}
                  end={
                    cures == null ? 0 : cures[0]["ncures"] - cures[1]["ncures"]
                  }
                  duration={1.0}
                  separator=","
                />
              </Typography>
              <Typography variant="overline" display="block" gutterBottom>
                最終更新日 : {cures == null ? "loading..." : cures[0]["date"]}
              </Typography>
            </ThemeProvider>
          </CardContent>
        </Grid>

        <Grid
          item
          xs={10}
          md={10}
          component={Card}
          className={cx(styles.card, styles.deaths)}
        >
          <Chart data={patients} x="date" y="adpatients" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Cards;
