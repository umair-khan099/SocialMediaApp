import React from "react";
import { usePost } from "../hooks/usepost";
import { useEffect } from "react";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";

const Feed = () => {
  const { feed, handleGetFeed, loading } = usePost();

  useEffect(() => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600">Loading...</h1>
      </div>
    );
  }

  // Handle case when feed is empty
  if (!feed.length) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-2xl font-semibold text-gray-600">
          No posts available
        </h1>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-900 overflow-y-auto">
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="flex flex-col gap-6">
          {feed.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              {/* Post Header - User info */}
              <div className="flex items-center p-4 space-x-3">
                {/* User profile pic */}
                {post.user?.profileImage ? (
                  <img
                    src={post.user.profileImage}
                    alt={post.user.userName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                    {post.user?.userName?.substring(0, 2).toUpperCase() || "U"}
                  </div>
                )}

                {/* User name */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
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
                <div className="relative">
                  <img
                    src={post.imageUrl}
                    alt={post.caption || "Post"}
                    className="w-full h-auto max-h-[600px] object-contain bg-gray-100"
                  />
                  <div className="absolute inset-0 bg-black opacity-0 hover:opacity-10 transition-opacity"></div>
                </div>
              )}

              {/* Post actions */}
              <div className="p-4 space-y-3">
                {/* Like, Comment, Share buttons */}
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors group">
                    <Heart className="w-6 h-6 group-hover:fill-red-500 group-hover:text-red-500" />
                    <span className="text-sm">{post.likes?.length || 0}</span>
                  </button>

                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors">
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-sm">
                      {post.comments?.length || 0}
                    </span>
                  </button>

                  <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors">
                    <Share2 className="w-6 h-6" />
                    <span className="text-sm">45</span>
                  </button>
                </div>

                {/* Post caption */}
                {post.caption && (
                  <div>
                    <p className="text-gray-800">
                      <span className="font-semibold mr-2">
                        {post.user?.userName || "Anonymous"}
                      </span>
                      {post.caption}
                    </p>
                  </div>
                )}

                {/* View comments */}
                {post.comments?.length > 0 && (
                  <button className="text-sm text-gray-500 hover:text-gray-700 font-medium">
                    View all {post.comments.length} comments
                  </button>
                )}

                {/* Add comment input */}
                <div className="flex items-center space-x-2 pt-2 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold">
                    U
                  </div>
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 px-3 py-2 text-sm bg-transparent focus:outline-none"
                  />
                  <button className="text-blue-500 font-semibold text-sm hover:text-blue-600">
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
