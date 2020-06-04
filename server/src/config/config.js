module.exports ={
    port: 8081,
    db:{
        database: 'auth',
        user: 'root',
        password: 'root',
        options:{
            dialect: 'mysql',
            host: 'localhost',
        }
    },
    authentication:{
        jwtSecret: 'secret'
    }
}
