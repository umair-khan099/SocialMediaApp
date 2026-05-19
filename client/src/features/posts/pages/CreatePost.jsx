import React, { useState } from "react";
import { usePost } from "../hooks/usepost";
import { useNavigate } from "react-router";
const CreatePost = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setcaption] = useState("");

  const { loading, handleCreatePost } = usePost();

  console.log(caption);
  console.log(selectedImage);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
  };

  const handleSubmite = (e) => {
    e.preventDefault();

    handleCreatePost(selectedImage, caption);
    navigate("/home");
  };

  if (loading) {
    return <h1>loading....</h1>;
  }

  return (
    <div className="w-full max-w-lg mx-auto p-6">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-100 px-6 py-4">
          <h1 className="text-xl font-medium text-gray-900 text-center">
            Create new post
          </h1>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {/* Image Upload Section */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Upload image
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                onChange={handleImageChange}
              />

              {!imagePreview ? (
                <label
                  htmlFor="imageUpload"
                  className="flex flex-col items-center justify-center w-full h-48 border border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors bg-gray-50"
                >
                  <div className="flex flex-col items-center justify-center">
                    <svg
                      className="w-10 h-10 text-gray-400 mb-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm text-gray-500">Click to upload</p>
                    <p className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 10MB
                    </p>
                  </div>
                </label>
              ) : (
                <div className="relative group">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-md"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <label
                    htmlFor="imageUpload"
                    className="absolute bottom-2 right-2 bg-gray-900 text-white rounded-full p-1.5 hover:bg-gray-800 transition-colors shadow-md cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Caption Section */}
          <div className="mb-6">
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Caption
            </label>
            <textarea
              value={caption}
              onChange={(e) => setcaption(e.target.value)}
              placeholder="Write a caption..."
              rows="3"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 transition-colors resize-none bg-white"
            ></textarea>
            <div className="text-right text-xs text-gray-400 mt-1">0/2000</div>
          </div>

          {/* Create Post Button */}
          <button
            onClick={handleSubmite}
            className="w-full bg-gray-900 text-white text-sm font-medium py-2.5 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
