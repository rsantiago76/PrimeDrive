import React from 'react';
import { Car, Zap, Gauge, Users, Battery, Settings, Shield, Wifi, Radio, Navigation, Sun, Wind, Snowflake } from 'lucide-react';
const primeAstraExterior = "https://placehold.co/600x400?text=Prime+Astra+Exterior";
const primeAstraRear = "https://placehold.co/600x400?text=Prime+Astra+Rear";
const primeAstraTrunk = "https://placehold.co/600x400?text=Prime+Astra+Trunk";
const primeAstraInterior = "https://placehold.co/600x400?text=Prime+Astra+Interior";
const primeAstraRearSeats = "https://placehold.co/600x400?text=Prime+Astra+Rear+Seats";
const neonRoverExterior = "https://placehold.co/600x400?text=Neon+Rover+Exterior";
const neonRoverDashboard = "https://placehold.co/600x400?text=Neon+Rover+Dashboard";
const neonRoverInterior = "https://placehold.co/600x400?text=Neon+Rover+Interior";
const neonRoverRear = "https://placehold.co/600x400?text=Neon+Rover+Rear";
const neonRoverCargo = "https://placehold.co/600x400?text=Neon+Rover+Cargo";
const cargoXExterior = "https://placehold.co/600x400?text=CargoX+Exterior";
const cargoXInterior = "https://placehold.co/600x400?text=CargoX+Interior";
const cargoXRear = "https://placehold.co/600x400?text=CargoX+Rear";
const cargoXDashboard = "https://placehold.co/600x400?text=CargoX+Dashboard";
const cargoXCargo = "https://placehold.co/600x400?text=CargoX+Cargo";
const terraHaulerExterior = "https://placehold.co/600x400?text=Terra+Hauler+Exterior";
const terraHaulerRear = "https://placehold.co/600x400?text=Terra+Hauler+Rear";
const terraHaulerRearSeats = "https://placehold.co/600x400?text=Terra+Hauler+Rear+Seats";
const terraHaulerDashboard = "https://placehold.co/600x400?text=Terra+Hauler+Dashboard";
const terraHaulerInterior = "https://placehold.co/600x400?text=Terra+Hauler+Interior";
const terraHaulerBed = "https://placehold.co/600x400?text=Terra+Hauler+Bed";

export interface VehicleData {
  id: string;
  name: string;
  category: string;
  fleetId: string;
  dailyRate: number;
  available: boolean;
  featured?: boolean;
  heroImage?: string;
  galleryImages?: string[];
  specs: {
    range: { value: string; unit: string; icon: React.ReactNode };
    acceleration: { value: string; unit: string; icon: React.ReactNode };
    seating: { value: string; unit: string; icon: React.ReactNode };
    power?: { value: string; unit: string; icon: React.ReactNode };
  };
  features: Array<{
    category: string;
    items: Array<{ icon: React.ReactNode; label: string; description: string }>;
  }>;
  description: string;
  highlights: string[];
}

