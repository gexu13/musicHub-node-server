import * as dao from "./albums-dao.js";

export default function AlbumController(app) {
  const findAllAlbums = async (req, res) => {
    const albums = await dao.findAllAlbums();
    res.json(albums);
  };

  const findAlbumById = async (req, res) => {
    const id = req.params.id;
    const album = await dao.findAlbumById(id);
    res.json(album);
  };

  const findAlbumByAlbumId = async (req, res) => {
    const albumId = req.params.albumId;
    const album = await dao.findAlbumByAlbumId(albumId);
    res.json(album);
  };

  const createAlbum = async (req, res) => {
    const album = req.body;
    const newAlbum = await dao.createAlbum(album);
    res.json(newAlbum);
  };

  const likeAlbum = async (req, res) => {
    const albumId = req.params.albumId;
    const album = await dao.findAlbumByAlbumId(albumId);
    let album123 = null;
    if (album) {
      album.likes = album.likes + 1;
      await album.save();
      album123 = album;
    } else {
      const newAlbum = await dao.createAlbum({
        ...req.body,
        albumId,
        likes: 1,
      });
      album123 = newAlbum;
    }
    const currentUser = req.session["currentUser"];
    // console.log("req.session", req.session);
    const userId = currentUser._id;
    await dao.createLike(album123._id, userId);
    res.json(album123);
  };

  const findAlbumsCurrentUsersLike = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    // console.log("userId", userId);
    const likes = await dao.findLikesForUser(userId);
    const albums = likes.map((like) => like.album);
    res.json(albums);
  };

  const findAlbumsLikesByUserId = async (req, res) => {
    const userId = req.params.userId;
    // console.log("userId", userId);
    const likes = await dao.findLikesForUser(userId);
    const albums = likes.map((like) => like.album);
    res.json(albums);
  };

  const findOneAlbumsLikesByUserId = async (req, res) => {
    const albumId = req.body.albumId;
    const userId = req.body.userId;
    let result = null;
    const album = await dao.findAlbumByAlbumId(albumId);
    if (album) {
        const likes = await dao.findAlbumLike(userId, album._id);
        console.log("likes", likes);
        result = likes;
    }
    res.json(result);
  };

  const deleteLike = async (req, res) => {
    const currentUser = req.session["currentUser"];
    const userId = currentUser._id;
    const albumId = req.params.albumId;
    const album = await dao.findAlbumByAlbumId(albumId);
    if (album) {
        await dao.deleteLike(userId, album._id);
        album.likes = album.likes - 1;
        await album.save();
    }
    res.json({message: "success"});
}

const findAllAlbumLike = async (req, res) => {
    const likes = await dao.findAllAlbumLike();
    res.json(likes);
}
  app.get("/api/albums", findAllAlbums);
  app.get("/api/albums/:id", findAlbumById);
  app.get("/api/albums/albumId/:albumId", findAlbumByAlbumId);
  app.post("/api/albums", createAlbum);
  app.post("/api/albums/albumId/:albumId/like", likeAlbum);
  app.get("/api/albums/user/likes", findAlbumsCurrentUsersLike);
  app.get("/api/albums/user/:userId/likes", findAlbumsLikesByUserId);
  app.post("/api/albums/user/currentlike", findOneAlbumsLikesByUserId);
  app.delete("/api/albums/:albumId/deletelike", deleteLike);
  app.get("/api/albums/all/likes", findAllAlbumLike);
}