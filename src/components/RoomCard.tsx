import { Card, CardContent, makeStyles, Typography } from "@material-ui/core";
import React, { ReactElement, FC } from "react";

const useStyles = makeStyles((theme) => ({
  card: {
    flex: 1,
    borderRadius: 0,
  },
  content: {
    textAlign: "left",
  },
  bottomRow: {
    display: "flex",
    justifyContent: "flex-start",
  },
  pax: {
    paddingRight: "1em",
    minWidth: "30%",
  },
}));

interface Props {
  room: {
    id: string;
    name: string;
    occupancy: {
      maxAdults: number;
      maxChildren: number;
    };
    longDescription: string;
  };
}

const RoomCard: FC<Props> = ({ room }): ReactElement => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className={classes.content}>
        <div className={classes.bottomRow}>
          <div className={classes.pax}>
            <Typography>{room.name}</Typography>
            <Typography>Adults: {room.occupancy.maxAdults}</Typography>
            <Typography> Children: {room.occupancy.maxChildren}</Typography>
          </div>
          <Typography variant="body2" color="textSecondary" component="p">
            {room.longDescription}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
