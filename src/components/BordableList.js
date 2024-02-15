import { Paper, CssBaseline, makeStyles } from '@material-ui/core';
import AddCard from './AddCard';
import ListTitle from './ListTitle';
import BordableCard from './BordableCard';
import { Draggable, Droppable } from 'react-beautiful-dnd';

const BordableList = ({list,index}) => {
//console.log({index});
const classes = useStyles();
//console.log({index})

  return (
    
    <Draggable  draggableId={list.id}  index={index} key={list.id} >
      {
        (provided) =>(
          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          <Paper className={classes.root} >
            <CssBaseline />
            <ListTitle title={list.title} listId={list.id} />
            <Droppable droppableId={list.id}>
            {
              (provided)=>(
                <div ref={provided.innerRef}{...provided.droppableProps}>
                  {
                  list.cards.map((card, idx) => (
      
                      <BordableCard card={card} key={ card.id} index={idx}/>
                      ))
                    }
                    {provided.placeholder}
                </div>
              )
            }

            </Droppable>
            <AddCard type="card" listId={list.id} />
          </Paper>
          </div>
      )
    }
    </Draggable>
  );
};


const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    backgroundColor: '#ebecf0',
    margin: theme.spacing(1),
  },
}));

export default BordableList;
