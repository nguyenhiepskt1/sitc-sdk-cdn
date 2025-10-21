# 🚀 Hướng Dẫn Tích Hợp Project Riêng Vào Shell App

## 📋 Tổng Quan

Shell App cung cấp **SITCSDK** để các project riêng biệt có thể sử dụng các chức năng chung như GPS, Camera, Notifications, Toast mà không cần code lại.

## 🎯 Lợi Ích

- ✅ **Không cần code lại** các chức năng cơ bản
- ✅ **Tích hợp dễ dàng** với bất kỳ công nghệ nào
- ✅ **UI/UX nhất quán** across tất cả miniapps
- ✅ **User authentication** và permissions tự động
- ✅ **Native performance** trên mobile devices

---

## 🛠️ Các Bước Tích Hợp

### **Bước 1: Deploy Project Lên Server (Mock test có thể bỏ qua)**

```bash
# Deploy project của bạn lên bất kỳ hosting nào
# Ví dụ: Vercel, Netlify, AWS S3, GitHub Pages, etc.

# URL sau khi deploy: https://your-project.com
```

### **Bước 2: Thêm SITCSDK Vào Project**

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Thêm SITCSDK vào <head> -->
    <script src="https://cdn.jsdelivr.net/gh/nguyenhiepskt1/sitc-sdk-cdn@main/sitc-sdk-mock.js"></script>
</head>
<body>
    <!-- Your project content -->
</body>
</html>
```

### **Bước 3: Sử Dụng SITCSDK**

```javascript
// Kiểm tra SITCSDK đã sẵn sàng chưa
if (window.sitcSDK && window.sitcSDK.isReady()) {
    console.log('SITCSDK is ready!')
} else {
    console.log('SITCSDK not ready')
}

// Sử dụng các chức năng
async function useSITCSDK() {
    try {
        // 1. Lấy vị trí GPS
        const location = await window.sitcSDK.getLocation()
        console.log('Location:', location)
        
        // 2. Chụp ảnh
        const photo = await window.sitcSDK.takePhoto()
        console.log('Photo:', photo)
        
        // 3. Gửi thông báo
        await window.sitcSDK.sendNotification('Hello from my project!')
        
        // 4. Hiển thị toast
        window.sitcSDK.showSuccess('Operation completed!')
        
        // 5. Lấy thông tin user
        const userInfo = await window.sitcSDK.getUserInfo()
        console.log('User:', userInfo.user)
        console.log('Permissions:', userInfo.permissions)
        
    } catch (error) {
        console.error('SITCSDK Error:', error)
    }
}
```

---

## 📱 Ví Dụ Tích Hợp Theo Công Nghệ

### **React Project**

```jsx
import React, { useEffect, useState } from 'react'

function MyComponent() {
    const [location, setLocation] = useState(null)
    const [user, setUser] = useState(null)
    
    useEffect(() => {
        // Kiểm tra SITCSDK
        if (window.sitcSDK && window.sitcSDK.isReady()) {
            loadUserInfo()
        }
    }, [])
    
    const loadUserInfo = async () => {
        try {
            const userInfo = await window.sitcSDK.getUserInfo()
            setUser(userInfo.user)
        } catch (error) {
            console.error('Error loading user info:', error)
        }
    }
    
    const getLocation = async () => {
        try {
            const loc = await window.sitcSDK.getLocation()
            setLocation(loc)
            window.sitcSDK.showSuccess('Location retrieved!')
        } catch (error) {
            window.sitcSDK.showError('Failed to get location')
        }
    }
    
    const takePhoto = async () => {
        try {
            const photo = await window.sitcSDK.takePhoto()
            console.log('Photo taken:', photo)
            window.sitcSDK.showSuccess('Photo captured!')
        } catch (error) {
            window.sitcSDK.showError('Failed to take photo')
        }
    }
    
    return (
        <div>
            <h1>My React Project</h1>
            {user && <p>Welcome, {user.name}!</p>}
            <button onClick={getLocation}>Get Location</button>
            <button onClick={takePhoto}>Take Photo</button>
            {location && <p>Location: {location.latitude}, {location.longitude}</p>}
        </div>
    )
}

export default MyComponent
```

### **Angular Project**

```typescript
import { Component, OnInit } from '@angular/core'

declare global {
    interface Window {
        sitcSDK: any
    }
}

