// src/lib/store.js
// Global in-memory & persistent data store for KrishiHaat

export const initialMarketRates = [
  {
    id: "rate-1",
    crop: "নাজিরশাইল চাল",
    category: "ধান ও চাল",
    district: "ঢাকা",
    todayPrice: 78,
    yesterdayPrice: 75,
    unit: "টাকা/কেজি",
    trend: "up",
    lastUpdated: "আজ, সকাল ০৮:৩০",
  },
  {
    id: "rate-2",
    crop: "দেশি আলু",
    category: "সবজি",
    district: "বগুড়া",
    todayPrice: 42,
    yesterdayPrice: 45,
    unit: "টাকা/কেজি",
    trend: "down",
    lastUpdated: "আজ, সকাল ০৯:০০",
  },
  {
    id: "rate-3",
    crop: "দেশি পেঁয়াজ",
    category: "সবজি ও মশলা",
    district: "পাবনা",
    todayPrice: 110,
    yesterdayPrice: 110,
    unit: "টাকা/কেজি",
    trend: "same",
    lastUpdated: "আজ, সকাল ০৭:৪৫",
  },
  {
    id: "rate-4",
    crop: "আমরূপালী আম",
    category: "ফলমূল",
    district: "রাজশাহী",
    todayPrice: 3200,
    yesterdayPrice: 3500,
    unit: "টাকা/মণ",
    trend: "down",
    lastUpdated: "আজ, সকাল ১০:১৫",
  },
  {
    id: "rate-5",
    crop: "কাঁচা মরিচ",
    category: "সবজি ও মশলা",
    district: "রংপুর",
    todayPrice: 160,
    yesterdayPrice: 140,
    unit: "টাকা/কেজি",
    trend: "up",
    lastUpdated: "আজ, সকাল ০৮:১৫",
  },
  {
    id: "rate-6",
    crop: "মসুর ডাল (দেশি)",
    category: "ডাল ও তেলবীজ",
    district: "যশোর",
    todayPrice: 135,
    yesterdayPrice: 135,
    unit: "টাকা/কেজি",
    trend: "same",
    lastUpdated: "আজ, সকাল ০৯:৩০",
  },
  {
    id: "rate-7",
    crop: "গোল টমেটো",
    category: "সবজি",
    district: "দিনাজপুর",
    todayPrice: 65,
    yesterdayPrice: 70,
    unit: "টাকা/কেজি",
    trend: "down",
    lastUpdated: "আজ, সকাল ০৮:০০",
  },
  {
    id: "rate-8",
    crop: "সরিষার তেল (ঘানি ভাঙা)",
    category: "ডাল ও তেলবীজ",
    district: "সিলেট",
    todayPrice: 220,
    yesterdayPrice: 210,
    unit: "টাকা/লিটার",
    trend: "up",
    lastUpdated: "আজ, সকাল ১১:০০",
  },
];

