/**
 * SITCSDK Template for Team Members
 * This file provides a unified interface for miniapps to communicate with Shell App
 * 
 * Usage:
 * 1. Include this script in your miniapp: <script src="https://shell.sitc.com/sitc-sdk.js"></script>
 * 2. Use window.sitcSDK to access all functionality
 * 
 * Example:
 * const location = await window.sitcSDK.getLocation()
 * const photo = await window.sitcSDK.takePhoto()
 * window.sitcSDK.showSuccess('Operation completed!')
 */

class SITCSDK {
  constructor() {
    this.parent = window.parent
    this.requestId = 0
    this._isReady = false
    
    // Check if we're in iframe (Shell App context)
    if (window.parent !== window) {
      this._isReady = true
      console.log('SITCSDK: Ready for communication with Shell App')
    } else {
      console.warn('SITCSDK: Not in iframe context - some features may not work')
    }
  }
  
  /**
   * GPS Service - Get current location
   * @param {Object} options - GPS options
   * @returns {Promise<Object>} Location data
   */
  async getLocation(options = {}) {
    return this.sendMessage('GET_LOCATION', options)
  }
  
  /**
   * Camera Service - Take photo or select from gallery
   * @param {Object} options - Camera options
   * @returns {Promise<Object>} Photo data
   */
  async takePhoto(options = {}) {
    return this.sendMessage('TAKE_PHOTO', options)
  }
  
  /**
   * Notification Service - Send local notification
   * @param {string} message - Notification message
   * @param {Object} options - Notification options
   * @returns {Promise<Object>} Notification result
   */
  async sendNotification(message, options = {}) {
    return this.sendMessage('SEND_NOTIFICATION', { message, ...options })
  }
  
  /**
   * Toast Service - Show success toast
   * @param {string} message - Toast message
   */
  showSuccess(message) {
    this.sendMessage('SHOW_TOAST', { message, type: 'success' })
  }
  
  /**
   * Toast Service - Show error toast
   * @param {string} message - Toast message
   */
  showError(message) {
    this.sendMessage('SHOW_TOAST', { message, type: 'error' })
  }
  
  /**
   * Toast Service - Show info toast
   * @param {string} message - Toast message
   */
  showInfo(message) {
    this.sendMessage('SHOW_TOAST', { message, type: 'info' })
  }
  
  /**
   * Toast Service - Show warning toast
   * @param {string} message - Toast message
   */
  showWarning(message) {
    this.sendMessage('SHOW_TOAST', { message, type: 'warning' })
  }
  
  /**
   * User Service - Get current user info
   * @returns {Promise<Object>} User data and permissions
   */
  async getUserInfo() {
    return this.sendMessage('GET_USER_INFO')
  }
  
  /**
   * Check if SDK is ready
   * @returns {boolean} Ready status
   */
  isReady() {
    return this._isReady
  }
  
  /**
   * Send message to Shell App
   * @private
   * @param {string} type - Message type
   * @param {any} data - Message data
   * @returns {Promise<any>} Response data
   */
  sendMessage(type, data = null) {
    if (!this._isReady) {
      return Promise.reject(new Error('SITCSDK not ready - not in iframe context'))
    }
    
    return new Promise((resolve, reject) => {
      const requestId = ++this.requestId
      
      const handleMessage = (event) => {
        // Only handle messages with matching requestId
        if (event.data.requestId === requestId) {
          window.removeEventListener('message', handleMessage)
          
          if (event.data.type.endsWith('_RESULT')) {
            resolve(event.data.data)
          } else if (event.data.type.endsWith('_ERROR')) {
            reject(new Error(event.data.error))
          }
        }
      }
      
      // Listen for response
      window.addEventListener('message', handleMessage)
      
      // Send message to Shell App
      this.parent.postMessage({
        type,
        data,
        requestId
      }, '*')
      
      // Timeout after 30 seconds
      setTimeout(() => {
        window.removeEventListener('message', handleMessage)
        reject(new Error('Request timeout after 30 seconds'))
      }, 30000)
    })
  }
}

// Make SITCSDK available globally
window.sitcSDK = new SITCSDK()

// Log initialization
console.log('SITCSDK: Initialized for miniapp communication')
