import { Card, CardContent, CardHeader, CardActions, Avatar, Box, Collapse, IconButton, Typography, Switch, Input, Button } from "@mui/material";
import { socket } from '../../socket';
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


const MessageItem = ({ messageObj, ...props }) => {
    const { username, message, userId } = messageObj;
    return (
        <Card sx={{ boxShadow: 'none' }}>
            <CardHeader
                avatar={<Avatar></Avatar>}
                title={username}
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
    const [clerInput, setClearInput] = useState(false);
    function connect() {
        socket.connect();
    }

    function disconnect() {
        socket.disconnect();
    }

    const sendMessage = (message) => {
        if (!message) return;

        const messageObject = {
            userId: 1,
            username: 'Joao',
            message
        };
        setMessageEvents(previous => [...previous, messageObject]);
        socket.emit('message', messageObject);
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
        expanded ? connect() : disconnect();
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
                        <CardContent sx={{height: 200, overflowX: 'hidden', overflowY: 'scroll'}} >
                            {messageEvents?.map((message, index) => {
                                return (<><MessageItem messageObj={message} key={index} /></>);
                            })}
                        </CardContent>
                        <Box sx={{ display:'flex', padding: '10px'}}>
                            <Input 
                            fullWidth
                            value={currentMessage} onChange={(e) => {
                                setCurrentMessage(e.target.value);

                            }} />
                            <Button onClick={() => {
                                sendMessage(currentMessage);
                            }}>Send</Button>
                        </Box>
                    </Collapse>
                </Card>
            </Box>
        </>
    )
}

export default ChatBox;