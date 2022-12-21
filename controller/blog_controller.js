const blog = require("../model/blog_model");
const likeUnlike = require("../model/like_unlike_model");

/// this is post bolog api for user post ower blog in perticular category...
exports.postBlog = async (req, res) => {
  try {
    const { title, description, published } = req.body;
    let userData = {
      userId: req.data.userId,
      title: title,
      description: description,
      published: published,
    };
    let data = await blog.insertMany(userData);
    res.status(200).json({
      message: "Request successfully completed!",
      data: data,
      errr_code: 200,
      status: "success",
    });
  } catch (error) {
    res.status(403).json({
      message: error.message,
      data: [],
      errr_code: 403,
      status: "Request not completed successfuly",
    });
  }
};

/// this is post api for user Like unlike first user login and then must be like post..
/// this is method is give one parems this is blog id and and then search user already like or not,,,,
///
exports.postLikes = async (req, res) => {
  try {
    let { like } = req.body;
    let findData = await likeUnlike.find({ blogId: req.params.blogId });
    let userData = {
      userId: req.data.userId,
      like: like,
      blogId: req.params.blogId,
    };
    var finalData = findData.find((e) => e.userId == req.data.userId);
    console.log(finalData);
    if (finalData === undefined) {
      let data = await likeUnlike.insertMany(userData);
      res.status(200).json({
        message: "User Like Post!",
        data: data,
        errr_code: 200,
        status: "success",
      });
    } else {
      let updateData = {
        like: like,
      };
      await likeUnlike.findOneAndUpdate(
        { blogId: req.params.blogId },
        { $set: updateData }
      );
      res.status(202).json({
        message: "User Unlike Post!",
        data: [],
        errr_code: 202,
        status: "success",
      });
    }
  } catch (error) {
    res.status(403).json({
      message: error.message,
      data: [],
      errr_code: 403,
      status: "Request not completed successfuly",
    });
  }
};

/// this is get api for the all date get and send the data..
exports.getAllBlogs = async (req, res) => {
  try {
    const totalPosts = await blog.countDocuments().exec();
    const pageNumber = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const result = {};
    let startIndex = pageNumber * limit;
    const endIndex = (pageNumber + 1) * limit;
    result.totalPosts = totalPosts;
    if (startIndex > 0) {
      result.previous = {
        pageNumber: pageNumber - 1,
        limit: limit,
      };
    }
    if (endIndex < (await blog.countDocuments().exec())) {
      result.next = {
        pageNumber: pageNumber + 1,
        limit: limit,
      };
    }
    let data = await blog.find().populate('like').skip(startIndex).limit(limit);
    res.status(200).json({
      message: "Request successfully completed!",
      data: data,
      errr_code: 200,
      status: "success",
      totalPosts: Math.ceil(totalPosts / limit),
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
      data: [],
      errr_code: 401,
      status: "Request not completed successfuly",
    });
  }
};

/// this is data delete api for login user able to delte over data..
///
exports.deleteBlogs = async (req, res) => {
  try {
    let myDataBlog = await blog.find({ userId: req.data.userId });
    let blogData = myDataBlog.find(
      (e) => e._id.toString() == req.params.blogId
    );
    if (blogData != undefined) {
      await blog.findByIdAndDelete({ _id: req.params.blogId });
      await likeUnlike.findOneAndDelete({ blogId: req.params.blogId });
      res.status(202).json({
        message: "Request successfully completed!",
        data: [],
        errr_code: 202,
        status: "success",
      });
    } else {
      res.status(404).json({
        message: "You have not able to delete another User data",
        data: [],
        errr_code: 404,
        status: "Data Not Exitst or Delete another data",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
      data: [],
      errr_code: 401,
      status: "Request not completed successfuly",
    });
  }
};

/// this is update [updateBlogs] method in update one user data as update blog using blog id..
///
exports.updateBlogs = async (req, res) => {
  try {
    const { title, description, published } = req.body;
    let myDataBlog = await blog.find({ userId: req.data.userId });
    let blogData = myDataBlog.find(
      (e) => e._id.toString() == req.params.blogId
    );
    let requstData = {
      title: title,
      description: description,
      published: published,
    };
    if (blogData != undefined) {
      let data = await blog.findByIdAndUpdate(
        { _id: req.params.blogId },
        { $set: requstData }
      );
      res.status(202).json({
        message: "Request successfully completed!",
        data: [],
        errr_code: 202,
        status: "success",
      });
    } else {
      res.status(404).json({
        message: "You have not able to delete another User data",
        data: [],
        errr_code: 404,
        status: "Data Not Exitst or Delete another data",
      });
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
      data: [],
      errr_code: 401,
      status: "Request not completed successfuly",
    });
  }
};

/// get all blog using user id..
exports.getBlogByUserId = async (req, res) => {
  try {
    var data = await blog.find({ userId: req.data.userId });
    res.status(202).json({
      message: "Request successfully completed!",
      data: data,
      errr_code: 202,
      status: "success",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
      data: [],
      errr_code: 401,
      status: "Request not completed successfuly",
    });
  }
};

// http://localhost:5000/api/vi/blog/search?query=DOm

/// search by titile for blog and other things..
exports.findBlogByTitle = async (req, res) => {
  try {
    var data = await blog.find({ title: { $regex: req.query.query }, } ); /// <--- [query] this is key for search by title in params..
    if (data.length != 0) {
      res.status(200).json({
        message: "Request successfully completed!",
        data: data,
        errr_code: 200,
        status: "success",
      });
    } else {
      res.status(200).json({
        message: "Data Not found",
        data: [],
        errr_code: 200,
        status: "Request completed successfuly",
      });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
      data: [],
      errr_code: 404,
      status: "Request not completed successfuly",
    });
  }
};
