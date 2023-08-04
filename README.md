Dependencies
============

To install required packages:
`python -m pip install -r requirements.txt`

**NOTE:** Adding packages while not in a virtual environment will add **all** packages installed on your computer.

Testing
=======

To run the automated backend tests:
1. Navigate to the `/backend` folder
2. `python manage.py test tests`

## Overview of API Endpoints and Functionality

The API provides a set of endpoints that enable users to perform various actions within the social media platform. Here is an overview of the main endpoints and their functionalities:

1. **Authors Endpoint**: This endpoint allows users to retrieve a list of all profiles on the server in a paginated format. Users can view details such as display name, GitHub profile, and profile image.

2. **Single Author Endpoint**: Users can access detailed information about a single author by providing their unique AUTHOR_ID. It supports both GET and POST requests, allowing users to retrieve and update their profile information.

3. **Posts Endpoint**: This endpoint provides access to recent posts from a specific author (identified by AUTHOR_ID) in a paginated format. Users can view post details, such as title, content, categories, and publishing date.

4. **Single Post Endpoint**: By providing both the AUTHOR_ID and POST_ID, users can access a specific post. It supports GET, POST, PUT, and DELETE requests, enabling actions like retrieving, updating, and deleting posts.

5. **Comments Endpoint**: Users can view comments associated with a particular post by providing AUTHOR_ID and POST_ID. It supports GET and POST requests, allowing users to view existing comments and add new ones.

6. **Single Comment Endpoint**: This endpoint allows users to access a specific comment by providing the AUTHOR_ID, POST_ID, and COMMENT_ID. It supports GET requests to retrieve comment details.

7. **Like Endpoints**: The API supports two endpoints for handling likes: one for post likes and one for comment likes. Users can view likes for specific posts and comments using GET requests.

8. **Inbox Endpoint**: Users can access their inbox to view posts, follows, likes, and comments sent to them by other users. It supports GET, POST, and DELETE requests to retrieve, add, and clear inbox items.

9. **Liked Endpoint**: This endpoint enables users to view a list of public content that the specific AUTHOR_ID has liked.


Technical API Details
=======

|           Items           |                                    URI                                    |      Allowed Methods      |
|---------------------------|---------------------------------------------------------------------------|---------------------------|
| Authors                   | /authors/ | GET |
| Single Author             | /authors/{AUTHOR_ID}/ | GET, POST |
| Posts                     | /authors/{AUTHOR_ID}/posts/ | GET, POST
| Single Post               | /authors/{AUTHOR_ID}/posts/{POST_ID}/ | GET, POST, PUT, DELETE
| Image Post                | /authors/{AUTHOR_ID}/posts/{POST_ID}/image | GET
| Comments                  | /authors/{AUTHOR_ID}/posts/{POST_ID}/comments/ | GET, POST
| Single Comment            | /authors/{AUTHOR_ID}/posts/{POST_ID}/comments/{COMMENT_ID}/ | GET
| Likes (Post)              | /authors/{AUTHOR_ID}/posts/{POST_ID}/likes | GET
| Single Like (Post)        | /authors/{AUTHOR_ID}/posts/{POST_ID}/likes/{LIKE_ID} | GET, DELETE
| Likes (Comment)           | /authors/{AUTHOR_ID}/posts/{POST_ID}/comments/{COMMENT_ID}/likes | GET
| Single Like (Comment)     | /authors/{AUTHOR_ID}/posts/{POST_ID}/comments/{COMMENT_ID}/likes/{LIKE_ID} | GET, DELETE
| Liked                     | /authors/{AUTHOR_ID}/liked/ | GET
| Inbox                     | /authors/{AUTHOR_ID}/inbox/ | GET, POST, DELETE
| Follower                  | /authors/{AUTHOR_ID}/followers/ | GET
| Single Follower           | /authors/{AUTHOR_ID}/followers/{FOREIGN_AUTHOR_ID} | GET, PUT, DELETE

## Authors
   
*    URL: `/authors/`
*    **GET: retrieve all profiles on the server (paginated)**
*    Response example:
```json
{
   "type": "authors",
   "page": 1,
   "size": 5,
   "count": 2,      
   "items":[
        {
           "type":"author",
           "id":"http://127.0.0.1:5454/authors/1d698d25ff008f7538453c120f581471",
           "url":"http://127.0.0.1:5454/authors/1d698d25ff008f7538453c120f581471",
           "host":"http://127.0.0.1:5454/",
           "displayName":"Greg Johnson",
           "github": "http://github.com/gjohnson",
           "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
       },
       {
           "type":"author",
           "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
           "host":"http://127.0.0.1:5454/",
           "displayName":"Lara Croft",
           "url":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
           "github": "http://github.com/laracroft",
           "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
       }
    ]
}
```
## Single Author

