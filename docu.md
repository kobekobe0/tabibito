AUTHORIZATION:

-   after user log in, jwt token is store at localstorage
-   this token serves as AUTH token. It is embedded in the | headers.authorization | that is being sent every time a request on | /api/-params- | is called
-   Server will then decode this token, if token's email field matches a email on the | userdatas |, request can be made.

ROUTES:
