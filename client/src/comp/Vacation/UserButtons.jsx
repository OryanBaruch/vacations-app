import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./vacation.css";
import { useDispatch , useSelector} from "react-redux";
import { likeVacation, unFollow } from "../../REDUX/ACTIONS/like_actions";
import {setFollowers} from '../../REDUX/ACTIONS/vacation_action'

const UserButtons = ({ vacation }) => {
  const dispatch = useDispatch();

  const handleFollow = () => {
    dispatch(likeVacation(vacation.id));
  };

  const vacationsReducer = useSelector((state) => state.vacationsReducer);


  const handleFollowersNumber=()=>{
    const vacationFollow=vacationsReducer.find(x=>x.id===vacation.id)
    return vacationFollow.followers
  }
  
  const handeUnFollow=(e)=>{
    dispatch(unFollow(vacation.id))
  }

  return (
    <div>
      <IconButton onClick={ vacation.orderId===2? handleFollow : handeUnFollow} aria-label="add to favorites">
        <FavoriteIcon className={vacation.orderId===1? "colorOfLike" : ""}  />
        <p>{handleFollowersNumber()}</p>
      </IconButton>
    </div>
  );
};

export default UserButtons;
