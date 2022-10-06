const router = require("express").Router();
const {
  postBlog,
  getAllBlogs,
  postLikes,
  deleteBlogs,
  updateBlogs,
  getBlogByUserId,
  findBlogByTitle,
} = require("../controller/blog_controller");
const { authenticationToken } = require("../auth/jwt_auth");

router.post("/", authenticationToken, postBlog);
router.get("/", authenticationToken, getAllBlogs);
router.post("/like/:blogId", authenticationToken, postLikes);
router.delete("/:blogId", authenticationToken, deleteBlogs);
router.put("/:blogId", authenticationToken, updateBlogs);
router.get("/userBlog", authenticationToken, getBlogByUserId);
router.get('/search',findBlogByTitle)

module.exports = router;
``