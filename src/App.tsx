import { makeStyles } from "@material-ui/core";
import HotelCard from "./components/HotelCard";
import Header from "./components/Header";
import React, { ReactElement, FC, useEffect, useState } from "react";
import hotelsClient, { HotelMetadata } from "./api/hotelsClient";

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: "center",
    backgroundColor: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    fontSize: "calc(10px + 2vmin)",
    color: "#282c34",
  },
  root: {
    flexGrow: 1,
    width: "60%",
  },
  control: {
    padding: theme.spacing(2),
  },
  body: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    padding: "1em",
  },
}));

const App: FC = (): ReactElement => {
  const classes = useStyles();
  const [stars, setStars] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hotels, setHotels] = useState<HotelMetadata[]>([]);

  useEffect(() => {
    hotelsClient("OBMNG")
      .then((hotels) => {
        setIsLoaded(true);
        setHotels(hotels);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, []);

  let updateStars = function (value: number | null) {
    if (value != null) {
      setStars(value);
    }
  };

  let updateAdults = function (value: number) {
    let validatedValue = Math.min(10, Math.max(adults + value, 0));
    setAdults(validatedValue);
  };

  let updateChildren = function (value: number) {
    let validatedValue = Math.min(10, Math.max(children + value, 0));
    setChildren(validatedValue);
  };

  let hasStarRating = function (hotel: HotelMetadata) {
    return parseInt(hotel.starRating) >= stars;
  };

  let hasRoomsWithOccupancy = function (hotel: HotelMetadata) {
    if (!hotel.rooms) {
      return false;
    }

    for (let room of hotel.rooms) {
      if (
        room.occupancy.maxAdults >= adults &&
        room.occupancy.maxChildren >= children
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className={classes.app}>
      <Header
        stars={stars}
        adults={adults}
        children={children}
        updateStars={updateStars}
        updateAdults={updateAdults}
        updateChildren={updateChildren}
      />
      <div className={classes.body}>
        {error && <div>Failed to fetch hotel information</div>}
        {isLoaded &&
          hotels
            .filter(hasStarRating)
            .filter(hasRoomsWithOccupancy)
            .map((hotel) => (
              <HotelCard
                hotel={hotel}
                key={hotel.id}
                adults={adults}
                children={children}
              />
            ))}
      </div>
    </div>
  );
};

export default App;
