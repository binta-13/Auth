const router = require("express").Router();
const verified = require('./verifyToken')
router.get("/",verified, (req, res) => {
  res.json({
    posts: {
      title: "my frist post",
      des: "random data sucses",
    },
  });
});

module.exports = router;