export const initialProducts = [
  {
    id: "prod-101",
    title: "অর্গানিক নাজিরশাইল ধান ও চাল (ফরমালিন মুক্ত)",
    category: "ধান ও চাল",
    price: 3100,
    unit: "মণ",
    quantity: 150,
    minOrder: 5,
    district: "বগুড়া",
    upazila: "শেরপুর",
    harvestDate: "২০২৬-০৮-২৮",
    isFeatured: true,
    isOrganic: true,
    image:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80",
    description:
      "আমাদের নিজস্ব খেতের দেশি উর্বর মাটিতে চাষকৃত বিষমুক্ত নাজিরশাইল ধান। সরাসরি মিল থেকে ঝাড়াই করা প্রথম শ্রেণির চাল। পাইকারি দামে দেশের যেকোনো জেলায় ডেলিভারির সুবিধা।",
    farmer: {
      id: "f-1",
      name: "মোহাম্মদ রফিকুল ইসলাম",
      phone: "01711223344",
      district: "বগুড়া",
      upazila: "শেরপুর",
      rating: 4.9,
      experience: "১২ বছর",
      totalSales: "৪৮০ মণ",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      verified: true,
    },
  },
  {
    id: "prod-102",
    title: "তাজা লাল গোল আলু (সরাসরি খেত থেকে তোলা)",
    category: "সবজি",
    price: 38,
    unit: "কেজি",
    quantity: 1200,
    minOrder: 50,
    district: "দিনাজপুর",
    upazila: "বীরগঞ্জ",
    harvestDate: "২০২৬-০৮-৩০",
    isFeatured: true,
    isOrganic: false,
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    description:
      "দিনাজপুরের উর্বর লাল মাটির উন্নতমানের আলু। কোল্ড স্টোরেজ ছাড়াই সরাসরি খেত থেকে ফ্রেশ আলু সরবরাহ করা হচ্ছে। পাইকারি ক্রেতাদের জন্য বিশেষ ছাড় রয়েছে।",
    farmer: {
      id: "f-2",
      name: "হারুন অর রশিদ",
      phone: "01812345678",
      district: "দিনাজপুর",
      upazila: "বীরগঞ্জ",
      rating: 4.8,
      experience: "১৫ বছর",
      totalSales: "১,৫০০ কেজি",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      verified: true,
    },
  },
  {
    id: "prod-103",
    title: "রাজশাহীর মিষ্টি আমরূপালী ও হাঁড়িভাঙ্গা আম",
    category: "ফলমূল",
    price: 3400,
    unit: "মণ",
    quantity: 85,
    minOrder: 2,
    district: "রাজশাহী",
    upazila: "বাঘা",
    harvestDate: "২০২৬-০৮-২৫",
    isFeatured: true,
    isOrganic: true,
    image:
      "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80",
    description:
      "গাছ পাকা রাসায়নিক মুক্ত সুস্বাদু আমরূপালী ও হাঁড়িভাঙ্গা আম। সরাসরি বাগান থেকে সাবধানে ক্যারেটে প্যাক করে পাঠানো হয়।",
    farmer: {
      id: "f-3",
      name: "আব্দুল মজিদ বাগান মালিক",
      phone: "01999887766",
      district: "রাজশাহী",
      upazila: "বাঘা",
      rating: 5.0,
      experience: "২০ বছর",
      totalSales: "৩,২০০ মণ",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      verified: true,
    },
  },
  {
    id: "prod-104",
    title: "পাবনার ঝাঁঝালো দেশি পেঁয়াজ (শুকানো)",
    category: "সবজি ও মশলা",
    price: 105,
    unit: "কেজি",
    quantity: 800,
    minOrder: 20,
    district: "পাবনা",
    upazila: "সাথিয়া",
    harvestDate: "২০২৬-০৮-২০",
    isFeatured: false,
    isOrganic: false,
    image:
      "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80",
    description:
      "ভালোভাবে শুকানো ও দীর্ঘস্থায়ী সংরক্ষণের উপযোগী পাবনার আসল দেশি পেঁয়াজ। কন্দ বড় ও ঝাঁঝ বেশি।",
    farmer: {
      id: "f-4",
      name: "সেলিম শেখ",
      phone: "01755443322",
      district: "পাবনা",
      upazila: "সাথিয়া",
      rating: 4.7,
      experience: "৮ বছর",
      totalSales: "৯৫০ কেজি",
      avatar:
        "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
      verified: true,
    },
  },
  {
    id: "prod-105",
    title: "রংপুরের তাজা ঝাল কাঁচা মরিচ",
    category: "সবজি ও মশলা",
    price: 150,
    unit: "কেজি",
    quantity: 350,
    minOrder: 10,
    district: "রংপুর",
    upazila: "মিঠাপুকুর",
    harvestDate: "২০২৬-০৯-০১",
    isFeatured: false,
    isOrganic: true,
    image:
      "https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&w=800&q=80",
    description:
      "প্রতিদিন সকালে খেত থেকে তোলা তাজা কাঁচা মরিচ। যেকোনো সবিজ বা মশলা পাইকারির জন্য পারফেক্ট।",
    farmer: {
      id: "f-5",
      name: "জাহাঙ্গীর আলম",
      phone: "01300112233",
      district: "রংপুর",
      upazila: "মিঠাপুকুর",
      rating: 4.6,
      experience: "১০ বছর",
      totalSales: "৬০০ কেজি",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      verified: false,
    },
  },
  {
    id: "prod-106",
    title: "খুলনার খাঁটি সরিষার বীজ ও কোল্ড প্রেসড তেল",
    category: "ডাল ও তেলবীজ",
    price: 210,
    unit: "লিটার",
    quantity: 250,
    minOrder: 5,
    district: "খুলনা",
    upazila: "ডুমুরিয়া",
    harvestDate: "২০২৬-০৮-১৫",
    isFeatured: true,
    isOrganic: true,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80",
    description:
      "কাঠের ঘানিতে ভাঙানো খাঁটি হলুদ সরিষার তেল। রাসায়নিক বা মিশ্রণমুক্ত একদম প্রাকৃতিক সুবাস।",
    farmer: {
      id: "f-6",
      name: "গোলাম মোস্তফা",
      phone: "01688776655",
      district: "খুলনা",
      upazila: "ডুমুরিয়া",
      rating: 4.9,
      experience: "১৮ বছর",
      totalSales: "১,২০০ লিটার",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
      verified: true,
    },
  },
];

