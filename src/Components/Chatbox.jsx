import { Card, CardContent, CardHeader, CardActions, Avatar, Box, Collapse, IconButton, Typography, Switch, Input, Button, FormControl } from "@mui/material";
import { socket } from '../../socket';
import { useContext, useEffect,  useRef,  useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { UserContext } from "../App";
import SendIcon from '@mui/icons-material/Send';
const MessageItem = ({ messageObj, scrollRef, ...props }) => {
    const { id, user, message } = messageObj;

    useEffect(() => {
        scrollRef?.current?.scrollIntoView()
    },[scrollRef]);

    return (
        <Card ref={scrollRef} sx={{ boxShadow: 'none' }}>
            <CardHeader
                avatar={<Avatar></Avatar>}
                title={user}
                subheader={message}
            />

        </Card>
    )
}


const ChatBox = () => {
    const [expanded, setExpanded] = useState(false);
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messageEvents, setMessageEvents] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [user, setUser] = useContext(UserContext);
    const scrollRef = useRef(null);

    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    const sendMessage = (message,user) => {
        if (!message) return;
        console.log(message)
        socket.emit('message', {message,user});
        setCurrentMessage('')
    };
   

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }
        function onMessage(value) {
            setMessageEvents(previous => [...previous, value]);
        }
        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('message', onMessage);
        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('message', onMessage);
        };
    }, []);


    const handleExpandClick = () => {
        setExpanded(!expanded);
        expanded ? disconnect() : connect();
        setIsConnected(expanded);
    };
    return (
        <>
            <Box>
                <Card sx={{ margin: '20px'}} >
                    <CardActions onClick={handleExpandClick} sx={{padding: '20px' }}>
                        <Typography variant="p" sx={{ flexGrow: 1 }}>
                            Chat
                        </Typography>
                        <IconButton >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit >
                        <CardContent display="flex" flexDirection="column" sx={{height: 300,overflow: "hidden",overflowY: "auto"}} >
                            {messageEvents.map((message) =>{
                                
                             return(<MessageItem messageObj={message} key={message.id} scrollRef={scrollRef}/>)}
                            )}
                        </CardContent>
                        <Box sx={{ display:'flex', padding: '10px'}}>
                            <form style={{ display: 'flex', flexGrow: 1 }} 
                                    onSubmit={(e) => { 
                                        e.preventDefault();
                                        sendMessage(currentMessage, user); }}>
                                <Input 
                                fullWidth
                                value={currentMessage} onChange={(e) => {
                                    setCurrentMessage(e.target.value);

                                }} />
                                <Button variant="contained" htmlType='submit' disabled={!user} 
                                    onClick={() => {sendMessage(currentMessage,user);}}
                                    
                                ><SendIcon /></Button>
                            </form>
                        </Box>
                    </Collapse>
                </Card>
            </Box>
        </>
    )
}

export default ChatBox;