*    URL: `/authors/{AUTHOR_ID}/`
*    **GET [local, remote]: retrieve AUTHOR_ID’s profile**
*    Response example:
```json
{
   "type":"author",
   "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
   "host":"http://127.0.0.1:5454/",
   "displayName":"Lara Croft",
   "url":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
   "github": "http://github.com/laracroft",
   "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
}
```
*   **POST [local]: update AUTHOR_ID’s profile**
*   Request example:
    
```json
{
   #Any field can be updated
   "host":"http://127.0.0.1:5454/",
   "displayName":"Lara Croft",
   "url":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
   "github": "http://github.com/laracroft",
   "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
}
```

## Post
   
*    URL: `/authors/{AUTHOR_ID}/posts/`
*    **GET [local, remote] get the recent posts from author AUTHOR_ID (paginated)**
*    Response example:
```json
{
    "type": "posts",
    "page": 1,
    "size": 5,
    "count": 1, 
    "items": [
        {
            "type": "post",
            "title": "aa",
            "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8/posts/5b34dbd3-15fc-4c9b-bced-a652904694fc",
            "source": "",
            "origin": "",
            "description": "a",
            "contentType": "a",
            "content": "a",
            "author": {
                "type": "author",
                "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
                "host": "http://127.0.0.1:8000",
                "displayName": "user2",
                "url": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
                "github": "",
                "profileImage": ""
            },
            "categories": "ss",
            "count": 0,
            "comments": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8/posts/5b34dbd3-15fc-4c9b-bced-a652904694fc/comments",
            "commentsSrc": "No comments",
            "published": "2020-05-05T00:00:00Z",
            "visibility": "public",
            "unlisted": false
        }
    ]
}
```

*   **POST [local] create a new post but generate a new id**
*   Request example:
```json
{
    "title": "New Post",
    "description": "This is a new post",
    "contentType": "text/plain",
    "content": "This is new post",
    "author": {
        "type": "author",
        "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
        "host": "http://127.0.0.1:8000",
        "displayName": "Elon M",
        "url": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
        "github": "http://www.github.com/elon",
        "profileImage": ""
    }
    "categories": "new",
    "published": "2011-03-10",
    "visibility": "PUBLIC",
    "unlisted": false
}
```

## Single Post

* URL: `/authors/{AUTHOR_ID}/posts/{POST_ID}/`
* **GET [local, remote] get the post whose id is POST_ID**
* Response example:
```json
{
    "type": "post",
    "title": "New Post",
    "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8/posts/62b67078-1f48-43bb-a627-0d89a4cbee04",
    "source": "",
    "origin": "",
    "description": "This is a new post",
    "contentType": "text/plain",
    "content": "This is new post",
    "author": {
        "type": "author",
        "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
        "host": "http://127.0.0.1:8000",
        "displayName": "Elon M",
        "url": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
        "github": "http://www.github.com/elon",
        "profileImage": ""
    },
    "categories": "new",
    "count": 0,
    "comments": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8/posts/62b67078-1f48-43bb-a627-0d89a4cbee04/comments",
    "commentsSrc": "No comments",
    "published": "2011-03-10T00:00:00Z",
    "visibility": "PUBLIC",
    "unlisted": false
}
```
* **POST [local] update the post whose id is POST_ID (must be authenticated)**
*   Request example:
```json
{
    "title": "New Post edited",
    "description": "This is a new post",
    "contentType": "text/plain",
    "content": "This is new post",
    "author": "{AUTHOR_ID}"
    "categories": "new",
    "published": "2011-03-10",
    "visibility": "PUBLIC",
    "unlisted": false
}
```
* DELETE [local] remove the post whose id is POST_ID
*   **PUT [local] create a post where its id is NEW_POST_ID**
*    URL: `/authors/{AUTHOR_ID}/posts/{NEW_POST_ID}/`
*   Request example:
```json
{
    "title": "New Post",
    "description": "This is a new post",
    "contentType": "text/plain",
    "content": "This is new post",
    "author": "{AUTHOR_ID}"
    "categories": "new",
    "published": "2011-03-10",
    "visibility": "PUBLIC",
    "unlisted": false
}
```

## Comments
* URL: `/authors/{AUTHOR_ID}/posts/{POST_ID}/comments/`
* **GET [local, remote] get the list of comments of the post whose id is POST_ID (paginated)**
* Response example:
```json
{
    "type": "comments",
    "page": 1,
    "size": 5,
    "count": 1,
    "post": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8/posts/5b34dbd3-15fc-4c9b-bced-a652904694fc",
    "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8/posts/5b34dbd3-15fc-4c9b-bced-a652904694fc/comments",
    "comments": [
        {
            "type": "comment",
            "author": {
                "type": "author",
                "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
                "host": "http://127.0.0.1:8000",
                "displayName": "user2",
                "url": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
                "github": "",
                "profileImage": ""
            },
            "comment": "New comment",
            "contentType": "text/plain",
            "published": "2022-03-10T00:00:00Z",
            "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8/posts/5b34dbd3-15fc-4c9b-bced-a652904694fc/comments/f43322bd-4af3-4740-8358-5770ebe523c2"
        }
    ]
}
```


