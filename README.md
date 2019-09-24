# notifications
notifications service (SMS, Push notifcations) 

## Installation

Clone the repo, enter the app dir and run the following commands:

```bash
cp .env.dev .env
docker-compose up -d --build
```

Http server will be serving at http://localhost:3335

Socket server will be serving at http://localhost:23000

# Notes

you have first have to register clients to the our websockets hub after running the app
 on (ws://http://localhost:23000?groupId;userId;type);
 
# Apis

Open http://localhost:3335/docs/#/ to see apis throw swagger

Add group notification : http://localhost:3335/notification/group  : post

Add user notification : http://localhost:3335/notification/  : post

Add user : http://localhost:3335/users/  : post

