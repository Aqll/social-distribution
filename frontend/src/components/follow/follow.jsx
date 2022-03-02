import {Card} from 'react-bootstrap'
import PersonIcon from '@mui/icons-material/Person'
import {Button} from 'react-bootstrap'
import './follow.css'
import {useState, useEffect} from 'react'
import axios from "axios"
import {format} from "timeago.js"

function Follow({}){

    return(
        <div className='followCard'>
            <Card >
                <Card.Header>
                    <div className="followTopLeft">
                    {/* <img className="postProfileImg" /> */}
                    <PersonIcon className="followProfileImg"/>
                    <span className="followUsername">{}</span>
                    <span className="followDate">{}</span>
                     </div> 
                </Card.Header>
                <Card.Body className="text-center">
                        <Card.Text>
                            This person has requested to follow you!
                        </Card.Text>
                     
                </Card.Body>
                <Card.Footer>
                <Button  className="acceptFollowButton" onClick={acceptFollow}>Accept</Button>
                <Button  className="declineFollowButton" onClick={declineFollow} >Decline</Button>
                </Card.Footer>

            </Card>

        </div>
    )

    function acceptFollow () {
        console.log("Follow Accepted!");
        alert("You have accepted the request!");
        
    };

    function declineFollow () {
        console.log("Follow Declined!");
        alert("You have declined the request!");
        
    };
   


}

export default Follow;