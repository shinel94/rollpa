type LoginModalProps = any

const LoginModal = ({handleCloseLoginModal, handleLoginSubmit}: LoginModalProps) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Sign In</h3>
              <button
                onClick={handleCloseLoginModal}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email or Username
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your email or username"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your password"
                />
                <p className="text-xs text-right mt-1">
                  <a
                    href="#"
                    className="text-purple-600 hover:text-purple-700 cursor-pointer"
                  >
                    Forgot password?
                  </a>
                </p>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium rounded-button hover:from-purple-700 hover:to-pink-600 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                Sign In
              </button>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="text-purple-600 hover:text-purple-700 cursor-pointer"
                  >
                    Sign up
                  </a>
                </p>
              </div>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    className="py-2 px-4 border border-gray-300 rounded-button text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                  >
                    <i className="fab fa-google text-red-500 mr-2"></i>
                    Google
                  </button>
                  <button
                    type="button"
                    className="py-2 px-4 border border-gray-300 rounded-button text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                  >
                    <i className="fab fa-facebook text-blue-600 mr-2"></i>
                    Facebook
                  </button>
                  <button
                    type="button"
                    className="py-2 px-4 border border-gray-300 rounded-button text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer whitespace-nowrap"
                  >
                    <i className="fab fa-twitter text-blue-400 mr-2"></i>
                    Twitter
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
    )
}

export default LoginModal