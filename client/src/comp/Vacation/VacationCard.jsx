import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "./vacation.css";
import { useDispatch, useSelector } from "react-redux";
import UserButtons from "./UserButtons";
import AdminButtons from "./AdminButtons";
import { setFollowers } from "../../REDUX/ACTIONS/vacation_action";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 350,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

const VacationCard = ({ vacation}) => {

  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const userReducer = useSelector((state) => state.userReducer.userInfo?.role);

  const {
    id,
    destination,
    description,
    image,
    starting_date,
    ending_date,
    price,
  } = vacation;


  useEffect(() => {
    dispatch(setFollowers(id))
  }, []);


  return (
    <div>
      <Card className="card_frame">
        <CardHeader
          title={destination}
          subheader={`Discover the amazing ${destination}`}
        />
        <Typography color="textSecondary" paragraph>
          {`From: ${starting_date}`}{" "}
        </Typography>

        <Typography color="textSecondary" paragraph>
          {`To: ${ending_date}`}{" "}
        </Typography>

        <CardMedia className={classes.media} image={image} />

        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {description}
          </Typography>
        </CardContent>

        <CardActions disableSpacing>
          {!userReducer ? (
            <UserButtons vacation={vacation} />
          ) : (
            <AdminButtons vacation={vacation} />
          )}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Price: {price}$</Typography>
            <Typography paragraph>{description} </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default VacationCard;