@Component({
    selector: 'app-my-component',
    template: `
        <div>
            <h1>My Angular Project</h1>
            <button (click)="getLocation()">Get Location</button>
            <button (click)="takePhoto()">Take Photo</button>
            <p *ngIf="location">Location: {{location.latitude}}, {{location.longitude}}</p>
        </div>
    `
})
export class MyComponent implements OnInit {
    location: any = null
    user: any = null
    
    ngOnInit() {
        if (window.sitcSDK && window.sitcSDK.isReady()) {
            this.loadUserInfo()
        }
    }
    
    async loadUserInfo() {
        try {
            const userInfo = await window.sitcSDK.getUserInfo()
            this.user = userInfo.user
        } catch (error) {
            console.error('Error loading user info:', error)
        }
    }
    
    async getLocation() {
        try {
            this.location = await window.sitcSDK.getLocation()
            window.sitcSDK.showSuccess('Location retrieved!')
        } catch (error) {
            window.sitcSDK.showError('Failed to get location')
        }
    }
    
    async takePhoto() {
        try {
            const photo = await window.sitcSDK.takePhoto()
            console.log('Photo taken:', photo)
            window.sitcSDK.showSuccess('Photo captured!')
        } catch (error) {
            window.sitcSDK.showError('Failed to take photo')
        }
    }
}
```

### **Vue.js Project**

```vue
<template>
    <div>
        <h1>My Vue Project</h1>
        <button @click="getLocation">Get Location</button>
        <button @click="takePhoto">Take Photo</button>
        <p v-if="location">Location: {{location.latitude}}, {{location.longitude}}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            location: null,
            user: null
        }
    },
    mounted() {
        if (window.sitcSDK && window.sitcSDK.isReady()) {
            this.loadUserInfo()
        }
    },
    methods: {
        async loadUserInfo() {
            try {
                const userInfo = await window.sitcSDK.getUserInfo()
                this.user = userInfo.user
            } catch (error) {
                console.error('Error loading user info:', error)
            }
        },
        async getLocation() {
            try {
                this.location = await window.sitcSDK.getLocation()
                window.sitcSDK.showSuccess('Location retrieved!')
            } catch (error) {
                window.sitcSDK.showError('Failed to get location')
            }
        },
        async takePhoto() {
            try {
                const photo = await window.sitcSDK.takePhoto()
                console.log('Photo taken:', photo)
                window.sitcSDK.showSuccess('Photo captured!')
            } catch (error) {
                window.sitcSDK.showError('Failed to take photo')
            }
        }
    }
}
</script>
```

### **Vanilla JavaScript Project**

```html
<!DOCTYPE html>
<html>
<head>
    <script src="https://cdn.jsdelivr.net/gh/nguyenhiepskt1/sitc-sdk-cdn@main/sitc-sdk-mock.js"></script>
</head>
<body>
    <h1>My Vanilla JS Project</h1>
    <button onclick="getLocation()">Get Location</button>
    <button onclick="takePhoto()">Take Photo</button>
    <div id="result"></div>
    
    <script>
        let location = null
        let user = null
        
        // Initialize when page loads
        window.addEventListener('load', () => {
            if (window.sitcSDK && window.sitcSDK.isReady()) {
                loadUserInfo()
            }
        })
        
        async function loadUserInfo() {
            try {
                const userInfo = await window.sitcSDK.getUserInfo()
                user = userInfo.user
                console.log('User loaded:', user)
            } catch (error) {
                console.error('Error loading user info:', error)
            }
        }
        
        async function getLocation() {
            try {
                location = await window.sitcSDK.getLocation()
                document.getElementById('result').innerHTML = 
                    `Location: ${location.latitude}, ${location.longitude}`
                window.sitcSDK.showSuccess('Location retrieved!')
            } catch (error) {
                window.sitcSDK.showError('Failed to get location')
            }
        }
        
        async function takePhoto() {
            try {
                const photo = await window.sitcSDK.takePhoto()
                console.log('Photo taken:', photo)
                window.sitcSDK.showSuccess('Photo captured!')
            } catch (error) {
                window.sitcSDK.showError('Failed to take photo')
            }
        }
    </script>
</body>
</html>
```

---

## 🔧 SITCSDK API Reference

### **GPS Functions**

```javascript
// Lấy vị trí hiện tại
const location = await window.sitcSDK.getLocation(options)
// options: { timeout: 30000, maximumAge: 0 }

