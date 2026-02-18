# Deploy Portfolio to GoDaddy

Your portfolio is a **static site** (HTML, CSS, JS). Follow these steps to put it on GoDaddy.

## 1. Build the project

In the project folder, run:

```bash
npm run build
```

This creates a **`dist`** folder with everything needed to host the site.

## 2. Upload to GoDaddy

### Option A: File Manager (cPanel)

1. Log in to [GoDaddy](https://www.godaddy.com) → **My Products** → **Web Hosting** → **Manage**.
2. Open **cPanel** → **File Manager**.
3. Go to **public_html** (for your main domain) or the folder for your subdomain.
4. **Delete** or rename any existing files in that folder (e.g. default `index.html`).
5. **Upload** the **contents** of the `dist` folder (not the `dist` folder itself):
   - Select all files inside `dist` (e.g. `index.html`, `assets/` folder).
   - Upload them so that `index.html` is directly inside `public_html`.

### Option B: FTP

1. In GoDaddy cPanel, note your **FTP username** and **host** (e.g. `ftp.yourdomain.com`).
2. Use an FTP client (FileZilla, Cyberduck, or VS Code FTP extension).
3. Connect and go to **public_html**.
4. Upload the **contents** of the `dist` folder so that `index.html` is in the root of `public_html`.

## 3. Result

- **Main domain:** `https://yourdomain.com`
- **Subdomain:** `https://subdomain.yourdomain.com` (use the folder for that subdomain instead of `public_html`).

## Notes

- The **`.htaccess`** file (included in the build) helps with direct links and future routing.
- If the site doesn’t load, check that `index.html` is in the **root** of the folder you’re using (e.g. `public_html`).
- To update the site: run `npm run build` again and re-upload the contents of `dist`.
