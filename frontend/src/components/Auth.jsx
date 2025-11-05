import React, { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { api } from '../lib/api'

export function Auth({ onAuthenticated }) {
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [tab, setTab] = useState('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin(e) {
    e.preventDefault()
    setLoading(true); setError('')
    const username = e.target.username.value
    const password = e.target.password.value
    try {
      const res = await api.auth.login({ username, password })
      onAuthenticated(res.username)
    } catch (err) {
      setError(err.message || 'Login failed.')
    } finally { setLoading(false) }
  }

  async function handleRegister(e) {
    e.preventDefault()
    setLoading(true); setError('')
    const username = e.target.username.value
    const password = e.target.password.value
    const confirm = e.target.confirm.value
    if (password !== confirm) { setError('Passwords do not match'); setLoading(false); return }
    try {
      const res = await api.auth.register({ username, password })
      onAuthenticated(res.username)
    } catch (err) {
      setError(err.message || 'Registration failed.')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-700 to-pink-600">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="container-fluid px-6 lg:px-12 py-6">
          <div className="flex justify-between items-center ml-16 mr-16">
            <h1 className="text-2xl font-bold text-primary-600 flex items-center gap-2">
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 p-2 rounded-lg shadow-md">
                <ShieldCheck className="text-white h-6 w-6" />
              </div>
              DigiBook
            </h1>
            <div className="flex gap-2">
              <button
                onClick={() => { setTab('login'); setShowAuthModal(true) }}
                className="px-4 py-1.5 rounded-md border border-primary-600 text-primary-700 hover:bg-primary-50 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => { setTab('register'); setShowAuthModal(true) }}
                className="px-4 py-1.5 rounded-md bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-[72px]">
        <div className="container-fluid px-6 lg:px-12 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-[90%] mx-auto">
            <div>
              <h1 className="text-5xl font-semibold text-white mb-6">
                Your Digital Space for <br/>
                Secure Organization
              </h1>
              <p className="text-xl text-white mb-8">
                DigiBook helps you manage passwords and notes with military-grade encryption. 
                Keep your digital life organized and secure in one place.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => { setTab('register'); setShowAuthModal(true) }}
                  className="px-6 py-3 rounded-xl bg-white text-primary-700 hover:shadow-lg hover:bg-primary-50 transition-all font-medium"
                >
                  Get Started Free
                </button>
                <button className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors border border-white/20">
                  Learn More
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-white/90 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-primary-700 mb-2">Password Vault</h3>
                  <p className="text-gray-700">Store and generate secure passwords with ease</p>
                </div>
                <div className="bg-white/90 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-primary-700 mb-2">Bank-Level Security</h3>
                  <p className="text-gray-700">Your data is encrypted and secure</p>
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-white/90 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-primary-700 mb-2">Smart Notes</h3>
                  <p className="text-gray-700">Organize your thoughts and ideas securely</p>
                </div>
                <div className="bg-white/90 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
                  <h3 className="text-xl font-semibold text-primary-700 mb-2">Cross-Platform</h3>
                  <p className="text-gray-700">Access your data from any device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className=" relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/10 via-transparent to-black/10"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-[100%] h-[100%] rounded-full bg-gradient-to-t from-purple-500/30 to-transparent blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2720%27 height=%2720%27 viewBox=%270 0 20 20%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27%23fff%27 fill-opacity=%270.05%27 fill-rule=%27evenodd%27%3E%3Ccircle cx=%273%27 cy=%273%27 r=%273%27/%3E%3Ccircle cx=%2713%27 cy=%2713%27 r=%273%27/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        </div>
        <div className="container-fluid px-6 lg:px-12 py-24 relative">
          <h2 className="text-4xl font-semibold text-center mb-16 text-white">Why Choose DigiBook?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[90%] mx-auto">
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all hover:bg-white/90">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">End-to-End Encryption</h3>
              <p className="text-gray-600">Your data is encrypted before it leaves your device, ensuring maximum security and privacy.</p>
            </div>
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all hover:bg-white/90">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Smart Password Generator</h3>
              <p className="text-gray-600">Generate strong, unique passwords with our advanced password generator tool.</p>
            </div>
            <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all hover:bg-white/90">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <svg className="w-8 h-8 text-primary-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Auto-Save & Sync</h3>
              <p className="text-gray-600">Your notes and passwords are automatically saved and synced across all your devices.</p>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works */}
      <div className=" relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600">
        <div className="absolute inset-0">
          <div className="absolute -top-1/2 -left-1/2 w-[100%] h-[100%] rounded-full bg-gradient-to-b from-indigo-500/30 to-transparent blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2720%27 height=%2720%27 viewBox=%270 0 20 20%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27%23fff%27 fill-opacity=%270.05%27 fill-rule=%27evenodd%27%3E%3Ccircle cx=%273%27 cy=%273%27 r=%273%27/%3E%3Ccircle cx=%2713%27 cy=%2713%27 r=%273%27/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        </div>
        <div className="container-fluid px-6 lg:px-12 py-24 relative">
          <h2 className="text-4xl font-semibold text-center mb-16 text-white">How DigiBook Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[90%] mx-auto">
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:bg-white/90">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-semibold mb-6 shadow-lg">1</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Sign Up</h3>
              <p className="text-gray-600">Create your free account in seconds with just a username and password.</p>
              <div className="absolute top-20 left-full w-full h-0.5 bg-primary-300 -z-10"></div>
            </div>
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:bg-white/90">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-semibold mb-6 shadow-lg">2</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Store Data</h3>
              <p className="text-gray-600">Add your passwords and notes securely with our easy-to-use interface.</p>
              <div className="absolute top-20 left-full w-full h-0.5 bg-primary-300 -z-10"></div>
            </div>
            <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:bg-white/90">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-semibold mb-6 shadow-lg">3</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Access Anywhere</h3>
              <p className="text-gray-600">Get your data from any device, anytime, with secure cloud sync.</p>
              <div className="absolute top-20 left-full w-full h-0.5 bg-primary-300 -z-10"></div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-md hover:shadow-lg transition-all hover:bg-white/90">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-semibold mb-6 shadow-lg">4</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Stay Secure</h3>
              <p className="text-gray-600">Rest easy knowing your data is protected with military-grade encryption.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className=" relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-700 to-pink-600">
        <div className="absolute inset-0">
          <div className="absolute -bottom-1/2 right-0 w-[80%] h-[80%] rounded-full bg-gradient-to-t from-pink-500/30 to-transparent blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2720%27 height=%2720%27 viewBox=%270 0 20 20%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27%23fff%27 fill-opacity=%270.05%27 fill-rule=%27evenodd%27%3E%3Ccircle cx=%273%27 cy=%273%27 r=%273%27/%3E%3Ccircle cx=%2713%27 cy=%2713%27 r=%273%27/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        </div>
        <div className="container-fluid px-6 lg:px-12 py-24 relative">
          <h2 className="text-4xl font-semibold text-center mb-16 text-white">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[90%] mx-auto">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:bg-white/90">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full shadow-inner"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sujay Rana</h4>
                  <p className="text-gray-600 text-sm">College Student</p>
                </div>
              </div>
              <p className="text-gray-600">"DigiBook has revolutionized how I manage my passwords. It's intuitive, secure, and gives me peace of mind."</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:bg-white/90">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full shadow-inner"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Sayak Das</h4>
                  <p className="text-gray-600 text-sm">College Student</p>
                </div>
              </div>
              <p className="text-gray-600">"The note-taking feature is fantastic. I can securely store sensitive information and access it from anywhere."</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:bg-white/90">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full shadow-inner"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Soukarya Chaulia</h4>
                  <p className="text-gray-600 text-sm">College Student</p>
                </div>
              </div>
              <p className="text-gray-600">"DigiBook's password generator has helped me create strong passwords for all my accounts. It's a game-changer!"</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:bg-white/90">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full shadow-inner"></div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">Arnab Chakraborty</h4>
                  <p className="text-gray-600 text-sm">College Student</p>
                </div>
              </div>
              <p className="text-gray-600">"As someone who manages multiple accounts, DigiBook's organization features and secure storage have been invaluable."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-screen bg-slate-800 text-white ">
        <div className="container-fluid px-6 lg:px-12 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-2xl mx-auto">
            <div>
              <h3 className="text-xl font-semibold mb-4">DigiBook</h3>
              <p className="text-gray-300">Your secure digital notebook for passwords and notes.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Password Manager</li>
                <li>Secure Notes</li>
                <li>Password Generator</li>
                <li>Cloud Sync</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-secondary-300">
                <li>About Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-secondary-300">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Facebook</li>
                <li>GitHub</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 max-w-screen-2xl mx-auto">
            <p>&copy; 2025 DigiBook. All rights reserved.</p>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowAuthModal(false)}
              className="absolute top-4 right-4 text-secondary-400 hover:text-secondary-600"
            >
              ✕
            </button>
            
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">{tab === 'login' ? 'Login' : 'Create Account'}</h2>
              <p className="text-gray-600 mt-2">
                {tab === 'login' ? (
                  <>
                    Don't have an account?{' '}
                    <button onClick={() => setTab('register')} className="text-primary-600 hover:text-primary-700 font-medium">
                      Register
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button onClick={() => setTab('login')} className="text-primary-600 hover:text-primary-700 font-medium">
                      Login
                    </button>
                  </>
                )}
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-sm p-2 rounded mb-4">{error}</div>
            )}

            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-text">Username</label>
                  <input
                    name="username"
                    className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-text">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"
                    required
                  />
                </div>
                <button
                  disabled={loading}
                  className="w-full py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 disabled:bg-secondary-300 relative z-10"
                >
                  {loading ? 'Please wait...' : 'Login'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-text">Username</label>
                  <input
                    name="username"
                    minLength={3}
                    className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-text">Password</label>
                  <input
                    type="password"
                    name="password"
                    minLength={6}
                    className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-text">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    minLength={6}
                    className="w-full border-2 border-secondary-200 rounded-md p-2 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 bg-white"
                    required
                  />
                </div>
                <button
                  disabled={loading}
                  className="w-full py-2 rounded-md bg-primary-500 text-white hover:bg-primary-600 disabled:bg-secondary-300 relative z-10"
                >
                  {loading ? 'Please wait...' : 'Create Account'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}