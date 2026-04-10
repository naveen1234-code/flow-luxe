export type ProductCategory =
  | "Fashion"
  | "Tech"
  | "Beauty"
  | "Home"
  | "Fitness"
  | "Lifestyle";

export type Product = {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  image: string;
  inStock: boolean;
  createdAt: string;
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  shortDescription: string;
  description: string;
  badge?: string;
};

export const productCategories = [
  "All",
  "Fashion",
  "Tech",
  "Beauty",
  "Home",
  "Fitness",
  "Lifestyle",
] as const;

export const products: Product[] = [
  {
    id: 1,
    name: "Minimal White Sneakers",
    category: "Fashion",
    price: 12500,
    originalPrice: 14900,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-20",
    trending: true,
    featured: true,
    shortDescription: "Clean everyday sneakers with premium comfort.",
    description:
      "Minimal White Sneakers are designed for everyday wear with a clean silhouette, soft interior comfort, and a lightweight sole that fits both casual and smart-casual styling.",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Premium Smart Watch",
    category: "Tech",
    price: 24900,
    originalPrice: 28900,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-28",
    trending: true,
    featured: true,
    newArrival: true,
    shortDescription: "Smart tracking with premium modern styling.",
    description:
      "Premium Smart Watch combines elegant design with everyday smart features including activity tracking, notification sync, and a bright easy-to-read display.",
    badge: "New",
  },
  {
    id: 3,
    name: "Luxury Skin Set",
    category: "Beauty",
    price: 8900,
    originalPrice: 10200,
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
    createdAt: "2026-03-15",
    trending: true,
    shortDescription: "Daily skincare essentials in one premium set.",
    description:
      "Luxury Skin Set includes a balanced routine of cleanser, hydration, and skin-prep essentials designed for a polished daily beauty ritual.",
    badge: "Trending",
  },
  {
    id: 4,
    name: "Modern Desk Lamp",
    category: "Home",
    price: 6500,
    originalPrice: 7900,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-30",
    featured: true,
    newArrival: true,
    shortDescription: "Minimal lighting piece for modern desks.",
    description:
      "Modern Desk Lamp features a sleek form, warm light tone, and clean footprint that suits workspaces, reading corners, and minimalist home setups.",
    badge: "New",
  },
  {
    id: 5,
    name: "Wireless Headphones",
    category: "Tech",
    price: 18900,
    originalPrice: 21900,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-10",
    trending: true,
    shortDescription: "Immersive sound with clean wireless freedom.",
    description:
      "Wireless Headphones are built for deep listening, comfortable long sessions, and everyday portability with a modern premium look.",
    badge: "Popular",
  },
  {
    id: 6,
    name: "Neutral Hoodie",
    category: "Fashion",
    price: 7800,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
    createdAt: "2026-03-22",
    shortDescription: "Relaxed hoodie with soft everyday feel.",
    description:
      "Neutral Hoodie is designed with a clean oversized profile, soft fabric feel, and versatile styling for daily wear.",
  },
  {
    id: 7,
    name: "Ceramic Mug Set",
    category: "Lifestyle",
    price: 4200,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-05",
    shortDescription: "Elegant mug pair for cozy daily use.",
    description:
      "Ceramic Mug Set adds a warm refined touch to coffee, tea, or kitchen display with a clean modern finish.",
  },
  {
    id: 8,
    name: "Yoga Mat Pro",
    category: "Fitness",
    price: 5900,
    originalPrice: 6900,
    image:
      "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-26",
    newArrival: true,
    shortDescription: "Comfortable grip and support for workouts.",
    description:
      "Yoga Mat Pro offers stable grip, durable cushioning, and a clean premium finish ideal for stretching, yoga, and floor training.",
    badge: "New",
  },
  {
    id: 9,
    name: "Classic Black T-Shirt",
    category: "Fashion",
    price: 3200,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-02-19",
    shortDescription: "Essential tee with timeless fit.",
    description:
      "Classic Black T-Shirt delivers a clean wardrobe staple with a versatile silhouette that pairs well with everyday looks.",
  },
  {
    id: 10,
    name: "Denim Jacket",
    category: "Fashion",
    price: 9600,
    originalPrice: 11500,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-12",
    trending: true,
    shortDescription: "Layered streetwear classic with clean structure.",
    description:
      "Denim Jacket features a versatile modern cut and durable style that works across casual and layered outfits.",
    badge: "Trending",
  },
  {
    id: 11,
    name: "Cargo Joggers",
    category: "Fashion",
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1506629905607-0e5c0f2d0b1f?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-02",
    shortDescription: "Functional comfort with urban styling.",
    description:
      "Cargo Joggers blend comfort and utility with soft wearability, clean tapering, and an easy everyday look.",
  },
  {
    id: 12,
    name: "Oversized Sweatshirt",
    category: "Fashion",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
    createdAt: "2026-03-24",
    newArrival: true,
    shortDescription: "Soft oversized fit with relaxed premium feel.",
    description:
      "Oversized Sweatshirt is built for a laid-back look with roomy comfort and minimalist styling.",
  },
  {
    id: 13,
    name: "Running Shorts",
    category: "Fashion",
    price: 2900,
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-02-27",
    shortDescription: "Lightweight and active-ready comfort.",
    description:
      "Running Shorts are designed for easy movement, breathable daily workouts, and all-round casual sports use.",
  },
  {
    id: 14,
    name: "Leather Wallet",
    category: "Fashion",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-02-20",
    shortDescription: "Compact premium wallet with timeless finish.",
    description:
      "Leather Wallet offers a slim organized carry with a refined exterior that suits both casual and formal use.",
  },
  {
    id: 15,
    name: "Canvas Backpack",
    category: "Fashion",
    price: 8200,
    originalPrice: 9500,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-18",
    featured: true,
    shortDescription: "Clean backpack for work, study, and daily carry.",
    description:
      "Canvas Backpack balances utility and style with spacious storage, durable build quality, and a modern shape.",
    badge: "Featured",
  },
  {
    id: 16,
    name: "Bluetooth Speaker",
    category: "Tech",
    price: 11400,
    image:
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-07",
    shortDescription: "Portable premium sound for any room.",
    description:
      "Bluetooth Speaker delivers strong wireless audio, clean visual design, and simple everyday portability.",
  },
  {
    id: 17,
    name: "Gaming Mouse",
    category: "Tech",
    price: 7600,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-14",
    shortDescription: "Fast and precise control for desk setups.",
    description:
      "Gaming Mouse combines responsive control, comfortable grip, and clean modern aesthetics for focused use.",
  },
  {
    id: 18,
    name: "Mechanical Keyboard",
    category: "Tech",
    price: 13200,
    originalPrice: 14900,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
    createdAt: "2026-03-11",
    trending: true,
    shortDescription: "Tactile typing with a premium desk presence.",
    description:
      "Mechanical Keyboard brings satisfying key feel, a strong typing profile, and a refined setup upgrade.",
    badge: "Trending",
  },
  {
    id: 19,
    name: "Portable SSD",
    category: "Tech",
    price: 21800,
    originalPrice: 23900,
    image:
      "https://images.unsplash.com/photo-1593642532871-8b12e02d091c?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-29",
    newArrival: true,
    shortDescription: "Fast compact storage for modern workflows.",
    description:
      "Portable SSD is built for quick access, sleek portability, and reliable everyday file storage.",
    badge: "New",
  },
  {
    id: 20,
    name: "USB-C Hub",
    category: "Tech",
    price: 6900,
    image:
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-01",
    shortDescription: "Simple connectivity expansion for laptops.",
    description:
      "USB-C Hub adds clean functionality for modern devices with a compact footprint and easy desk use.",
  },
  {
    id: 21,
    name: "Tablet Stand",
    category: "Tech",
    price: 3400,
    image:
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-02-26",
    shortDescription: "Minimal stand for comfortable viewing.",
    description:
      "Tablet Stand improves viewing angle, desk comfort, and simple daily device use in a compact form.",
  },
  {
    id: 22,
    name: "Phone Gimbal",
    category: "Tech",
    price: 17500,
    image:
      "https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
    createdAt: "2026-03-09",
    shortDescription: "Smooth mobile stabilization for creators.",
    description:
      "Phone Gimbal is made for polished handheld shooting with better stability and a more premium content workflow.",
  },
  {
    id: 23,
    name: "Wireless Charger",
    category: "Tech",
    price: 4900,
    image:
      "https://images.unsplash.com/photo-1585338107529-13afc5f02586?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-21",
    shortDescription: "Clean fast charging without cable clutter.",
    description:
      "Wireless Charger keeps desks and bedside setups neat while delivering convenient everyday charging.",
  },
  {
    id: 24,
    name: "LED Monitor Light",
    category: "Tech",
    price: 8900,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-25",
    newArrival: true,
    shortDescription: "Focused screen lighting for better comfort.",
    description:
      "LED Monitor Light adds a refined setup enhancement with cleaner task lighting and reduced desk harshness.",
    badge: "New",
  },
  {
    id: 25,
    name: "Facial Cleanser",
    category: "Beauty",
    price: 2800,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-02-18",
    shortDescription: "Fresh daily cleanser for simple routines.",
    description:
      "Facial Cleanser supports a light refreshing skincare step suitable for everyday use and polished routines.",
  },
  {
    id: 26,
    name: "Vitamin C Serum",
    category: "Beauty",
    price: 5400,
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-03",
    trending: true,
    shortDescription: "Brightening serum for premium skincare routines.",
    description:
      "Vitamin C Serum adds a focused glow step to beauty routines with a clean premium presentation.",
    badge: "Trending",
  },
  {
    id: 27,
    name: "Hydrating Toner",
    category: "Beauty",
    price: 3700,
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-08",
    shortDescription: "Light hydration prep for daily skincare.",
    description:
      "Hydrating Toner helps support balanced skin prep with a calm minimal approach to beauty care.",
  },
  {
    id: 28,
    name: "Matte Lipstick Set",
    category: "Beauty",
    price: 6200,
    image:
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
    createdAt: "2026-03-13",
    shortDescription: "Bold tones in a clean premium set.",
    description:
      "Matte Lipstick Set brings modern color options in a polished presentation ideal for everyday beauty styling.",
  },
  {
    id: 29,
    name: "Perfume Mist",
    category: "Beauty",
    price: 7100,
    originalPrice: 8400,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-27",
    newArrival: true,
    shortDescription: "Fresh premium scent for daily wear.",
    description:
      "Perfume Mist adds an elevated finishing touch with a refined fragrance feel and clean stylish packaging.",
    badge: "New",
  },
  {
    id: 30,
    name: "Body Lotion",
    category: "Beauty",
    price: 3300,
    image:
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-02-28",
    shortDescription: "Smooth daily hydration with soft finish.",
    description:
      "Body Lotion supports a comfortable daily care step with a clean feel and a balanced beauty routine fit.",
  },
  {
    id: 31,
    name: "Scented Candle Duo",
    category: "Home",
    price: 4100,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-04",
    shortDescription: "Warm home fragrance with premium styling.",
    description:
      "Scented Candle Duo brings cozy atmosphere and clean visual appeal to modern living spaces.",
  },
  {
    id: 32,
    name: "Linen Cushion Cover",
    category: "Home",
    price: 2600,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-02-21",
    shortDescription: "Soft texture for minimal home styling.",
    description:
      "Linen Cushion Cover adds a calm layered look to living spaces with subtle refined texture.",
  },
  {
    id: 33,
    name: "Wall Clock",
    category: "Home",
    price: 5700,
    image:
      "https://images.unsplash.com/photo-1563865436914-44ee14a35e66?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-17",
    shortDescription: "Clean statement clock for modern interiors.",
    description:
      "Wall Clock combines utility and styling with a neat modern design suitable for home and office spaces.",
  },
  {
    id: 34,
    name: "Storage Basket",
    category: "Home",
    price: 3100,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
    createdAt: "2026-03-06",
    shortDescription: "Simple storage with decorative utility.",
    description:
      "Storage Basket helps organize essentials while maintaining a warm minimal interior feel.",
  },
  {
    id: 35,
    name: "Standing Mirror",
    category: "Home",
    price: 16400,
    originalPrice: 18900,
    image:
      "https://images.unsplash.com/photo-1616628182509-6c1b9c3c8fe8?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-16",
    featured: true,
    shortDescription: "Elegant full-length mirror for modern rooms.",
    description:
      "Standing Mirror adds visual depth and clean styling to interiors with a premium freestanding design.",
    badge: "Featured",
  },
  {
    id: 36,
    name: "Plant Pot Set",
    category: "Home",
    price: 3900,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-19",
    shortDescription: "Decorative pot set for modern plant styling.",
    description:
      "Plant Pot Set is made for clean shelf styling, indoor greenery, and a calm premium home vibe.",
  },
  {
    id: 37,
    name: "Resistance Band Kit",
    category: "Fitness",
    price: 3500,
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-02-22",
    shortDescription: "Compact training kit for flexible workouts.",
    description:
      "Resistance Band Kit supports home training, warmups, and portable fitness routines with simple versatility.",
  },
  {
    id: 38,
    name: "Adjustable Dumbbells",
    category: "Fitness",
    price: 22800,
    originalPrice: 25500,
    image:
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
    createdAt: "2026-03-09",
    trending: true,
    shortDescription: "Premium strength training essential.",
    description:
      "Adjustable Dumbbells bring versatile home strength training with clean utility and space-saving design.",
    badge: "Trending",
  },
  {
    id: 39,
    name: "Foam Roller",
    category: "Fitness",
    price: 4800,
    image:
      "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-23",
    shortDescription: "Recovery support for post-workout comfort.",
    description:
      "Foam Roller is built for mobility and recovery sessions with a clean durable form for regular use.",
  },
  {
    id: 40,
    name: "Sports Water Bottle",
    category: "Fitness",
    price: 1900,
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-01",
    shortDescription: "Simple daily hydration companion.",
    description:
      "Sports Water Bottle is designed for easy carrying, clean grip, and active everyday use.",
  },
  {
    id: 41,
    name: "Skipping Rope",
    category: "Fitness",
    price: 2300,
    image:
      "https://images.unsplash.com/photo-1517837016564-bfc7d7d8bf80?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-18",
    shortDescription: "Compact cardio essential for quick training.",
    description:
      "Skipping Rope offers a simple effective cardio tool with portable convenience and minimal setup.",
  },
  {
    id: 42,
    name: "Gym Gloves",
    category: "Fitness",
    price: 2700,
    image:
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
    createdAt: "2026-03-12",
    shortDescription: "Grip support for training sessions.",
    description:
      "Gym Gloves add comfort and grip to lifting and machine workouts while maintaining a clean athletic look.",
  },
  {
    id: 43,
    name: "Journal Notebook",
    category: "Lifestyle",
    price: 2100,
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-02-24",
    shortDescription: "Premium notebook for thoughts and planning.",
    description:
      "Journal Notebook fits planning, writing, and creative routines with a neat minimal presentation.",
  },
  {
    id: 44,
    name: "Desk Organizer",
    category: "Lifestyle",
    price: 3600,
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-14",
    shortDescription: "Clean desk storage with stylish function.",
    description:
      "Desk Organizer supports tidy workspaces with a practical layout and refined everyday design.",
  },
  {
    id: 45,
    name: "Travel Tumbler",
    category: "Lifestyle",
    price: 4300,
    image:
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-28",
    newArrival: true,
    shortDescription: "Portable tumbler for modern daily carry.",
    description:
      "Travel Tumbler blends simple premium styling with practical day-to-day use for coffee and hydration.",
    badge: "New",
  },
  {
    id: 46,
    name: "Reading Lamp",
    category: "Lifestyle",
    price: 5200,
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-02",
    shortDescription: "Focused warm light for reading spaces.",
    description:
      "Reading Lamp offers a soft focused lighting experience for night reading and calm work corners.",
  },
  {
    id: 47,
    name: "Mini Aroma Diffuser",
    category: "Lifestyle",
    price: 6100,
    image:
      "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=1200&auto=format&fit=crop",
    inStock: false,
    createdAt: "2026-03-26",
    shortDescription: "Compact atmosphere boost for small spaces.",
    description:
      "Mini Aroma Diffuser adds a polished calm scent element to workspaces, bedrooms, and living areas.",
  },
  {
    id: 48,
    name: "Portable Coffee Press",
    category: "Lifestyle",
    price: 7400,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-11",
    shortDescription: "Brew-ready design for travel and desks.",
    description:
      "Portable Coffee Press suits minimal coffee rituals with a refined compact format for everyday convenience.",
  },
  {
    id: 49,
    name: "Silk Pillowcase",
    category: "Lifestyle",
    price: 6800,
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-21",
    shortDescription: "Soft premium sleep comfort essential.",
    description:
      "Silk Pillowcase adds an elevated night routine feel with smooth texture and refined home-lifestyle styling.",
  },
  {
    id: 50,
    name: "Portable Fan",
    category: "Lifestyle",
    price: 2900,
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-30",
    newArrival: true,
    shortDescription: "Compact cooling for desks and travel.",
    description:
      "Portable Fan is built for convenience with a lightweight design and easy everyday personal cooling.",
    badge: "New",
  },
  {
    id: 51,
    name: "Smart Desk Clock",
    category: "Tech",
    price: 7900,
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-27",
    shortDescription: "Modern clock for sleek desk setups.",
    description:
      "Smart Desk Clock enhances workspaces with a cleaner modern visual and simple always-visible time display.",
  },
  {
    id: 52,
    name: "Protein Shaker Bottle",
    category: "Fitness",
    price: 2200,
    image:
      "https://images.unsplash.com/photo-1571019613914-85f342c55f55?q=80&w=1200&auto=format&fit=crop",
    inStock: true,
    createdAt: "2026-03-08",
    shortDescription: "Simple daily shaker for training routines.",
    description:
      "Protein Shaker Bottle supports active nutrition routines with easy carry, easy mixing, and a clean sporty look.",
  },
];