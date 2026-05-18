import { Follows } from "../model/follow.model.js";
import { User } from "../model/user.model.js";

export const followUser = async (req, res) => {
  try {
    const followerId = req.user;
    const followeeId = req.params.userId;

    const user = await User.findById(followeeId);

    if (!user) {
      return res.status(404).json({
        message: "user not exist ",
      });
    }

    if (followerId === followeeId) {
      return res.status(401).json({
        message: "You can not follow your self",
      });
    }

    const isAlreadyFollow = await Follows.findOne({
      follower: followerId,
      followee: followeeId,
    });

    if (isAlreadyFollow) {
      return res.status(409).json({
        message: `you are already following ${user.userName}`,
      });
    }
    const follow = await Follows.create({
      follower: followerId,
      followee: followeeId,
    });

    res.status(201).json({
      message: "Follow request has send",
      follow,
    });
  } catch (error) {
    return res.status(500).json({
      message: "somthing went worng at followUser controller",
    });
  }
};

export const unFollowUser = async (req, res) => {
  try {
    const followerId = req.user;
    const followeeId = req.params.userId;

    const isUserFollow = await Follows.findOne({
      follower: followerId,
      followee: followeeId,
    });
    if (!isUserFollow) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const unFollowUser = await Follows.findByIdAndDelete({
      _id: isUserFollow._id,
    });
    return res.status(201).json({
      message: "user has Unfollowed",
    });
  } catch (error) {
    return res.status({
      message: "Somting Went Wrong at unfollow Controller",
    });
  }
};

export const manageFollowRequest = async (req, res) => {
  try {
    const followerId = req.params.userId;
    const followeeId = req.user;
    const status = req.params.status;

    const follow = await Follows.findOne({
      follower: followerId,
      followee: followeeId,
    });
    if (!follow) {
      return res.status(404).json({
        message: "follow request not exist",
      });
    }

    const update = await Follows.findByIdAndUpdate(
      { _id: follow.id },
      { status: status },
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validation
      },
    );
    return res.status(201).json({
      message: `follow has ${status}`,
      update,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Somthing went Wrong at ManageFollowRequest controller",
    });
  }
};
