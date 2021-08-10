import { makeStyles } from "@material-ui/core";
import React, { ReactElement, FC } from "react";
import Rating from "@material-ui/lab/Rating";
import IconButton from "@material-ui/core/IconButton";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  header: {
    minHeight: "20vh",
    width: "100%",
    backgroundImage:
      "url(https://www.guestline.com/wp-content/uploads/2020/09/home-hero4a.jpg?auto=format&ch=DPR%2CWidth&crop=faces%2Cedges&dpr=2&fit=crop&h=750&ixjsv=2.2.4&q=65&w=1010)",
    backgroundPosition: "bottom",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    fontSize: "1rem",
  },
  appbar: {
    position: "absolute",
    bottom: "-0.5em",
    background: "#eeeeff",
    flexDirection: "row",
    display: "flex",
  },
  rating: {
    alignItems: "center",
    paddingRight: "1em",
  },
  adults: {
    paddingRight: "1em",
  },
}));

interface Props {
  stars: number;
  adults: number;
  children: number;
  updateStars: (value: number | null) => void;
  updateAdults: (value: number) => void;
  updateChildren: (value: number) => void;
}

const Header: FC<Props> = ({
  stars,
  adults,
  children,
  updateStars,
  updateAdults,
  updateChildren,
}): ReactElement => {
  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.appbar}>
        <Rating
          name="simple-controlled"
          value={stars}
          onChange={(event: any, newValue: number | null) => {
            updateStars(newValue);
          }}
          className={classes.rating}
        />
        <div className={classes.adults}>
          Adults:
          <IconButton onClick={() => updateAdults(-1)}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          {adults}
          <IconButton onClick={() => updateAdults(1)}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
        <div>
          Children:
          <IconButton onClick={() => updateChildren(-1)}>
            <RemoveCircleOutlineIcon />
          </IconButton>
          {children}
          <IconButton onClick={() => updateChildren(1)}>
            <AddCircleOutlineIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
