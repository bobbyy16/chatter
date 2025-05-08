const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const {
  createTweet,
  getTweets,
  likeTweet,
  commentOnTweet,
  deleteTweet,
} = require("../controllers/tweetController");

router.post("/", authMiddleware, createTweet);
router.get("/", getTweets);
router.post("/like/:id", authMiddleware, likeTweet);
router.post("/comment/:id", authMiddleware, commentOnTweet);
router.delete("/:id", authMiddleware, deleteTweet);

module.exports = router;
