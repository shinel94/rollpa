type GridProp = any

const Grid = ({
  handleZoomOut,
  zoomLevel,
  handleZoomIn,
  gridData,
  handleCellClick,
  selectedCell,
  completionPercentage,
  messageType,
  handleFilterChange,
  filteredCellCount,
  totalCells,
  sideLength
}: GridProp) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Pixel Art Grid
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleZoomOut}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
          >
            <i className="fas fa-minus"></i>
          </button>
          <span className="text-sm text-gray-600">{zoomLevel}x</span>
          <button
            onClick={handleZoomIn}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      </div>
      <div className="relative mb-4">
        <div className="w-full h-[500px] overflow-auto border border-gray-200 rounded-lg relative">
          <div
            className={`grid gap-0 absolute`}
            style={{
              transform: `scale(${zoomLevel})`,
              transformOrigin: "top left",
              gridTemplateColumns: `repeat(${sideLength}, 40px)`,
              gridTemplateRows: `repeat(${sideLength}, 40px)`,
            }}
          >
            {gridData.flat().map((cell: any) => (
              <div
                key={cell.id}
                className={`hoverBox w-10 h-10 border border-gray-100 cursor-pointer transition-all duration-200`}
                onClick={() => handleCellClick(cell)}
              // style={{ padding: 1, width: 30, height: 30, border: '0px solid #ccc', cursor: cell.owner_id ? 'default' : 'pointer', overflow: 'hidden' }}
              >
                {cell.content && (
                  <img
                    src={cell.content}
                    alt={`Cell ${cell.x},${cell.y}`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Mini-map navigator */}
        {/* <div className="absolute bottom-6 right-6 w-32 h-32 border border-gray-300 rounded bg-white shadow-md overflow-hidden">
          <div className="w-full h-full bg-gray-50 relative">
            <div className="absolute w-full h-full grid grid-cols-10 grid-rows-10">
              {Array.from({ length: 100 }).map((_, index) => (
                <div
                  key={index}
                  className="border border-gray-100"
                  style={{
                    backgroundColor:
                      index % 3 === 0
                        ? "#f9a8d4"
                        : index % 5 === 0
                          ? "#c4b5fd"
                          : index % 7 === 0
                            ? "#fde68a"
                            : "#a7f3d0",
                  }}
                ></div>
              ))}
            </div>
            <div className="absolute border-2 border-purple-500 w-1/3 h-1/3 pointer-events-none"></div>
          </div>
        </div> */}
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="mr-4">
            <p className="text-sm text-gray-600">Completion</p>
            <div className="flex items-center">
              <div className="w-36 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">
                {completionPercentage}%
              </span>
            </div>
          </div>
          <div>
            {/* <p className="text-sm text-gray-600">Filter by type</p>
            <div className="relative">
              <select
                value={messageType}
                onChange={handleFilterChange}
                className="text-sm border border-gray-300 rounded-lg px-2 py-1 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none bg-white cursor-pointer"
              >
                <option value="all">All messages</option>
                <option value="birthday">Birthday wishes</option>
                <option value="encouragement">Encouragement</option>
                <option value="anniversary">Anniversary</option>
                <option value="general">General</option>
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                <i className="fas fa-chevron-down text-xs"></i>
              </div>
            </div> */}
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Cells filled</p>
          <p className="font-bold text-lg">
            {filteredCellCount} / {totalCells}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* <div className="flex items-center">
          <div className="w-4 h-4 bg-gray-100 border border-gray-200 mr-1"></div>
          <span className="text-xs text-gray-600">Available</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-100 border border-gray-200 mr-1"></div>
          <span className="text-xs text-gray-600">Reserved</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-pink-200 border border-gray-200 mr-1"></div>
          <span className="text-xs text-gray-600">Birthday</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-purple-200 border border-gray-200 mr-1"></div>
          <span className="text-xs text-gray-600">Encouragement</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-200 border border-gray-200 mr-1"></div>
          <span className="text-xs text-gray-600">Anniversary</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-200 border border-gray-200 mr-1"></div>
          <span className="text-xs text-gray-600">General</span>
        </div> */}
      </div>
    </div>
  )
}

export default Grid