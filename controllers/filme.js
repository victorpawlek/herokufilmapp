const model = require('../model/filme');

const getFilme = async (req, res) => res.status(200).json(await model.getFilme());
const changeStatusFilm = async (req, res) =>
  res.status(200).json(await model.changeStatusFilm(req.params.id, req.body.status));
const deleteFilm = async (req, res) => res.status(200).json(await model.deleteFilm(req.params.id));
const addFilm = async (req, res) => res.status(200).json(await model.addFilm(req.body));

module.exports = { getFilme, changeStatusFilm, deleteFilm, addFilm };
