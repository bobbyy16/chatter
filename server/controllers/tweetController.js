const Tweet = require("../models/Tweet");

const createTweet = async (req, res) => {
  const { text } = req.body;
  try {
    const tweet = new Tweet({
      text,
      user: req.user.id,
    });

    await tweet.save();

    // Populate user after saving
    const populatedTweet = await Tweet.findById(tweet._id).populate(
      "user",
      "username"
    );
    res.json(populatedTweet);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const getTweets = async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .populate("user", "username")
      .populate("comments.user", "username");
    res.json(tweets);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const likeTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ msg: "Tweet not found" });

    if (tweet.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: "Tweet already liked" });
    }

    tweet.likes.push(req.user.id);
    await tweet.save();

    const updatedTweet = await Tweet.findById(tweet._id)
      .populate("user", "username")
      .populate("comments.user", "username");

    res.json(updatedTweet);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const commentOnTweet = async (req, res) => {
  const { text } = req.body;
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ msg: "Tweet not found" });

    const comment = { text, user: req.user.id };
    tweet.comments.push(comment);
    await tweet.save();

    const updatedTweet = await Tweet.findById(tweet._id)
      .populate("user", "username")
      .populate("comments.user", "username");

    res.json(updatedTweet);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

const deleteTweet = async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id);
    if (!tweet) return res.status(404).json({ msg: "Tweet not found" });

    const tweetOwnerId = tweet.user._id
      ? tweet.user._id.toString()
      : tweet.user.toString();

    if (tweetOwnerId !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });

    await tweet.deleteOne();
    res.json({ msg: "Tweet removed" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

module.exports = {
  createTweet,
  getTweets,
  likeTweet,
  commentOnTweet,
  deleteTweet,
};
