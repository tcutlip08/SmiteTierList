npm init -y

/////////////////////////////////////////////

npm install

"concurrently"
"nodemon"
"dotenv"
"express"
"mongoose"
"path"

(npm i concurrently nodemon dotenv express mongoose path)

/////////////////////////////////////////////

cd into client & npm install te following

"react"
"react-dom"
"react-router-dom"
"react-scripts"

(npm i react react-dom react-router-dom react-scripts react-bootstrap)

/////////////////////////////////////////////

copy paste into scripts

"start": "if-env NODE_ENV=production && npm run start:prod || npm run start:dev",
"start:prod": "node server.js",
"start:dev": "concurrently \"nodemon --ignore 'client/\*'\" \"npm run client\"",
"client": "cd client && npm run start",
"seed": "node scripts/seedDB.js",
"install": "cd client && npm install",
"build": "cd client && npm run build",
"heroku-postbuild": "npm run build",
"dev": "concurrently \"nodemon server.js\" \"cd client && npm start\""
