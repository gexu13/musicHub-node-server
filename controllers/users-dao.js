
export const findAllUsers = () => {
    return usersModel.find();
};


export const findUserById = (uid) => {
    return usersModel.findById(uid);
};


export const findUserByUsername = (username) => {
    return usersModel.findOne({username: username});
};


export const findUserByCredentials = (username, password) => {
    return usersModel.findOne({username: username, password: password});
};


export const createUser = (user) => {
    return usersModel.create(user);
}


export const updateUser = (id, user) => {
    return usersModel.updateOne({_id: id}, {$set: user});
};


export const deleteUser = (uid) => {
    return usersModel.deleteOne({_id: uid});
};