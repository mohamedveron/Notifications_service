# notifications
notifications service (SMS, Push notifcations) 

## Installation

Clone the repo, enter the app dir and run the following commands:

```bash
cp .env.dev .env
docker-compose up -d --build
```

Application will be run on http://localhost:3335
Socket hub will be run at http://localhost:23000

# Apis

1- you must start to add users first :

  method: post
  
  body: {
	"username": "veron",
	"email": "veron@gmail.com",
	"type": "customer",
	"groupId": 4,
	"phone": "+201068553570"	
}

2- start adding notifications events to be sends later to clients and drivers :

  method: post
  
  body: {
	"type" : "push",
	"description" : "Your new swvl promo code is 92111 enjoy!",
	"groupId" : 4
}

