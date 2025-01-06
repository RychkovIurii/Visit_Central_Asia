const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Tour = require('../models/Tour');

dotenv.config();

// MongoDB connection
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB Connected...');
	} catch (error) {
		console.error('Error connecting to MongoDB:', error.message);
		process.exit(1);
	}
};

// Sample data
const seedAdmins = async () => {
	const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

	const admins = [
		{ name: 'Iurii Rychkov', email: 'admin@admin.com', password: hashedPassword, role: 'admin' },
		{ name: 'Second Admin', email: 'secondadmin@admin.com', password: hashedPassword, role: 'admin' },
	];
	await Admin.insertMany(admins);
	console.log('Admin data seeded.');
};

const seedUsers = async () => {
	const hashedPassword = await bcrypt.hash(process.env.USER_PASSWORD, 10);

	const users = [
		{ name: 'First User', email: 'first@user.com', password: hashedPassword, role: 'user' },
		{ name: 'Second User', email: 'second@user.com', password: hashedPassword, role: 'user' },
	];
	await User.insertMany(users);
	console.log('User data seeded.');
};

const seedTours = async () => {
	const tours = [
		{
			translations: {
                en: {
                    name: "Almaty Adventure",
					locationName: 'Almaty, Kazakhstan',
                    description: "Explore the beautiful city of Almaty with a guided tour."
                },
                it: {
                    name: "Avventura ad Almaty",
					locationName: 'Almaty, Kazakistan',
                    description: "Esplora la bellissima città di Almaty con un tour guidato."
                },
                fi: {
                    name: "Almaty-seikkailu",
					locationName: 'Almaty, Kazakstan',
                    description: "Tutustu kauniiseen Almatyn kaupunkiin opastetulla kierroksella."
                },
                ru: {
                    name: "Приключение в Алматы",
					locationName: 'Алматы, Казахстан',
                    description: "Исследуйте прекрасный город Алматы с гидом."
                },
			},
			locationId: 'LOC001',
			price: 150,
			startDate: new Date('2025-07-15'),
			endDate: new Date('2025-07-20'),
			availableSpots: 20,
			images: ['/tours/almaty1.jpg', '/tours/almaty2.jpg'],
		},
        {
            translations: {
                en: {
                    name: "Ala-Kul Lake Trek",
                    locationName: "Ala-Kul Lake, Kyrgyzstan",
                    description: "Embark on a journey to Ala-Kul Lake, a hidden gem of Kyrgyzstan, surrounded by pristine landscapes."
                },
                it: {
                    name: "Trekking al Lago Ala-Kul",
                    locationName: "Lago Ala-Kul, Kirghizistan",
                    description: "Intraprendi un viaggio al Lago Ala-Kul, una gemma nascosta del Kirghizistan, circondata da paesaggi incontaminati."
                },
                fi: {
                    name: "Ala-Kul-järven vaellus",
                    locationName: "Ala-Kul-järvi, Kirgisia",
                    description: "Lähde matkalle Ala-Kul-järvelle, Kirgisian piilotettuun helmeen, vuorten ympäröimänä."
                },
                ru: {
                    name: "Поход к озеру Ала-Куль",
                    locationName: "Озеро Ала-Куль, Кыргызстан",
                    description: "Отправьтесь в путешествие к озеру Ала-Куль, скрытой жемчужине Кыргызстана."
                }
            },
            locationId: "LOC002",
            price: 200,
            startDate: new Date("2025-08-01"),
            endDate: new Date("2025-08-07"),
            availableSpots: 15,
            images: ["/tours/ala-kul1.jpg", "/tours/ala-kul2.jpg"]
        },
        {
            translations: {
                en: {
                    name: "Silk Road Exploration",
                    locationName: "Silk Road: Kyrgyzstan, Kazakhstan, Uzbekistan",
                    description: "Travel along the historic Silk Road, exploring the cities of Bishkek, Almaty, Tashkent, and Samarkand."
                },
                it: {
                    name: "Esplorazione della Via della Seta",
                    locationName: "Via della Seta: Kirghizistan, Kazakistan, Uzbekistan",
                    description: "Viaggia lungo la storica Via della Seta esplorando Bishkek, Almaty, Tashkent e Samarcanda."
                },
                fi: {
                    name: "Silkkitien tutkimusmatka",
                    locationName: "Silkkitie: Kirgisia, Kazakstan, Uzbekistan",
                    description: "Matkusta historiallisen Silkkitien varrella tutkien Bishkekiä, Almatya, Tashkentiä ja Samarkandia."
                },
                ru: {
                    name: "Исследование Шелкового пути",
                    locationName: "Шелковый путь: Кыргызстан, Казахстан, Узбекистан",
                    description: "Путешествуйте по Шелковому пути, исследуя Бишкек, Алматы, Ташкент и Самарканд."
                }
            },
            locationId: "LOC003",
            price: 300,
            startDate: new Date("2025-09-10"),
            endDate: new Date("2025-09-25"),
            availableSpots: 10,
            images: ["/tours/silk-road-exploration1", "/tours/silk-road-exploration2"]
        },
        {
            translations: {
                en: {
                    name: "Grigorievskoe Gorge Adventure",
                    locationName: "Grigorievskoe Gorge, Kyrgyzstan",
                    description: "Enjoy breathtaking views of lush meadows and mountain rivers at Grigorievskoe Gorge."
                },
                it: {
                    name: "Avventura nella Gola di Grigorievskoe",
                    locationName: "Gola di Grigorievskoe, Kirghizistan",
                    description: "Goditi viste mozzafiato di prati rigogliosi e fiumi di montagna nella Gola di Grigorievskoe."
                },
                fi: {
                    name: "Grigorievskoen rotkon seikkailu",
                    locationName: "Grigorievskoen rotko, Kirgisia",
                    description: "Nauti upeista niittyjen ja vuoristojokien maisemista Grigorievskoen rotkossa."
                },
                ru: {
                    name: "Приключение в Григорьевском ущелье",
                    locationName: "Григорьевское ущелье, Кыргызстан",
                    description: "Наслаждайтесь захватывающими видами зелёных лугов и горных рек."
                }
            },
            locationId: "LOC004",
            price: 120,
            startDate: new Date("2025-06-20"),
            endDate: new Date("2025-06-25"),
            availableSpots: 20,
            images: ["/tours/grigoriev1.jpg", "/tours/grigoriev2.jpg"]
        },
		{
            translations: {
                en: {
                    name: "World Nomad Games 2025",
                    locationName: "Kazakhstan",
                    description: "Celebrate the vibrant traditions of the nomadic peoples at the World Nomad Games. Witness thrilling competitions like kok-boru and immerse yourself in nomadic music and crafts."
                },
                it: {
                    name: "Giochi Mondiali dei Nomadi 2025",
                    locationName: "Kazakistan",
                    description: "Celebra le vibranti tradizioni dei popoli nomadi ai Giochi Mondiali dei Nomadi. Assisti a competizioni emozionanti come il kok-boru e immergiti nella musica e nei mestieri nomadi."
                },
                fi: {
                    name: "Nomadien maailmanpelit 2025",
                    locationName: "Kazakstan",
                    description: "Juhlista nomadikansojen eläväisiä perinteitä Nomadien maailmanpeleissä. Koe kok-boru-kilpailujen jännitys ja uppoudu nomadien musiikkiin ja käsitöihin."
                },
                ru: {
                    name: "Игры кочевников 2025",
                    locationName: "Казахстан",
                    description: "Отпразднуйте яркие традиции кочевых народов на Играх Кочевников. Станьте свидетелем захватывающих соревнований, таких как кок-бору, и насладитесь музыкой и ремеслами кочевников."
                }
            },
            locationId: "LOC005",
            price: 250,
            startDate: new Date("2025-09-08"),
            endDate: new Date("2025-09-14"),
            availableSpots: 30,
            images: ["/tours/nomadgames1.jpg", "/tours/nomadgames2.jpg"]
        },
		{
            translations: {
                en: {
                    name: "Furmanov Peak Hike",
                    locationName: "Furmanov Peak, Kazakhstan",
                    description: "Embark on a hike to Furmanov Peak for panoramic views of the Tien Shan mountains. A perfect experience for novice and experienced climbers alike."
                },
                it: {
                    name: "Escursione al Picco Furmanov",
                    locationName: "Picco Furmanov, Kazakistan",
                    description: "Parti per un'escursione al Picco Furmanov per viste panoramiche delle montagne del Tien Shan. Un'esperienza perfetta sia per principianti che per alpinisti esperti."
                },
                fi: {
                    name: "Furmanovin huipun vaellus",
                    locationName: "Furmanovin huippu, Kazakstan",
                    description: "Lähde vaellukselle Furmanovin huipulle, josta avautuvat panoraamanäkymät Tien Shan -vuorille. Täydellinen kokemus niin aloittelijoille kuin kokeneille kiipeilijöille."
                },
                ru: {
                    name: "Поход на пик Фурманова",
                    locationName: "Пик Фурманова, Казахстан",
                    description: "Отправьтесь в поход на пик Фурманова для панорамных видов на горы Тянь-Шань. Идеальный опыт как для новичков, так и для опытных альпинистов."
                }
            },
            locationId: "LOC007",
            price: 100,
            startDate: new Date("2025-06-15"),
            endDate: new Date("2025-06-18"),
            availableSpots: 25,
            images: ["/tours/furmanov1.jpg", "/tours/furmanov2.jpg"]
        },
        {
            translations: {
                en: {
                    name: "Kolsay Lakes Escape",
                    locationName: "Kolsay Lakes, Kazakhstan",
                    description: "Discover the beauty of the Kolsay Lakes with hiking, horseback riding, and overnight camping. Enjoy crystal-clear waters and breathtaking woodland scenery."
                },
                it: {
                    name: "Fuga ai Laghi di Kolsay",
                    locationName: "Laghi di Kolsay, Kazakistan",
                    description: "Scopri la bellezza dei Laghi di Kolsay con escursioni, passeggiate a cavallo e campeggio notturno. Goditi le acque cristalline e i paesaggi boscosi mozzafiato."
                },
                fi: {
                    name: "Kolsay-järvien retki",
                    locationName: "Kolsay-järvet, Kazakstan",
                    description: "Tutustu Kolsay-järvien kauneuteen patikoiden, ratsastaen ja yöpyen leirissä. Nauti kirkkaista vesistä ja upeista metsämaisemista."
                },
                ru: {
                    name: "Путешествие к озёрам Кольсай",
                    locationName: "Озёра Кольсай, Казахстан",
                    description: "Откройте для себя красоту озёр Кольсай с пешими прогулками, верховой ездой и ночёвкой в палатке. Наслаждайтесь кристально чистыми водами и живописными лесными пейзажами."
                }
            },
            locationId: "LOC008",
            price: 150,
            startDate: new Date("2025-08-05"),
            endDate: new Date("2025-08-10"),
            availableSpots: 20,
            images: ["/tours/kolsay1.jpg", "/tours/kolsay2.jpg"]
        },
		{
            translations: {
                en: {
                    name: "Historic Turkestan Tour",
                    locationName: "Turkestan, Kazakhstan",
                    description: "Explore the rich spiritual history of Turkestan, home to the stunning Mausoleum of Khoja Ahmed Yasawi and other ancient architectural marvels."
                },
                it: {
                    name: "Tour Storico di Turkestan",
                    locationName: "Turkestan, Kazakistan",
                    description: "Esplora la ricca storia spirituale di Turkestan, sede dello splendido Mausoleo di Khoja Ahmed Yasawi e di altre antiche meraviglie architettoniche."
                },
                fi: {
                    name: "Historiallinen Turkestan-kierros",
                    locationName: "Turkestan, Kazakstan",
                    description: "Tutustu Turkestanin rikkaaseen hengelliseen historiaan, jossa sijaitsee upea Khoja Ahmed Yasawin mausoleumi ja muut muinaiset arkkitehtoniset ihmeet."
                },
                ru: {
                    name: "Исторический тур по Туркестану",
                    locationName: "Туркестан, Казахстан",
                    description: "Исследуйте богатую духовную историю Туркестана, где находится великолепный мавзолей Ходжи Ахмеда Ясави и другие древние архитектурные чудеса."
                }
            },
            locationId: "LOC009",
            price: 200,
            startDate: new Date("2025-10-01"),
            endDate: new Date("2025-10-05"),
            availableSpots: 18,
            images: ["/tours/turkestan1.jpg", "/tours/turkestan2.jpg"]
        }
    ];
	await Tour.insertMany(tours);
	console.log('Tour data seeded.');
};

// Seed function
const seedDB = async () => {
	try {
		// Connect to DB
		await connectDB();

		// Clear existing data
		await Admin.deleteMany();
		await User.deleteMany();
		await Tour.deleteMany();
		console.log('Cleared existing data.');

		// Seed data
		await seedAdmins();
		await seedUsers();
		await seedTours();

		console.log('Database seeded successfully!');
		process.exit();
	} catch (error) {
		console.error('Error seeding database:', error.message);
		process.exit(1);
	}
};

seedDB();
