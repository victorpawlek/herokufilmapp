const db = require('../db');

async function getFilme() {
  const { rows } = await db.query('SELECT * FROM filme');
  return rows;
}

async function changeStatusFilm(id, status) {
  const { rows } = await db.query('UPDATE filme SET status = $1 where id= $2 returning *', [
    status,
    id,
  ]);
  return {
    code: 200,
    data: rows,
  };
}

async function deleteFilm(id) {
  await db.query('DELETE from filme where id= $1', [id]);
  return getFilme();
}

async function addFilm(data) {
  const { rows } = await db.query(
    'INSERT INTO Filme (name,stars,location,latitude,longitude,img) VALUES($1, $2, $3, $4,$5,$6) returning *',
    [data.name, data.stars, data.location, data.latitude, data.longitude, data.img],
  );
  return {
    code: 200,
    data: rows,
  };
}

module.exports = { getFilme, changeStatusFilm, deleteFilm, addFilm };