// Bắt đầu theo dõi vị trí (nếu có)
await window.sitcSDK.startLocationTracking(callback)

// Dừng theo dõi vị trí (nếu có)
await window.sitcSDK.stopLocationTracking()
```

### **Camera Functions**

```javascript
// Chụp ảnh
const photo = await window.sitcSDK.takePhoto(options)
// options: { source: 'camera' | 'gallery', quality: 90 }

// Chọn từ thư viện
const photo = await window.sitcSDK.takePhoto({ source: 'gallery' })
```

### **Notification Functions**

```javascript
// Gửi thông báo ngay lập tức
await window.sitcSDK.sendNotification(message, options)

// Gửi thông báo có lịch
await window.sitcSDK.sendNotification('Reminder!', {
    schedule: { at: new Date(Date.now() + 60000) }
})
```

### **Toast Functions**

```javascript
// Hiển thị toast messages
window.sitcSDK.showSuccess('Success message')
window.sitcSDK.showError('Error message')
window.sitcSDK.showWarning('Warning message')
window.sitcSDK.showInfo('Info message')
```

### **User Functions**

```javascript
// Lấy thông tin user
const userInfo = await window.sitcSDK.getUserInfo()
// Returns: { user: {...}, permissions: [...] }
```

---

## 📋 Đăng Ký Với Shell App

Sau khi hoàn thành tích hợp, cung cấp thông tin cho Shell App team:

### **Thông Tin Cần Cung Cấp:**

1. **Project Details:**
   - Tên project
   - URL sau khi deploy
   - Mô tả chức năng
   - Công nghệ sử dụng

2. **Permissions Required:**
   - GPS: `['gps']`
   - Camera: `['camera']`
   - Notifications: `['notifications']`
   - All: `['gps', 'camera', 'notifications']`

3. **Integration Status:**
   - SITCSDK version tested
   - Features tested
   - Any issues encountered

### **Template Email:**

```
Subject: [Miniapp Registration] Project Name

Hi Shell App Team,

I would like to register my project as a miniapp:

Project Name: [Your Project Name]
URL: https://your-project.com
Description: [Brief description of functionality]
Technology: [React/Angular/Vue/Vanilla JS/etc.]
Permissions Required: ['gps', 'camera', 'notifications']

SITCSDK Integration:
- ✅ GPS functionality tested
- ✅ Camera functionality tested  
- ✅ Notifications tested
- ✅ Toast messages tested
- ✅ User authentication tested

Please add this project to the miniapp registry.

Thanks!
[Your Name]
```

---

## 🧪 Testing

### **Test Checklist:**

- [ ] SITCSDK loads correctly
- [ ] GPS functionality works
- [ ] Camera functionality works
- [ ] Notifications work
- [ ] Toast messages display
- [ ] User info retrieval works
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] Cross-browser compatible

### **Test URLs:**

- **Local Testing:** http://localhost:3004/test-external-project.html
- **Production:** https://shell.sitc.com/test-external-project.html

---

## 🆘 Troubleshooting

### **Common Issues:**

1. **SITCSDK not ready:**
   ```javascript
   // Wait for SITCSDK to load
   window.addEventListener('load', () => {
       if (window.sitcSDK && window.sitcSDK.isReady()) {
           // Use SITCSDK
       }
   })
   ```

2. **CORS errors:**
   - Ensure your project is served over HTTPS
   - Check if Shell App allows your domain

3. **Permission denied:**
   - Check if user has required permissions
   - Verify miniapp is registered with correct permissions

4. **Camera not working:**
   - Ensure HTTPS is used
   - Check browser permissions
   - Test on real device (not simulator)

---

## 📞 Support

Nếu gặp vấn đề trong quá trình tích hợp:

1. **Check Console Logs** - Xem lỗi trong browser console
2. **Test with Demo** - Sử dụng `/test-external-project.html`
3. **Contact Team** - Liên hệ Shell App development team
4. **Documentation** - Tham khảo `/docs/MINIAPP_INTEGRATION_GUIDE.md`

---

## 🎉 Kết Luận

Với SITCSDK, việc tích hợp project riêng vào Shell App trở nên rất đơn giản:

1. **Thêm 1 dòng script** vào project
2. **Sử dụng API** có sẵn
3. **Deploy và đăng ký** với Shell App
4. **Enjoy** các chức năng native!

**Happy Coding! 🚀**