* **POST [local] if you post an object of “type”:”comment”, it will add your comment to the post whose id is POST_ID**
* Request example:
```json
{
    "type": "comment",
     "author": {
        "type": "author",
        "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
        "host": "http://127.0.0.1:8000",
        "displayName": "Elon M",
        "url": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
        "github": "http://www.github.com/elon",
        "profileImage": ""
    },
    "comment": "New comment",
    "contentType": "text/plain",
    "published": "2022-03-10"
}
```


## Single Comment
* URL: : `/authors/{AUTHOR_ID}/posts/{POST_ID}/comments/{COMMENT_ID}/`
* **GET [local, remote] get the comment whose id is COMMENT_ID**
* Response example:
```json
{
    "type": "comment",
    "author": {
        "type": "author",
        "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
        "host": "http://127.0.0.1:8000",
        "displayName": "user2",
        "url": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8",
        "github": "",
        "profileImage": ""
    },
    "comment": "New comment",
    "contentType": "text/plain",
    "published": "2022-03-10T00:00:00Z",
    "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8/posts/5b34dbd3-15fc-4c9b-bced-a652904694fc/comments/f43322bd-4af3-4740-8358-5770ebe523c2"
}
```
## Like
* URL: `/authors/{AUTHOR_ID}/posts/{POST_ID}/likes`
* URL: `/authors/{AUTHOR_ID}/posts/{POST_ID}/comments/{COMMENT_ID}/likes`
* **GET [local, remote] a list of likes from other authors on AUTHOR_ID’s post POST_ID and comment COMMENT_ID**
* Response example:
```json
 {
     "@context": "https://www.w3.org/ns/activitystreams",
     "summary": "Lara Croft Likes your post",         
     "type": "Like",
     "author":{
         "type":"author",
         "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
         "host":"http://127.0.0.1:5454/",
         "displayName":"Lara Croft",
         "url":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
         "github":"http://github.com/laracroft",
         "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
     },
     "object":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e"
}
```

## Single Like
* URL: `/authors/{AUTHOR_ID}/posts/{POST_ID}/likes/{LIKE_ID}`
* DELETE [local] remove the like object whose id is LIKE_ID

