<!-- # 🔥 วิธี Setup Firebase สำหรับระบบโหวต

ระบบโหวตของพรรคก้าวใกล้ใช้ Firestore + Anonymous Auth
- 1 user 1 vote 
- ไม่มี latency รู้สึกได้ (Optimistic UI)
- Real-time sync ทุก device
- ฟรี 100% สำหรับการใช้งานในระดับโรงเรียน

---

## 📋 ขั้นตอนการ Setup (ใช้เวลา ~5 นาที)

### 1. สร้างโปรเจค Firebase

1. ไปที่ https://console.firebase.google.com/
2. คลิก **"Add project"** (เพิ่มโครงการ)
3. ตั้งชื่อโปรเจค เช่น `kaoklai-party-vote`
4. ไม่ต้องเปิด Google Analytics ก็ได้ → คลิก **Create project**

### 2. เปิดใช้งาน Firestore Database

1. เมนูซ้าย → **Build** → **Firestore Database**
2. คลิก **Create database**
3. เลือก **Start in production mode** (โหมดปลอดภัย)
4. เลือก location ใกล้ที่สุด เช่น `asia-southeast1` (Singapore)
5. คลิก **Enable**

### 3. ตั้งค่า Security Rules

1. ในหน้า Firestore → แท็บ **Rules**
2. แทนที่ rules ด้วยโค้ดด้านล่างนี้:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // เอกสารยอดรวมโหวต — ใครก็อ่านได้, เขียนได้เฉพาะผ่าน transaction ที่สร้าง voter doc พร้อมกัน
    match /votes/{voteId} {
      allow read: if true;
      allow write: if request.auth != null;

      // Sub-collection: เก็บ 1 record ต่อ 1 user
      match /voters/{userId} {
        // อ่านได้เฉพาะ doc ของตัวเอง
        allow read: if request.auth != null && request.auth.uid == userId;
        // สร้างได้ครั้งเดียว และต้องตรงกับ uid ของตัวเอง
        allow create: if request.auth != null
                      && request.auth.uid == userId
                      && !exists(/databases/$(database)/documents/votes/$(voteId)/voters/$(userId));
        // ห้ามแก้ไข/ลบ
        allow update, delete: if false;
      }
    }
  }
}
```

3. คลิก **Publish**

### 4. เปิดใช้งาน Anonymous Authentication

1. เมนูซ้าย → **Build** → **Authentication**
2. คลิก **Get started**
3. แท็บ **Sign-in method** → คลิก **Anonymous**
4. เปิด toggle **Enable** → **Save**

### 5. คัดลอก Firebase Config มาใส่ในเว็บ

1. ในหน้า Project Overview → คลิกไอคอน **⚙️** (Settings) → **Project settings**
2. เลื่อนลงไปที่ส่วน **Your apps** → คลิกไอคอน **`</>`** (Web)
3. ตั้ง nickname เช่น `kaoklai-web` → **Register app**
4. คัดลอกค่า `firebaseConfig` ที่ Firebase ให้มา เช่น:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy....",
  authDomain: "kaoklai-party-vote.firebaseapp.com",
  projectId: "kaoklai-party-vote",
  storageBucket: "kaoklai-party-vote.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef..."
};
```

5. เปิดไฟล์ `src/firebase.js` ในโปรเจค → แทนที่ค่า `firebaseConfig` ด้วยค่าของคุณ
6. เซฟไฟล์ → รัน `npm run dev` → ระบบโหวตพร้อมใช้งาน! 🎉

---

## 🔍 ตรวจสอบว่าใช้งานได้

1. เปิดเว็บ → เลื่อนไปที่ section **"โหวต"**
2. ลองคลิก **ใช่** หรือ **ไม่** → หลอด progress bar ควรอัพเดททันที (ไม่มี delay)
3. รีเฟรชเว็บ → ควรเห็นปุ่มถูก disabled (ป้องกันโหวตซ้ำ)
4. เปิด **Firebase Console → Firestore** → ควรเห็น collection `votes` ที่มี document `main-vote` และ sub-collection `voters`

---

## ⚙️ การปรับแต่ง

### เปลี่ยนคำถาม
แก้ไขใน `src/components/VoteSection.jsx` บรรทัด:
```javascript
const QUESTION = 'คุณสนับสนุนพรรคก้าวใกล้หรือไม่?';
```

### รีเซ็ตคะแนนโหวต / สร้างคำถามใหม่
2 วิธี:
1. **ลบ collection `votes` ใน Firebase Console** → คะแนนรีเซ็ตเป็น 0 และทุกคนโหวตใหม่ได้
2. **เปลี่ยน `VOTE_DOC_ID`** ใน `VoteSection.jsx`:
```javascript
const VOTE_DOC_ID = 'main-vote'; // เปลี่ยนเป็น 'vote-2025-q2' หรือชื่ออื่น
```
วิธีนี้จะเก็บข้อมูลเก่าไว้และเริ่มคำถามใหม่

### ดูรายงานคะแนน
ไปที่ **Firebase Console → Firestore → votes/main-vote** จะเห็น `yes` และ `no` count แบบ real-time

---

## 💰 ค่าใช้จ่าย

Firestore Free Tier (Spark Plan):
- 50,000 reads/day
- 20,000 writes/day
- 1 GiB storage

สำหรับโรงเรียนขนาด 1,000-3,000 คน → **ฟรีแน่นอน** ไม่มีทางเกิน quota

---

## 🔒 ความปลอดภัย

- ✅ Anonymous Auth สร้าง unique UID ต่อ device/browser
- ✅ Security Rules บังคับให้ 1 UID เขียน voters/{uid} ได้ครั้งเดียว
- ✅ Transaction รับประกันว่า count ไม่เพี้ยนแม้คนกดพร้อมกันเยอะ
- ⚠️ ถ้า user ลบ browser data หรือเปิด incognito จะได้ UID ใหม่ → โหวตซ้ำได้
  - ถ้าต้องการความเข้มกว่านี้: เพิ่ม Phone/Email Auth (ต้องล็อกอิน) -->
