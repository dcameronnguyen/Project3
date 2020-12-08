const express = require("express");
const router = express.Router();
const scoresCtrl = require("../../controllers/scores");

router.get("/", scoresCtrl.highScores);

/*---------- Protected Routes ----------*/
// Process the token for only the routes below
router.use(require("../../config/auth"));
// adds checkAuth so if a user is NOT signed in or token is not valid, gives "Not Authorized" error
// if use
router.post("/", checkAuth, scoresCtrl.create);

// restricts access so ONLY valid authenticated users can access the route
function checkAuth(req, res, next) {
  if (req.user) return next();
  return res.status(401).json({ msg: "Not Authorized" });
}

module.exports = router;