export const initialServices = [
  {
    id: "srv-1",
    name: "মোঃ আক্তার হোসেন",
    category: "পাওয়ার টিলার ও ট্রাক্টর মেকানিক",
    district: "বগুড়া",
    upazila: "শেরপুর",
    experience: "১০ বছর",
    phone: "01711998877",
    rate: "৫০০ টাকা/ভিজিট",
    rating: 4.9,
    reviewsCount: 34,
    status: "available",
    skills: [
      "ডিজেল ইঞ্জিন মেরামত",
      "হাইড্রোলিক পাম্প",
      "গিয়ারবক্স টিউনিং",
      "জরুরি সার্ভিস",
    ],
    avatar:
      "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80",
    bio: "বগুড়া ও আশপাশের উপজেলার সমস্ত ব্রান্ডের পাওয়ার টিলার, কুবোটা ও ইয়ানমার ট্রাক্টরের দ্রুত নির্ভরযোগ্য মেরামত করি।",
  },
  {
    id: "srv-2",
    name: "সাইফুল ইসলাম খেত পরিবহন",
    category: "কৃষি শস্য পরিবহন ট্রাক/পিকআপ",
    district: "ঢাকা",
    upazila: "ধামরাই",
    experience: "৭ বছর",
    phone: "01822334455",
    rate: "১,৫০০ টাকা/ট্রিপ থেকে শুরু",
    rating: 4.8,
    reviewsCount: 52,
    status: "available",
    skills: [
      "৩ টন পিকআপ",
      "খোলা বডি ট্রাক",
      "উত্তরবঙ্গ টু ঢাকা রুট",
      "২৪/৭ সার্ভিস",
    ],
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80",
    bio: "কৃষকের ফসল খেত থেকে সরাসরি ঢাকা বা পাইকারি কারওয়ান বাজারে নিরাপদে পৌঁছাতে আমাদের পিকআপ সার্ভিস প্রস্তুত।",
  },
  {
    id: "srv-3",
    name: "জসিম উদ্দিন ইলেকট্রিশিয়ান",
    category: "সেচ পাম্প ও মোটর্স টেকনিশিয়ান",
    district: "রংপুর",
    upazila: "মিঠাপুকুর",
    experience: "১২ বছর",
    phone: "01911445566",
    rate: "৪০০ টাকা/কাজ",
    rating: 5.0,
    reviewsCount: 41,
    status: "available",
    skills: [
      "সাবমার্সিবল পাম্প repair",
      "৩-ফেজ স্টার্টার প্যানেল",
      "কয়েল রিউন্ডিং",
      "সোলার সেচ পাম্প",
    ],
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    bio: "গভীর ও অগভীর সেচ পাম্পের যেকোনো বৈদ্যুতিক ত্রুটি বা মোটরের সমস্যা তাৎক্ষণিক মাঠে গিয়ে সমাধান করি।",
  },
  {
    id: "srv-4",
    name: "কাইয়ুম অপারেটর",
    category: "কম্বাইন হারভেস্টার অপারেটর",
    district: "দিনাজপুর",
    upazila: "ফুলবাড়ী",
    experience: "৬ বছর",
    phone: "01344556677",
    rate: "২,০০০ টাকা/একর",
    rating: 4.7,
    reviewsCount: 29,
    status: "busy",
    skills: ["ধান ও গম মাড়াই", "দ্রুত কাটাই", "ক্ষতি কমানো মাড়াই"],
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80",
    bio: "আধুনিক কুবোটা হারভেস্টার দিয়ে কম সময়ে বেশি খেতের ফসল কাটা ও মাড়াইয়ের কাজ করে থাকি।",
  },
];