## Inbox
* URL: /authors/{AUTHOR_ID}/inbox/
* GET [local]: if authenticated get a list of posts sent to AUTHOR_ID (paginated)
* Response example:
```json
{
    "type":"inbox",
    "author":"http://127.0.0.1:5454/authors/c1e3db8ccea4541a0f3d7e5c75feb3fb",
    "count": 2,
    "items":[
        {
            "type":"post",
            "title":"A Friendly post title about a post about web dev",
            "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e"
            "source":"http://lastplaceigotthisfrom.com/posts/yyyyy",
            "origin":"http://whereitcamefrom.com/posts/zzzzz",
            "description":"This post discusses stuff -- brief",
            "contentType":"text/plain",
            "content":"Þā wæs on burgum Bēowulf Scyldinga, lēof lēod-cyning, longe þrāge folcum gefrǣge (fæder ellor hwearf, aldor of earde), oð þæt him eft onwōc hēah Healfdene; hēold þenden lifde, gamol and gūð-rēow, glæde Scyldingas. Þǣm fēower bearn forð-gerīmed in worold wōcun, weoroda rǣswan, Heorogār and Hrōðgār and Hālga til; hȳrde ic, þat Elan cwēn Ongenþēowes wæs Heaðoscilfinges heals-gebedde. Þā wæs Hrōðgāre here-spēd gyfen, wīges weorð-mynd, þæt him his wine-māgas georne hȳrdon, oð þæt sēo geogoð gewēox, mago-driht micel. Him on mōd bearn, þæt heal-reced hātan wolde, medo-ærn micel men gewyrcean, þone yldo bearn ǣfre gefrūnon, and þǣr on innan eall gedǣlan geongum and ealdum, swylc him god sealde, būton folc-scare and feorum gumena. Þā ic wīde gefrægn weorc gebannan manigre mǣgðe geond þisne middan-geard, folc-stede frætwan. Him on fyrste gelomp ǣdre mid yldum, þæt hit wearð eal gearo, heal-ærna mǣst; scōp him Heort naman, sē þe his wordes geweald wīde hæfde. Hē bēot ne ālēh, bēagas dǣlde, sinc æt symle. Sele hlīfade hēah and horn-gēap: heaðo-wylma bād, lāðan līges; ne wæs hit lenge þā gēn þæt se ecg-hete āðum-swerian 85 æfter wæl-nīðe wæcnan scolde. Þā se ellen-gǣst earfoðlīce þrāge geþolode, sē þe in þȳstrum bād, þæt hē dōgora gehwām drēam gehȳrde hlūdne in healle; þǣr wæs hearpan swēg, swutol sang scopes. Sægde sē þe cūðe frum-sceaft fīra feorran reccan",
            "author":{
                  "type":"author",
                  "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
                  "host":"http://127.0.0.1:5454/",
                  "displayName":"Lara Croft",
                  "url":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
                  "github": "http://github.com/laracroft",
                  "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
            },
            "categories":["web","tutorial"],
            "comments":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments"
            "published":"2015-03-09T13:07:04+00:00",
            "visibility":"FRIENDS",
            "unlisted":false
        },
        {
            "type":"post",
            "title":"DID YOU READ MY POST YET?",
            "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/999999983dda1e11db47671c4a3bbd9e",
            "source":"http://lastplaceigotthisfrom.com/posts/yyyyy",
            "origin":"http://whereitcamefrom.com/posts/zzzzz",
            "description":"Whatever",
            "contentType":"text/plain",
            "content":"Are you even reading my posts Arjun?",
            "author":{
                  "type":"author",
                  "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
                  "host":"http://127.0.0.1:5454/",
                  "displayName":"Lara Croft",
                  "url":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
                  "github": "http://github.com/laracroft",
                  "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
            },
            "categories":["web","tutorial"],
            "comments":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/de305d54-75b4-431b-adb2-eb6b9e546013/comments"
            "published":"2015-03-09T13:07:04+00:00",
            "visibility":"FRIENDS",
            "unlisted":false
        }
    ]
}
```
* **POST [local, remote]: send a post to the author**
```
  if the type is “post” then add that post to AUTHOR_ID’s inbox
  if the type is “follow” then add that follow is added to AUTHOR_ID’s inbox to approve later
  if the type is “like” then add that like to AUTHOR_ID’s inbox
  if the type is “comment” then add that comment to AUTHOR_ID’s inbox
```
* Request structure:
```json
{
    "type": "post",
    "id": "http://127.0.0.1:8000/authors/1caf7350-e55c-4ab1-a9f7-637498f379b8/posts/5b34dbd3-15fc-4c9b-bced-a652904694fc/"
} 
```

* Request structure for likes:
```json
 {
     "context": "https://www.w3.org/ns/activitystreams",
     "summary": "Lara Croft Likes your post",         
     "type": "Like",
     "author":{
         "type":"author",
         "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
         "host":"http://127.0.0.1:5454/",
         "displayName":"Lara Croft",
         "url":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
         "github":"http://github.com/laracroft",
         "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
     },
     "object":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e"
}
```

* DELETE [local]: clear the inbox


## Liked
* URL: `/authors/{AUTHOR_ID}/liked/`
* GET [local, remote] list what public things AUTHOR_ID liked
* Response example:
```json
{
    "type":"liked",
    "items":[
        {
            "@context": "https://www.w3.org/ns/activitystreams",
            "summary": "Lara Croft Likes your post",         
            "type": "Like",
            "author":{
                "type":"author",
                "id":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
                "host":"http://127.0.0.1:5454/",
                "displayName":"Lara Croft",
                "url":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e",
                "github":"http://github.com/laracroft",
                "profileImage": "https://i.imgur.com/k7XVwpB.jpeg"
            },
            "object":"http://127.0.0.1:5454/authors/9de17f29c12e8f97bcbbd34cc908f1baba40658e/posts/764efa883dda1e11db47671c4a3bbd9e"
        }
    ]
}
```

Resources used
=========
- https://www.digitalocean.com/community/tutorials/build-a-to-do-application-using-django-and-react (Jordan Irabor, Updated on February 17, 2021)
- https://stackoverflow.com/a/54069332 (Shubham Khatri, Jan 7, 2019)
- https://www.youtube.com/watch?v=qmr9NCYjueM&list=LL&index=6 (Sam Lama, Jul 25, 2020)
- https://www.youtube.com/watch?v=J8Zi_BmQGEM&list=LL&index=7 (Robert Mopia, Nov 20, 2020)
- https://www.youtube.com/watch?v=i8fAO_zyFAM&list=LL&index=8 (Tyler Potts, Jan 12, 2021)
- https://www.youtube.com/watch?v=pFHyZvVxce0&list=LL&index=9 (Lama Dev, Apr 7, 2021)
- https://www.youtube.com/watch?v=zM93yZ_8SvE&list=LL&index=10 (Lama Dev, Mar 30, 2021)
- https://www.youtube.com/watch?v=sjAeLwuezxo&list=LL&index=12 (Monsterlessons Academy, Sep 7, 2021)
