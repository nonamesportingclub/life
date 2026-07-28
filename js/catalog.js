/* ==========================================================================
   CATALOG.JS — car and property listings used by the Life Simulator.
   Pure data: edit, add, or remove entries freely. Each dashboard dropdown
   is built from these arrays at page load (see dashboard.js -> populateCatalogs).
   ========================================================================== */

const CAR_CATALOG = [
  {
    "name": "Toyota Corolla",
    "tier": "Economy",
    "price": 15500
  },
  {
    "name": "Toyota Corolla Hatchback",
    "tier": "Economy",
    "price": 16500
  },
  {
    "name": "Toyota Yaris",
    "tier": "Economy",
    "price": 16000
  },
  {
    "name": "Toyota Prius",
    "tier": "Economy",
    "price": 17000
  },
  {
    "name": "Toyota C-HR",
    "tier": "Economy",
    "price": 17000
  },
  {
    "name": "Honda Civic",
    "tier": "Economy",
    "price": 17000
  },
  {
    "name": "Honda Civic Hatchback",
    "tier": "Economy",
    "price": 17500
  },
  {
    "name": "Honda Fit",
    "tier": "Economy",
    "price": 17500
  },
  {
    "name": "Honda Insight",
    "tier": "Economy",
    "price": 18500
  },
  {
    "name": "Honda HR-V",
    "tier": "Economy",
    "price": 18500
  },
  {
    "name": "Nissan Sentra",
    "tier": "Economy",
    "price": 18000
  },
  {
    "name": "Nissan Versa",
    "tier": "Economy",
    "price": 19000
  },
  {
    "name": "Nissan Kicks",
    "tier": "Economy",
    "price": 19000
  },
  {
    "name": "Nissan Leaf",
    "tier": "Economy",
    "price": 20000
  },
  {
    "name": "Nissan Altima",
    "tier": "Economy",
    "price": 19500
  },
  {
    "name": "Hyundai Elantra",
    "tier": "Economy",
    "price": 19500
  },
  {
    "name": "Hyundai Accent",
    "tier": "Economy",
    "price": 20500
  },
  {
    "name": "Hyundai Venue",
    "tier": "Economy",
    "price": 20000
  },
  {
    "name": "Hyundai Ioniq",
    "tier": "Economy",
    "price": 21500
  },
  {
    "name": "Hyundai Kona",
    "tier": "Economy",
    "price": 21000
  },
  {
    "name": "Kia Forte",
    "tier": "Economy",
    "price": 21000
  },
  {
    "name": "Kia Rio",
    "tier": "Economy",
    "price": 22000
  },
  {
    "name": "Kia Soul",
    "tier": "Economy",
    "price": 21500
  },
  {
    "name": "Kia Niro",
    "tier": "Economy",
    "price": 21500
  },
  {
    "name": "Kia Seltos",
    "tier": "Economy",
    "price": 22500
  },
  {
    "name": "Mazda3",
    "tier": "Economy",
    "price": 22000
  },
  {
    "name": "Mazda CX-3",
    "tier": "Economy",
    "price": 23000
  },
  {
    "name": "Mazda CX-30",
    "tier": "Economy",
    "price": 23000
  },
  {
    "name": "Mazda2",
    "tier": "Economy",
    "price": 22500
  },
  {
    "name": "Mazda6",
    "tier": "Economy",
    "price": 24000
  },
  {
    "name": "Chevrolet Malibu",
    "tier": "Economy",
    "price": 23500
  },
  {
    "name": "Chevrolet Spark",
    "tier": "Economy",
    "price": 24500
  },
  {
    "name": "Chevrolet Sonic",
    "tier": "Economy",
    "price": 24500
  },
  {
    "name": "Chevrolet Trax",
    "tier": "Economy",
    "price": 24000
  },
  {
    "name": "Chevrolet Cruze",
    "tier": "Economy",
    "price": 25000
  },
  {
    "name": "Ford Focus",
    "tier": "Economy",
    "price": 25000
  },
  {
    "name": "Ford Fiesta",
    "tier": "Economy",
    "price": 26000
  },
  {
    "name": "Ford EcoSport",
    "tier": "Economy",
    "price": 25500
  },
  {
    "name": "Ford Fusion",
    "tier": "Economy",
    "price": 25500
  },
  {
    "name": "Ford Escape",
    "tier": "Economy",
    "price": 26500
  },
  {
    "name": "Volkswagen Jetta",
    "tier": "Economy",
    "price": 26000
  },
  {
    "name": "Volkswagen Golf",
    "tier": "Economy",
    "price": 27500
  },
  {
    "name": "Volkswagen Polo",
    "tier": "Economy",
    "price": 27000
  },
  {
    "name": "Volkswagen Taos",
    "tier": "Economy",
    "price": 26500
  },
  {
    "name": "Volkswagen Passat",
    "tier": "Economy",
    "price": 28000
  },
  {
    "name": "Subaru Impreza",
    "tier": "Economy",
    "price": 27500
  },
  {
    "name": "Subaru Crosstrek",
    "tier": "Economy",
    "price": 27000
  },
  {
    "name": "Subaru Legacy",
    "tier": "Economy",
    "price": 28500
  },
  {
    "name": "Subaru Outback",
    "tier": "Economy",
    "price": 28000
  },
  {
    "name": "Subaru Forester",
    "tier": "Economy",
    "price": 29500
  },
  {
    "name": "Mitsubishi Mirage",
    "tier": "Economy",
    "price": 29000
  },
  {
    "name": "Mitsubishi Outlander Sport",
    "tier": "Economy",
    "price": 28500
  },
  {
    "name": "Mitsubishi Eclipse Cross",
    "tier": "Economy",
    "price": 30000
  },
  {
    "name": "Buick Encore",
    "tier": "Economy",
    "price": 29500
  },
  {
    "name": "Buick Verano",
    "tier": "Economy",
    "price": 31000
  },
  {
    "name": "Chrysler 200",
    "tier": "Economy",
    "price": 30500
  },
  {
    "name": "Jeep Renegade",
    "tier": "Economy",
    "price": 30000
  },
  {
    "name": "Jeep Compass",
    "tier": "Economy",
    "price": 31000
  },
  {
    "name": "Fiat 500",
    "tier": "Economy",
    "price": 31000
  },
  {
    "name": "Fiat 500X",
    "tier": "Economy",
    "price": 32000
  },
  {
    "name": "Toyota Camry LE",
    "tier": "Economy",
    "price": 31500
  },
  {
    "name": "Honda Accord LX",
    "tier": "Economy",
    "price": 31000
  },
  {
    "name": "Mazda6 Sport",
    "tier": "Economy",
    "price": 32500
  },
  {
    "name": "Kia Optima",
    "tier": "Economy",
    "price": 32000
  },
  {
    "name": "Hyundai Sonata",
    "tier": "Economy",
    "price": 33500
  },
  {
    "name": "Chevrolet Impala",
    "tier": "Economy",
    "price": 33000
  },
  {
    "name": "Nissan Maxima",
    "tier": "Economy",
    "price": 32500
  },
  {
    "name": "Toyota Avalon",
    "tier": "Economy",
    "price": 34000
  },
  {
    "name": "Ford Taurus",
    "tier": "Economy",
    "price": 33500
  },
  {
    "name": "Buick LaCrosse",
    "tier": "Economy",
    "price": 33000
  },
  {
    "name": "Honda Civic Type R",
    "tier": "Sport",
    "price": 27000
  },
  {
    "name": "Toyota GR86",
    "tier": "Sport",
    "price": 29000
  },
  {
    "name": "Subaru BRZ",
    "tier": "Sport",
    "price": 29000
  },
  {
    "name": "Mazda MX-5 Miata",
    "tier": "Sport",
    "price": 30500
  },
  {
    "name": "Volkswagen GTI",
    "tier": "Sport",
    "price": 30500
  },
  {
    "name": "Volkswagen Golf R",
    "tier": "Sport",
    "price": 30500
  },
  {
    "name": "Ford Mustang EcoBoost",
    "tier": "Sport",
    "price": 32000
  },
  {
    "name": "Ford Mustang GT",
    "tier": "Sport",
    "price": 32000
  },
  {
    "name": "Ford Focus ST",
    "tier": "Sport",
    "price": 33500
  },
  {
    "name": "Ford Focus RS",
    "tier": "Sport",
    "price": 33500
  },
  {
    "name": "Chevrolet Camaro LT",
    "tier": "Sport",
    "price": 33500
  },
  {
    "name": "Chevrolet Camaro SS",
    "tier": "Sport",
    "price": 35500
  },
  {
    "name": "Hyundai Veloster N",
    "tier": "Sport",
    "price": 35000
  },
  {
    "name": "Kia Stinger GT",
    "tier": "Sport",
    "price": 37000
  },
  {
    "name": "Toyota Supra",
    "tier": "Sport",
    "price": 37000
  },
  {
    "name": "Toyota GR Corolla",
    "tier": "Sport",
    "price": 36500
  },
  {
    "name": "Nissan 370Z",
    "tier": "Sport",
    "price": 38500
  },
  {
    "name": "Nissan Z",
    "tier": "Sport",
    "price": 38500
  },
  {
    "name": "Honda Accord Sport",
    "tier": "Sport",
    "price": 40500
  },
  {
    "name": "Subaru WRX",
    "tier": "Sport",
    "price": 40000
  },
  {
    "name": "Subaru WRX STI",
    "tier": "Sport",
    "price": 39500
  },
  {
    "name": "Mini Cooper S",
    "tier": "Sport",
    "price": 42000
  },
  {
    "name": "Mini John Cooper Works",
    "tier": "Sport",
    "price": 41500
  },
  {
    "name": "Audi A3",
    "tier": "Sport",
    "price": 41000
  },
  {
    "name": "Audi S3",
    "tier": "Sport",
    "price": 43500
  },
  {
    "name": "BMW 230i",
    "tier": "Sport",
    "price": 43000
  },
  {
    "name": "BMW M235i",
    "tier": "Sport",
    "price": 45000
  },
  {
    "name": "Mercedes-Benz CLA250",
    "tier": "Sport",
    "price": 44500
  },
  {
    "name": "Alfa Romeo Giulia",
    "tier": "Sport",
    "price": 44500
  },
  {
    "name": "Genesis G70",
    "tier": "Sport",
    "price": 46500
  },
  {
    "name": "Infiniti Q50",
    "tier": "Sport",
    "price": 46000
  },
  {
    "name": "Infiniti Q60",
    "tier": "Sport",
    "price": 48500
  },
  {
    "name": "Acura ILX",
    "tier": "Sport",
    "price": 48000
  },
  {
    "name": "Acura TLX",
    "tier": "Sport",
    "price": 47500
  },
  {
    "name": "Acura Integra",
    "tier": "Sport",
    "price": 50000
  },
  {
    "name": "Lexus IS 300",
    "tier": "Sport",
    "price": 49500
  },
  {
    "name": "Lexus RC",
    "tier": "Sport",
    "price": 52000
  },
  {
    "name": "Cadillac CT4",
    "tier": "Sport",
    "price": 51000
  },
  {
    "name": "Volkswagen Jetta GLI",
    "tier": "Sport",
    "price": 50500
  },
  {
    "name": "Toyota Camry TRD",
    "tier": "Sport",
    "price": 53000
  },
  {
    "name": "Dodge Charger GT",
    "tier": "Sport",
    "price": 52500
  },
  {
    "name": "Dodge Challenger GT",
    "tier": "Sport",
    "price": 55000
  },
  {
    "name": "Fiat 124 Spider",
    "tier": "Sport",
    "price": 54500
  },
  {
    "name": "Jeep Wrangler Rubicon",
    "tier": "Sport",
    "price": 54000
  },
  {
    "name": "Ford Bronco",
    "tier": "Sport",
    "price": 56500
  },
  {
    "name": "Toyota 4Runner TRD",
    "tier": "Sport",
    "price": 56000
  },
  {
    "name": "Chevrolet Colorado ZR2",
    "tier": "Sport",
    "price": 55000
  },
  {
    "name": "Ford Ranger Raptor",
    "tier": "Sport",
    "price": 57500
  },
  {
    "name": "Subaru Ascent",
    "tier": "Sport",
    "price": 57000
  },
  {
    "name": "Mazda CX-5",
    "tier": "Sport",
    "price": 60000
  },
  {
    "name": "Honda Passport",
    "tier": "Sport",
    "price": 59000
  },
  {
    "name": "Toyota Highlander",
    "tier": "Sport",
    "price": 58000
  },
  {
    "name": "Kia Telluride",
    "tier": "Sport",
    "price": 61000
  },
  {
    "name": "Hyundai Palisade",
    "tier": "Sport",
    "price": 60000
  },
  {
    "name": "Volkswagen Atlas",
    "tier": "Sport",
    "price": 63000
  },
  {
    "name": "Ford Explorer ST",
    "tier": "Sport",
    "price": 62500
  },
  {
    "name": "Chevrolet Blazer RS",
    "tier": "Sport",
    "price": 61500
  },
  {
    "name": "Jeep Grand Cherokee Trailhawk",
    "tier": "Sport",
    "price": 64500
  },
  {
    "name": "Nissan Murano",
    "tier": "Sport",
    "price": 63500
  },
  {
    "name": "Toyota Venza",
    "tier": "Sport",
    "price": 66500
  },
  {
    "name": "Volkswagen Arteon",
    "tier": "Sport",
    "price": 65500
  },
  {
    "name": "Mazda CX-50",
    "tier": "Sport",
    "price": 64500
  },
  {
    "name": "Honda Civic Si",
    "tier": "Sport",
    "price": 67500
  },
  {
    "name": "Toyota Corolla GR Sport",
    "tier": "Sport",
    "price": 67000
  },
  {
    "name": "Subaru Legacy GT",
    "tier": "Sport",
    "price": 70000
  },
  {
    "name": "BMW 3 Series",
    "tier": "Luxury",
    "price": 43500
  },
  {
    "name": "BMW 5 Series",
    "tier": "Luxury",
    "price": 46500
  },
  {
    "name": "BMW 7 Series",
    "tier": "Luxury",
    "price": 46500
  },
  {
    "name": "BMW X5",
    "tier": "Luxury",
    "price": 49500
  },
  {
    "name": "BMW X7",
    "tier": "Luxury",
    "price": 50000
  },
  {
    "name": "BMW X3",
    "tier": "Luxury",
    "price": 50000
  },
  {
    "name": "BMW X6",
    "tier": "Luxury",
    "price": 53000
  },
  {
    "name": "Mercedes-Benz C-Class",
    "tier": "Luxury",
    "price": 53000
  },
  {
    "name": "Mercedes-Benz E-Class",
    "tier": "Luxury",
    "price": 56000
  },
  {
    "name": "Mercedes-Benz S-Class",
    "tier": "Luxury",
    "price": 56000
  },
  {
    "name": "Mercedes-Benz GLE",
    "tier": "Luxury",
    "price": 56000
  },
  {
    "name": "Mercedes-Benz GLS",
    "tier": "Luxury",
    "price": 59500
  },
  {
    "name": "Mercedes-Benz GLC",
    "tier": "Luxury",
    "price": 59500
  },
  {
    "name": "Audi A4",
    "tier": "Luxury",
    "price": 63000
  },
  {
    "name": "Audi A6",
    "tier": "Luxury",
    "price": 62500
  },
  {
    "name": "Audi A8",
    "tier": "Luxury",
    "price": 62500
  },
  {
    "name": "Audi Q5",
    "tier": "Luxury",
    "price": 66000
  },
  {
    "name": "Audi Q7",
    "tier": "Luxury",
    "price": 65500
  },
  {
    "name": "Audi Q8",
    "tier": "Luxury",
    "price": 69500
  },
  {
    "name": "Lexus ES",
    "tier": "Luxury",
    "price": 69000
  },
  {
    "name": "Lexus LS",
    "tier": "Luxury",
    "price": 68500
  },
  {
    "name": "Lexus RX",
    "tier": "Luxury",
    "price": 72500
  },
  {
    "name": "Lexus GX",
    "tier": "Luxury",
    "price": 72000
  },
  {
    "name": "Lexus LX",
    "tier": "Luxury",
    "price": 71500
  },
  {
    "name": "Lexus NX",
    "tier": "Luxury",
    "price": 75500
  },
  {
    "name": "Genesis G80",
    "tier": "Luxury",
    "price": 75000
  },
  {
    "name": "Genesis G90",
    "tier": "Luxury",
    "price": 79000
  },
  {
    "name": "Genesis GV80",
    "tier": "Luxury",
    "price": 78500
  },
  {
    "name": "Genesis GV70",
    "tier": "Luxury",
    "price": 78000
  },
  {
    "name": "Cadillac CT5",
    "tier": "Luxury",
    "price": 82000
  },
  {
    "name": "Cadillac CT6",
    "tier": "Luxury",
    "price": 81500
  },
  {
    "name": "Cadillac Escalade",
    "tier": "Luxury",
    "price": 85500
  },
  {
    "name": "Cadillac XT6",
    "tier": "Luxury",
    "price": 85000
  },
  {
    "name": "Lincoln Navigator",
    "tier": "Luxury",
    "price": 84000
  },
  {
    "name": "Lincoln Aviator",
    "tier": "Luxury",
    "price": 88500
  },
  {
    "name": "Lincoln Continental",
    "tier": "Luxury",
    "price": 87500
  },
  {
    "name": "Lincoln Corsair",
    "tier": "Luxury",
    "price": 92000
  },
  {
    "name": "Volvo S90",
    "tier": "Luxury",
    "price": 91500
  },
  {
    "name": "Volvo XC90",
    "tier": "Luxury",
    "price": 90500
  },
  {
    "name": "Volvo XC60",
    "tier": "Luxury",
    "price": 95000
  },
  {
    "name": "Jaguar XF",
    "tier": "Luxury",
    "price": 94000
  },
  {
    "name": "Jaguar F-Pace",
    "tier": "Luxury",
    "price": 99000
  },
  {
    "name": "Jaguar E-Pace",
    "tier": "Luxury",
    "price": 98000
  },
  {
    "name": "Land Rover Range Rover",
    "tier": "Luxury",
    "price": 97000
  },
  {
    "name": "Land Rover Range Rover Sport",
    "tier": "Luxury",
    "price": 102000
  },
  {
    "name": "Land Rover Defender",
    "tier": "Luxury",
    "price": 101000
  },
  {
    "name": "Land Rover Discovery",
    "tier": "Luxury",
    "price": 99500
  },
  {
    "name": "Porsche Macan",
    "tier": "Luxury",
    "price": 104000
  },
  {
    "name": "Porsche Cayenne",
    "tier": "Luxury",
    "price": 103000
  },
  {
    "name": "Porsche Panamera",
    "tier": "Luxury",
    "price": 108000
  },
  {
    "name": "Maserati Ghibli",
    "tier": "Luxury",
    "price": 107000
  },
  {
    "name": "Maserati Levante",
    "tier": "Luxury",
    "price": 106000
  },
  {
    "name": "Alfa Romeo Stelvio",
    "tier": "Luxury",
    "price": 111000
  },
  {
    "name": "Infiniti QX80",
    "tier": "Luxury",
    "price": 110000
  },
  {
    "name": "Infiniti QX60",
    "tier": "Luxury",
    "price": 115000
  },
  {
    "name": "Acura MDX",
    "tier": "Luxury",
    "price": 114000
  },
  {
    "name": "Acura RDX",
    "tier": "Luxury",
    "price": 112000
  },
  {
    "name": "Tesla Model S",
    "tier": "Luxury",
    "price": 118000
  },
  {
    "name": "Tesla Model X",
    "tier": "Luxury",
    "price": 116000
  },
  {
    "name": "Tesla Model 3 Performance",
    "tier": "Luxury",
    "price": 122000
  },
  {
    "name": "Tesla Model Y",
    "tier": "Luxury",
    "price": 120000
  },
  {
    "name": "BMW i7",
    "tier": "Luxury",
    "price": 119000
  },
  {
    "name": "Mercedes-Benz EQS",
    "tier": "Luxury",
    "price": 124000
  },
  {
    "name": "Audi e-tron GT",
    "tier": "Luxury",
    "price": 123000
  },
  {
    "name": "Porsche Taycan",
    "tier": "Luxury",
    "price": 128000
  },
  {
    "name": "Cadillac Lyriq",
    "tier": "Luxury",
    "price": 127000
  },
  {
    "name": "Lucid Air",
    "tier": "Luxury",
    "price": 125000
  },
  {
    "name": "Rivian R1S",
    "tier": "Luxury",
    "price": 131000
  },
  {
    "name": "Genesis Electrified G80",
    "tier": "Luxury",
    "price": 129000
  },
  {
    "name": "Porsche 911 Carrera",
    "tier": "Exotic",
    "price": 126000
  },
  {
    "name": "Porsche 911 Turbo S",
    "tier": "Exotic",
    "price": 135000
  },
  {
    "name": "Porsche 911 GT3",
    "tier": "Exotic",
    "price": 137000
  },
  {
    "name": "Porsche 718 Cayman",
    "tier": "Exotic",
    "price": 147000
  },
  {
    "name": "Porsche 718 Boxster",
    "tier": "Exotic",
    "price": 148000
  },
  {
    "name": "Chevrolet Corvette Stingray",
    "tier": "Exotic",
    "price": 149000
  },
  {
    "name": "Chevrolet Corvette Z06",
    "tier": "Exotic",
    "price": 159000
  },
  {
    "name": "Audi R8",
    "tier": "Exotic",
    "price": 160000
  },
  {
    "name": "BMW M3",
    "tier": "Exotic",
    "price": 171000
  },
  {
    "name": "BMW M4",
    "tier": "Exotic",
    "price": 171000
  },
  {
    "name": "BMW M5",
    "tier": "Exotic",
    "price": 172000
  },
  {
    "name": "BMW M8",
    "tier": "Exotic",
    "price": 183000
  },
  {
    "name": "Mercedes-AMG C63",
    "tier": "Exotic",
    "price": 183000
  },
  {
    "name": "Mercedes-AMG E63",
    "tier": "Exotic",
    "price": 195000
  },
  {
    "name": "Mercedes-AMG GT",
    "tier": "Exotic",
    "price": 195000
  },
  {
    "name": "Jaguar F-Type",
    "tier": "Exotic",
    "price": 195000
  },
  {
    "name": "Aston Martin Vantage",
    "tier": "Exotic",
    "price": 207000
  },
  {
    "name": "Aston Martin DB11",
    "tier": "Exotic",
    "price": 206000
  },
  {
    "name": "Aston Martin DBS",
    "tier": "Exotic",
    "price": 219000
  },
  {
    "name": "Maserati MC20",
    "tier": "Exotic",
    "price": 218000
  },
  {
    "name": "Alfa Romeo 4C",
    "tier": "Exotic",
    "price": 218000
  },
  {
    "name": "Lotus Evora",
    "tier": "Exotic",
    "price": 231000
  },
  {
    "name": "Lotus Emira",
    "tier": "Exotic",
    "price": 230000
  },
  {
    "name": "McLaren GT",
    "tier": "Exotic",
    "price": 229000
  },
  {
    "name": "McLaren 570S",
    "tier": "Exotic",
    "price": 242000
  },
  {
    "name": "McLaren 720S",
    "tier": "Exotic",
    "price": 241000
  },
  {
    "name": "McLaren Artura",
    "tier": "Exotic",
    "price": 255000
  },
  {
    "name": "Ferrari Portofino",
    "tier": "Exotic",
    "price": 253000
  },
  {
    "name": "Ferrari Roma",
    "tier": "Exotic",
    "price": 252000
  },
  {
    "name": "Ferrari F8 Tributo",
    "tier": "Exotic",
    "price": 266000
  },
  {
    "name": "Ferrari 296 GTB",
    "tier": "Exotic",
    "price": 264000
  },
  {
    "name": "Lamborghini Huracan",
    "tier": "Exotic",
    "price": 279000
  },
  {
    "name": "Lamborghini Urus",
    "tier": "Exotic",
    "price": 277000
  },
  {
    "name": "Nissan GT-R",
    "tier": "Exotic",
    "price": 275000
  },
  {
    "name": "Acura NSX",
    "tier": "Exotic",
    "price": 290000
  },
  {
    "name": "Dodge Viper",
    "tier": "Exotic",
    "price": 288000
  },
  {
    "name": "Aston Martin Vanquish",
    "tier": "Exotic",
    "price": 303000
  },
  {
    "name": "Rolls-Royce Ghost",
    "tier": "Exotic",
    "price": 301000
  },
  {
    "name": "Rolls-Royce Wraith",
    "tier": "Exotic",
    "price": 298000
  },
  {
    "name": "Bentley Continental GT",
    "tier": "Exotic",
    "price": 314000
  },
  {
    "name": "Bentley Flying Spur",
    "tier": "Exotic",
    "price": 311000
  },
  {
    "name": "Mercedes-Maybach S-Class",
    "tier": "Exotic",
    "price": 327000
  },
  {
    "name": "Cadillac CT5-V Blackwing",
    "tier": "Exotic",
    "price": 325000
  },
  {
    "name": "Chevrolet Camaro ZL1",
    "tier": "Exotic",
    "price": 322000
  },
  {
    "name": "Dodge Challenger SRT Hellcat",
    "tier": "Exotic",
    "price": 338000
  },
  {
    "name": "Dodge Charger SRT Hellcat",
    "tier": "Exotic",
    "price": 335000
  },
  {
    "name": "Ram 1500 TRX",
    "tier": "Exotic",
    "price": 331000
  },
  {
    "name": "Ford Mustang Shelby GT500",
    "tier": "Exotic",
    "price": 349000
  },
  {
    "name": "Ford GT",
    "tier": "Exotic",
    "price": 345000
  },
  {
    "name": "Polestar 1",
    "tier": "Exotic",
    "price": 363000
  },
  {
    "name": "Alpine A110",
    "tier": "Exotic",
    "price": 359000
  },
  {
    "name": "TVR Griffith",
    "tier": "Exotic",
    "price": 355000
  },
  {
    "name": "Morgan Plus Six",
    "tier": "Exotic",
    "price": 373000
  },
  {
    "name": "Caterham Seven 620R",
    "tier": "Exotic",
    "price": 369000
  },
  {
    "name": "BAC Mono",
    "tier": "Exotic",
    "price": 387000
  },
  {
    "name": "Ariel Atom 4",
    "tier": "Exotic",
    "price": 383000
  },
  {
    "name": "Radical SR3",
    "tier": "Exotic",
    "price": 378000
  },
  {
    "name": "Aston Martin DBX",
    "tier": "Exotic",
    "price": 397000
  },
  {
    "name": "Bentley Bentayga",
    "tier": "Exotic",
    "price": 392000
  },
  {
    "name": "Rolls-Royce Cullinan",
    "tier": "Exotic",
    "price": 412000
  },
  {
    "name": "Lamborghini Urus Performante",
    "tier": "Exotic",
    "price": 407000
  },
  {
    "name": "Porsche 911 GT3 RS",
    "tier": "Exotic",
    "price": 402000
  },
  {
    "name": "Ferrari Portofino M",
    "tier": "Exotic",
    "price": 421000
  },
  {
    "name": "McLaren GTS",
    "tier": "Exotic",
    "price": 416000
  },
  {
    "name": "Bugatti Chiron",
    "tier": "Hypercar",
    "price": 436000
  },
  {
    "name": "Bugatti Veyron",
    "tier": "Hypercar",
    "price": 531000
  },
  {
    "name": "Bugatti Divo",
    "tier": "Hypercar",
    "price": 596000
  },
  {
    "name": "Bugatti Bolide",
    "tier": "Hypercar",
    "price": 697000
  },
  {
    "name": "Bugatti Mistral",
    "tier": "Hypercar",
    "price": 759000
  },
  {
    "name": "Koenigsegg Jesko",
    "tier": "Hypercar",
    "price": 817000
  },
  {
    "name": "Koenigsegg Agera",
    "tier": "Hypercar",
    "price": 926000
  },
  {
    "name": "Koenigsegg Regera",
    "tier": "Hypercar",
    "price": 981000
  },
  {
    "name": "Koenigsegg Gemera",
    "tier": "Hypercar",
    "price": 1100000
  },
  {
    "name": "Pagani Huayra",
    "tier": "Hypercar",
    "price": 1150000
  },
  {
    "name": "Pagani Zonda",
    "tier": "Hypercar",
    "price": 1200000
  },
  {
    "name": "Pagani Utopia",
    "tier": "Hypercar",
    "price": 1320000
  },
  {
    "name": "McLaren P1",
    "tier": "Hypercar",
    "price": 1370000
  },
  {
    "name": "McLaren Senna",
    "tier": "Hypercar",
    "price": 1500000
  },
  {
    "name": "McLaren Speedtail",
    "tier": "Hypercar",
    "price": 1540000
  },
  {
    "name": "McLaren F1",
    "tier": "Hypercar",
    "price": 1580000
  },
  {
    "name": "Ferrari LaFerrari",
    "tier": "Hypercar",
    "price": 1720000
  },
  {
    "name": "Ferrari SF90 Stradale",
    "tier": "Hypercar",
    "price": 1760000
  },
  {
    "name": "Ferrari Daytona SP3",
    "tier": "Hypercar",
    "price": 1900000
  },
  {
    "name": "Ferrari Monza SP2",
    "tier": "Hypercar",
    "price": 1940000
  },
  {
    "name": "Lamborghini Aventador",
    "tier": "Hypercar",
    "price": 1970000
  },
  {
    "name": "Lamborghini Revuelto",
    "tier": "Hypercar",
    "price": 2120000
  },
  {
    "name": "Lamborghini Sian",
    "tier": "Hypercar",
    "price": 2150000
  },
  {
    "name": "Lamborghini Veneno",
    "tier": "Hypercar",
    "price": 2170000
  },
  {
    "name": "Rimac Nevera",
    "tier": "Hypercar",
    "price": 2330000
  },
  {
    "name": "Aston Martin Valkyrie",
    "tier": "Hypercar",
    "price": 2360000
  },
  {
    "name": "Aston Martin Valhalla",
    "tier": "Hypercar",
    "price": 2520000
  },
  {
    "name": "Mercedes-AMG One",
    "tier": "Hypercar",
    "price": 2540000
  },
  {
    "name": "Porsche 918 Spyder",
    "tier": "Hypercar",
    "price": 2560000
  },
  {
    "name": "Gordon Murray T.50",
    "tier": "Hypercar",
    "price": 2730000
  },
  {
    "name": "Hennessey Venom F5",
    "tier": "Hypercar",
    "price": 2750000
  },
  {
    "name": "SSC Tuatara",
    "tier": "Hypercar",
    "price": 2930000
  },
  {
    "name": "De Tomaso P72",
    "tier": "Hypercar",
    "price": 2940000
  },
  {
    "name": "Czinger 21C",
    "tier": "Hypercar",
    "price": 2950000
  },
  {
    "name": "W Motors Lykan Hypersport",
    "tier": "Hypercar",
    "price": 3140000
  },
  {
    "name": "Devel Sixteen",
    "tier": "Hypercar",
    "price": 3140000
  },
  {
    "name": "Zenvo TSR-S",
    "tier": "Hypercar",
    "price": 3340000
  },
  {
    "name": "Apollo IE",
    "tier": "Hypercar",
    "price": 3340000
  },
  {
    "name": "Pininfarina Battista",
    "tier": "Hypercar",
    "price": 3330000
  },
  {
    "name": "Lotus Evija",
    "tier": "Hypercar",
    "price": 3540000
  },
  {
    "name": "Nio EP9",
    "tier": "Hypercar",
    "price": 3530000
  },
  {
    "name": "Aspark Owl",
    "tier": "Hypercar",
    "price": 3740000
  },
  {
    "name": "Rimac Concept One",
    "tier": "Hypercar",
    "price": 3740000
  },
  {
    "name": "Koenigsegg CCXR Trevita",
    "tier": "Hypercar",
    "price": 3730000
  }
];

