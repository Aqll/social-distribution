import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Comment from "../comment/Comment";
import CreateComment from "../createComment/CreateComment";
import '../comments.css'
import axios from "axios"
import { badgeUnstyledClasses } from "@mui/base";
import { NewReleases } from "@mui/icons-material";

const CommentSection = ({myAuthor, commentsId, commentCount, postAuthorId, team}) => {
    //Handles the main comment events such as submitting comments, retrieving comments.
    const [backendComments, setBackendComments] = useState([]);
    const [author, setAuthor] = useState([]);
    const team9Authorization = btoa("Team10:abcdefg");

    //console.log("commentsID: ", myAuthor);

    //console.log("COMMENTSPATH: ", commentsPath);
    
    const fetchComments = async () => {
        if (team === "team10"){
            try {
                const result = await axios.get(commentsId);
                //puts posts in array + sorts from newest to oldest
                setBackendComments(result.data.comments.sort((p1, p2) => {
                return new Date(p2.published) - new Date(p1.published)
                }))
            } catch(error){
            }
        }
        if (team === "team9"){
            try {
                const result = await axios.get(commentsId, {
                    headers: {
                      'authorization': 'Basic ' + team9Authorization
                    }
                  });
                //puts posts in array + sorts from newest to oldest
                setBackendComments(result.data.comments.sort((p1, p2) => {
                return new Date(p2.published) - new Date(p1.published)
                }))
            } catch(error){
            }
        }
        
    }

    useEffect(() => {
        // this is where we fetch comments from the api
        fetchComments();
        
    }, []);

    const addComment  = async (text) => {
        //formats comment and handles the submition 

        var date = new Date();
        var formattedDate = date.toISOString();

        var newComment = {
            "type": "comment",
            "author": myAuthor,
            "comment": text,
            "contentType": "text/plain",
            "published": formattedDate.charAt,
        }

            if (team === "team10"){
                    //sending comment to post first, waiting for id
                    try {
                        await axios.post(commentsId + '/', newComment)
                        .then((response) => {
                            newComment["id"] = response.data.id;
                        });

                    } catch (error) {
                        //console.log(error)
                    }
                    //sending comment to inbox of post owner 

                    try {
                        await axios.post(postAuthorId + '/inbox/', newComment)
                        .then((response) => {
                        });

                    } catch (error) {
                        //console.log(error)
                    }
            }

            if (team === "team9"){
                try {
                    
                    await axios.post(commentsId, newComment, {
                        headers: {
                          'authorization': 'Basic ' + team9Authorization
                        }
                      })
                    .then((response) => {
                        //console.log("COMMENTID: ", response)
                        newComment["id"] = response.data.id;
                    });

                } catch (error) {
                    //console.log(error)
                }
                try {
                    console.log("POST AUTHOR ID: ", postAuthorId);
                    await axios.post(postAuthorId + "/inbox", newComment, {
                        headers: {
                          'authorization': 'Basic ' + team9Authorization
                        }
                      })
                    .then((response) => {
                    });

                } catch (error) {
                    //console.log(error)
                }

            }
        

       //fetch from server again if comment is uploaded, ideally new one should show as well or display is internally
       //setBackendComments([newInternalComment, ...backendComments])
       //OR
       fetchComments();

    console.log("addComment:", newComment);
};
    return (
        <div className="comments">
            <h3 className="comments-title"> Comments</h3>
            <div className="comment-form-title">Post a comment!</div>
            <CreateComment submitLabel = "Post" handleSubmit={addComment} myAuthor ={myAuthor} />
            
            <div className="comments-container">
                {/* //remember to send in key = {backendComment.id} when you have it */}
                {backendComments.map((backendComment) => (
                    
                    <Comment key = {backendComment.id} myAuthor = {myAuthor} comment = {backendComment} team = {team}/>
                    //commentBody = {b.comment} commentAuthor = {b.author.displayName} commentDate = {b.published}

                ))}
            </div>
        </div>
    )
};

export default CommentSection;