import { Paper, makeStyles } from '@material-ui/core';
import { Draggable } from 'react-beautiful-dnd';

const BordableCard = ({card, index}) => {
const classes = useStyle();
  return (

    <Draggable draggableId={card.id} index={index} key={card.id} >
      
    {(provided) => (
      <div ref={provided.innerRef} {...provided.dragHandleProps}{...provided.draggableProps}>
      <Paper className={classes.BordableCard}>
        {card.title}
      </Paper>
      </div>
    )
    }
  </Draggable>
);
};

const useStyle = makeStyles(theme=>({
  BordableCard :{
    padding : theme.spacing(1,1,1,2),
    margin : theme.spacing(1)
  }
}))

export default BordableCard;
