const db = require('../dbConfig/init');

class User {
    constructor(data) {
        this.id = data.id;
        this.username = data.username;
        this.score = data.score;
    }

    static get all(){ 
        return new Promise (async (resolve, reject) => {
            try {
                console.log(db);
                const result = await db.query(`SELECT * FROM users;`)
                const users = result.rows.map(user => ({ id: user.id, username: user.username, score: user.score }))
                resolve(users);
            } catch (err) {
                reject("Error retrieving users")
            }
        })
    };
    
    static createUser(username){
        return new Promise (async (resolve, reject) => {
            try {
                await db.query(`INSERT INTO users (username)
                                    VALUES ($1);`, [ username ]);
                resolve ("User created");
            } catch (err) {
                reject('User not found');
            }
        });
    };

    static findByUser(username){
        return new Promise (async (resolve, reject) => {
            try {
                let userData = await db.query(`SELECT users.username, users.score
                                                    FROM users
                                                    WHERE users.username = $1;`, [ username ]);
                let user = new User(userData.rows[0]);
                resolve (user);
            } catch (err) {
                reject('User not found');
            }
        });
    };


    static updateUserScore(username, score){
        return new Promise (async (resolve, reject) => {
            try {
                await db.query(`UPDATE users
                                    SET score = $1
                                    WHERE username = $2;`, [ username, score ]);
                resolve (`${username} score has been updated to: ${score}`);
            } catch (err) {
                reject('User not found');
            }
        });
    };
}

module.exports = User