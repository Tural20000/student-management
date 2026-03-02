# Tələbə İdarəetmə Sistemi - Frontend

## İstifadə

1. **Backend-i işə salın** (əvvəlcə):
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   Backend `http://localhost:8050` portunda işləyəcək.

2. **Frontend-i işə salın**:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend `http://localhost:5173` portunda işləyəcək.

3. Brauzerdə **http://localhost:5173** açın.

## Axın

- İlk dəfə giriş: Qeydiyyat pəncərəsi açılır → Qeydiyyat olun → Daxil ol pəncərəsi açılır → Daxil olun
- Tələbə cədvəli: ID, Ad, Soyad, Email, Yaş, Yaradılma tarixi sütunları
- Əlavə et: "Tələbə əlavə et" düyməsi → Formda validation
- Redaktə: Hər sətirdə "Redaktə et" → Formda mövcud məlumatlar
- Sil: "Sil" düyməsi → Təsdiq sorğusu

## Validasiya (Backend ilə uyğun)

- Ad və Soyad: boş ola bilməz
- Email: düzgün format
- Yaş: minimum 18
