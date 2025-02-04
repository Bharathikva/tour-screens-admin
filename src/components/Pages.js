import React, { useState, useRef, useEffect } from "react";
import { FiTrash2, FiEye, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import * as markerjs2 from "markerjs2";

const Pages = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMarkerActive, setIsMarkerActive] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imgRef = useRef(null);

  useEffect(() => {
    // Load images from localStorage on component mount
    const storedImages = localStorage.getItem("uploadedImages");
    setUploadedImages(storedImages ? JSON.parse(storedImages) : []);
  }, []);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newUploadedImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newUploadedImages.push({
          id: Date.now() + Math.random(), // Unique ID
          imageUrl: reader.result,
          annotations: [],
        });

        if (newUploadedImages.length === files.length) {
          const updatedImages = [...uploadedImages, ...newUploadedImages];
          setUploadedImages(updatedImages);
          localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSelectImage = (image) => {
    if (isMarkerActive) {
      alert("Marker is active. Please close the marker editor before selecting another image.");
      return;
    }
    setSelectedImage(image);
  };

  const handleDeleteImage = (image) => {
    const updatedImages = uploadedImages.filter((img) => img.id !== image.id);
    setUploadedImages(updatedImages);
    localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));

    // Deselect image if it's the one being deleted
    if (selectedImage?.id === image.id) {
      setSelectedImage(null);
    }
  };

  const showMarkerArea = () => {
    if (!imgRef.current || !selectedImage || isMarkerActive) return;

    const markerArea = new markerjs2.MarkerArea(imgRef.current);
    setIsMarkerActive(true);

    markerArea.addEventListener("render", (event) => {
      const updatedImages = uploadedImages.map((img) =>
        img.id === selectedImage.id
          ? { ...img, imageUrl: event.dataUrl }
          : img
      );

      setUploadedImages(updatedImages);
      localStorage.setItem("uploadedImages", JSON.stringify(updatedImages));
      setSelectedImage({ ...selectedImage, imageUrl: event.dataUrl });
      setIsMarkerActive(false);
    });

    markerArea.addEventListener("close", () => {
      setIsMarkerActive(false);
    });
    markerArea.settings.defaultColor = "white";
    markerArea.show();
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < uploadedImages.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : uploadedImages.length - 1
    );
  };
  return (
    <div className="flex flex-col lg:flex-row h-screen space-y-8 lg:space-y-0 lg:space-x-8">
      {/* Left Section */}
      <div className="w-full lg:w-1/4 bg-white border p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Upload Screens</h2>

        <div
          className="w-full my-7 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
          onClick={() => document.getElementById("file-upload")?.click()}
        >
          <p className="text-gray-600">Drag and drop your images here or click to browse</p>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        <div className="overflow-y-auto max-h-[400px] space-y-4">
          <button
            onClick={openPopup}
            type="button"
            className="absolute top-24 right-10 text-center bg-gray-200 p-2 rounded-full hover:bg-gray-300"
          >
            <FiEye className="text-red-600" />
          </button>
          {uploadedImages.map((image) => (
            <div
              key={image.id}
              className="w-full flex justify-center items-center relative cursor-pointer"
              onClick={() => handleSelectImage(image)}
            >
              <img
                src={image.imageUrl}
                alt="Uploaded"
                className="w-32 h-32 object-cover rounded shadow"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteImage(image);
                }}
                className="absolute top-0 right-0 p-2 bg-white rounded-full shadow hover:bg-red-200"
              >
                <FiTrash2 className="text-red-600" />
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-white p-5">
        {selectedImage ? (
          <div
            className="w-full flex justify-center items-center"
            onClick={showMarkerArea}
          >
            <img
              ref={imgRef}
              src={selectedImage.imageUrl}
              alt="Selected for Annotation"
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
            />

          </div>
        ) : (
          <p className="text-center text-gray-600">Select an image to preview it here.</p>
        )}
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px]">
            <div className="h-[32px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[72px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
            <div className="h-[46px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
            <div className="h-[64px] w-[3px] bg-gray-800 dark:bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
            <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800 relative">
              <img
                src={uploadedImages[currentImageIndex].imageUrl}
                alt="Popup Preview"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>

            {/* Left Button */}
            <button
              onClick={handlePreviousImage}
              className="absolute left-[-60px] top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400 shadow-md"
            >
              <FiArrowLeft className="text-red-600 text-xl" />
            </button>

            {/* Right Button */}
            <button
              onClick={handleNextImage}
              className="absolute right-[-60px] top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full hover:bg-gray-400 shadow-md"
            >
              <FiArrowRight className="text-red-600 text-xl" />
            </button>

            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-1 right-1 rounded-full text-white shadow-md"
            >
              ✕
            </button>
          </div>
        </div>
      )}

    </div>

  );
};

export default Pages;