export const vehicleData: { [key: string]: VehicleData } = {
  'prime-astra': {
    id: 'prime-astra',
    name: 'Prime Astra',
    category: 'Executive Sedan',
    fleetId: 'PD-AST-2847',
    dailyRate: 89,
    available: true,
    heroImage: primeAstraExterior,
    galleryImages: [primeAstraInterior, primeAstraRearSeats, primeAstraRear, primeAstraTrunk],
    description: 'The Prime Astra represents the pinnacle of intelligent mobility. Engineered for executives who demand performance without compromise, this sedan combines cutting-edge autonomous capabilities with luxurious refinement.',
    highlights: [
      'Dual-motor all-wheel drive system',
      'Advanced driver assistance suite',
      'Premium noise-canceling cabin',
      'Adaptive air suspension',
    ],
    specs: {
      range: { value: '412', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '3.8', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '5', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
    },
    features: [
      {
        category: 'Powertrain & Performance',
        items: [
          { icon: <Zap className="w-5 h-5" />, label: 'Dual Motor AWD', description: '350 hp combined output' },
          { icon: <Battery className="w-5 h-5" />, label: 'Extended Range Battery', description: '412 miles EPA estimated' },
          { icon: <Gauge className="w-5 h-5" />, label: 'Adaptive Suspension', description: 'Real-time road adjustment' },
        ],
      },
      {
        category: 'Intelligent Systems',
        items: [
          { icon: <Shield className="w-5 h-5" />, label: 'AutoPilot Suite', description: 'Full self-driving capability' },
          { icon: <Wifi className="w-5 h-5" />, label: '5G Connectivity', description: 'Always-on cloud integration' },
          { icon: <Radio className="w-5 h-5" />, label: 'Premium Sound', description: '14-speaker immersive audio' },
        ],
      },
      {
        category: 'Comfort & Convenience',
        items: [
          { icon: <Sun className="w-5 h-5" />, label: 'Glass Roof', description: 'Panoramic UV-filtering canopy' },
          { icon: <Wind className="w-5 h-5" />, label: 'Climate Control', description: 'Tri-zone automatic system' },
          { icon: <Navigation className="w-5 h-5" />, label: 'Neural Nav', description: 'AI-powered route optimization' },
        ],
      },
    ],
  },
  'prime-astra-sport': {
    id: 'prime-astra-sport',
    name: 'Prime Astra Sport',
    category: 'Performance Sedan',
    fleetId: 'PD-AST-3012',
    dailyRate: 129,
    available: true,
    heroImage: primeAstraExterior,
    galleryImages: [primeAstraInterior, primeAstraRearSeats],
    description: 'The performance variant of our flagship sedan. Enhanced powertrain, track-tuned suspension, and aggressive styling for drivers who demand maximum performance.',
    highlights: [
      'Tri-motor performance configuration',
      'Carbon ceramic braking system',
      'Track mode with launch control',
      'Sport-tuned adaptive suspension',
    ],
    specs: {
      range: { value: '380', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '2.9', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '4', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
    },
    features: [
      {
        category: 'Performance',
        items: [
          { icon: <Zap className="w-5 h-5" />, label: 'Tri-Motor Setup', description: '520 hp track-ready power' },
          { icon: <Gauge className="w-5 h-5" />, label: 'Track Suspension', description: 'Adjustable damping system' },
          { icon: <Settings className="w-5 h-5" />, label: 'Launch Control', description: 'Optimized acceleration mode' },
        ],
      },
      {
        category: 'Technology',
        items: [
          { icon: <Shield className="w-5 h-5" />, label: 'Performance Brakes', description: 'Carbon ceramic rotors' },
          { icon: <Wifi className="w-5 h-5" />, label: 'Telemetry System', description: 'Track data recording' },
          { icon: <Radio className="w-5 h-5" />, label: 'Sport Sound', description: 'Enhanced audio experience' },
        ],
      },
      {
        category: 'Interior',
        items: [
          { icon: <Users className="w-5 h-5" />, label: 'Sport Seats', description: 'Carbon fiber bucket seats' },
          { icon: <Navigation className="w-5 h-5" />, label: 'Digital Cockpit', description: 'Performance-focused display' },
          { icon: <Wind className="w-5 h-5" />, label: 'Climate Control', description: 'Dual-zone automatic' },
        ],
      },
    ],
  },
  'urban-glide': {
    id: 'urban-glide',
    name: 'Urban Glide',
    category: 'Compact City Car',
    fleetId: 'PD-URB-2634',
    dailyRate: 59,
    available: true,
    heroImage: primeAstraExterior,
    galleryImages: [primeAstraInterior],
    description: 'Perfect for city navigation and short trips. The Urban Glide combines efficiency, compact dimensions, and intelligent parking assist for the ultimate urban mobility solution.',
    highlights: [
      'Ultra-compact design for tight spaces',
      'Auto-parking with 360° cameras',
      'Efficient single-motor drivetrain',
      'Ideal for ride-sharing operations',
    ],
    specs: {
      range: { value: '245', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '7.8', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '4', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
    },
    features: [
      {
        category: 'City Features',
        items: [
          { icon: <Navigation className="w-5 h-5" />, label: 'Auto Parking', description: 'Parallel and perpendicular' },
          { icon: <Shield className="w-5 h-5" />, label: '360° Cameras', description: 'Full surround view' },
          { icon: <Settings className="w-5 h-5" />, label: 'Compact Design', description: '12.5 ft turning radius' },
        ],
      },
      {
        category: 'Efficiency',
        items: [
          { icon: <Battery className="w-5 h-5" />, label: 'Fast Charging', description: '80% in 25 minutes' },
          { icon: <Zap className="w-5 h-5" />, label: 'Regenerative Braking', description: 'Extended city range' },
          { icon: <Gauge className="w-5 h-5" />, label: 'Eco Mode', description: 'Maximum efficiency setting' },
        ],
      },
      {
        category: 'Connectivity',
        items: [
          { icon: <Wifi className="w-5 h-5" />, label: 'Fleet Ready', description: 'Share/rental integration' },
          { icon: <Radio className="w-5 h-5" />, label: 'Smart Audio', description: '6-speaker system' },
          { icon: <Wind className="w-5 h-5" />, label: 'Climate Control', description: 'Automatic temperature' },
        ],
      },
    ],
  },
  'neon-rover': {
    id: 'neon-rover',
    name: 'Neon Rover',
    category: 'Intelligent SUV',
    fleetId: 'PD-ROV-2891',
    dailyRate: 119,
    available: true,
    heroImage: neonRoverExterior,
    galleryImages: [neonRoverInterior, neonRoverRear, neonRoverDashboard, neonRoverCargo],
    description: 'The Neon Rover redefines what an SUV can be. With intelligent traction control, adaptive ride technology, and spacious luxury for seven, it\'s engineered for families and adventurers who refuse to compromise.',
    highlights: [
      'Tri-motor all-wheel drive with torque vectoring',
      'Intelligent terrain response system',
      'Spacious 7-passenger configuration',
      'Adaptive air suspension with off-road modes',
    ],
    specs: {
      range: { value: '385', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '4.2', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '7', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
    },
    features: [
      {
        category: 'Traction & Control',
        items: [
          { icon: <Zap className="w-5 h-5" />, label: 'Tri-Motor AWD', description: '420 hp intelligent distribution' },
          { icon: <Settings className="w-5 h-5" />, label: 'Terrain Response', description: 'Auto-adaptive traction modes' },
          { icon: <Gauge className="w-5 h-5" />, label: 'Dynamic Suspension', description: 'Air ride with lift capability' },
        ],
      },
      {
        category: 'Spacious Interior',
        items: [
          { icon: <Users className="w-5 h-5" />, label: '7-Passenger Seating', description: 'Captain chairs or bench config' },
          { icon: <Wind className="w-5 h-5" />, label: 'Quad-Zone Climate', description: 'Individual temp control' },
          { icon: <Sun className="w-5 h-5" />, label: 'Expansive Glass', description: 'Panoramic roof system' },
        ],
      },
      {
        category: 'Advanced Tech',
        items: [
          { icon: <Shield className="w-5 h-5" />, label: 'Guardian Suite', description: '360° collision avoidance' },
          { icon: <Wifi className="w-5 h-5" />, label: 'Dual Screen Display', description: 'Front and rear entertainment' },
          { icon: <Radio className="w-5 h-5" />, label: 'Studio Sound', description: '18-speaker premium system' },
        ],
      },
    ],
  },
  'neon-rover-max': {
    id: 'neon-rover-max',
    name: 'Neon Rover Max',
    category: 'Premium SUV',
    fleetId: 'PD-ROV-3104',
    dailyRate: 159,
    available: false,
    heroImage: neonRoverExterior,
    galleryImages: [neonRoverInterior, neonRoverDashboard, neonRoverCargo],
    description: 'The ultimate expression of luxury and capability. The Neon Rover Max features executive-grade interior appointments, extended range battery, and premium technology suite.',
    highlights: [
      'Extended range 450-mile battery pack',
      'Luxury executive seating package',
      'Premium Meridian sound system',
      'Advanced air suspension with memory',
    ],
    specs: {
      range: { value: '450', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '3.8', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '6', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
    },
    features: [
      {
        category: 'Luxury Interior',
        items: [
          { icon: <Users className="w-5 h-5" />, label: 'Executive Seating', description: 'Massage and ventilation' },
          { icon: <Radio className="w-5 h-5" />, label: 'Meridian Audio', description: '24-speaker premium sound' },
          { icon: <Sun className="w-5 h-5" />, label: 'Panoramic Roof', description: 'Electrochromic glass' },
        ],
      },
      {
        category: 'Performance',
        items: [
          { icon: <Zap className="w-5 h-5" />, label: 'Quad-Motor AWD', description: '550 hp total output' },
          { icon: <Gauge className="w-5 h-5" />, label: 'Adaptive Air Ride', description: 'Five height settings' },
          { icon: <Battery className="w-5 h-5" />, label: 'Extended Range', description: '450 miles per charge' },
        ],
      },
      {
        category: 'Technology',
        items: [
          { icon: <Shield className="w-5 h-5" />, label: 'Full Autonomy', description: 'Level 4 self-driving' },
          { icon: <Wifi className="w-5 h-5" />, label: '5G Ultra', description: 'Multi-device hotspot' },
          { icon: <Navigation className="w-5 h-5" />, label: 'Neural Nav Pro', description: 'Predictive routing AI' },
        ],
      },
    ],
  },
  'terra-hauler': {
    id: 'terra-hauler',
    name: 'Terra Hauler',
    category: 'Heavy-Duty Truck',
    fleetId: 'PD-TRK-2903',
    dailyRate: 149,
    available: true,
    heroImage: terraHaulerRear,
    galleryImages: [terraHaulerRearSeats, terraHaulerDashboard, terraHaulerInterior, terraHaulerBed],
    description: 'The Terra Hauler is built for serious work. With exceptional torque, massive hauling capacity, and rugged construction, this truck handles the toughest jobs while delivering the intelligence and efficiency of the Prime-Drive platform.',
    highlights: [
      'Quad-motor powertrain with instant torque',
      'Reinforced chassis for heavy payloads',
      'Advanced towing assist technology',
      'All-terrain capability with locking differentials',
    ],
    specs: {
      range: { value: '340', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '5.1', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '5', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
      power: { value: '480', unit: 'hp', icon: <Gauge className="w-6 h-6 text-[#EF4444]" /> },
    },
    features: [
      {
        category: 'Power & Capability',
        items: [
          { icon: <Zap className="w-5 h-5" />, label: 'Quad-Motor System', description: '480 hp with 800 lb-ft torque' },
          { icon: <Gauge className="w-5 h-5" />, label: 'Towing Capacity', description: 'Up to 14,000 lbs' },
          { icon: <Settings className="w-5 h-5" />, label: 'Payload Rating', description: '3,500 lbs truck bed capacity' },
        ],
      },
      {
        category: 'Rugged Construction',
        items: [
          { icon: <Shield className="w-5 h-5" />, label: 'Reinforced Frame', description: 'Military-grade steel chassis' },
          { icon: <Car className="w-5 h-5" />, label: 'All-Terrain Tires', description: 'LT-rated off-road capability' },
          { icon: <Wind className="w-5 h-5" />, label: 'Weather Sealed', description: 'IP67 water/dust resistance' },
        ],
      },
      {
        category: 'Work Technology',
        items: [
          { icon: <Navigation className="w-5 h-5" />, label: 'Towing Assist', description: 'AI-guided trailer alignment' },
          { icon: <Wifi className="w-5 h-5" />, label: 'Fleet Integration', description: 'Real-time job tracking' },
          { icon: <Battery className="w-5 h-5" />, label: 'Power Export', description: '9.6 kW mobile power station' },
        ],
      },
    ],
  },
  'terra-hauler-pro': {
    id: 'terra-hauler-pro',
    name: 'Terra Hauler Pro',
    category: 'Commercial Truck',
    fleetId: 'PD-TRK-3201',
    dailyRate: 179,
    available: true,
    heroImage: terraHaulerExterior,
    galleryImages: [terraHaulerInterior, terraHaulerBed],
    description: 'Built for commercial operations that demand maximum capability. Enhanced towing, heavy-duty construction, and fleet management integration for serious work.',
    highlights: [
      'Enhanced 18,000 lbs towing capacity',
      'Commercial-grade suspension system',
      'Dual rear wheels configuration',
      'Integrated fleet management system',
    ],
    specs: {
      range: { value: '320', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '6.5', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '6', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
      power: { value: '620', unit: 'hp', icon: <Gauge className="w-6 h-6 text-[#EF4444]" /> },
    },
    features: [
      {
        category: 'Heavy Duty',
        items: [
          { icon: <Gauge className="w-5 h-5" />, label: 'Max Towing', description: '18,000 lbs capacity' },
          { icon: <Zap className="w-5 h-5" />, label: 'Six-Motor System', description: '620 hp commercial power' },
          { icon: <Settings className="w-5 h-5" />, label: 'Payload', description: '4,500 lbs bed capacity' },
        ],
      },
      {
        category: 'Commercial Features',
        items: [
          { icon: <Wifi className="w-5 h-5" />, label: 'Fleet Integration', description: 'Real-time tracking' },
          { icon: <Shield className="w-5 h-5" />, label: 'Cargo Security', description: 'GPS-enabled monitoring' },
          { icon: <Car className="w-5 h-5" />, label: 'Dually Config', description: 'Dual rear wheels' },
        ],
      },
      {
        category: 'Work Tech',
        items: [
          { icon: <Battery className="w-5 h-5" />, label: 'Power Station', description: '15 kW mobile power' },
          { icon: <Navigation className="w-5 h-5" />, label: 'Towing Assist Pro', description: 'Advanced trailer AI' },
          { icon: <Wind className="w-5 h-5" />, label: 'Commercial HVAC', description: 'Heavy-duty climate' },
        ],
      },
    ],
  },
  'cargox': {
    id: 'cargox',
    name: 'CargoX',
    category: 'Commercial Cargo Van',
    fleetId: 'PD-VAN-2756',
    dailyRate: 99,
    available: true,
    heroImage: cargoXExterior,
    galleryImages: [cargoXInterior, cargoXCargo],
    description: 'The CargoX is purpose-built for commercial operations. With massive cargo space, fleet-ready technology, and efficient electric operation, it\'s the intelligent choice for last-mile delivery and business logistics.',
    highlights: [
      'Optimized cargo volume with low load height',
      'Fleet management integration ready',
      'Sliding side doors for quick access',
      'Modular interior partition system',
    ],
    specs: {
      range: { value: '295', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '6.2', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '3', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
      power: { value: '280', unit: 'hp', icon: <Gauge className="w-6 h-6 text-[#22D3EE]" /> },
    },
    features: [
      {
        category: 'Cargo Capacity',
        items: [
          { icon: <Car className="w-5 h-5" />, label: 'Cargo Volume', description: '488 cu ft interior space' },
          { icon: <Settings className="w-5 h-5" />, label: 'Modular Shelving', description: 'Configurable partition system' },
          { icon: <Gauge className="w-5 h-5" />, label: 'Low Load Height', description: '22-inch bed height for easy loading' },
        ],
      },
      {
        category: 'Fleet Operations',
        items: [
          { icon: <Wifi className="w-5 h-5" />, label: 'Fleet Connect', description: 'Real-time dispatch integration' },
          { icon: <Navigation className="w-5 h-5" />, label: 'Route Optimization', description: 'AI-powered delivery routing' },
          { icon: <Shield className="w-5 h-5" />, label: 'Cargo Security', description: 'Remote lock/unlock system' },
        ],
      },
      {
        category: 'Efficiency',
        items: [
          { icon: <Battery className="w-5 h-5" />, label: 'Fast Charging', description: '80% charge in 35 minutes' },
          { icon: <Zap className="w-5 h-5" />, label: 'Regenerative Braking', description: 'Extended range in city driving' },
          { icon: <Wind className="w-5 h-5" />, label: 'Climate Control', description: 'Dual-zone with cargo area option' },
        ],
      },
    ],
  },
  'cargox-xl': {
    id: 'cargox-xl',
    name: 'CargoX XL',
    category: 'Large Cargo Van',
    fleetId: 'PD-VAN-3087',
    dailyRate: 119,
    available: true,
    heroImage: cargoXExterior,
    galleryImages: [cargoXInterior, cargoXCargo],
    description: 'Maximum cargo capacity for large-scale logistics. Extended wheelbase provides 600+ cubic feet of space with commercial-grade payload rating.',
    highlights: [
      'Extended 600+ cubic feet capacity',
      'High roof for standing workspace',
      'Commercial payload rating',
      'Dual sliding doors for access',
    ],
    specs: {
      range: { value: '280', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '7.5', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '3', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
      power: { value: '320', unit: 'hp', icon: <Gauge className="w-6 h-6 text-[#22D3EE]" /> },
    },
    features: [
      {
        category: 'Maximum Capacity',
        items: [
          { icon: <Car className="w-5 h-5" />, label: 'Cargo Volume', description: '600+ cu ft interior' },
          { icon: <Gauge className="w-5 h-5" />, label: 'High Roof', description: '6\'2" interior height' },
          { icon: <Settings className="w-5 h-5" />, label: 'Payload', description: '4,200 lbs capacity' },
        ],
      },
      {
        category: 'Commercial Grade',
        items: [
          { icon: <Wifi className="w-5 h-5" />, label: 'Fleet Management', description: 'Advanced tracking' },
          { icon: <Shield className="w-5 h-5" />, label: 'Security Suite', description: 'GPS monitoring' },
          { icon: <Navigation className="w-5 h-5" />, label: 'Route Planning', description: 'Multi-stop AI' },
        ],
      },
      {
        category: 'Work Features',
        items: [
          { icon: <Battery className="w-5 h-5" />, label: 'Fast Charging', description: '80% in 40 minutes' },
          { icon: <Zap className="w-5 h-5" />, label: 'Power Export', description: '5 kW work site power' },
          { icon: <Wind className="w-5 h-5" />, label: 'Cargo Climate', description: 'Optional cargo cooling' },
        ],
      },
    ],
  },
  'fleet-shuttle': {
    id: 'fleet-shuttle',
    name: 'Fleet Shuttle',
    category: 'Passenger Van',
    fleetId: 'PD-SHU-2811',
    dailyRate: 139,
    available: true,
    heroImage: cargoXExterior,
    galleryImages: [cargoXInterior],
    description: 'Designed for group transportation and shuttle services. The Fleet Shuttle seats up to 12 passengers comfortably with enterprise-grade connectivity and safety features.',
    highlights: [
      'Spacious 12-passenger configuration',
      'ADA-compliant accessibility options',
      'Rear entertainment system',
      'Commercial-grade HVAC system',
    ],
    specs: {
      range: { value: '310', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '8.1', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '12', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
    },
    features: [
      {
        category: 'Passenger Comfort',
        items: [
          { icon: <Users className="w-5 h-5" />, label: '12 Passengers', description: 'Individual climate zones' },
          { icon: <Wind className="w-5 h-5" />, label: 'Premium HVAC', description: 'Commercial-grade system' },
          { icon: <Radio className="w-5 h-5" />, label: 'Entertainment', description: 'Rear screen system' },
        ],
      },
      {
        category: 'Fleet Operations',
        items: [
          { icon: <Wifi className="w-5 h-5" />, label: 'Fleet Connect Pro', description: 'Real-time dispatch' },
          { icon: <Navigation className="w-5 h-5" />, label: 'Route Planning', description: 'Multi-stop optimization' },
          { icon: <Shield className="w-5 h-5" />, label: 'Safety Suite', description: 'Commercial-grade sensors' },
        ],
      },
      {
        category: 'Accessibility',
        items: [
          { icon: <Settings className="w-5 h-5" />, label: 'ADA Ready', description: 'Wheelchair accessibility' },
          { icon: <Car className="w-5 h-5" />, label: 'Low Floor', description: 'Easy entry/exit design' },
          { icon: <Gauge className="w-5 h-5" />, label: 'Air Suspension', description: 'Kneeling capability' },
        ],
      },
    ],
  },
  'sprint-courier': {
    id: 'sprint-courier',
    name: 'Sprint Courier',
    category: 'Compact Cargo Van',
    fleetId: 'PD-VAN-2598',
    dailyRate: 79,
    available: true,
    heroImage: cargoXExterior,
    galleryImages: [cargoXCargo],
    description: 'The agile solution for urban delivery. Compact exterior with optimized cargo space, perfect for last-mile logistics and quick city deliveries.',
    highlights: [
      'Compact footprint for city navigation',
      'Sliding side and rear barn doors',
      '280 cubic feet cargo volume',
      'Integrated delivery management',
    ],
    specs: {
      range: { value: '265', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '6.8', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '2', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
      power: { value: '200', unit: 'hp', icon: <Gauge className="w-6 h-6 text-[#22D3EE]" /> },
    },
    features: [
      {
        category: 'Cargo Efficiency',
        items: [
          { icon: <Car className="w-5 h-5" />, label: 'Cargo Volume', description: '280 cu ft interior' },
          { icon: <Settings className="w-5 h-5" />, label: 'Smart Shelving', description: 'Modular organization' },
          { icon: <Gauge className="w-5 h-5" />, label: 'Easy Access', description: 'Low 20-inch load height' },
        ],
      },
      {
        category: 'Last Mile',
        items: [
          { icon: <Navigation className="w-5 h-5" />, label: 'Delivery AI', description: 'Route optimization' },
          { icon: <Wifi className="w-5 h-5" />, label: 'Package Tracking', description: 'Real-time updates' },
          { icon: <Shield className="w-5 h-5" />, label: 'Cargo Lock', description: 'Remote security system' },
        ],
      },
      {
        category: 'Urban Ready',
        items: [
          { icon: <Battery className="w-5 h-5" />, label: 'Fast Charge', description: '80% in 30 minutes' },
          { icon: <Zap className="w-5 h-5" />, label: 'Regen Braking', description: 'City range extension' },
          { icon: <Wind className="w-5 h-5" />, label: 'Climate Control', description: 'Driver comfort system' },
        ],
      },
    ],
  },
  'executive-sedan': {
    id: 'executive-sedan',
    name: 'Executive Sedan',
    category: 'Luxury Sedan',
    fleetId: 'PD-EXE-2719',
    dailyRate: 169,
    available: false,
    heroImage: primeAstraExterior,
    galleryImages: [primeAstraInterior, primeAstraRearSeats, primeAstraRear],
    description: 'Ultimate executive transportation with chauffeur-focused features. Rear-seat luxury appointments, privacy glass, and premium amenities for VIP service.',
    highlights: [
      'Executive rear seat package',
      'Privacy partition with controls',
      'Premium leather and wood trim',
      'Rear-seat entertainment suite',
    ],
    specs: {
      range: { value: '425', unit: 'mi', icon: <Battery className="w-6 h-6 text-[#22D3EE]" /> },
      acceleration: { value: '4.1', unit: 'sec', icon: <Zap className="w-6 h-6 text-[#10B981]" /> },
      seating: { value: '5', unit: 'seats', icon: <Users className="w-6 h-6 text-[#F59E0B]" /> },
    },
    features: [
      {
        category: 'Executive Comfort',
        items: [
          { icon: <Users className="w-5 h-5" />, label: 'Rear Luxury Seats', description: 'Massage and heating' },
          { icon: <Radio className="w-5 h-5" />, label: 'Entertainment', description: 'Dual rear screens' },
          { icon: <Wind className="w-5 h-5" />, label: 'Quad Climate', description: 'Individual zone control' },
        ],
      },
      {
        category: 'Privacy & Security',
        items: [
          { icon: <Shield className="w-5 h-5" />, label: 'Privacy Glass', description: 'Electrochromic windows' },
          { icon: <Settings className="w-5 h-5" />, label: 'Partition', description: 'Power privacy screen' },
          { icon: <Wifi className="w-5 h-5" />, label: 'Secure Comms', description: 'Encrypted connectivity' },
        ],
      },
      {
        category: 'Premium Features',
        items: [
          { icon: <Sun className="w-5 h-5" />, label: 'Ambient Lighting', description: '64-color customization' },
          { icon: <Navigation className="w-5 h-5" />, label: 'Chauffeur Mode', description: 'Optimized for passengers' },
          { icon: <Battery className="w-5 h-5" />, label: 'Extended Range', description: '425 miles per charge' },
        ],
      },
    ],
  },
};