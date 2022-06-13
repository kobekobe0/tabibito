AUTHORIZATION:

-   after user log in, jwt token is store at localstorage
-   this token serves as AUTH token. It is embedded in the | headers.authorization | that is being sent every time a request on | /api/-params- | is called
-   Server will then decode this token, if token's email field matches a email on the | userdatas |, request can be made.
    -ALWAYS send 'authorization' jwt key at headers

UPDATING USER PROFILE:

-   in FE, client will send a formdata containing name, bio, pfp, and bg. Pfp and bg uses multer to store updated image in server, after saving to server, multer now returns path to the next middleware, that middleware will now save the path to database(like a key in order to query specific image). After all those saving. The last middleware will now encrypt all user data using jwt with the keyword of "secretkey". That token will now be sent to FE, then FE will replace the old token with the new one in localStorage. So that in query, the right value will be passed. Because in this app. Im storing jwt token in localstorage then for every request, I decode that.

ROUTES:

PUBLIC FEED ROUTE
/travel/public?limit=N&page=N :

PARAMS:
-limit
-page

RETURNS:

    {
    "prev": {
        "page": 1,
        "limit": 1
    },
    "next": {
        "page": 3,
        "limit": 1
    },
    "result": [
        {
            "saves": [],
            "_id": "6294c6f6531b67631fcb602a",
            "userId": "6254482fd872d65d7e799d6d",
            "images": [
                "uploads\\imageUpload-1653917430419.jpg",
                "uploads\\imageUpload-1653917430422.jpg",
                "uploads\\imageUpload-1653917430441.jpg"
            ],
            "food": 1000,
            "accommodation": 250,
            "transportation": 600,
            "other": 1000,
            "title": "GGLODS",
            "locationCountry": " Philippines",
            "locationCity": "Manila",
            "locationTown": "Obando",
            "transportationType": "Commute",
            "travelerCountry": "Philippines",
            "travelerCity": "Bulacan",
            "travelerTown": "Pandi",
            "description": "kamado Gonpachiro",
            "private": false,
            "deleted": false,
            "duration": 2,
            "likes": [
                ""
            ],
            "username": "kobe",
            "travelerCount": 2,
            "Date": "2022-05-30T13:30:30.466Z",
            "createdAt": "2022-05-30T13:30:30.477Z",
            "updatedAt": "2022-05-30T13:30:30.477Z",
            "__v": 0
            }
        ]
    }

LIKE ROUTE
PUT /api/travel/:id/like

PARAMS:
id

BODY:
userId
method ("like"/"unlike")

RETURNS:
{
message: 'status' = either success or already liked/unliked
}

SAVE ROUTE
PUT /api/travel/:id/save

PARAMS:
id

BODY:
userId
method ("save","unsave")

RETURNS:
{
message: 'status' = either success or already save/unsaved
}
