const express = require('express');
const asyncHandler = require('express-async-handler');
const { getFilme, deleteFilm, changeStatusFilm, addFilm } = require('../controllers/filme');
const webpush = require('web-push');

require('dotenv').config();

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

let subscription = [];

const router = express.Router();

webpush.setVapidDetails('mailto:pawlek.v03@htlwienwest.at', publicVapidKey, privateVapidKey);

router.post(
  '/subscribe',
  asyncHandler((req, res) => {
    subscription.push(req.body);
    res.status(201).end();
  }),
);

router.post('/notify', (req) => {
  const payload = JSON.stringify({ title: 'Filmerlebnis', body: req.body });
  for (const sub of subscription) {
    try {
      webpush.sendNotification(sub, payload);
    } catch (error) {
      console.error(error);
    }
  }
});

router.get('/filme', asyncHandler(getFilme));
router.patch('/filme/:id', asyncHandler(changeStatusFilm));
router.delete('/filme/:id', asyncHandler(deleteFilm));
router.post('/filme', asyncHandler(addFilm));

module.exports = router;
