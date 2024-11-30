import express from "express";
import connectMongoDb from "./connect.js";
import router from "./routes/routes.js";
const PORT = 8002;
const app = express();

connectMongoDb("mongodb://127.0.0.1:27017/shoppingApp");
app.use(express.json());
app.use("/", router);

app
  .listen(PORT, () => {
    console.log(`Server Started at PORT: ${PORT}`);
  })
  .on("error", (err) => {
    console.log("Server Error");
  });

/*Google Drive image links don’t work the same way as images hosted on typical websites because Google Drive uses a different type of URL structure and permissions model for its files. Here's a breakdown of why Google Drive links behave differently:

### 1. **Google Drive URL Structure**:
When you upload an image to Google Drive, the link that Google provides points to a **file page** rather than directly to the image itself. The link looks something like this:

```
https://drive.google.com/file/d/FILE_ID/view?usp=sharing
```

This URL points to a **Google Drive file viewer page**, not the image file itself, and browsers treat it as such. Because of this, you can't directly use this link as an image source (e.g., in an `<img>` tag).

### 2. **Permissions**:
Google Drive links depend on the file's sharing permissions. If a file isn’t set to "public" or "anyone with the link," the file is inaccessible without proper authentication, meaning the link won’t work as an image source unless permissions are set properly.

- **Private Links**: Only users who are explicitly granted permission can access the image.
- **Shareable Links**: Anyone with the link can access the image, but this link still points to a Google Drive page, not the file itself.
- **Public Links**: If you make the file "public," you can create a direct download link, but you still need to manipulate the URL.

### 3. **Direct Image Link Conversion**:
To use a Google Drive image link in a context like an `<img>` tag or a direct file link, you must modify the link to point directly to the file, not the Google Drive preview page. 

#### How to Convert Google Drive Links to Direct Image Links:

1. Take your Google Drive file ID from the original link:
   ```
   https://drive.google.com/file/d/FILE_ID/view?usp=sharing
   ```

2. Replace the link with this format:
   ```
   https://drive.google.com/uc?export=view&id=FILE_ID
   ```

   Example:
   If your Google Drive link is:
   ```
   https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9i0j/view?usp=sharing
   ```

   Convert it to:
   ```
   https://drive.google.com/uc?export=view&id=1a2b3c4d5e6f7g8h9i0j
   ```

This new link will point directly to the image, allowing you to use it in an `<img>` tag or other contexts where direct image links are required.

### 4. **Content-Type Header**:
Web servers typically provide a `Content-Type` header that indicates what kind of file is being accessed (e.g., `image/jpeg` for a JPEG image). Google Drive serves the file viewer page instead of directly serving the image, which is why the standard image link approach doesn't work with a regular Google Drive link.

### Conclusion:
Google Drive image links behave differently because:
- The default link is a **viewer page**, not a direct image file link.
- **Permissions** need to be set properly for public access.
- You must modify the URL to point directly to the file.

By using the modified URL (`https://drive.google.com/uc?export=view&id=FILE_ID`), you can turn Google Drive links into direct image links that work like traditional image URLs. */
