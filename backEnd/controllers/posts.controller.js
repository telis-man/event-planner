const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");
const { MongoClient } = require("mongodb");

const posts = [
  { title: "Hello title one", id: 1, body: "Random post number one" },

  { title: "Hello title two", id: 2, body: "Random post number two" },

  { title: "Hello title three", id: 3, body: "Random post number three" },
];

router.get("/", async (req, res) => {
  // res.send(posts);

  const client = await new MongoClient("mongodb://127.0.0.1:27017").connect();
  const postsArray = await client
    .db("appDB")
    .collection("participants")
    .find({})
    .toArray();
  await client.close();
  console.log(postsArray);
  res.send(postsArray);
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  res.send(posts.filter((post) => post.id == id));
});

router.post("/", async (req, res) => {
  const post = req.body;
  console.log(post);
  const client = await new MongoClient("mongodb://127.0.0.1:27017").connect();
  await client.db("appDB").collection("participants").insertOne(post);
  await client.close();
  console.log(post.title);
  console.log(req);
  console.log(res);
  res.status(201).send(post);
});

router.put("/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const updatedPost = req.body;
  console.log("INFO");
  console.log(id);
  console.log(updatedPost);

  try {
    const client = await new MongoClient("mongodb://127.0.0.1:27017").connect();
    const result = await client
      .db("appDB")
      .collection("participants")
      .updateOne({ _id: id }, { $set: updatedPost });

    await client.close();

    if (result.modifiedCount > 0) {
      res.status(200).send("Post updated successfully.");
    } else {
      res.status(404).send("Post not found.");
    }
  } catch (error) {
    console.log("Error updating post:", error);
    res.status(500).send("Internal server error.");
  }
});

router.delete("/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  console.log("INFO");
  console.log(id);

  try {
    const client = await new MongoClient("mongodb://127.0.0.1:27017").connect();
    const result = await client
      .db("appDB")
      .collection("participants")
      .deleteOne({ _id: id });

    await client.close();

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Post deleted successfully." });
    } else {
      res.status(404).json({ error: "Post not found." });
    }
  } catch (error) {
    console.log("Error deleting post:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
