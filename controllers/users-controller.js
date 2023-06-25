import * as usersDao from "./users-dao.js";

const UsersController = (app) => {

    const findUserById = async (req, res) => {
        const uid = req.params["uid"];
        const user = await usersDao.findUserById(uid);
        if(user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        } 
    };


    const findAllUsers = async (req, res) => {
        const users = await usersDao.findAllUsers();
        res.json(users);
    };

    const deleteUser = async (req, res) => {
        const status = await usersDao.deleteUser(req.params.uid);
        res.json(status);
    }


    app.get("/api/users/:uid", findUserById);
    app.get('/api/users', findAllUsers);
    app.delete('/api/users/:uid', deleteUser);
}

export default UsersController;

