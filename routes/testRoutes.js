const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    status: 'success',
    apiTest: 'API test is working from Node to React! 💯'
  });
});

module.exports = router;
