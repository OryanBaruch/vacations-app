import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import {
  addVacation,
  editVacation,
} from "../../../REDUX/ACTIONS/vacation_action";
import {
  FormHelperText,
  Input,
  InputLabel,
  TextField,
} from "@material-ui/core";
import "./ModalVacation.css";
import Paper from "@material-ui/core/Paper";

const ModalVacation = ({ vacation, open, handleClose }) => {
  const [description, setDescription] = useState(
    !vacation ? "" : vacation.description
  );
  const [destination, setDestination] = useState(
    !vacation ? "" : vacation.destination
  );
  const [image, setImage] = useState(!vacation ? "" : vacation.image);
  const [starting_date, setStarting_date] = useState(
    !vacation ? "" : vacation.starting_date
  );
  const [ending_date, setEnding_date] = useState(
    !vacation ? "" : vacation.ending_date
  );
  const [price, setPrice] = useState(!vacation ? "" : vacation.price);
  const [state, setState] = useState({});
  const dispatch = useDispatch();

  const id = vacation && vacation.id;

  const handleAdd = (e) => {
    e.preventDefault();
    dispatch(
      addVacation({
        description,
        destination,
        image,
        starting_date,
        ending_date,
        price,
      })
    );
  };

  const handleReEdit = (e) => {
    e.preventDefault();
    dispatch(
      editVacation({
        id,
        description,
        destination,
        image,
        starting_date,
        ending_date,
        price,
      })
    );
  };

  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Paper className="modal_container">
        <form
          className="form_modal"
          onSubmit={id === null ? handleAdd : handleReEdit}
        >
          <InputLabel htmlFor="my-input">Description</InputLabel>
          <Input
            onChange={(e) => setDescription(e.target.value)}
            name="description"
            value={description}
          />
          <FormHelperText id="my-helper-text">
            Insert your Description
          </FormHelperText>

          <InputLabel htmlFor="my-input">Destination</InputLabel>
          <Input
            onChange={(e) => setDestination(e.target.value)}
            name="destination"
            value={destination}
          />
          <FormHelperText id="my-helper-text">
            Insert your Destination
          </FormHelperText>

          <InputLabel htmlFor="my-input">Image</InputLabel>
          <Input
            onChange={(e) => setImage(e.target.value)}
            name="image"
            value={image}
          />
          <FormHelperText id="my-helper-text">Insert your Image</FormHelperText>

          <FormHelperText id="my-helper-text">From:</FormHelperText>
          <TextField
            id="date"
            label="end"
            type="date"
            defaultValue={Date.now()}
            className="inputDateStart"
            onChange={(e) => setStarting_date(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <FormHelperText id="my-helper-text">To:</FormHelperText>
          <TextField
            id="date"
            label="start"
            type="date"
            defaultValue={Date.now()}
            className="inputDateEnd"
            onChange={(e) => setEnding_date(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />

          <InputLabel htmlFor="my-input">Price:</InputLabel>
          <Input
            onChange={(e) => setPrice(e.target.value)}
            name="price"
            value={price}
          />
          <FormHelperText id="my-helper-text">Insert Price.</FormHelperText>
          {id ? (
            <Button onClick={handleReEdit}>Edit</Button>
          ) : (
            <Button onClick={handleAdd} color="primary">
              Add{" "}
            </Button>
          )}

          <Button color="primary" onClick={(e) => handleClose(e)}>
            Save Changes
          </Button>
        </form>
      </Paper>
    </Modal>
  );
};

export default ModalVacation;
