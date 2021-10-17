import React, {useState} from 'react'
import { makeStyles } from '@mui/styles';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Paper, Typography, Grid, Button } from '@mui/material'
import Linkify from 'react-linkify';


const useStyles = makeStyles({
    subPaper: {
      padding: "10px",
      borderRadius: 12,
      margin: "2rem",
    },
    center: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 0,
    },
    title: {
      lineHeight: 1.5,
      fontWeight: 700,
      marginBottom: '-0.3rem'
    },
    body: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: "20px",
      marginBottom: "20px"
    },
    alignPost: {
      textAlign: "left",
    },
    large: {
      width: "15px",
      height: "15px",
    },
    smallText: {
        color: "grey",
        fontSize: "15px",
        fontStyle: "italic"
    }
  });

function Post(props) {
    const classes = useStyles();
    var [upvote, setUpvote] = useState(props.upvote);
    var [downvote, setDownvote] = useState(props.downvote);
    var [id, setId] = useState(props.id);
    const handleOnClickUpvote = async (e) => {
      e.preventDefault();
      try {
          let requestBody = {"type": "upvote", "id": id}
          fetch('https://my-api.hieule20901.workers.dev/vote', {
              method: 'POST',
              body: JSON.stringify(requestBody),
            })
          upvote = upvote + 1;
          console.log(id)
          setUpvote(upvote);
      } catch (err) {
          console.log(err)
      }
    };
    const handleOnClickDownvote = async (e) => {
      e.preventDefault();
      try {
          let requestBody = {"type": "downvote", "id": props.id}
          fetch('https://my-api.hieule20901.workers.dev/vote', {
              method: 'POST',
              body: JSON.stringify(requestBody),
            })
          downvote = downvote + 1;
          setDownvote(downvote);
      } catch (err) {
          console.log(err)
      }
    };
    return (
        <Paper className={classes.subPaper} elevation={2}>
      <Grid container spacing={3}>

        <Grid item xs={12}>
          <div className={classes.alignPost}>
            <Typography className={classes.title} variant="h6">
              {props.title}
            </Typography>
            <Typography className={classes.smallText} variant="body1">
              By {props.username}
            </Typography>
            <br></br>
            
            <Typography className={classes.body} variant="body1">
              <Linkify>
                {props.content}
              </Linkify>
            </Typography>
            {props.file && props.file.substr(0, 10) === "data:image" ? <img style={{display: "block", margin: "auto", maxWidth: "90%"}} src={props.file} /> : null}

          </div>
          <hr style={{backgroundColor: "grey !important", height: "1px", border: "none"}}></hr>
            <Button onClick={handleOnClickUpvote} size="small" style={{borderRadius: "15px", marginRight: "10px"}} variant="outlined" startIcon={<ThumbUpIcon fontSize="small" color="primary" />}>{upvote}</Button>
            <Button onClick={handleOnClickDownvote} size="small" style={{borderRadius: "15px"}} variant="outlined" startIcon={<ThumbDownIcon fontSize="small" color="primary" />}>{downvote}</Button>
            
        </Grid>



      </Grid>
        </Paper>
    )
}

export default Post
