/**
 * SITCSDK Standalone Version for Team Testing
 * This version works both in iframe (Shell App) and standalone (browser) contexts
 * 
 * Usage:
 * 1. Include this script: <script src="https://cdn.jsdelivr.net/gh/your-username/sitc-sdk-cdn@main/sitc-sdk-standalone.js"></script>
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
    this._isStandalone = false
    
    // Check if we're in iframe (Shell App context)
    if (window.parent !== window) {
      this._isReady = true
      this._isStandalone = false
      console.log('SITCSDK: Ready for communication with Shell App')
    } else {
      // Standalone mode - for team testing
      this._isReady = true
      this._isStandalone = true
      console.log('SITCSDK: Running in standalone mode for testing')
      this._setupStandaloneMode()
    }
  }
  
  /**
   * Setup standalone mode with mock implementations
   */
  _setupStandaloneMode() {
    // Mock GPS implementation
    this._mockGPS = {
      getCurrentPosition: () => {
        return new Promise((resolve) => {
          // Simulate GPS delay
          setTimeout(() => {
            resolve({
              latitude: 21.0285 + (Math.random() - 0.5) * 0.01,
              longitude: 105.8542 + (Math.random() - 0.5) * 0.01,
              accuracy: 10 + Math.random() * 20,
              timestamp: Date.now()
            })
          }, 1000)
        })
      }
    }
    
    // Mock Camera implementation
    this._mockCamera = {
      getPhoto: () => {
        return new Promise((resolve) => {
          // Create a mock image
          const canvas = document.createElement('canvas')
          canvas.width = 400
          canvas.height = 300
          const ctx = canvas.getContext('2d')
          
          // Draw a mock photo
          ctx.fillStyle = '#f0f0f0'
          ctx.fillRect(0, 0, 400, 300)
          
          ctx.fillStyle = '#333'
          ctx.font = '20px Arial'
          ctx.textAlign = 'center'
          ctx.fillText('Mock Photo', 200, 150)
          ctx.fillText(new Date().toLocaleString(), 200, 180)
          
          resolve({
            dataUrl: canvas.toDataURL('image/jpeg', 0.9),
            format: 'jpeg',
            width: 400,
            height: 300
          })
        })
      }
    }
    
    // Mock Notification implementation
    this._mockNotification = {
      schedule: () => {
        return new Promise((resolve) => {
          // Show browser notification if supported
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('SITCSDK Notification', {
              body: 'This is a mock notification from SITCSDK',
              icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23007bff"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
            })
          } else {
            // Fallback to alert
            alert('SITCSDK Notification: This is a mock notification')
          }
          resolve({ success: true })
        })
      }
    }
    
    // Mock Toast implementation
    this._mockToast = {
      show: (message, type = 'info') => {
        const toast = document.createElement('div')
        toast.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: ${this._getToastColor(type)};
          color: white;
          padding: 12px 20px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10000;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          font-size: 14px;
          max-width: 300px;
          word-wrap: break-word;
        `
        toast.textContent = message
        document.body.appendChild(toast)
        
        // Auto remove after 3 seconds
        setTimeout(() => {
          if (toast.parentNode) {
            toast.parentNode.removeChild(toast)
          }
        }, 3000)
      }
    }
    
    // Mock User Info
    this._mockUserInfo = {
      user: {
        id: 1,
        name: 'Test User',
        username: 'testuser',
        role: 'developer',
        email: 'test@sitc.com'
      },
      permissions: ['gps', 'camera', 'notifications'],
      isAuthenticated: true
    }
  }
  
  _getToastColor(type) {
    const colors = {
      success: '#28a745',
      error: '#dc3545',
      warning: '#ffc107',
      info: '#007bff'
    }
    return colors[type] || colors.info
  }
  
  /**
   * Check if SDK is ready
   */
  isReady() {
    return this._isReady
  }
  
  /**
   * Check if running in standalone mode
   */
  isStandalone() {
    return this._isStandalone
  }
  
  /**
   * Get current location
   */
  async getLocation(options = {}) {
    if (this._isStandalone) {
      // Use mock GPS in standalone mode
      return await this._mockGPS.getCurrentPosition()
    } else {
      // Use real Shell App communication
      return await this.sendMessage('GET_LOCATION', options)
    }
  }
  
  /**
   * Take photo
   */
  async takePhoto(options = {}) {
    if (this._isStandalone) {
      // Use mock camera in standalone mode
      return await this._mockCamera.getPhoto()
    } else {
      // Use real Shell App communication
      return await this.sendMessage('TAKE_PHOTO', options)
    }
  }
  
  /**
   * Select photo from gallery
   */
  async selectFromGallery(options = {}) {
    return await this.takePhoto({ ...options, source: 'gallery' })
  }
  
  /**
   * Send notification
   */
  async sendNotification(message, options = {}) {
    if (this._isStandalone) {
      // Use mock notification in standalone mode
      return await this._mockNotification.schedule()
    } else {
      // Use real Shell App communication
      return await this.sendMessage('SEND_NOTIFICATION', { message, ...options })
    }
  }
  
  /**
   * Schedule notification
   */
  async scheduleNotification(message, schedule) {
    return await this.sendNotification(message, { schedule })
  }
  
  /**
   * Show success toast
   */
  showSuccess(message) {
    if (this._isStandalone) {
      this._mockToast.show(message, 'success')
    } else {
      this.sendMessage('SHOW_TOAST', { message, type: 'success' })
    }
  }
  
  /**
   * Show error toast
   */
  showError(message) {
    if (this._isStandalone) {
      this._mockToast.show(message, 'error')
    } else {
      this.sendMessage('SHOW_TOAST', { message, type: 'error' })
    }
  }
  
  /**
   * Show info toast
   */
  showInfo(message) {
    if (this._isStandalone) {
      this._mockToast.show(message, 'info')
    } else {
      this.sendMessage('SHOW_TOAST', { message, type: 'info' })
    }
  }
  
  /**
   * Show warning toast
   */
  showWarning(message) {
    if (this._isStandalone) {
      this._mockToast.show(message, 'warning')
    } else {
      this.sendMessage('SHOW_TOAST', { message, type: 'warning' })
    }
  }
  
  /**
   * Get user information
   */
  async getUserInfo() {
    if (this._isStandalone) {
      // Return mock user info in standalone mode
      return this._mockUserInfo
    } else {
      // Use real Shell App communication
      return await this.sendMessage('GET_USER_INFO')
    }
  }
  
  /**
   * Check if user has permission
   */
  hasPermission(permission) {
    if (this._isStandalone) {
      // In standalone mode, assume all permissions are granted
      return true
    } else {
      // Use real Shell App communication
      return this.sendMessage('HAS_PERMISSION', { permission })
    }
  }
  
  /**
   * Send message to Shell App (iframe mode only)
   */
  sendMessage(type, data = null) {
    if (this._isStandalone) {
      // In standalone mode, return a promise that resolves immediately
      return Promise.resolve({ 
        success: true, 
        message: 'Standalone mode - no Shell App communication needed',
        type,
        data 
      })
    }
    
    if (!this._isReady) {
      return Promise.reject(new Error('SITCSDK not ready - not in iframe context'))
    }
    
    return new Promise((resolve, reject) => {
      const requestId = ++this.requestId
      
      const handleMessage = (event) => {
        if (event.data.requestId === requestId) {
          window.removeEventListener('message', handleMessage)
          if (event.data.error) {
            reject(new Error(event.data.error))
          } else {
            resolve(event.data.data)
          }
        }
      }
      
      window.addEventListener('message', handleMessage)
      
      this.parent.postMessage({
        type,
        data,
        requestId
      }, '*')
      
      // Timeout after 30 seconds
      setTimeout(() => {
        window.removeEventListener('message', handleMessage)
        reject(new Error('Request timeout'))
      }, 30000)
    })
  }
}

// Initialize SITCSDK
window.sitcSDK = new SITCSDK()
console.log('SITCSDK: Initialized for miniapp communication')
