import { Collapse, alpha, makeStyles, Paper, Typography } from "@material-ui/core";
import { useState } from "react";
import AddCardList from "./AddCardList";

const AddCard = ({ type, listId}) => {
  const classes = useStyle();
  const [open, setOpen] = useState(true);
 /// console.log({listId})
 

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <AddCardList type={type} setOpen={setOpen} listId={listId}/>
      </Collapse>

      <Collapse in={!open}>
        <Paper className={classes.addCardList} onClick={()=>setOpen(true)}>
          <Typography>
            {type === "card" ? " + Add a Card" : " + Add Another List"}
          </Typography>
        </Paper>
      </Collapse>
    </div>
  );
};

const useStyle = makeStyles((theme) => ({
  root: {
    width: "300px",
    marginTop: theme.spacing(1),
  },
  addCardList: {
    padding: theme.spacing(1, 1, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: "#ebecf0",
    "&:hover": {
      backgroundColor: alpha("#000", 0.25),
    },
  },
}));

export default AddCard;
