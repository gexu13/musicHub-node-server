import likesModel from "./likes-model.js";
import albumsModel from "./albums-model.js";

export const findAllAlbums = () => {
    return albumsModel.find();
}
export const findAlbumById = (id) => albumsModel.findById(id);
export const findAlbumByAlbumId = (albumId) => albumsModel.findOne({ albumId });
export const createAlbum = (album) => albumsModel.create(album);
export const updateAlbum = (id, album) => albumsModel.updateOne({ _id: id }, album);

export const createLike = (id, userId) =>
  likesModel.create({ album: id, user: userId });

export const findAllAlbumLike = () => likesModel.find().populate("album").exec();

export const deleteLike = (userId, albumId) =>
    likesModel.deleteOne({ user: userId, album: albumId });

export const findAlbumLike = (userId, albumId) => {
    const like = likesModel.findOne({ user: userId, album: albumId});
    // console.log("like", like);
    return like;
}
export const findLikesForUser = (userId) =>
  likesModel.find({ user: userId }).populate("album").exec();

