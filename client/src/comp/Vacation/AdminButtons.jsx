import react, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { handleDelete } from "../../REDUX/ACTIONS/vacation_action";
import { useDispatch } from "react-redux";
import ModalVacation from "./ModalVacation/ModalVacation";

const AdminButtons = ({vacation }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const handleDeleteAdminButton = ()=>{
    dispatch(handleDelete(vacation.id))
}

  return (
    <div className="admin_controlls">
      <IconButton  onClick={handleOpen}>
        <EditIcon/>
      </IconButton>
      <IconButton onClick={handleDeleteAdminButton}>
        <DeleteIcon />
      </IconButton>
      <ModalVacation open={open} vacation={vacation} handleClose={handleClose}/>
    </div>
  );
};

export default AdminButtons;
