import { Button, IconButton, InputBase, Paper, makeStyles } from "@material-ui/core"
import { alpha } from '@material-ui/core/styles'
import { useContext, useState } from "react"
import ClearIcon from "@material-ui/icons/Clear"
import { MoreHoriz } from "@material-ui/icons"
import ContextAPI from "../ContextAPI"

const AddCardList = ({type, setOpen, listId}) => {
    const [title, setTitle]=useState("")
    const classes = useStyle();
    const{addCard, addList}= useContext(ContextAPI)
  // console.log(listId) 

    const handleAddCardOrList = ()=>{
        if (type==="card"){
            addCard(title,listId)
        }else{
            addList(title)
        }
        setTitle("")
        setOpen(false)
    }

  return (
    <>
    <Paper className={classes.card}>
        <InputBase 
        multiline
        value={title}
        onBlur={()=>setOpen(false)} 
        onChange={e=>setTitle(e.target.value)}
        placeholder={
            type === "card" ? "Enter a title for this Card..." : "Enter list title..."
        }
        inputProps={{className: classes.input}}
        />
    </Paper>
    <div className={classes.confirm}>
        <div className={classes.options}>
        <Button className={classes.btnConfirm} 
        onClick={handleAddCardOrList} >
            {
                type === "card" ? " + Add Card" : " + Add List"
            }
        </Button>
        <IconButton onClick={()=>setOpen(false)}>
        <ClearIcon/>
        </IconButton>
        </div>

        <IconButton>
        <MoreHoriz/>
        </IconButton>
    </div>
    </>
  )
}

const useStyle = makeStyles(theme=>({
    card :{
       width: "280px",
       margin: theme.spacing(0,1,1,1),
       paddingBottom: theme.spacing(4)
    },
    input:{
        margin: theme.spacing(1),

    },
    confirm:{
        display: "flex",
        margin: theme.spacing(0,1,1,1)
    },
    options:{
        flexGrow: 1
    }
    ,
    btnConfirm:{
        background: "#6D28D9",
        color: "#ffff",
        "&:hover":{
            background: alpha("#6D28D9", 0.75)
        }
    }

  }))

export default AddCardList
