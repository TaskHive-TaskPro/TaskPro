# 🚀 TaskPro - Render Deployment Guide

## Ön Hazırlık

### 1. MongoDB Atlas Hesabı Oluştur
1. [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) hesabı oluştur
2. Yeni bir Cluster oluştur (Free tier yeterli)
3. Database User oluştur (username/password kaydet)
4. Network Access'de "Allow Access from Anywhere" (0.0.0.0/0) ekle
5. Connection string'i kopyala (örnek: `mongodb+srv://username:password@cluster.mongodb.net/taskpro`)

### 2. Email SMTP Ayarları (Opsiyonel)
- Gmail kullanacaksan: [App Password](https://myaccount.google.com/apppasswords) oluştur
- Veya [SendGrid](https://sendgrid.com/), [Mailgun](https://www.mailgun.com/) gibi servisleri kullanabilirsin

---

## 📦 Render'a Deploy Etme Adımları

### Yöntem 1: Blueprint (Otomatik - Önerilen)

#### 1. GitHub'a Push Et
```bash
git add .
git commit -m "Production ready"
git push origin main
```

#### 2. Render Dashboard'a Git
1. [Render Dashboard](https://dashboard.render.com/) git
2. "New +" butonuna tıkla
3. "Blueprint" seç

#### 3. Repository'yi Bağla
1. GitHub hesabını bağla
2. TaskPro repository'sini seç
3. `render.yaml` dosyasını otomatik algılayacak

#### 4. Environment Variables Ayarla

**Backend Service için:**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskpro
JWT_SECRET=your-super-secret-jwt-key-min-32-characters
JWT_EXPIRES=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=TaskPro <noreply@taskpro.com>
CLIENT_URL=https://taskpro-frontend.onrender.com
NODE_ENV=production
```

**Frontend Service için:**
```
VITE_API_URL=https://taskpro-backend.onrender.com
```

#### 5. Deploy Et
- "Create Services" butonuna tıkla
- Render otomatik olarak her iki servisi de deploy edecek

---

### Yöntem 2: Manuel Deployment

#### Backend (Node.js Web Service)

1. **New + → Web Service**
2. Repository seç: TaskPro
3. Ayarları yapılandır:
   ```
   Name: taskpro-backend
   Region: Frankfurt (veya en yakın)
   Branch: main
   Root Directory: server
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Plan: Free
   ```
4. Environment Variables ekle (yukarıdaki listeyi kullan)
5. "Create Web Service" tıkla

#### Frontend (Static Site)

1. **New + → Static Site**
2. Repository seç: TaskPro
3. Ayarları yapılandır:
   ```
   Name: taskpro-frontend
   Region: Frankfurt
   Branch: main
   Root Directory: client
   Build Command: npm install && npm run build
   Publish Directory: dist
   Plan: Free
   ```
4. Environment Variables ekle:
   ```
   VITE_API_URL=https://taskpro-backend.onrender.com
   ```
5. "Create Static Site" tıkla

---

## 🔧 Deploy Sonrası Ayarlar

### 1. Backend URL'i Güncelle
Frontend deploy edildikten sonra, backend'in environment variables'ına frontend URL'ini ekle:
```
CLIENT_URL=https://taskpro-frontend.onrender.com
```

### 2. CORS Doğrulaması
- Frontend'den backend'e istek at ve CORS hatası olmadığını kontrol et
- Gerekirse backend'de `CLIENT_URL` değişkenini kontrol et

### 3. Database Seed (İlk Kullanıcı)
İlk admin kullanıcısını oluşturmak için backend'in shell'ine git:
```bash
# Render Dashboard → Backend Service → Shell
node src/scripts/createVerifiedUser.js
```

---

## 📊 Free Tier Limitler

### Render Free Plan
- ✅ 750 saat/ay ücretsiz (bir servis için yeterli)
- ✅ Otomatik SSL sertifikası
- ⚠️ 15 dakika inaktivite sonrası sleep mode
- ⚠️ İlk istek 30-60 saniye sürebilir (cold start)
- 💡 **Çözüm:** [UptimeRobot](https://uptimerobot.com/) gibi servisle 5 dakikada bir ping at

### MongoDB Atlas Free Tier
- ✅ 512 MB depolama
- ✅ Shared cluster
- ✅ Sınırsız bağlantı

---

## 🐛 Sık Karşılaşılan Sorunlar

### Backend Build Başarısız
```bash
# Hata: Cannot find module
# Çözüm: package.json'da dependencies kontrol et
cd server && npm install
```

### Frontend Build Başarısız
```bash
# Hata: Environment variable not defined
# Çözüm: VITE_API_URL environment variable'ı ekle
```

### CORS Hatası
```javascript
// Backend server.js'de CLIENT_URL doğru mu kontrol et
console.log('CLIENT_URL:', process.env.CLIENT_URL);
```

### Database Bağlantı Hatası
- MongoDB Atlas'ta Network Access'i kontrol et
- MONGO_URI'daki username/password doğru mu kontrol et
- Database name'i connection string'e eklediğinden emin ol

### Cold Start (İlk İstek Yavaş)
- Bu normaldir (Free tier özelliği)
- Backend 15 dakika sonra uyuyor
- İlk istek 30-60 saniye sürebilir
- Çözüm: UptimeRobot ile 5 dakikada bir ping at

---

## 🔄 Güncellemeler

### Kod Güncellemesi
```bash
git add .
git commit -m "Update: feature description"
git push origin main
# Render otomatik olarak yeni deployment başlatacak
```

### Environment Variables Güncelleme
1. Render Dashboard → Service seç
2. Environment sekmesi
3. Variable'ı güncelle
4. "Save Changes" → Servis otomatik restart olur

---

## 📱 Mobil Test

Deploy sonrası mobil cihazlardan test et:
1. Chrome DevTools → Responsive mode
2. Gerçek mobil cihazdan tarayıcıda aç
3. PWA özelliklerini test et

---

## 🎯 Production Checklist

- [ ] MongoDB Atlas cluster oluşturuldu
- [ ] Environment variables ayarlandı
- [ ] Backend başarıyla deploy edildi
- [ ] Frontend başarıyla deploy edildi
- [ ] CORS çalışıyor
- [ ] Authentication çalışıyor
- [ ] Email gönderimi çalışıyor (eğer aktifse)
- [ ] Mobil görünüm test edildi
- [ ] Free tier cold start için ping servisi ayarlandı (opsiyonel)

---

## 🔗 Faydalı Linkler

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [UptimeRobot](https://uptimerobot.com/) - Cold start önleme

---

## 💰 Ücretli Plan Özellikleri (Gerekirse)

**Render Starter Plan ($7/ay):**
- ✅ No sleep mode
- ✅ Faster builds
- ✅ Custom domains

**MongoDB Atlas Shared Tier ($9/ay):**
- ✅ 2 GB - 5 GB storage
- ✅ Better performance

---

## 🆘 Destek

Sorun yaşarsan:
1. Render Dashboard → Service → Logs sekmesini kontrol et
2. Browser Console'da hataları kontrol et
3. Network tab'de API isteklerini izle

**Backend Logs:**
```bash
# Render Dashboard → Backend Service → Logs
# Gerçek zamanlı log akışını görebilirsin
```

**Frontend Logs:**
```bash
# Build logs: Render Dashboard → Frontend Service → Logs
# Runtime errors: Browser Console (F12)
```
