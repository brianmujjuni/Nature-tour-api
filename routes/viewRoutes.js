const express = require('express');

const {
  getOverview,
  getTour,
  getLoginForm,
} = require('../controllers/viewController');
const { isLoggedIn } = require('../controllers/authController');

const CSP = 'Content-Security-Policy';
const POLICY =
  "default-src 'self' https://*.mapbox.com http://127.0.0.1:3000 ws://localhost:61135;" +
  "base-uri 'self';block-all-mixed-content;" +
  "font-src 'self' https: data:;" +
  "frame-ancestors 'self';" +
  "img-src http://localhost:3000 'self' blob: data:;" +
  "object-src 'none';" +
  "script-src https: cdn.jsdelivr.net cdnjs.cloudflare.com api.mapbox.com 'self' blob: ;" +
  "script-src-attr 'none';" +
  "style-src 'self' https: 'unsafe-inline';" +
  'upgrade-insecure-requests;';

const router = express.Router();

router.use(isLoggedIn);

router.use((req, res, next) => {
  res.setHeader(CSP, POLICY);
  next();
});

router.get('/', getOverview);

router.get('/tour/:slug', getTour);
router.get('/login', getLoginForm);

module.exports = router;
