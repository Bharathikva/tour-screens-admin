import React, { useState } from "react";
import { FiUpload, FiArrowDownCircle, FiTrash2 } from "react-icons/fi"; // Importing icons

const Pages = () => {
    const [uploadedImages, setUploadedImages] = useState([]); // State to store uploaded images
    const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image
    const [dragging, setDragging] = useState(false); // State to track if dragging
    const [userSkipped, setUserSkipped] = useState("yes"); // State for user skipped
    const [timeDelay, setTimeDelay] = useState("off"); // State for time delay toggle
    const [delaySeconds, setDelaySeconds] = useState(0); // State for delay seconds


    const handleImageUpload = async (event) => {
        const files = Array.from(event.target.files);
        const uploadedImages = [];

        for (const file of files) {
            try {
                const formData = new FormData();
                formData.append("image", file);

                const response = await fetch(
                    "https://api.imgbb.com/1/upload?key=a3b6001a0c27a585059b0d0f9ffaae52",
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const data = await response.json();
                console.log(data);

                if (data && data.data && data.data.url) {
                    uploadedImages.push({
                        id: Date.now() + file.name,
                        imageUrl: data.data.url,
                        annotations: [],
                    });
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        // Store uploaded images in localStorage
        localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));

        // Update component state if needed
        setUploadedImages((prev) => [...prev, ...uploadedImages]);
    };

    const getUploadedImages = () => {
        // Retrieve the data from localStorage
        const storedImages = localStorage.getItem('uploadedImages');

        // If there's data stored, parse it to an object
        if (storedImages) {
            const images = JSON.parse(storedImages);
            console.log(images); // This will display the array of uploaded image objects
            return images;
        } else {
            console.log('No images found in localStorage');
            return [];
        }
    };


    // Drag and Drop Handlers
    const handleDragEnter = (event) => {
        event.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        setDragging(false);
    };

    const handleDrop = async (event) => {
        const files = Array.from(event.target.files);
        const uploadedImages = [];

        for (const file of files) {
            try {
                const formData = new FormData();
                formData.append("image", file);

                const response = await fetch(
                    "https://api.imgbb.com/1/upload?key=a3b6001a0c27a585059b0d0f9ffaae52",
                    {
                        method: "POST",
                        body: formData,
                    }
                );
                const data = await response.json();
                console.log(data);

                if (data && data.data && data.data.url) {
                    uploadedImages.push({
                        id: Date.now() + file.name,
                        imageUrl: data.data.url,
                        annotations: [],
                    });
                }
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }

        // Store uploaded images in localStorage
        localStorage.setItem('uploadedImages', JSON.stringify(uploadedImages));

        // Update component state if needed
        setUploadedImages((prev) => [...prev, ...uploadedImages]);
    };

    // Handle Delete Image
    const handleDeleteImage = (image) => {
        setUploadedImages((prevImages) =>
            prevImages.filter((imageObj) => imageObj.id !== image.id) // Match by `id`
        );

        // Optionally, remove the image URL from localStorage as well
        const updatedImages = JSON.parse(localStorage.getItem('uploadedImages') || '[]').filter(
            (imageObj) => imageObj.id !== image.id
        );
        localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));
        getUploadedImages()
    };


    const [images, setImages] = useState([]);
    const [editingImage, setEditingImage] = useState(null);
    const [annotations, setAnnotations] = useState([]);
    const [inputVisible, setInputVisible] = useState(false);
    const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
    const [inputValue, setInputValue] = useState('');

    const handleSelectImage = (image) => {
        // Ensure that annotations are always an array
        setSelectedImage(image.imageUrl);
        setAnnotations(image.annotations || [])
    };

    // Handle click on image to add annotation
    const handleImageClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left; // X position relative to the image
        const y = e.clientY - rect.top;  // Y position relative to the image

        setInputPosition({ x, y });
        setInputVisible(true);
    };

    // Add annotation to image
    const handleAddAnnotation = () => {
        setAnnotations((prev) => [
            ...prev,
            { x: inputPosition.x, y: inputPosition.y, content: inputValue },
        ]);
        setInputVisible(false);
        setInputValue('');
    };

    const handleUpdate = () => {
        if (selectedImage) {
            // Update the annotations for the selected image
            const updatedImages = uploadedImages.map((image) => {
                if (image.imageUrl === selectedImage) {
                    return {
                        ...image,
                        annotations: annotations, // Split and trim annotations
                    };
                }
                return image;
            });

            // Update the state and localStorage
            setUploadedImages(updatedImages);
            localStorage.setItem('uploadedImages', JSON.stringify(updatedImages));

            console.log('Annotations saved:', annotations);
        }
    };

    // Close the popup and remove any unsaved annotations
    const handleClose = () => {
        setEditingImage(null);  // Close the popup
        setAnnotations([]);     // Clear annotations if not saved
    };

    return (
        <div className="flex flex-col lg:flex-row h-full space-y-8 lg:space-y-0 lg:space-x-8">
        {/* Left Section: Image Upload and Vertical Scroll */}
        <div className="w-full lg:w-1/4 bg-white border p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Upload Screens</h2>
          <div
            className={`relative w-full p-4 border-2 rounded-md transition-all duration-300 ${
              dragging ? "border-dashed border-blue-500 bg-blue-100" : "border-gray-300"
            }`}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center text-gray-600">
              {dragging ? (
                <div className="flex justify-center items-center space-x-2">
                  <FiArrowDownCircle className="text-3xl text-blue-600" />
                  <p>Drop the Screens here!</p>
                </div>
              ) : (
                <div className="flex justify-center items-center space-x-2">
                  <FiUpload className="text-3xl text-gray-600" />
                  <p>Drag and drop Screens here, or click to upload</p>
                </div>
              )}
            </div>
          </div>
      
          <div className="overflow-y-auto max-h-[400px] space-y-4 mt-4">
            {getUploadedImages().map((image, index) => (
              <div
                key={index}
                className="w-full flex justify-center items-center relative transition-all duration-300 hover:scale-105"
                onClick={() => handleSelectImage(image)}
              >
                {/* Phone Model Placeholder with PNG */}
                <div className="w-32 relative flex justify-center items-center">
                  <div className="w-full h-full overflow-hidden rounded-lg shadow-md">
                    <img
                      src={image.imageUrl}
                      alt={`Uploaded ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                {/* Delete Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering image click
                    handleDeleteImage(image); // Delete the image
                  }}
                  className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-red-200 transition"
                >
                  <FiTrash2 className="text-red-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      
        {/* Right Section: Selected Image and Settings */}
        <div className="flex-1 bg-white border p-6 rounded-xl shadow-xl">
          {selectedImage ? (
            <>
              <div className="flex items-center justify-between mb-6">
                {/* User Skipped */}
                <div className="flex flex-col space-y-2">
                  <label className="font-semibold text-gray-700">User Skipped:</label>
                  <p className="text-gray-500">-</p>
                </div>
      
                {/* Time Delay */}
                <div className="flex flex-col space-y-2">
                  <label className="font-semibold text-gray-700">Time Delay:</label>
                  <div className="flex items-center space-x-3">
                    <label className="switch">
                      <input
                        type="checkbox"
                        checked={timeDelay === "on"}
                        onChange={() => setTimeDelay(timeDelay === "on" ? "off" : "on")}
                      />
                      <span className="slider"></span>
                    </label>
                    <span className="text-sm text-gray-700">{timeDelay === "on" ? "On" : "Off"}</span>
                  </div>
                </div>
      
                {/* Delay Seconds */}
                {timeDelay === "on" && (
                  <div className="flex flex-col space-y-2">
                    <label className="font-semibold text-gray-700">Delay Seconds:</label>
                    <input
                      type="number"
                      value={delaySeconds}
                      onChange={(e) => setDelaySeconds(e.target.value)}
                      min="0"
                      className="p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                )}
              </div>
      
              {/* Selected Image Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-auto max-h-[90%] overflow-auto relative border border-gray-200">
                {/* Image and Annotations */}
                <div className="relative w-full h-full" onClick={handleImageClick}>
                  <img
                    src={selectedImage}
                    alt="Editing"
                    className="rounded-lg w-full h-full object-contain border border-gray-300"
                  />
                  {annotations.map((annotation, index) => (
                    <div
                      key={index}
                      className="absolute bg-yellow-200 text-black text-sm px-2 py-1 rounded shadow-lg"
                      style={{
                        top: `${annotation.y}px`,
                        left: `${annotation.x}px`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {annotation.content}
                    </div>
                  ))}
                </div>
      
                {/* Input for Adding Annotations */}
                {inputVisible && (
                  <div
                    className="absolute"
                    style={{
                      top: `${inputPosition.y}px`,
                      left: `${inputPosition.x}px`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="Enter text"
                    />
                    <button
                      onClick={handleAddAnnotation}
                      className="bg-blue-500 text-white text-sm px-4 py-2 rounded ml-2 shadow-md hover:bg-blue-600 transition duration-200"
                    >
                      Add
                    </button>
                  </div>
                )}
      
                {/* Footer */}
                <div className="flex justify-end space-x-4 mt-6">
                  {annotations.length > 0 && (
                    <button
                      onClick={handleUpdate}
                      className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-green-600 transition duration-200"
                    >
                      Update
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-600">Select a screen to preview it here.</p>
          )}
        </div>
      </div>
              
    );
};

export default Pages;
