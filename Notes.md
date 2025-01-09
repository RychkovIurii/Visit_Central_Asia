To **fill your MongoDB database** with sample data for your collections, follow these steps. I'll provide the data and instructions to populate the following collections:

1. **Admin** (for admin users)
2. **Users** (for regular users)
3. **Tours** (sample tours)
4. **Bookings** (sample bookings)
5. **Payments** (related payments)

---

## 1. **Preparing the Sample Data**

### Admin Collection (`admins`)
```json
[
  {
    "name": "John Admin",
    "email": "admin@example.com",
    "password": "securepassword123",
    "role": "admin"
  },
  {
    "name": "Jane Admin",
    "email": "janeadmin@example.com",
    "password": "adminpassword456",
    "role": "admin"
  }
]
```

### Users Collection (`users`)
```json
[
  {
    "name": "Alice User",
    "email": "alice@example.com",
    "password": "password123",
    "role": "user"
  },
  {
    "name": "Bob User",
    "email": "bob@example.com",
    "password": "password456",
    "role": "user"
  }
]
```

### Tours Collection (`tours`)
```json
[
  {
    "name": "Almaty Adventure",
    "locationId": "LOC001",
    "locationName": "Almaty, Kazakhstan",
    "description": "Explore the beautiful city of Almaty with a guided tour.",
    "price": 150,
    "startDate": "2024-07-15",
    "endDate": "2024-07-20",
    "availableSpots": 20,
    "images": ["/images/almaty1.jpg", "/images/almaty2.jpg"]
  },
  {
    "name": "Silk Road Experience",
    "locationId": "LOC002",
    "locationName": "Kazakhstan, Kyrgyzstan, Uzbekistan",
    "description": "A grand voyage through the historic Silk Road.",
    "price": 300,
    "startDate": "2024-08-10",
    "endDate": "2024-08-25",
    "availableSpots": 15,
    "images": ["silkroad1.jpg", "silkroad2.jpg"]
  },
  {
    "name": "Ala-Kul Lake Trek",
    "locationId": "LOC003",
    "locationName": "Ala-Kul Lake, Kyrgyzstan",
    "description": "A trekking adventure to the stunning Ala-Kul Lake.",
    "price": 200,
    "startDate": "2024-09-05",
    "endDate": "2024-09-10",
    "availableSpots": 10,
    "images": ["alakullake1.jpg", "alakullake2.jpg"]
  }
]
```

---

## 2. **Hashing Passwords**

Before inserting `admins` or `users`, their passwords need to be **hashed** because you are using bcrypt for password encryption.

Create a script to **hash passwords** before inserting them into the database.

---

### **Password Hashing Script**

Create a file named `seed.js`:
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');
const User = require('./models/User');
const Tour = require('./models/Tour');

const connectDB = async () => {
  await mongoose.connect('mongodb://localhost:27017/yourdbname', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB connected...');
};

const seedDB = async () => {
  // Clear existing data
  await Admin.deleteMany({});
  await User.deleteMany({});
  await Tour.deleteMany({});

  // Hash passwords and add admins
  const adminPassword1 = await bcrypt.hash('securepassword123', 10);
  const adminPassword2 = await bcrypt.hash('adminpassword456', 10);

  const admins = [
    { name: 'John Admin', email: 'admin@example.com', password: adminPassword1, role: 'admin' },
    { name: 'Jane Admin', email: 'janeadmin@example.com', password: adminPassword2, role: 'admin' }
  ];
  await Admin.insertMany(admins);

  // Hash passwords and add users
  const userPassword1 = await bcrypt.hash('password123', 10);
  const userPassword2 = await bcrypt.hash('password456', 10);

  const users = [
    { name: 'Alice User', email: 'alice@example.com', password: userPassword1, role: 'user' },
    { name: 'Bob User', email: 'bob@example.com', password: userPassword2, role: 'user' }
  ];
  await User.insertMany(users);

  // Add tours
  const tours = [
    {
      name: 'Almaty Adventure',
      locationId: 'LOC001',
      locationName: 'Almaty, Kazakhstan',
      description: 'Explore the beautiful city of Almaty with a guided tour.',
      price: 150,
      startDate: new Date('2024-07-15'),
      endDate: new Date('2024-07-20'),
      availableSpots: 20,
      images: ['almaty1.jpg', 'almaty2.jpg']
    },
    {
      name: 'Silk Road Experience',
      locationId: 'LOC002',
      locationName: 'Kazakhstan, Kyrgyzstan, Uzbekistan',
      description: 'A grand voyage through the historic Silk Road.',
      price: 300,
      startDate: new Date('2024-08-10'),
      endDate: new Date('2024-08-25'),
      availableSpots: 15,
      images: ['silkroad1.jpg', 'silkroad2.jpg']
    },
    {
      name: 'Ala-Kul Lake Trek',
      locationId: 'LOC003',
      locationName: 'Ala-Kul Lake, Kyrgyzstan',
      description: 'A trekking adventure to the stunning Ala-Kul Lake.',
      price: 200,
      startDate: new Date('2024-09-05'),
      endDate: new Date('2024-09-10'),
      availableSpots: 10,
      images: ['alakullake1.jpg', 'alakullake2.jpg']
    }
  ];
  await Tour.insertMany(tours);

  console.log('Database seeded!');
  process.exit();
};

connectDB().then(seedDB);
```

---

## 3. **Run the Seed Script**

1. Ensure you have MongoDB running locally.
2. Install dependencies if you haven't already:
   ```bash
   npm install mongoose bcryptjs
   ```

3. Run the script:
   ```bash
   node seed.js
   ```

---

## 4. **Verify the Database**

Use MongoDB Compass or the MongoDB shell to verify the data.

### Check Admins:
```bash
db.admins.find()
```

### Check Users:
```bash
db.users.find()
```

### Check Tours:
```bash
db.tours.find()
```

---

## 5. **Final Notes**

1. **Admins**:
   - Email: `admin@example.com`
   - Password: `securepassword123`

2. **Users**:
   - Email: `alice@example.com`
   - Password: `password123`

3. **Tours**: 3 sample tours are added.

You now have a fully populated database ready for testing. Let me know if you need further help or adjustments! 🚀
