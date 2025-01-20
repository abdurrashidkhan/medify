const MainBanner = () => {
  return (
    <div className="container mx-auto px-2 py-10">
      <div className="p-4 md:p-8 bg-gray-100 ">
        {/* Product Container */}
        <div className=" mx-auto bg-white shadow-lg rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* Image Section */}
            <div className="flex-1 p-4">
              <div className="relative">
                <img
                  src="/images/product-main.jpg"
                  alt="Product"
                  className="w-full rounded-lg"
                />
                <div className="flex mt-4 space-x-2">
                  {[1, 2, 3, 4].map((_, index) => (
                    <img
                      key={index}
                      src={`/images/product-thumb-${index + 1}.jpg`}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 rounded-lg border-2 border-gray-200 hover:border-blue-500 cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="flex-1 p-4">
              <h1 className="text-2xl font-bold mb-2">
                Imam i8 Lily (RAM-3GB/ROM-32GB)3600mAH Mobile Phone
              </h1>
              <p className="text-gray-500 text-sm">Brand: Imam</p>

              <div className="mt-4">
                <p className="text-xl text-red-500 font-bold">৳ 3,400</p>
                <p className="line-through text-gray-400 text-sm">৳ 3,999</p>
                <p className="text-sm text-green-500">-15% Discount</p>
              </div>

              {/* Color Options */}
              <div className="mt-6">
                <p className="font-semibold text-gray-700">Color Family:</p>
                <div className="flex space-x-4 mt-2">
                  {["Red", "Blue", "Black"].map((color, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 bg-red-500 rounded-full cursor-pointer border-2 border-gray-300 hover:border-blue-500"
                      title={color}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Storage Options */}
              <div className="mt-6">
                <p className="font-semibold text-gray-700">Storage Capacity:</p>
                <div className="mt-2">
                  <select className="border border-gray-300 rounded-lg p-2 w-full">
                    <option>3GB</option>
                    <option>4GB</option>
                    <option>6GB</option>
                  </select>
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-6 flex items-center">
                <p className="font-semibold text-gray-700 mr-4">Quantity:</p>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button className="p-2 text-gray-700">-</button>
                  <input
                    type="text"
                    value="1"
                    className="w-10 text-center border-l border-r border-gray-300"
                    readOnly
                  />
                  <button className="p-2 text-gray-700">+</button>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex space-x-4">
                <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
                  Oder Now
                </button>
                <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
