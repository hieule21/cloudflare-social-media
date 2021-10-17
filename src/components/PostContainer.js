import React, {useState, useEffect} from 'react'
import Post from './Post'
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { Paper, TextField, Modal, Box, Typography, Button, Stack } from '@mui/material'
import { makeStyles } from '@mui/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { uuid } from 'uuidv4';

const useStyles = makeStyles({
    subPaper: {
      padding: "10px",
      margin: "10px",
    },
  textBox: {
      marginLeft: "auto",
      marginRight: "auto"
  }
  ,
  modalInput: {
      margin: "10px 15px 13px 0px"
  },
  inputContainer: {
      display: "flex",
      justifyContent: "center",
      width: "100%"
  }
  });

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

  const Input = styled('input')({
    display: 'none',
  });
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    border: 'none',
    boxShadow: 'none'
  }));
function PostContainer() {
    const staticPosts = [
        {"id": "1", "title":"My First Post", "username": "coolguy123", "content": "Hey Y'all!", "upvote": 23, "downvote": 10}, 
        {"id": "2", "title":"Story About my Dogs", "username": "kn0thing", "content": "So the other day I was in the yard, and...", "upvote": 32, "downvote": 12}
    ]

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setFileName("");
        setRequestBody({
            id: "",
            title: "",
            username: "",
            content: "",
            upvote: 0,
            downvote: 0,
            file: ""
        })
    }
    const [uploadedFile, setUploadedFile] = useState({});
    const [fileName, setFileName] = useState("");
    const [posts, setPosts] = useState([]);
    const [requestBody, setRequestBody] = useState({
        id: "",
        title: "",
        username: "",
        content: "",
        upvote: 0,
        downvote: 0,
        file: ""
    })
    

    const handleChange = (event) => {
        const {name, value} = event.target;
        setRequestBody({...requestBody, [name]: value,})
        
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        var uniqueID = uuid()
        requestBody.id = uniqueID
        console.log(requestBody)
        try {
            await fetch('https://my-api.hieule20901.workers.dev/posts', {
                method: 'POST',
                body: JSON.stringify(requestBody),
              })
            console.log(requestBody)
            posts.unshift(requestBody)
            setPosts(posts)
            setRequestBody({
                id: "",
                title: "",
                username: "",
                content: "",
                upvote: 0,
                downvote: 0,
                file: ""
            })

            handleClose();
        } catch (err) {
            console.log(err)
        }
      };

    useEffect(() => {
      const getPosts = async () => {
        try {
            const resp = await fetch("https://my-api.hieule20901.workers.dev/posts");
            const postsResp = await resp.json();
            setPosts(postsResp);
        } catch(e) {
            console.log(e)
        }
      };
      
      getPosts();
    }, []);

    const handleFileUpload = async (e) => {
        let file = e.target.files[0];
        var base64File = await getBase64(file)
        if(file) {
            setRequestBody({...requestBody, file: base64File})
        }
        setFileName(file.name);
    }
    function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      }
      
    return (
        <Container maxWidth="md">
            <Paper className={classes.subPaper} style={{marginBottom: "2rem"}} elevation={1}>
                <div className={classes.textBox} style={{width: "80%"}}>
                    <TextField 
                        variant="standard" 
                        style={{marginBottom: "10px", marginTop: "5px"}} 
                        onClick={handleOpen} 
                        fullWidth  
                        id="standard-basic" 
                        InputProps={{
                            readOnly: true,
                          }}
                        label="What's your story?"/>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <form onSubmit={onSubmit}>
                                <Typography color="primary" id="modal-modal-title" variant="h5" style={{fontWeight: "bold"}} component="h2">
                                    Create post
                                </Typography>
                                <div className={classes.inputContainer}>
                                    <TextField
                                    fullWidth
                                        required
                                        id="outlined-required"
                                        label="Title"
                                        name="title"
                                        className={classes.modalInput}
                                        value={requestBody.title}
                                        onChange={handleChange}
                                    />
                                    <TextField
                                        id="outlined-password-input"
                                        required
                                        label="Username"
                                        fullWidth
                                        name="username"
                                        autoComplete="current-password"
                                        className={classes.modalInput}
                                        style={{marginRight: 0}}
                                        value={requestBody.username}
                                        onChange={handleChange}
                                    />
                                </div>   
                                <TextField 
                                    style={{marginBottom: "18px"}} 
                                    required 
                                    multiline 
                                    fullWidth 
                                    name="content"
                                    label="What's your story?" 
                                    id="fullWidth"
                                    value={requestBody.content}
                                    onChange={handleChange}
                                />
                                <div>
                                <Stack direction="row" alignItems="center" spacing={2} justifyContent="space-between">
                                    <Stack spacing={0.3} justifyContent="space-between" direction="row">
                                        <label htmlFor="contained-button-file">
                                            <Input onChange={handleFileUpload} accept="image/*" id="contained-button-file" multiple type="file" />
                                            <Button startIcon={<PhotoCamera/>} variant="contained" component="span">
                                            Upload
                                            </Button>
                                        </label>
                                        <Item style={{textAlign: "center", color: "#0288d1", fontStyle: "italic"}}>{fileName}</Item>
                                    </Stack>
                                    <Stack spacing={2} justifyContent="space-between" direction="row">
                                        {requestBody && (requestBody.title !== "" || requestBody.username !== "" 
                                        || requestBody.content !== "") ? 
                                            <Button startIcon={<BorderColorIcon/>} type="submit" variant="contained" size="medium">
                                                Post
                                            </Button>
                                        :
                                            <Button startIcon={<BorderColorIcon/>} disabled  variant="contained" size="medium">
                                                Post
                                            </Button>
                                        }
                                        <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                                    </Stack>
                                </Stack>
                            
                                </div>
                                
                            </form>
                        </Box>
                    </Modal>
                </div>
            </Paper>

            <Paper className={classes.subPaper} elevation={1}>
                {posts.map((post, key) => 
                    <Post key={key} id={post.id} file={post.file} title={post.title} content={post.content} username={post.username} upvote={post.upvote} downvote={post.downvote}></Post>
                )}
                    <Post id="3" upvote="100" downvote="21" title="Hieu's static post" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
                    username="hieule209"></Post>

            </Paper>
        </Container>
    )
}

export default PostContainer
