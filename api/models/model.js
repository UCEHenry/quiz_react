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
                let addUser = await db.query(`INSERT INTO users (username, score)
                                    VALUES ($1, 0)
                                    RETURNING *;`, [ username ]);
                let newUser = new User(addUser.rows[0]);
                resolve (newUser);
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
                let updateScore = await db.query(`UPDATE users
                                    SET score = $1
                                    WHERE username = $2
                                    AND score < $1
                                    RETURNING *;`, [ score, username ]);
                let newScore = new User(updateScore.rows[0]);
                resolve (newScore);
            } catch (err) {
                reject('User not found');
            }
        });
    };

    static get usersTopTen(){ 
        return new Promise (async (resolve, reject) => {
            try {
                const result = await db.query(`SELECT username, score
                                                    FROM users
                                                    ORDER BY score DESC
                                                    LIMIT 10;`)
                const users = result.rows.map(user => ({ username: user.username, score: user.score }))
                resolve(users);
            } catch (err) {
                reject("Error retrieving users")
            }
        })
    };
}

module.exports = User