const PROPERTY_CATALOG = [
  {
    "name": "Downtown Studio Apartment",
    "tier": "Rental",
    "mode": "rent",
    "price": 620,
    "blurb": "A compact studio a few blocks from the city center."
  },
  {
    "name": "Riverside Loft Apartment",
    "tier": "Rental",
    "mode": "rent",
    "price": 1040,
    "blurb": "An open-plan loft with exposed brick, overlooking the river."
  },
  {
    "name": "Midtown One-Bedroom",
    "tier": "Rental",
    "mode": "rent",
    "price": 1460,
    "blurb": "A quiet one-bedroom in a walkable midtown block."
  },
  {
    "name": "Uptown High-Rise Unit",
    "tier": "Rental",
    "mode": "rent",
    "price": 1900,
    "blurb": "A high-floor unit with skyline views."
  },
  {
    "name": "Historic District Flat",
    "tier": "Rental",
    "mode": "rent",
    "price": 2350,
    "blurb": "A renovated flat inside a century-old building."
  },
  {
    "name": "Arts Quarter Warehouse Loft",
    "tier": "Rental",
    "mode": "rent",
    "price": 2800,
    "blurb": "A converted warehouse space with tall ceilings."
  },
  {
    "name": "Suburban Garden Apartment",
    "tier": "Rental",
    "mode": "rent",
    "price": 3270,
    "blurb": "A ground-floor unit with a small private garden."
  },
  {
    "name": "Transit-Line Studio",
    "tier": "Rental",
    "mode": "rent",
    "price": 3460,
    "blurb": "A studio steps from the metro, popular with commuters."
  },
  {
    "name": "Waterfront Marina Apartment",
    "tier": "Rental",
    "mode": "rent",
    "price": 3920,
    "blurb": "A rental with private marina access."
  },
  {
    "name": "Campus-Adjacent Two-Bedroom",
    "tier": "Rental",
    "mode": "rent",
    "price": 4380,
    "blurb": "A larger unit near the university district."
  },
  {
    "name": "Rooftop-Terrace Penthouse Rental",
    "tier": "Rental",
    "mode": "rent",
    "price": 4860,
    "blurb": "A rented penthouse with a shared rooftop terrace."
  },
  {
    "name": "Downtown Corner Two-Bedroom",
    "tier": "Rental",
    "mode": "rent",
    "price": 5350,
    "blurb": "A corner unit with wraparound windows."
  },
  {
    "name": "Historic Brownstone Rental",
    "tier": "Rental",
    "mode": "rent",
    "price": 5840,
    "blurb": "One floor of a converted brownstone townhouse."
  },
  {
    "name": "Skyline Serviced Apartment",
    "tier": "Rental",
    "mode": "rent",
    "price": 5860,
    "blurb": "A fully serviced short-let apartment downtown."
  },
  {
    "name": "Old Town Courtyard Flat",
    "tier": "Rental",
    "mode": "rent",
    "price": 6350,
    "blurb": "A flat opening onto a shared cobblestone courtyard."
  },
  {
    "name": "Bungalow on Maple Street",
    "tier": "Starter Home",
    "mode": "buy",
    "price": 135000,
    "blurb": "A cozy single-story starter home with a small yard."
  },
  {
    "name": "Suburban Ranch House",
    "tier": "Starter Home",
    "mode": "buy",
    "price": 155000,
    "blurb": "A classic single-level ranch in a quiet subdivision."
  },
  {
    "name": "Townhouse Row Unit",
    "tier": "Starter Home",
    "mode": "buy",
    "price": 175000,
    "blurb": "A three-story townhouse in a new development."
  },
  {
    "name": "Craftsman Starter Cottage",
    "tier": "Starter Home",
    "mode": "buy",
    "price": 200000,
    "blurb": "A restored early-1900s craftsman cottage."
  },
  {
    "name": "Cul-de-Sac Family Home",
    "tier": "Starter Home",
    "mode": "buy",
    "price": 220000,
    "blurb": "A modest 3-bedroom on a quiet cul-de-sac."
  },
  {
    "name": "Fixer-Upper Colonial",
    "tier": "Starter Home",
    "mode": "buy",
    "price": 245000,
    "blurb": "An older colonial with good bones and room to renovate."
  },
  {
    "name": "Duplex Half \u2014 Owner's Side",
    "tier": "Starter Home",
    "mode": "buy",
    "price": 270000,
    "blurb": "One half of a duplex, ideal as a first purchase."
  },
  {
    "name": "Starter Split-Level",
    "tier": "Starter Home",
    "mode": "buy",
    "price": 270000,
    "blurb": "A split-level home in an established neighborhood."
  },
  {
    "name": "Corner-Lot Cape Cod",
    "tier": "Starter Home",
    "mode": "buy",
    "price": 295000,
    "blurb": "A tidy Cape Cod-style home on a corner lot."
  },
  {
    "name": "New-Build Micro Home",
    "tier": "Starter Home",
    "mode": "buy",
    "price": 320000,
    "blurb": "A brand-new compact home in a starter-home community."
  },
  {
    "name": "Colonial-Style Family Home",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 315000,
    "blurb": "A traditional colonial with a finished basement."
  },
  {
    "name": "Modern Townhouse",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 360000,
    "blurb": "A three-bedroom townhouse with a rooftop deck."
  },
  {
    "name": "Lakeview Cottage",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 400000,
    "blurb": "A four-season cottage with private lake access."
  },
  {
    "name": "Craftsman Family House",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 445000,
    "blurb": "A well-kept craftsman with a wraparound porch."
  },
  {
    "name": "Golf Course Villa",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 490000,
    "blurb": "A single-story villa bordering the local golf course."
  },
  {
    "name": "Contemporary Split-Level",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 535000,
    "blurb": "A renovated split-level with an open kitchen."
  },
  {
    "name": "Hillside Bungalow",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 580000,
    "blurb": "A bungalow set into a wooded hillside lot."
  },
  {
    "name": "Suburban Two-Story",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 580000,
    "blurb": "A five-bedroom two-story in a top school district."
  },
  {
    "name": "Renovated Farmhouse",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 625000,
    "blurb": "A century farmhouse fully modernized inside."
  },
  {
    "name": "Gated Community Home",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 670000,
    "blurb": "A home inside a gated community with shared amenities."
  },
  {
    "name": "Riverside Ranch",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 715000,
    "blurb": "A ranch-style home with a private dock."
  },
  {
    "name": "Modern Duplex \u2014 Full Building",
    "tier": "Mid-Range Home",
    "mode": "buy",
    "price": 765000,
    "blurb": "Both units of a modern duplex, owner-occupied plus rental income."
  },
  {
    "name": "Hillside Modern Estate",
    "tier": "Luxury Home",
    "mode": "buy",
    "price": 770000,
    "blurb": "A glass-walled modern home overlooking the valley."
  },
  {
    "name": "Gated Luxury Colonial",
    "tier": "Luxury Home",
    "mode": "buy",
    "price": 930000,
    "blurb": "A grand colonial inside a private gated enclave."
  },
  {
    "name": "Coastal Contemporary",
    "tier": "Luxury Home",
    "mode": "buy",
    "price": 1100000,
    "blurb": "A contemporary build a short walk from the coast."
  },
  {
    "name": "Vineyard Estate House",
    "tier": "Luxury Home",
    "mode": "buy",
    "price": 1275000,
    "blurb": "A stone estate house set among private vineyards."
  },
  {
    "name": "Private Golf Estate",
    "tier": "Luxury Home",
    "mode": "buy",
    "price": 1425000,
    "blurb": "A luxury home on the fairway of a private course."
  },
  {
    "name": "Downtown Luxury Townhome",
    "tier": "Luxury Home",
    "mode": "buy",
    "price": 1625000,
    "blurb": "A four-story luxury townhome with a private elevator."
  },
  {
    "name": "Lakefront Luxury Villa",
    "tier": "Luxury Home",
    "mode": "buy",
    "price": 1800000,
    "blurb": "A villa with a private boathouse and dock."
  },
  {
    "name": "Architect-Designed Estate",
    "tier": "Luxury Home",
    "mode": "buy",
    "price": 1825000,
    "blurb": "A custom architect-built home with a home theater."
  },
  {
    "name": "Equestrian Estate",
    "tier": "Luxury Home",
    "mode": "buy",
    "price": 2000000,
    "blurb": "An estate home with stables and riding grounds."
  },
  {
    "name": "Modern Farmhouse Estate",
    "tier": "Luxury Home",
    "mode": "buy",
    "price": 2175000,
    "blurb": "A large modern-farmhouse-style estate on acreage."
  },
  {
    "name": "Suburban Mansion",
    "tier": "Mansion / Estate",
    "mode": "buy",
    "price": 2300000,
    "blurb": "A sprawling mansion with a home gym and screening room."
  },
  {
    "name": "Countryside Manor",
    "tier": "Mansion / Estate",
    "mode": "buy",
    "price": 3050000,
    "blurb": "A stone manor house set on private countryside acreage."
  },
  {
    "name": "Cliffside Mansion",
    "tier": "Mansion / Estate",
    "mode": "buy",
    "price": 3800000,
    "blurb": "A mansion perched above the coastline with ocean views."
  },
  {
    "name": "Historic Estate Manor",
    "tier": "Mansion / Estate",
    "mode": "buy",
    "price": 4575000,
    "blurb": "A restored historic manor with formal gardens."
  },
  {
    "name": "Gated Hilltop Mansion",
    "tier": "Mansion / Estate",
    "mode": "buy",
    "price": 5375000,
    "blurb": "A hilltop mansion with panoramic city views."
  },
  {
    "name": "Private Island Villa",
    "tier": "Mansion / Estate",
    "mode": "buy",
    "price": 6175000,
    "blurb": "A villa occupying its own small private island."
  },
  {
    "name": "Modern Glass Mansion",
    "tier": "Mansion / Estate",
    "mode": "buy",
    "price": 7025000,
    "blurb": "A minimalist glass-and-concrete mansion with an infinity pool."
  },
  {
    "name": "Chateau-Style Estate",
    "tier": "Mansion / Estate",
    "mode": "buy",
    "price": 7275000,
    "blurb": "A French chateau-inspired estate with a grand foyer."
  },
  {
    "name": "Downtown Penthouse Suite",
    "tier": "Ultra Luxury",
    "mode": "buy",
    "price": 7675000,
    "blurb": "A full-floor penthouse atop the city's tallest tower."
  },
  {
    "name": "Beverly Hills-Style Villa",
    "tier": "Ultra Luxury",
    "mode": "buy",
    "price": 10550000,
    "blurb": "A celebrity-style villa with a private screening room."
  },
  {
    "name": "Beachfront Ultra-Villa",
    "tier": "Ultra Luxury",
    "mode": "buy",
    "price": 13500000,
    "blurb": "A beachfront estate with direct private beach access."
  },
  {
    "name": "Alpine Ski Chalet",
    "tier": "Ultra Luxury",
    "mode": "buy",
    "price": 16525000,
    "blurb": "A private chalet with ski-in, ski-out access."
  },
  {
    "name": "Skyline Sky Villa",
    "tier": "Ultra Luxury",
    "mode": "buy",
    "price": 19625000,
    "blurb": "A duplex sky villa spanning the top two floors of a supertall."
  },
  {
    "name": "Private Peninsula Estate",
    "tier": "Ultra Luxury",
    "mode": "buy",
    "price": 22800000,
    "blurb": "An estate occupying its own gated peninsula."
  },
  {
    "name": "Historic Palace Residence",
    "tier": "Ultra Luxury",
    "mode": "buy",
    "price": 26050000,
    "blurb": "A converted palace residence with a private art gallery."
  },
  {
    "name": "Megayacht Marina Estate",
    "tier": "Ultra Luxury",
    "mode": "buy",
    "price": 27125000,
    "blurb": "An estate with its own private megayacht berth."
  }
];
