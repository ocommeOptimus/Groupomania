# Groupomania

Welcome to my project Groupomania !

This is the 7th project into my web developer training.
This project is a client-server model that includes an API and single page applications.

## Getting Started

Clone this repository on your local machine.

### Prerequisites

For the serve-side web applications, you need to install the Node.js runtime and MySQL.
You can download them at these followings links :
* [Node.js](https://nodejs.org/en/)
* [MySQL](https://dev.mysql.com/downloads/installer/)

### Installing

On your terminal, from the back-end folder, run these followings commands :

```
- npm install
- Then, from your code editor :
    - set the database config for your MySQL implementation at config > config.json
    - set the using environment into models > index.js file
- To migrate your database config to MySQL, please be sure your MySQL server is on and from your terminal run :
    - sequelize db:create
    - sequelize db:migrate
- node server
```

After that, your terminal will be listen on an available port, usually the [localhost:3000](http://localhost:3000/)
Since you need to use the server, do not finish the listening or close the terminal.

To access to the front-end Single Page Application, you need to open another terminal.
Then, run these commands :

```
- npm install
- npm run serve
```

Thanks to the last command, the Single Page Applications will listen on the port [localhost:8080](http://localhost:8080/).
Since you need to use the front-end, do not finish the listening or close the terminal.

## Deployment

Please be aware of the localhost port number used by your local machine when you deploy the front end application.
You can easily find it bypass your terminal.
For the moment, to apply the 1st admin role you must pass by an API client and update the user profile of your choice.
Please be aware of the user routes into the back-end folder.

## Built With

* [Node.js](https://nodejs.org/en/) - The Javascript runtime used
* [Express](https://expressjs.com/fr/) - The framework used for the server
* [Sequelize](https://sequelize.org/) - The promise-based Node.js object-relational mapping (used with MySQL)
* [Mysql2](https://www.npmjs.com/package/mysql2) - The dabase service
* [VueJS](https://vuejs.org/) - The framework used for the client
* [Bootstrap-Vue](https://bootstrap-vue.org/) - The implementation of the Bootstrap v4 component and grid system for Vue.js

## Contributing

Get in touch with me [ocommeoptimus@gmail.com](mailto:ocommeoptimus@gmail.com).

## Versioning

We use [Git](https://git-scm.com/) for versioning. For the versions available, see the [commits on this repository](https://github.com/ocommeOptimus/Groupomania/commits/). 

## Authors

* **ocommeOptimus** 

## Acknowledgments

* Hat tip to Lucie Baroiller and anyone whose code was used.