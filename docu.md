AUTHORIZATION:

-   after user log in, jwt token is store at localstorage
-   this token serves as AUTH token. It is embedded in the | headers.authorization | that is being sent every time a request on | /api/-params- | is called
-   Server will then decode this token, if token's email field matches a email on the | userdatas |, request can be made.
    -ALWAYS send 'authorization' jwt key at headers

ROUTES:

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
