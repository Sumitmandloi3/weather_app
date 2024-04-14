import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete, {
  AutocompleteChangeReason,
  AutocompleteChangeDetails,
} from "@mui/material/Autocomplete";
import { Link } from "react-router-dom";

const CitiesTable = () => {
  const initialCities = [
    {
      geoname_id: "2844437",
      name: "india",
      cou_name_en: "Germany",
      population: 22139,
      timezone: "Europe/Berlin",
    },
  ];

  const [cities, setCities] = useState(initialCities);
  const [loading, setLoading] = useState(true);
  const [filteredCities, setFilteredCities] = useState(initialCities);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetch(
      "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20"
    )
      .then((response) => response.json())
      .then((data) => {
        setCities(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredCities(filterCities());
  }, [cities, searchValue]);

  const filterCities = () => {
    return cities.filter((city) =>
      city.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  };

  const handleSearchChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: { geoname_id: string; name: string; cou_name_en: string; population: number; timezone: string; } | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<typeof value> | undefined
  ) => {
    if (value === null) {
      setSearchValue("");
    } else {
      setSearchValue(value.name.trim());
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box
      sx={{
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        overflowY: "auto",
        width: "1360px",
        marginLeft: "200px",
        padding: "10px",
      }}
    >
      <Autocomplete
        fullWidth
        options={filteredCities}
        getOptionLabel={(option) => option.name}
        onChange={handleSearchChange}
        renderInput={(params) => <TextField {...params} label="Search City" />}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  City Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  County
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Population
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Time Zone
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCities.map((city) => (
              <TableRow key={city.geoname_id}>
                <TableCell>
                <Link to={`/WeatherPage/${encodeURIComponent(city.name)}`} >{city.name}</Link>
                </TableCell>
                <TableCell>{city.cou_name_en}</TableCell>
                <TableCell>{city.population}</TableCell>
                <TableCell>{city.timezone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CitiesTable;
