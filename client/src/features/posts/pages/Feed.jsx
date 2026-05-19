import React from "react";
import { usePost } from "../hooks/usepost";
import { useEffect } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";

const Feed = () => {
  const { feed, handleGetFeed, loading } = usePost();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    handleGetFeed();
  }, [user]);

  if (loading || !feed) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-white">Loading...</h1>
      </div>
    );
  }

  // Handle case when feed is empty
  if (!feed.length) {
    return (
      <div className="min-h-screen bg-gray-300 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-white">
          No posts available
        </h1>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-300 overflow-y-auto">
      <div className="flex justify-center py-8 px-4">
        <div className="flex flex-col gap-4 w-full max-w-[470px]">
          {feed.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200"
            >
              {/* Post Header - User info */}
              <div className="flex items-center p-3 px-4 space-x-3">
                {/* User profile pic */}
                {post.user?.profileImage ? (
                  <img
                    src={post.user.profileImage}
                    alt={post.user.userName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                    {post.user?.userName?.substring(0, 2).toUpperCase() || "U"}
                  </div>
                )}

                {/* User name */}
                <div className="flex-1">
                  <h3 className="font-semibold text-sm text-gray-800">
                    {post.user?.userName || "Anonymous"}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {new Date(
                      post.createdAt || Date.now(),
                    ).toLocaleDateString()}
                  </p>
                </div>

                {/* Options menu */}
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>

              {/* Post image */}
              {post.imageUrl && (
                <div className="relative bg-gray-100">
                  <img
                    src={post.imageUrl}
                    alt={post.caption || "Post"}
                    className="w-full aspect-square object-cover"
                  />
                </div>
              )}

              {/* Post actions */}
              <div className="p-3 px-4 space-y-2">
                {/* Like, Comment, Share buttons */}
                <div className="flex items-center space-x-4">
                  <button className="text-gray-700 hover:text-red-500 transition-colors">
                    <Heart
                      className="w-6 h-6 transition-colors"
                      style={{
                        fill: post.isLiked ? "#ef4444" : "none",
                        color: post.isLiked ? "#ef4444" : "currentColor",
                      }}
                    />
                  </button>

                  <button className="text-gray-700 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-6 h-6" />
                  </button>

                  <button className="text-gray-700 hover:text-green-500 transition-colors">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>

                {/* Likes count */}
                <div>
                  <span className="text-sm font-semibold text-gray-800">
                    {post.likes?.length || 0} likes
                  </span>
                </div>

                {/* Post caption */}
                {post.caption && (
                  <div>
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold mr-2">
                        {post.user?.userName || "Anonymous"}
                      </span>
                      {post.caption}
                    </p>
                  </div>
                )}

                {/* View comments */}
                {post.comments?.length > 0 && (
                  <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">
                    View all {post.comments.length} comments
                  </button>
                )}

                {/* Add comment input */}
                <div className="flex items-center space-x-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 px-0 py-1 text-sm bg-transparent focus:outline-none placeholder-gray-400"
                  />
                  <button className="text-blue-500 font-semibold text-sm hover:text-blue-600 opacity-70 hover:opacity-100">
                    Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feed;
