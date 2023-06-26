import * as usersDao from "./users-dao.js";

const AuthController = (app) => {
  
    const register = async (req, res) => {
        const username = req.body.username;
        const user = await usersDao.findUserByUsername(username);
        if(user) {
            res.status(403).send("Username already exists");
            return;
        } 
        const newUser = await usersDao.createUser(req.body);
        req.session["currentUser"] = newUser;
        res.json(newUser);
    };

    const login = async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = await usersDao.findUserByCredentials(username, password);
        if(username && password) {
            if(user) {
                req.session["currentUser"] = user;
                res.json(user);
            } else {
                res.status(403).send("Username or password incorrect");
            }
        } else {
            res.status(403).send("Username or password not provided");
        }
    };

    const logout = (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const profile = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if(currentUser) {
            const updatedUser = await usersDao.findUserById(currentUser._id);
            if(updatedUser === currentUser) {
                res.json(currentUser);
            } else {
                req.session["currentUser"] = updatedUser;
                res.json(updatedUser);
            }
        } else {
            res.sendStatus(403);
        }
    };  

    const update = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if(currentUser) {
            const updatedUser = await usersDao.updateUser(currentUser._id, req.body);
            const user = await usersDao.findUserById(currentUser._id);
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            res.sendStatus(403);
        }
    };

 

    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/logout", logout);
    app.post("/api/users/profile", profile);
    app.put("/api/users", update);


};

export default AuthController;

