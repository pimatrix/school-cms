# School CMS — Dynamic School Website + Admin Panel

Ek complete school website jisme **sab kuch dynamic hai** — school ka naam,
logo, notices, news, events, gallery, teachers, pages ka text, contact
details aur Google Map — sab **admin panel se** badla ja sakta hai.
Code chhune ki zaroorat nahi.

**Stack:** Next.js 14 + Supabase (database + admin login) + Cloudinary
(images) + Vercel (hosting).

---

## Setup — Step by Step

### Step 1: Supabase me database banao
1. [supabase.com](https://supabase.com) par apna project kholo
   (jo project bana hai wahi use karo).
2. Left menu → **SQL Editor** → **New query**.
3. Is repo ki file `supabase/schema.sql` ka **pura content** paste karke
   **Run** dabao. (Tables + security rules ban jayenge.)
4. Phir **New query** me `supabase/seed.sql` ka pura content paste karke
   **Run** dabao. (School ki asal jankari + sample data bhar jayega.)

### Step 2: Admin user banao
1. Supabase Dashboard → **Authentication** → **Users** → **Add user**.
2. Apna email + ek strong password do, **"Auto Confirm User"** ON rakho,
   Create dabao.
3. Yahi email/password website ke `/admin/login` par chalega.
   **Password kisi ke saath share mat karna.**

### Step 3: Keys (API credentials) lo
- Supabase Dashboard → **Project Settings → API** se:
  - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
  - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (ye secret hai —
    sirf server par use hoti hai, kabhi public mat karna)
- Cloudinary Console → **Settings → API Keys** (ya Dashboard) se:
  - Cloud Name → `CLOUDINARY_CLOUD_NAME`
  - API Key → `CLOUDINARY_API_KEY`
  - API Secret → `CLOUDINARY_API_SECRET`

### Step 4: Local me chalana ho to
```bash
cp .env.example .env.local   # upar wali keys isme bharo
npm install
npm run dev                  # http://localhost:3000
```

### Step 5: Vercel par deploy
1. Code GitHub par push karo (repo: pimatrix).
2. Vercel → **Add New → Project** → repo import karo.
3. **Environment Variables** me upar ki 6 values add karo
   (`.env.example` me list hai).
4. **Deploy** dabao. Live link mil jayega.
5. Env vars baad me badlo to **Redeploy** karna padta hai.

---

## Roz ka istemal (Admin Panel)

Website par **`/admin/login`** kholo → login karo. Wahan se:

| Section | Kya hota hai |
|---|---|
| Site Settings | School naam, logo, tagline, phone/email, address, **Map**, social links, hero stats |
| Hero Slides | Homepage ka bada banner (photo + heading + button) |
| Notices | Notice board + upar chalne wali ticker patti |
| News | Khabrein / stories |
| Events | Aane wale karyakram |
| Gallery | Photos (category wise) |
| Teachers | Staff list with photo |
| Facilities | School ki suvidhayein |
| Page Content | About / Academics / Admissions ka text |
| Enquiries | Contact form se aaye messages (sirf admin dekh sakta hai) |

Jo bhi yahan save hoga, website par **turant live** dikhega.

---

## Security (pura secure kaise hai)

- **Database rules (RLS):** Bahar wala visitor sirf *published* content
  **padh** sakta hai. Kuch bhi **add/edit/delete** sirf login kiye hue
  admin se hota hai — ye rule database ke andar hai, browser ke andar
  nahi, isliye bypass nahi hota.
- **Enquiries** (contact form ke messages) visitor sirf *bhej* sakta hai,
  *padh* sirf admin sakta hai.
- **Image upload** wali API bhi pehle login check karti hai; Cloudinary
  ki secret keys sirf server par rehti hain.
- **Admin pages** middleware se protected hain — bina login ke
  `/admin` khulta hi nahi.
- Keys hamesha **environment variables** me — code me kabhi nahi.
- Website par security headers (X-Frame-Options, nosniff, etc.) lage hain.

---

## School ki jankari (seed data)

Seed data me **Govt School of Excellence Bal Vinay Mandir,
7, Nehru Park Road, Vallabh Nagar, Indore (452003)** ki verified
jankari bhari hai — MP Board, Classes 1–12, English medium,
Dept. of Education MP (sources: MP govt school lists — UDISE
23260104013; NITI Aayog AIM list; Dainik Bhaskar/Amar Ujala/TOI
reports). Official email: excellencebalvinaymandir@gmail.com.

⚠ Dhyaan dein: Indore me "Bal Vinay Mandir" naam ke kai school
hain — Chhatribagh wala (private trust, CBSE) is school se
alag hai, uska data yahan use NAHI hua hai.

⚠ Kuch cheezein **placeholder** rakhi hain kyunki wo publicly verify
nahi ho payi — admin panel se sahi karein:
- Phone (khaali rakha hai — guess number nahi lagaya)
- Students / Faculty count, Established year
- Teachers list me sample entries (asal staff se replace karein)
- Gallery me starter stock photos (asal school photos daalein)
