/**
 * SITCSDK Mock Version - Demo & Testing
 * 
 * This is a mock version of SITCSDK for demonstration and testing purposes.
 * It provides realistic fake data to help teams understand how to use SITCSDK.
 * 
 * Usage:
 * <script src="https://cdn.jsdelivr.net/npm/@sitc/sitcsdk-mock@1.0.0/dist/sitc-sdk-mock.js"></script>
 * 
 * @version 1.0.0
 * @author SITC-DINHVU Team
 */

class SITCSDK {
  constructor() {
    this.version = '1.0.0-mock'
    this.isReady = true
    this._isReady = true
    this.parent = window.parent
    this.requestId = 0
    
    // Mock configuration
    this.config = {
      debug: true,
      timeout: 5000,
      retryAttempts: 3
    }
    
    // Mock user data
    this.mockUser = {
      id: 1,
      name: 'Demo User',
      username: 'demo',
      role: 'admin',
      email: 'demo@sitc.com',
      permissions: ['gps', 'camera', 'notifications']
    }
    
    // Mock location data (Hanoi, Vietnam)
    this.mockLocation = {
      latitude: 21.0285,
      longitude: 105.8542,
      accuracy: 10,
      altitude: 16,
      speed: 0,
      heading: 0,
      timestamp: new Date().toISOString(),
      address: 'Hải Phòng, Việt Nam',
      city: 'Hải Phòng',
      country: 'Việt Nam'
    }
    
    // Mock photo data
    this.mockPhoto = {
      dataUrl: 'data:image/jpeg;base64,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',
      format: 'jpeg',
      width: 1920,
      height: 1080,
      size: 245760,
      timestamp: new Date().toISOString(),
      exif: {
        orientation: 1,
        dateTime: new Date().toISOString(),
        make: 'SITC Mock',
        model: 'Demo Camera'
      }
    }
    
    console.log('SITCSDK Mock: Initialized successfully')
    console.log('SITCSDK Mock: Ready for demonstration')
  }
  
  /**
   * Check if SDK is ready
   * @returns {boolean}
   */
  isReady() {
    return this._isReady
  }
  
  /**
   * GPS Service - Get current location (Mock)
   * @param {Object} options - GPS options
   * @returns {Promise<Object>} Mock location data
   */
  async getLocation(options = {}) {
    console.log('SITCSDK Mock: getLocation called with options:', options)
    
    // Simulate network delay
    await this._delay(500 + Math.random() * 1000)
    
    // Add some randomness to location
    const location = {
      ...this.mockLocation,
      latitude: this.mockLocation.latitude + (Math.random() - 0.5) * 0.001,
      longitude: this.mockLocation.longitude + (Math.random() - 0.5) * 0.001,
      accuracy: 5 + Math.random() * 10,
      timestamp: new Date().toISOString()
    }
    
    console.log('SITCSDK Mock: Location retrieved:', location)
    return location
  }
  
  /**
   * GPS Service - Start location tracking (Mock)
   * @param {Function} callback - Callback function for location updates
   * @returns {Promise<Object>} Tracking info
   */
  async startLocationTracking(callback) {
    console.log('SITCSDK Mock: startLocationTracking called')
    
    if (typeof callback !== 'function') {
      throw new Error('Callback function is required')
    }
    
    // Simulate tracking
    this._trackingInterval = setInterval(() => {
      const location = {
        ...this.mockLocation,
        latitude: this.mockLocation.latitude + (Math.random() - 0.5) * 0.0001,
        longitude: this.mockLocation.longitude + (Math.random() - 0.5) * 0.0001,
        accuracy: 5 + Math.random() * 5,
        timestamp: new Date().toISOString()
      }
      
      console.log('SITCSDK Mock: Location update:', location)
      callback(location)
    }, 3000)
    
    return {
      id: Date.now(),
      status: 'tracking',
      interval: 3000,
      timestamp: new Date().toISOString()
    }
  }
  
  /**
   * GPS Service - Stop location tracking (Mock)
   * @returns {Promise<Object>} Stop confirmation
   */
  async stopLocationTracking() {
    console.log('SITCSDK Mock: stopLocationTracking called')
    
    if (this._trackingInterval) {
      clearInterval(this._trackingInterval)
      this._trackingInterval = null
    }
    
    return {
      status: 'stopped',
      timestamp: new Date().toISOString()
    }
  }
  
