import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVacations } from "../../REDUX/ACTIONS/vacation_action";
import Add from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import VacationCard from "./VacationCard";
import Grid from "@material-ui/core/Grid";
import "./vacation.css";
import ModalVacation from "./ModalVacation/ModalVacation";

const VacationList = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { userInfo } = useSelector((state) => state.userReducer);
  const isAdmin = userInfo?.role === 1;

  const vacationsReducer = useSelector((state) => state.vacationsReducer);

  useEffect(() => {
    dispatch(fetchVacations());
  }, []);

  return (
    <div>
      {isAdmin && (
        <div>
          <IconButton onClick={handleOpen}>
            <Add />
          </IconButton>
          <ModalVacation open={open} handleClose={handleClose} />
        </div>
      )}
      <div className="card_conatiner">
        <Grid container justify="center">
          {vacationsReducer.length &&
            vacationsReducer.map((vacation, i) => (
              <VacationCard
                vacation={vacation}
                key={i}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
            ))}
        </Grid>
      </div>
    </div>
  );
};

export default VacationList;
