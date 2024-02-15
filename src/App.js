import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import uuid from 'react-uuid';
import background from './Images/background.jpg';
import mockData from './mockdata';
import ContextAPI from './ContextAPI';
import AddCard from './components/AddCard';
import BordableList from './components/BordableList';

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    overflow: 'auto',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    display: 'flex',
  },
}));

function App() {
  const classes = useStyle();
  const [data, setData] = useState(mockData);

  const updateListTitle = (updatedTitle, listId) => {
    const list = { ...data.lists[listId] };
    list.title = updatedTitle;
    const newData = { ...data, lists: { ...data.lists, [listId]: list } };
    setData(newData);
  };

  const addCard = (title, listId) => {
    const newCardId = uuid();
    const newCard = { id: newCardId, title };
    const list = { ...data.lists[listId] };
    list.cards = [...list.cards, newCard];
    const newData = { ...data, lists: { ...data.lists, [listId]: list } };
    setData(newData);
  };

  const addList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };
    const newData = {
      ...data,
      listIds: [...data.listIds, newListId],
      lists: { ...data.lists, [newListId]: newList },
    };
    setData(newData);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }

    if (type === 'list') {
      const newListIds = Array.from(data.listIds);
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);

      const newData = { ...data, listIds: newListIds };
      setData(newData);
      return;
    }

    const sourceList = { ...data.lists[source.droppableId] };
    const destinationList = { ...data.lists[destination.droppableId] };
    const draggingCard = sourceList.cards.find((card) => card.id === draggableId);

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
    } else {
      sourceList.cards.splice(source.index, 1);
      destinationList.cards.splice(destination.index, 0, draggingCard);
    }

    const newData = {
      ...data,
      lists: {
        ...data.lists,
        [sourceList.id]: sourceList,
        [destinationList.id]: destinationList,
      },
    };

    setData(newData);
  };

  return (
    <ContextAPI.Provider value={{ updateListTitle, addCard, addList }}>
      <div className={classes.root}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="app" type="list" direction="horizontal">
            {(provided) => (
              <div className={classes.container} ref={provided.innerRef} {...provided.droppableProps}>
                {data.listIds.map((listId, index) => {
                  const list = data.lists[listId];
                  return <BordableList list={list} key={listId} index={index} />;
                })}
                <AddCard type="list" />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </ContextAPI.Provider>
  );
}

export default App;