export const initialUsers = [
  {
    id: "user-farmer",
    name: "মোহাম্মদ রফিকুল ইসলাম",
    email: "rafiqul@krishihaat.com",
    phone: "01711223344",
    role: "farmer",
    district: "বগুড়া",
    upazila: "শেরপুর",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    nidVerified: true,
    totalProducts: 4,
    totalSold: "১,২৮০,০০০ টাকা",
  },
  {
    id: "user-admin",
    name: "কৃষিহাট এডমিন কন্ট্রোল",
    email: "admin@krishihaat.com",
    phone: "01700000000",
    role: "admin",
    district: "ঢাকা",
    upazila: "ধানমন্ডি",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    nidVerified: true,
    totalProducts: 0,
    totalSold: "০ টাকা",
  },
];

// Helper memory state
let marketRates = [...initialMarketRates];
let products = [...initialProducts];
let services = [...initialServices];
let currentUser = initialUsers[0]; // default logged in as Farmer

export const getStore = () => ({
  marketRates,
  products,
  services,
  currentUser,
});

export const updateRates = (newRates) => {
  marketRates = newRates;
  return marketRates;
};

export const addRate = (rateData) => {
  const newRate = {
    id: `rate-${Date.now()}`,
    lastUpdated: "আজ, এখনই",
    trend:
      Number(rateData.todayPrice) > Number(rateData.yesterdayPrice)
        ? "up"
        : Number(rateData.todayPrice) < Number(rateData.yesterdayPrice)
          ? "down"
          : "same",
    ...rateData,
  };
  marketRates = [newRate, ...marketRates];
  return newRate;
};

export const addProduct = (productData) => {
  const newProd = {
    id: `prod-${Date.now()}`,
    isFeatured: false,
    isOrganic: productData.isOrganic || false,
    harvestDate: new Date().toISOString().split("T")[0],
    farmer: {
      id: currentUser.id,
      name: currentUser.name,
      phone: currentUser.phone,
      district: currentUser.district,
      upazila: currentUser.upazila,
      rating: 5.0,
      experience: "নতুন নিবন্ধিত",
      totalSales: "০ মণ",
      avatar: currentUser.avatar,
      verified: currentUser.nidVerified,
    },
    ...productData,
  };
  products = [newProd, ...products];
  return newProd;
};

export const deleteProduct = (id) => {
  products = products.filter((p) => p.id !== id);
  return products;
};

export const setCurrentUser = (user) => {
  currentUser = user;
  return currentUser;
};
