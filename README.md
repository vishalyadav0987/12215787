# 🔗 Link Shortener API

A powerful and efficient URL shortening service built with Node.js, Express, and MongoDB. Transform long URLs into short, manageable links with custom expiry times! ✨

## 🔌 API Endpoints

### 📊 Health Check

#### GET `/test`
Test endpoint to simulate error logging functionality.

---

### 🔗 Create Short Link

#### POST `/api/v1/links/shorturls`

Create a new shortened URL with optional custom short code and expiry time.

**Request Body:**
```json
{
  "originalUrl": "https://example.com/very-long-url",
  "shortCode": "custom123",
  "time": 7
}
```

**Parameters:**
- `originalUrl` (required): The URL to shorten
- `shortCode` (optional): Custom short code
- `time` (optional): Expiry time in days (default: 30)

**Success Response:**
![Create Short Link Success](https://i.ibb.co/xqmN3hd8/Screenshot-2025-07-14-at-2-32-19-PM.png)



---

### 📋 Get All Links

#### GET `/api/v1/links/shorturls-all`

Retrieve all created short links from the database.

**Success Response:**
![Get All Links Success](https://i.ibb.co/77HG0FC/Screenshot-2025-07-14-at-2-33-01-PM.png)



---

## 🚀 Features

- 🎯 **Custom Short Codes**: Create personalized short links
- ⏰ **Expiry Management**: Set custom expiration times (default: 30 days)
- 📊 **Link Management**: View all created short links
- 🛡️ **URL Validation**: Robust URL format validation
- 📝 **Comprehensive Logging**: Built-in logging middleware
- 🌐 **CORS Enabled**: Cross-origin resource sharing support

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Middleware**: CORS, Custom Logging
- **Environment**: dotenv for configuration

## 📋 Prerequisites

Before running this application, make sure you have:

- 📦 Node.js (v14 or higher)
- 🍃 MongoDB database
- 🔑 Environment variables configured

## ⚡ Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd 12215787
```

### 2. Install Dependencies
```bash
cd backend
npm install
```

### 3. Environment Setup
Create a `.env` file in the backend directory:
```env
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the Server
```bash
npm start
```

The server will start on `http://localhost:4000` 🎉



## 📁 Project Structure

```
12215787/
├── backend/
│   ├── controllers/
│   │   └── linkShortnerController.js
│   ├── models/
│   │   └── LinkShotnerSchema.js
│   ├── routes/
│   │   └── linkShortnerRoutes.js
│   ├── connectDB/
│   │   └── connect.js
│   ├── utils/
│   │   └── helper.js
│   ├── index.js
│   └── .env
├── loging-middleware/
│   └── logginMiddelware.js
└── README.md
```

## 🎨 Response Examples

### ✅ Successful Link Creation
```json
{
  "success": true,
  "data": {
    "expires": 30,
    "shortUrl": "http://localhost:4000/abc123"
  }
}
```

![Successful Response Example](https://via.placeholder.com/600x250/81C784/FFFFFF?text=Successful+Response+JSON)

### ❌ Error Responses

**Missing Original URL:**
```json
{
  "success": false,
  "message": "originalUrl is required"
}
```

![Missing URL Error](https://via.placeholder.com/600x200/FFAB91/000000?text=Missing+Original+URL+Error)

**Invalid URL Format:**
```json
{
  "error": "Invalid URL format"
}
```

![Invalid Format Error](https://via.placeholder.com/600x200/BCAAA4/FFFFFF?text=Invalid+URL+Format+Error)

**Duplicate Short Code:**
```json
{
  "success": false,
  "message": "Short code already exists"
}
```

![Duplicate Code Error](https://via.placeholder.com/600x200/D7CCC8/000000?text=Duplicate+Short+Code+Error)

## 🔧 Configuration

### Environment Variables
| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | ✅ Yes |

![Environment Setup](https://via.placeholder.com/600x200/E1BEE7/000000?text=Environment+Variables+Setup)

### CORS Configuration
- **Allowed Origins**: `http://localhost:5173`
- **Credentials**: Enabled

![CORS Configuration](https://via.placeholder.com/600x150/F8BBD9/000000?text=CORS+Configuration)

## 📝 Logging

The application uses a custom logging middleware that logs:
- 🟢 **Info**: Successful operations
- 🟡 **Warn**: Validation errors and warnings
- 🔴 **Error**: System errors and failures

![Logging Dashboard](https://via.placeholder.com/600x300/B39DDB/FFFFFF?text=Logging+Middleware+Dashboard)

## 🤝 Contributing

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔃 Open a Pull Request

![Contributing Guide](https://via.placeholder.com/600x250/90CAF9/000000?text=Contributing+Guide+Workflow)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. 📋 Check the existing issues
2. 🐛 Create a new issue with detailed description
3. 📧 Contact the development team

![Support Channels](https://via.placeholder.com/600x200/A5D6A7/000000?text=Support+and+Help+Channels)

---

Made with ❤️ by the Link Shortener Team

## 🎯 Future Enhancements

- 📊 Analytics dashboard
- 🔐 User authentication
- 🎨 Custom themes
- 📱 Mobile app
- 🔗 Bulk URL processing

![Future Features](https://via.placeholder.com/600x300/FFCC02/000000?text=Future+Enhancements+Roadmap)

---

**Happy Link Shortening!** 🎉✨

![Project Logo](https://via.placeholder.com/400x200/6C63FF/FFFFFF?text=Link+Shortener+API+Logo)