  /**
   * Camera Service - Take photo or select from gallery (Mock)
   * @param {Object} options - Camera options
   * @returns {Promise<Object>} Mock photo data
   */
  async takePhoto(options = {}) {
    console.log('SITCSDK Mock: takePhoto called with options:', options)
    
    // Simulate camera delay
    await this._delay(1000 + Math.random() * 2000)
    
    const photo = {
      ...this.mockPhoto,
      timestamp: new Date().toISOString(),
      source: options.source || 'camera',
      quality: options.quality || 90
    }
    
    console.log('SITCSDK Mock: Photo captured:', photo)
    return photo
  }
  
  /**
   * Notification Service - Send local notification (Mock)
   * @param {string} message - Notification message
   * @param {Object} options - Notification options
   * @returns {Promise<Object>} Notification result
   */
  async sendNotification(message, options = {}) {
    console.log('SITCSDK Mock: sendNotification called:', message, options)
    
    // Simulate notification delay
    await this._delay(200 + Math.random() * 500)
    
    const notification = {
      id: Date.now(),
      message: message,
      title: options.title || 'SITC Notification',
      scheduled: options.schedule ? true : false,
      schedule: options.schedule || null,
      timestamp: new Date().toISOString(),
      status: 'sent'
    }
    
    // Show mock notification in console
    console.log('🔔 Mock Notification:', notification.title, '-', notification.message)
    
    return notification
  }
  
  /**
   * Toast Service - Show success toast (Mock)
   * @param {string} message - Toast message
   */
  showSuccess(message) {
    console.log('✅ Success Toast:', message)
    this._showMockToast('success', message)
  }
  
  /**
   * Toast Service - Show error toast (Mock)
   * @param {string} message - Toast message
   */
  showError(message) {
    console.log('❌ Error Toast:', message)
    this._showMockToast('error', message)
  }
  
  /**
   * Toast Service - Show warning toast (Mock)
   * @param {string} message - Toast message
   */
  showWarning(message) {
    console.log('⚠️ Warning Toast:', message)
    this._showMockToast('warning', message)
  }
  
  /**
   * Toast Service - Show info toast (Mock)
   * @param {string} message - Toast message
   */
  showInfo(message) {
    console.log('ℹ️ Info Toast:', message)
    this._showMockToast('info', message)
  }
  
  /**
   * User Service - Get user information (Mock)
   * @returns {Promise<Object>} User data
   */
  async getUserInfo() {
    console.log('SITCSDK Mock: getUserInfo called')
    
    // Simulate API delay
    await this._delay(300 + Math.random() * 700)
    
    const userInfo = {
      user: { ...this.mockUser },
      permissions: [...this.mockUser.permissions],
      timestamp: new Date().toISOString()
    }
    
    console.log('SITCSDK Mock: User info retrieved:', userInfo)
    return userInfo
  }
  
  /**
   * Utility - Simulate delay
   * @param {number} ms - Delay in milliseconds
   * @private
   */
  async _delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  /**
   * Utility - Show mock toast in UI
   * @param {string} type - Toast type
   * @param {string} message - Toast message
   * @private
   */
  _showMockToast(type, message) {
    // Create mock toast element
    const toast = document.createElement('div')
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 12px 20px;
      border-radius: 8px;
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      font-weight: 500;
      z-index: 10000;
      max-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `
    
    // Set color based on type
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#17a2b8'
    }
    
    toast.style.backgroundColor = colors[type] || colors.info
    toast.style.color = type === 'warning' ? '#212529' : 'white'
    
    // Set icon based on type
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    }
    
    toast.innerHTML = `${icons[type] || 'ℹ️'} ${message}`
    
    // Add to page
    document.body.appendChild(toast)
    
    // Animate in
    setTimeout(() => {
      toast.style.transform = 'translateX(0)'
    }, 100)
    
    // Remove after 3 seconds
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)'
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast)
        }
      }, 300)
    }, 3000)
  }
  
  /**
   * Debug - Get SDK info
   * @returns {Object} SDK information
   */
  getInfo() {
    return {
      version: this.version,
      isReady: this._isReady,
      isMock: true,
      user: this.mockUser,
      config: this.config,
      timestamp: new Date().toISOString()
    }
  }
}

// Auto-initialize
window.sitcSDK = new SITCSDK()

// Log initialization
console.log('SITCSDK Mock: Auto-initialized')
console.log('SITCSDK Mock: Available at window.sitcSDK')
console.log('SITCSDK Mock: Use sitcSDK.getInfo() to see SDK information')

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITCSDK
}

if (typeof define === 'function' && define.amd) {
  define([], function() {
    return SITCSDK
  })
}
