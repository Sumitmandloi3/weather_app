import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { WiHumidity, WiBarometer, WiStrongWind } from "react-icons/wi"; // Import weather icons
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
}

const WeatherPage: React.FC = () => {
  const { cityName } = useParams<{ cityName: string }>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f05038c8835fc40fe34db1d0f22b90bc&units=metric`
        );
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, [cityName]);

  const getBackgroundImage = (temp: number) => {
    if (temp && temp < 10) {
      return "url('/images/cold_weather.jpeg')";
    } else if (temp && temp >= 10 && temp < 25) {
      return "url('/images/mild_weather.avif')";
    } else {
      return "url('/images/hot_weather.jpeg')";
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (!weatherData) {
    return <Typography>No weather data available for {cityName}</Typography>;
  }

  const { main, weather, wind } = weatherData;

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundImage: main && main.temp && getBackgroundImage(main.temp),
        backgroundSize: "cover",
        minHeight: "100vh",
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              alignItems: "center",
              fontWeight: "400",
              fontSize: "50px",
              fontFamily: "Arial, sans-serif",
              marginLeft: "300px",
            }}
          >
            <LocationOnOutlinedIcon
              sx={{ color: "#4682B4", marginRight: "8px", fontSize: "80px" }}
            />
            {`Weather in ${cityName}`}
          </Typography>
        }
        subheader={
          <Typography
            variant="subtitle1"
            sx={{
              fontFamily: "Arial, sans-serif",
              marginLeft: "400px",
              fontWeight: "200",
              fontSize: "30px",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(2px)",
              width: "350px",
              paddingLeft: "40px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            }}
          >
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </Typography>
        }
      />
      <Typography
        sx={{
          fontFamily: "Arial, sans-serif",
          marginLeft: "400px",
        }}
      >
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography variant="h4">Temperature: {main?.temp}°C</Typography>
              {weather && weather.length > 0 ? (
                <>
                  <Typography variant="h5">
                    Description: {weather[0].description}
                  </Typography>
                  <Typography variant="h5">
                    <WiHumidity /> Humidity: {main?.humidity}%
                  </Typography>
                  <Typography variant="h5">
                    <WiBarometer /> Pressure: {main?.pressure} hPa
                  </Typography>
                  <Typography variant="h5">
                    <WiStrongWind /> Wind Speed: {wind?.speed} m/s
                  </Typography>
                </>
              ):( <Typography>Oops!! No Data is present for this City </Typography> )}
            </Grid>
          </Grid>
        </CardContent>
      </Typography>
    </Card>
  );
};

export default WeatherPage;
