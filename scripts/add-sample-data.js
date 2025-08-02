const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyCwS7K2mmaDbz7IfIyFCPDvm1QsqwHrMts",
    authDomain: "test-aed56.firebaseapp.com",
    projectId: "test-aed56",
    storageBucket: "test-aed56.firebasestorage.app",
    messagingSenderId: "709660166259",
    appId: "1:709660166259:web:c88de899e96cd050dd8206",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sampleJobs = [
    {
        title: "Programmer Freelance",
        company: "Percetakan Angkasa",
        location: "Madiun",
        type: "freelance",
        description: "Butuh programmer untuk develop website company profile dan sistem inventory. Stack: PHP, MySQL, Bootstrap. Project timeline 2-3 bulan.",
        requirements: ["PHP", "MySQL", "Bootstrap", "JavaScript"],
        salary: {
            min: 5000000,
            max: 8000000,
            currency: "IDR"
        },
        contact: "08123456789",
        postedBy: "sample_user_1",
        postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: "active",
        applications: [],
        tags: ["web development", "php", "mysql", "bootstrap"],
        isRemote: true
    },
    {
        title: "Desainer Grafis",
        company: "Warung Kopi Santai",
        location: "Yogyakarta",
        type: "freelance",
        description: "Perlu desainer untuk bikin menu board, poster promosi, dan konten social media. Portfolio wajib! Pengalaman minimal 1 tahun.",
        requirements: ["Adobe Photoshop", "Adobe Illustrator", "Canva", "Social Media Design"],
        salary: {
            min: 3000000,
            max: 6000000,
            currency: "IDR"
        },
        contact: "08567890123",
        postedBy: "sample_user_2",
        postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        status: "active",
        applications: [],
        tags: ["graphic design", "social media", "adobe", "canva"],
        isRemote: false
    },
    {
        title: "Social Media Specialist",
        company: "Kedai Kopi Nusantara",
        location: "Jakarta Selatan",
        type: "part-time",
        description: "Handle Instagram & TikTok kedai kopi. Bikin konten kreatif, engage sama followers, analisis performa. Jam kerja fleksibel.",
        requirements: ["Instagram", "TikTok", "Content Creation", "Analytics"],
        salary: {
            min: 4000000,
            max: 7000000,
            currency: "IDR"
        },
        contact: "08765432109",
        postedBy: "sample_user_3",
        postedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        status: "active",
        applications: [],
        tags: ["social media", "content creation", "instagram", "tiktok"],
        isRemote: true
    },
    {
        title: "Web Developer Full Stack",
        company: "Startup Tech Indonesia",
        location: "Jakarta Pusat",
        type: "fulltime",
        description: "Bergabung dengan tim development startup fintech. Tech stack: React, Node.js, PostgreSQL. WFH 3x seminggu.",
        requirements: ["React", "Node.js", "PostgreSQL", "TypeScript", "Git"],
        salary: {
            min: 12000000,
            max: 20000000,
            currency: "IDR"
        },
        contact: "08111222333",
        postedBy: "sample_user_4",
        postedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        status: "active",
        applications: [],
        tags: ["react", "nodejs", "postgresql", "typescript", "fullstack"],
        isRemote: true
    },
    {
        title: "Content Writer",
        company: "Digital Agency Creative",
        location: "Bandung",
        type: "freelance",
        description: "Menulis konten untuk website, blog, dan social media. Topik: teknologi, bisnis, lifestyle. Native Indonesian speaker.",
        requirements: ["Content Writing", "SEO", "Copywriting", "Indonesian Language"],
        salary: {
            min: 2500000,
            max: 5000000,
            currency: "IDR"
        },
        contact: "08999888777",
        postedBy: "sample_user_5",
        postedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
        status: "active",
        applications: [],
        tags: ["content writing", "seo", "copywriting", "indonesian"],
        isRemote: true
    }
];

async function addSampleData() {
    try {
        console.log("Adding sample jobs to Firebase...");

        for (const job of sampleJobs) {
            const docRef = await addDoc(collection(db, "jobs"), job);
            console.log(`✅ Added job: ${job.title} (ID: ${docRef.id})`);
        }

        console.log("🎉 Sample data added successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error adding sample data:", error);
        process.exit(1);
    }
}

addSampleData(); 