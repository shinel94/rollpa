// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import Grid from "./components/Grid";
import Footer from "./layout/footer";
import LoginModal from "./components/modal/loginModal";
const App: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState<number | null>(null);
  const [messageType, setMessageType] = useState<string>("all");
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("grid");
  // Grid data
  const totalCells = 10000; // 100x100 grid
  const filledCells = 6732;
  const completionPercentage = Math.floor((filledCells / totalCells) * 100);
  // Generate sample grid data
  const generateGridData = () => {
    const statuses = ["available", "reserved", "filled"];
    const types = ["birthday", "encouragement", "anniversary", "general"];
    return Array.from({ length: 100 }, (_, rowIndex) =>
      Array.from({ length: 100 }, (_, colIndex) => {
        const random = Math.random();
        let status = "available";
        if (random < 0.67) {
          status = "filled";
        } else if (random < 0.75) {
          status = "reserved";
        }
        return {
          id: rowIndex * 100 + colIndex,
          status,
          type: types[Math.floor(Math.random() * types.length)],
          likes: Math.floor(Math.random() * 50),
          username:
            status === "filled"
              ? `fan${Math.floor(Math.random() * 1000)}`
              : null,
        };
      }),
    );
  };
  const gridData = generateGridData();
  // Flatten grid data for easier filtering
  const flatGridData = gridData.flat();
  const handleCellClick = (cellId: number) => {
    setSelectedCell(cellId);
  };
  const handleZoomIn = () => {
    if (zoomLevel < 3) setZoomLevel(zoomLevel + 0.5);
  };
  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.5);
  };
  const handleLogin = () => {
    setShowLoginModal(true);
  };
  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMessageType(e.target.value);
  };
  const filteredCellCount =
    messageType === "all"
      ? filledCells
      : flatGridData.filter(
          (cell) => cell.status === "filled" && cell.type === messageType,
        ).length;
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              StarGrid
            </div>
            <nav className="hidden md:flex ml-10">
              <ul className="flex space-x-8">
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer"
                  >
                    Browse Grid
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer"
                  >
                    My Messages
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-700 hover:text-purple-600 font-medium cursor-pointer"
                  >
                    How It Works
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-4 py-2 text-sm text-purple-600 border border-purple-600 rounded-button hover:bg-purple-50 transition-colors duration-200 cursor-pointer whitespace-nowrap">
              <i className="fas fa-search mr-2"></i>
              Find Cell
            </button>
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">
                  Welcome, KpopFan123
                </span>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white cursor-pointer">
                  <i className="fas fa-user"></i>
                </div>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-button hover:from-purple-700 hover:to-pink-600 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                Sign In
              </button>
            )}
            <button className="md:hidden text-gray-700 cursor-pointer">
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>
      </header>
      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("grid")}
            className={`px-4 py-2 font-medium text-sm mr-4 cursor-pointer whitespace-nowrap ${
              activeTab === "grid"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <i className="fas fa-th mr-2"></i>
            Message Grid
          </button>
          <button
            onClick={() => setActiveTab("pixel")}
            className={`px-4 py-2 font-medium text-sm mr-4 cursor-pointer whitespace-nowrap ${
              activeTab === "pixel"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <i className="fas fa-pencil-alt mr-2"></i>
            Pixel Editor
          </button>
          <button
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2 font-medium text-sm mr-4 cursor-pointer whitespace-nowrap ${
              activeTab === "preview"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <i className="fas fa-eye mr-2"></i>
            Preview Mosaic
          </button>
          <button
            onClick={() => setActiveTab("stats")}
            className={`px-4 py-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
              activeTab === "stats"
                ? "text-purple-600 border-b-2 border-purple-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <i className="fas fa-chart-bar mr-2"></i>
            Project Stats
          </button>
        </div>
      </div>
      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Project Info */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                BTS Jin Birthday Project
              </h2>
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <i className="fas fa-calendar-alt"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="font-medium">December 1, 2025</p>
                  </div>
                </div>
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <i className="fas fa-users"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="font-medium">6,732 fans</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <i className="fas fa-gift"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery Date</p>
                    <p className="font-medium">December 4, 2025</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-700">
                  Join thousands of ARMY in creating a special birthday mosaic
                  for Jin! Each cell you reserve becomes part of a beautiful
                  collective gift that will be delivered directly to him.
                </p>
              </div>
              <div className="relative mb-4 rounded-lg overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20beautiful%20artistic%20mosaic%20grid%20with%20colorful%20pixels%20forming%20a%20pattern%2C%20perfect%20for%20a%20K-pop%20fan%20project.%20The%20image%20shows%20a%20vibrant%20collection%20of%20tiny%20pixel%20art%20pieces%20that%20together%20create%20a%20meaningful%20collaborative%20artwork.%20Clean%20modern%20background%20with%20soft%20lighting.&width=400&height=200&seq=1&orientation=landscape"
                  alt="Project Preview"
                  className="w-full h-auto object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4 text-white">
                    <p className="font-medium">Final Mosaic Preview</p>
                    <p className="text-xs opacity-80">
                      How it will look when complete
                    </p>
                  </div>
                </div>
              </div>
              <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-button hover:from-purple-700 hover:to-pink-600 transition-colors duration-200 cursor-pointer whitespace-nowrap">
                Reserve Your Cell
              </button>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex-shrink-0 flex items-center justify-center text-white text-xs mr-3">
                      {["JM", "SG", "TH", "JK"][index - 1]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">
                        {
                          [
                            "JiminLover95",
                            "SugaFan2000",
                            "TaehyungWorld",
                            "JungkookBestBoy",
                          ][index - 1]
                        }
                        <span className="font-normal text-gray-600">
                          {" "}
                          {
                            [
                              "reserved a cell",
                              "added a birthday message",
                              "uploaded a photo",
                              "wrote a message",
                            ][index - 1]
                          }
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {index * 3} minutes ago
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-purple-600 border border-purple-600 rounded-button hover:bg-purple-50 transition-colors duration-200 cursor-pointer whitespace-nowrap">
                View All Activity
              </button>
            </div>
          </div>
          {/* Main Content - Grid */}
          <div className="lg:w-2/4">
            <Grid 
              handleZoomOut={handleZoomOut}
              zoomLevel={zoomLevel}
              handleZoomIn={handleZoomIn}
              gridData={gridData}
              handleCellClick={handleCellClick}
              selectedCell={selectedCell}
              completionPercentage={completionPercentage}
              messageType={messageType}
              handleFilterChange={handleFilterChange}
              filteredCellCount={filteredCellCount}
              totalCells={totalCells}
            />
            {/* Selected Cell Details */}
            {selectedCell !== null && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    Cell #{selectedCell}
                  </h3>
                  <button
                    onClick={() => setSelectedCell(null)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                {flatGridData[selectedCell].status === "available" ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-4">
                      <i className="fas fa-plus text-2xl"></i>
                    </div>
                    <h4 className="text-lg font-medium mb-2">
                      This cell is available!
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Reserve this spot to add your pixel art to the mosaic.
                    </p>
                    <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-button hover:from-purple-700 hover:to-pink-600 transition-colors duration-200 cursor-pointer whitespace-nowrap">
                      Reserve for $2
                    </button>
                  </div>
                ) : flatGridData[selectedCell].status === "reserved" ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                      <i className="fas fa-pencil-alt text-2xl"></i>
                    </div>
                    <h4 className="text-lg font-medium mb-2">
                      This cell is reserved
                    </h4>
                    <p className="text-gray-600 mb-4">
                      The owner still needs to add their pixel art.
                    </p>
                  </div>
                ) : (
                  <div className="border border-gray-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs mr-3">
                        {flatGridData[selectedCell].username
                          ?.substring(0, 2)
                          .toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium">
                          {flatGridData[selectedCell].username}
                        </p>
                        <p className="text-xs text-gray-500">
                          Added on May 19, 2025
                        </p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="bg-gray-50 rounded-lg p-3 mb-2">
                        <div className="grid grid-cols-8 grid-rows-8 gap-0.5">
                          {Array.from({ length: 64 }).map((_, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-sm"
                              style={{
                                backgroundColor:
                                  index % 7 === 0
                                    ? "#f9a8d4"
                                    : index % 5 === 0
                                      ? "#c4b5fd"
                                      : index % 3 === 0
                                        ? "#fde68a"
                                        : index % 2 === 0
                                          ? "#a7f3d0"
                                          : "#f3f4f6",
                              }}
                            ></div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mt-3">
                        {flatGridData[selectedCell].type === "birthday"
                          ? "Happy birthday Jin! Your music has been my strength during tough times. Thank you for being you! 💜"
                          : flatGridData[selectedCell].type === "encouragement"
                            ? "Your voice is like magic, Jin! Keep shining brightly and know that ARMY will always support you!"
                            : flatGridData[selectedCell].type === "anniversary"
                              ? "Celebrating another year of your amazing talent and kindness. So grateful to be your fan!"
                              : "Jin, your music touches my heart in ways I cannot express. Thank you for sharing your gift with the world!"}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button className="text-gray-400 hover:text-pink-500 cursor-pointer">
                          <i className="fas fa-heart mr-1"></i>
                        </button>
                        <span className="text-sm text-gray-600">
                          {flatGridData[selectedCell].likes}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-gray-400 hover:text-blue-500 cursor-pointer">
                          <i className="fab fa-twitter"></i>
                        </button>
                        <button className="text-gray-400 hover:text-pink-600 cursor-pointer">
                          <i className="fab fa-instagram"></i>
                        </button>
                        <button className="text-gray-400 hover:text-gray-700 cursor-pointer">
                          <i className="fas fa-share-alt"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* Right Sidebar - Pixel Editor */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Pixel Art Editor
              </h3>
              {!isLoggedIn ? (
                <div className="text-center py-4">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
                    <i className="fas fa-lock text-2xl"></i>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Sign in to create and reserve your spot on the grid.
                  </p>
                  <button
                    onClick={handleLogin}
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-button hover:from-purple-700 hover:to-pink-600 transition-colors duration-200 cursor-pointer whitespace-nowrap"
                  >
                    Sign In
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Canvas Size: 8×8 pixels
                    </label>
                    <div className="grid grid-cols-8 grid-rows-8 gap-0.5 bg-gray-100 p-2 rounded-lg">
                      {Array.from({ length: 64 }).map((_, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 bg-white rounded-sm border border-gray-200 cursor-pointer hover:bg-gray-50"
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Color Palette
                    </label>
                    <div className="grid grid-cols-8 gap-1">
                      {[
                        "#f9a8d4",
                        "#c4b5fd",
                        "#fde68a",
                        "#a7f3d0",
                        "#93c5fd",
                        "#f87171",
                        "#d1d5db",
                        "#ffffff",
                      ].map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full cursor-pointer ring-2 ring-gray-200"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center">
                      <div
                        className="w-8 h-8 rounded-lg mr-2"
                        style={{ backgroundColor: "#f9a8d4" }}
                      ></div>
                      <span className="text-sm">Selected Color</span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tools
                    </label>
                    <div className="flex space-x-2 mb-2">
                      <button className="flex-1 py-2 border border-gray-300 rounded-button text-sm text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap bg-purple-50 border-purple-300">
                        <i className="fas fa-pencil-alt mr-1"></i> Draw
                      </button>
                      <button className="flex-1 py-2 border border-gray-300 rounded-button text-sm text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                        <i className="fas fa-eraser mr-1"></i> Erase
                      </button>
                      <button className="flex-1 py-2 border border-gray-300 rounded-button text-sm text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                        <i className="fas fa-fill-drip mr-1"></i> Fill
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Message (Optional)
                    </label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      placeholder="Add a short message to accompany your pixel art (max 100 characters)"
                      rows={2}
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Templates
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((index) => (
                        <div
                          key={index}
                          className="cursor-pointer hover:opacity-80"
                        >
                          <img
                            src={`https://readdy.ai/api/search-image?query=Simple cute pixel art icon in pastel colors, minimalist design, tiny 8x8 pixel grid, perfect for K-pop fan art, clean background, ${index === 1 ? "heart shape" : index === 2 ? "star shape" : index === 3 ? "music note" : "flower shape"}&width=50&height=50&seq=${index}&orientation=squarish`}
                            alt={`Template ${index}`}
                            className="w-full h-auto rounded-md"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">
                      Price: <span className="font-medium">$2.00</span>
                    </p>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-button hover:from-purple-700 hover:to-pink-600 transition-colors duration-200 cursor-pointer whitespace-nowrap">
                      Save & Submit
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Popular Designs
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-3 hover:border-purple-300 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start">
                      <div className="w-16 h-16 bg-gray-50 rounded-md mr-3 overflow-hidden">
                        <img
                          src={`https://readdy.ai/api/search-image?query=Colorful pixel art design in an 8x8 grid, cute K-pop themed pixel art with pastel colors, minimalist design, clean background, ${index === 1 ? "heart and star pattern" : index === 2 ? "music notes and flowers" : "cute character face"}&width=64&height=64&seq=${index + 10}&orientation=squarish`}
                          alt={`Popular design ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs mr-1">
                            {["BT", "AR", "JH"][index - 1]}
                          </div>
                          <p className="text-sm font-medium">
                            {["BTSforever", "ARMYlove", "JinHit"][index - 1]}
                          </p>
                        </div>
                        <p className="text-xs text-gray-500">
                          Cell #{1000 + index * 500}
                        </p>
                        <div className="flex items-center mt-1">
                          <i className="fas fa-heart text-pink-500 mr-1 text-xs"></i>
                          <span className="text-xs">{120 - index * 30}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 text-sm text-purple-600 border border-purple-600 rounded-button hover:bg-purple-50 transition-colors duration-200 cursor-pointer whitespace-nowrap">
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal handleCloseLoginModal={handleCloseLoginModal} handleLoginSubmit={handleLoginSubmit}/>
      )}
      <Footer />
    </div>
  );
};
export default App;
