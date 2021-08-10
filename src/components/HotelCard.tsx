import {
  Card,
  CardContent,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { ReactElement, FC, useState } from "react";
import Rating from "@material-ui/lab/Rating";
import RoomCard from "./RoomCard";
import type RoomCardType from "./RoomCard";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

const useStyles = makeStyles((theme) => ({
  card: {
    flex: 1,
    marginBottom: "1em",
  },
  content: {
    textAlign: "left",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  hotelImageContainer: {
    flex: 1,
    margin: "1rem",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    flexFlow: "row",
    justifyContent: "space-between",
    display: "flex",
  },
  hotelImageButton: {
    flex: 0,
    color: "lightgrey",
    margin: "0.5em",
  },
  hotelName: {
    flex: 2,
    margin: "1rem",
  },
  address: {
    fontSize: "0.875rem",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "space-between",
  },
  pax: {
    paddingRight: "1em",
    minWidth: "30%",
  },
}));

interface Props {
  hotel: {
    id: string;
    name: string;
    starRating: string;
    address1: string;
    address2: string;
    postcode: string;
    town: string;
    country: string;
    images: { url: string }[];
    rooms: typeof RoomCardType.arguments[];
  };
  adults: number;
  children: number;
}

const HotelCard: FC<Props> = ({ hotel, adults, children }): ReactElement => {
  const classes = useStyles();
  const [imagePosition, setImagePosition] = useState(0);

  let hasOccupancy = function (room: {
    occupancy: { maxAdults: number; maxChildren: number };
  }) {
    return (
      room.occupancy.maxAdults >= adults &&
      room.occupancy.maxChildren >= children
    );
  };

  let updateImage = function (direction: number) {
    let nextPosition = imagePosition + direction;
    if (hotel.images.length > nextPosition && nextPosition >= 0) {
      setImagePosition(nextPosition);
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div className={classes.topRow}>
          <div
            className={classes.hotelImageContainer}
            style={{
              backgroundImage: `url(${hotel.images[imagePosition].url})`,
            }}
          >
            <IconButton
              className={classes.hotelImageButton}
              onClick={() => updateImage(-1)}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              className={classes.hotelImageButton}
              onClick={() => updateImage(1)}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.hotelName}
          >
            {hotel.name}
            <div className={classes.address}>
              <div>{hotel.address1}</div>
              <div>{hotel.address2}</div>
              <div>
                {hotel.postcode} {hotel.town}
              </div>
              <div>{hotel.country}</div>
            </div>
          </Typography>

          <Rating
            name="read-only"
            value={parseInt(hotel.starRating)}
            readOnly
          />
        </div>
        {hotel.rooms.filter(hasOccupancy).map((room) => (
          <RoomCard room={room} key={`${hotel.id}-${room.id}`} />
        ))}
      </CardContent>
    </Card>
  );
};

export default HotelCard;
