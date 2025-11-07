require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Product = require('./models/Product');

// All products/subcategories organized by category
const productsByCategory = {
  'Periodic Services': [
    { title: 'Basic Service', detail: ' • 1000 Kms or 1 Month Warranty • Every 5000 Kms or 3 Months (Recommended)', time: '4 Hrs Taken', details: ['Wiper Fluid Replacement', 'Battery Water Top Up', 'Car Wash', 'Engine Oil Replacement', 'Interior Vacuuming ( Carpet & Seats )', ''], price: 999 },
    { title: 'Standard Service', detail: ' • 1000 Kms or 1 Month Warranty • Every 10,000 Kms or 6 Months (Recommended)', time: '6 Hrs Taken', details: ['Car Scanning', 'Battery Water Top up', 'Interior Vacuuming ( Carpet & Seats )', 'Wiper Fluid Replacement', 'Car Wash', 'Front Brake Pads Serviced'], price: 1999 },
    { title: 'Comprehensive Service', detail: ' • 1000 Kms or 1 Month Warranty • Every 20,000 Kms or 12 Months (Recommended)', time: '8 Hrs Taken', details: ['AC Filter Replacement', 'Wiper Fluid Replacement', 'Interior Vacuuming ( Carpet & Seats )', 'Wheel Balancing', 'Fuel Filter Checking', 'Battery Water Top up'], price: 2999 },
    { title: 'Front Brake Pads', detail: '• 1 Month Warranty • Every 20,000 Kms or 12 Months (Recommended)', time: 'Takes 3 Hours', details: ['Opening & Fitting of Front Brake Pads', 'Applicable for Set of 2 Front Brake Pads', 'Front Brake Disc Cleaning', 'Front Brake Pads Replacement (GoMechanic)', 'Inspection of Front Brake Calipers', ''], price: 1499 },
    { title: 'Rear Brake Shoes', detail: '• 1 Month Warranty • Every 20,000 Kms or 12 Months (Recommended)', time: 'Takes 3 Hours', details: ['Opening & Fitting of Rear Brake Pads', 'Applicable for Set of 2 Rear Brake Pads', 'Rear Brake Disc Cleaning', 'Rear Brake Shoes Replacement (OES)', 'Inspection of Rear Brake Calipers', ''], price: 1499 },
    { title: 'Front Brake Discs', detail: '• 1 Month Warranty • Corrosion Resistance', time: 'Takes 5 Hours', details: ['Front Brake Disc Replacement (Single OES Unit)', 'Reduces Vibrations and Brake Noises', 'Free Pickup & Drop', 'Opening & Fitting of Front Brake Disc', 'Increases Brake Life & Safety', ''], price: 2499 },
    { title: 'Caliper Pin Replacement', detail: '• Recommended: In case of Noise coming from Brakes', time: 'Takes 8 Hours', details: ['Caliper Pin Replacement (OES)', 'Caliper Assembly Cost Additional', 'Opening & Fitting of Caliper Pin', 'Free Pickup & Drop', '', ''], price: 1999 },
    { title: 'Disc Turning', detail: '• 1 Month Warranty on Labour', time: 'Takes 4 Hours', details: ['Opening & Fitting of Brake Discs', 'Applicable For Set of 2 Discs (2 Wheels)', 'Inspection of Brake Discs', 'Resurfacing of Brake Discs/Rotors', '', ''], price: 1299 },
    { title: 'Handbrake Wire Replacement', detail: '• Recommended: In Case Handbrake Stops Working', time: 'Takes 4 Hours', details: ['Handbrake Wire Replacement (Single OES Unit)', 'Electronic Parking Brake Cost Additional', 'Free Pickup & Drop', 'Brake Drum Inspection', 'Wheel Cylinder, Ratchet, Clamps Cost Additional', ''], price: 1799 },
    { title: 'Brake Drums Turning', detail: '• 1 Month Warranty • Recommended: In Case of Screeching Noise from Brakes', time: 'Takes 4 Hours', details: ['Brake Drums Turning', 'Refacing of Brake Drums', 'Free Pickup & Drop', 'Opening & Fitting of Brake Drums', 'Applicable for Set of 2 Brake Drums', ''], price: 1299 },
    { title: 'Wheel Cylinder Replacement', detail: '• Recommended: In case of Poor Braking', time: 'Takes 8 Hours', details: ['Wheel Cylinder Replacement (OES)', 'Brake Shoe & Brake Fluid Cost Additional', 'Opening & Fitting of Wheel Cylinder', 'Free Pickup & Drop', '', ''], price: 1999 },
  ],
  'AC Service & Repair': [
    { title: 'Regular AC Service', detail: '• 500 Kms or 1 Month Warranty • Every 5,000 Kms or 3 Months (Recommended)', time: 'Takes 4 Hours', details: ['AC Vent Cleaning', 'AC Gas (upto 400 gms)', 'AC Filter Cleaning', 'AC Inspection', 'Condenser Cleaning', ''], price: 999 },
    { title: 'High Performance AC Service', detail: '• 1,000 Kms or 1 Month Warranty • Every 10,000 Kms or 1 Year (Recommended)', time: 'Takes 8 Hours', details: ['AC Vent Cleaning', 'Dashboard Removing Refitting', 'AC Gas (Upto 600gms)', 'AC Leak Test', 'Dashboard Cleaning', ''], price: 1999 },
    { title: 'Cooling Coil Replacement', detail: '• 3 Months Warranty • Recommended: In case of No / Less Cooling', time: 'Takes 8 Hours', details: ['Cooling Coil Replacement (OES)', 'AC Pipe, Valve, Sensors Cost Additional', 'Free Pickup & Drop', 'Spare Part Cost Only', 'AC Gas, Compressor Oil Cost Additional', ''], price: 4999 },
    { title: 'Condenser Replacement', detail: '• 3 Months Warranty • Recommended: In Case of Condenser Leakage or Less Cooling', time: 'Takes 8 Hours', details: ['Condenser Replacement (OES)', 'AC Pipe, Valve, Sensors Cost Additional', 'Free Pickup & Drop', 'Spare Part Cost Only', 'AC Gas, Compressor Oil Cost Additional', ''], price: 4999 },
    { title: 'Compressor Replacement', detail: '• 3 Months Warranty • Recommended: In Case of Compressor Leakage or Less Cooling', time: 'Takes 8 Hours', details: ['Compressor Replacement (OES)', 'AC Pipe, Valve, Sensors Cost Additional', 'Free Pickup & Drop', 'Spare Part Cost Only', 'AC Gas, Compressor Oil Cost Additional', ''], price: 7999 },
    { title: 'Heating Coil Replacement', detail: '• 3 Months Warranty • Recommended: In case of Heater not working', time: 'Takes 8 Hours', details: ['Heating Coil Replacement (OES)', 'Spare Part Cost Only', 'Free Pickup & Drop', 'Hoses Additional (If Required)', 'Coolant and Radiator Flush Cost Additional', ''], price: 3999 },
    { title: 'V-Belt Replacement', detail: '• 1 Month Warranty • Recommended: In Case of whining noise from Engine', time: 'Takes 8 Hours', details: ['V-Belt Replacement (OES)', 'Pulleys, Bearing, Timing Cost Additional', 'Free Pickup & Drop', 'Opening & Fitting of V-Belt', 'Scanning Cost Additional', ''], price: 1499 },
    { title: 'AC Blower Motor Replacement', detail: '• 1 Month Warranty • Recommended: In Case of Rattling, Humming Noise from AC Blower', time: 'Takes 8 Hours', details: ['AC Blower Motor Replacement (OES)', 'AC Filter, Vents, Casing Cost Additional', 'Free Pickup & Drop', 'Spare Part Cost Only', 'Wiring Cost Additional (If Needed)', ''], price: 2999 },
    { title: 'Radiator Replacement', detail: '• 1 Month Warranty • Recommended: In Case of Blockage in the Radiator Vessels', time: 'Takes 8 Hours', details: ['Radiator Replacement (OES)', 'Radiator Hoses, Thermostat Valves Cost Additional', 'Free Pickup & Drop', 'Spare Part Cost Only', 'Coolant Cost Additional', ''], price: 3999 },
    { title: 'Radiator Fan Motor Replacement', detail: '• 1 Month Warranty • Recommended: In Case of Radiator Fan not working', time: 'Takes 6 Hours', details: ['Radiator Fan Motor Replacement (OES)', 'Coolant and Radiator Flush Cost Additional', 'Opening & Fitting of Radiator Fan Motor', 'Free Pickup & Drop', '', ''], price: 2499 },
    { title: 'Radiator Flush & Clean', detail: '• Protects Radiator from Corrosion • Free Pickup and Drop', time: 'Takes 2 Hours', details: ['Coolant Draining', 'Anti-Freeze Coolant Replacement', 'Coolant Leakage Inspection', 'Radiator Flushing', 'Radiator Cleaning', ''], price: 999 },
    { title: 'AC Inspection', detail: '• Applicable on Walk-ins Only', time: 'Takes 1 Hour', details: ['AC Unit Inspection', 'Upfront Estimate', 'AC Gas Inspection', '', '', ''], price: 49 },
    { title: 'AC Condenser Cleaning', detail: '• Recommended: In case of AC Performance Issues', time: 'Takes 1 Hour', details: ['AC Condenser Cleaning', 'Bumper Opening & Refitting Price Additional', '', '', '', ''], price: 99 },
    { title: 'Drive Belt Lubrication', detail: '• Recommended: In case of Squeaking Noise or Wear', time: 'Takes 1 Hour', details: ['Drive Belt Lubrication', '', '', '', '', ''], price: 199 },
  ],
  'Batteries': [
    { title: 'Amaron (55 Months Warranty)', detail: '• 35 Amp Hour • 55 Months Warranty • Free of Cost Installation', time: '', details: ['Free Pickup & Drop', 'Old Battery Price Included', 'Free Installation', 'Available at Doorstep', '', ''], price: 3999 },
    { title: 'Amaron (72 Months Warranty)', detail: '• 35 Amp Hour • 66 Months Warranty • Free of Cost Installation', time: '', details: ['Free Pickup & Drop', 'Old Battery Price Included', 'Free Installation', 'Available at Doorstep', '', ''], price: 4999 },
    { title: 'Exide (55 Months Warranty)', detail: '• 40 Amp Hour • 55 Months Warranty • Free of Cost Installation', time: '', details: ['Free Pickup & Drop', 'Old Battery Price Included', 'Free Installation', 'Available at Doorstep', '', ''], price: 3999 },
    { title: 'Exide (66 Months Warranty)', detail: '• 35 Amp Hour • 66 Months Warranty • Free of Cost Installation', time: '', details: ['Free Pickup & Drop', 'Old Battery Price Included', 'Free Installation', 'Available at Doorstep', '', ''], price: 4999 },
    { title: 'Livguard (60 Months Warranty)', detail: '• 35 Amp Hour • 60 Months Warranty • Free of Cost Installation', time: '', details: ['Free Pickup & Drop', 'Old Battery Price Included', 'Free Installation', 'Available at Doorstep', '', ''], price: 3999 },
    { title: 'Livguard (72 Months Warranty)', detail: '• 35 Amp Hour • 72 Months Warranty • Free of Cost Installation', time: '', details: ['Free Pickup & Drop', 'Old Battery Price Included', 'Free Installation', 'Available at Doorstep', '', ''], price: 4999 },
    { title: 'Alternator Replacement', detail: '• 1 Month Warranty • Recommended: In Case of frequently Discharging Battery', time: 'Takes 6 Hours', details: ['Alternator Replacement', 'Alternator Belt Additional', 'Opening & Fitting of Alternator', 'Free Pickup & Drop', '', ''], price: 4999 },
    { title: 'Alternator Repair', detail: '• 3 Months Warranty • Recommended: In Case of frequently Discharging Battery', time: 'Takes 6 Hours', details: ['Alternator Repair', 'Alternator Belt Additional', 'Opening & Fitting of Alternator', 'Free Pickup & Drop', '', ''], price: 2999 },
  ],
  'Tyres & Wheel Care': [
    { title: 'Apollo Alnac 4GS', detail: '• Size - 175/65 R15 84H • 5 years warranty • Tubeless • Fitting Cost Included', time: '', details: ['Free Pickup & Drop', 'Tyres Inspection for Tread', 'Tyre Replacement at Service Center', 'Alignment & Balancing Charges Extra', '', ''], price: 3999 },
    { title: 'MRF ZVTV', detail: '• Size - 175/65 R15 84TL • 6 years warranty • Tubeless • Fitting Cost Included', time: '', details: ['Free Pickup & Drop', 'Tyres Inspection for Tread', 'Tyre Replacement at Service Center', 'Alignment & Balancing Charges Extra', '', ''], price: 4499 },
    { title: 'JK UX Royale', detail: '• Size - 175/65 R15 • 5 years warranty • Tubeless • Fitting Cost Included', time: '', details: ['Free Pickup & Drop', 'Tyres Inspection for Tread', 'Tyre Replacement at Service Center', 'Alignment & Balancing Charges Extra', '', ''], price: 3999 },
    { title: 'Bridgestone B290', detail: '• Size - 175/65 R15 84T • 5 years warranty • Tubeless • Fitting Cost Included', time: '', details: ['Free Pickup & Drop', 'Tyres Inspection for Tread', 'Tyre Replacement at Service Center', 'Alignment & Balancing Charges Extra', '', ''], price: 4999 },
    { title: 'Bridgestone B250', detail: '• Size - 175/65 R15 87H • 5 years warranty • Tubeless • Fitting Cost Included', time: '', details: ['Free Pickup & Drop', 'Tyres Inspection for Tread', 'Tyre Replacement at Service Center', 'Alignment & Balancing Charges Extra', '', ''], price: 4999 },
    { title: 'Goodyear Assurance TripleMax', detail: '• Size - 175/65 R15 88 • 5 years warranty • Tubeless • Fitting Cost Included', time: '', details: ['Free Pickup & Drop', 'Tyres Inspection for Tread', 'Tyre Replacement at Service Center', 'Alignment & Balancing Charges Extra', '', ''], price: 4999 },
    { title: 'Complete Wheel Care', detail: '• Every 6 Months or 5,000 Kms (Recommended)', time: 'Takes 4 Hours', details: ['Automated Wheel Balancing', 'Alloy Weights Additional', 'Steering Adjustment and Correction', 'Weight Correction', 'Laser Assisted Wheel Alignment', ''], price: 999 },
    { title: 'Mud Flaps', detail: '• 1 Month Warranty on Fitting • Excellent Durability', time: 'Takes 2 Hours', details: ['Mud Flaps Set of 4', 'Protects Car Underbody', 'Prevents Soil Accumulation', 'Easy Fitment', '', ''], price: 499 },
  ],
  // Continue with other categories... (I'll add a few more key ones, but you can expand)
  'Denting & Painting': [
    { title: 'Front Bumper Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Bonnet Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Rear Bumper Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Boot Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Full Body Dent Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 6 Days', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 19999 },
    { title: 'Alloy Paint', detail: '• 1 Year Warranty • 1 Year (Recommended)', time: 'Takes 24 Hours', details: ['Grade A Primer', '4 Layers of Painting', 'High Temperature Paint', 'Alloy Preservation', '', ''], price: 1999 },
    { title: 'Left Fender Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Left Front Door Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Left Rear Door Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Left Quarter Panel Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Left Running Board Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Right Fender Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Right Front Door Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Right Rear Door Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Right Quarter Panel Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
    { title: 'Right Running Board Paint', detail: '• 2 Years Warranty on Paint', time: 'Takes 24 Hours', details: ['Removal of Minor Dent & Scratches', 'High Quality DuPont Paint', 'Panel Rubbing & Polishing', 'Grade A Primer Applied', 'Clear Coat Protective Layer Paint', ''], price: 2999 },
  ],
  'Detailing Services': [
    { title: '3M™ Car Rubbing & Polishing', detail: '• Every 6 Months (Recommended)', time: 'Takes 6 Hours', details: ['Pressure Car Wash', 'Alloy Polishing', 'Rubbing with 3M Compound', 'Tyre Dressing', 'Machine Rubbing', '3M Wax Polishing'], price: 2999 },
    { title: 'Ceramic Coating', detail: '• 1 Year Warranty  • Every 3 Years (Recommended)', time: 'Takes 3 Days', details: ['Complete Paint Correction', 'Safely Removal of Minor Scratches', 'Exterior Car Wash', '2 Layers of Coating', 'Deep All Round Spa', ''], price: 19999 },
    { title: "Meguiar's Ceramic Coating", detail: '• 1 Year Warranty  • Every 3 Years (Recommended)', time: 'Takes 3 Days', details: ['Complete Paint Correction', 'Removes Minor Scratches', 'Exterior Car Wash', '2 Layers of Coating', 'Deep All Round Spa', ''], price: 19999 },
    { title: "Meguiar's Teflon Coating", detail: '• 3 Months Warranty  • Every 1 Year (Recommended)', time: 'Takes 24 Hours', details: ['Pre-Coating Rubbing and Polishing', 'Removes Minor Scratches', "Full Body Meguiar's Teflon Coating", 'Ultra Shine Polishing', 'Exterior Car Wash', "Meguiar's Exterior Anti-Rust Treatment"], price: 4999 },
    { title: '3M™ Teflon Coating', detail: '• 3 Months Warranty  • Every 1 Year (Recommended)', time: 'Takes 24 Hours', details: ['Pre-Coating Rubbing and Polishing', 'Removes Minor Scratches', 'Full Body 3M Teflon Coating', 'Ultra Shine Polishing', 'Exterior Car Wash', '3M Exterior Anti-Rust Treatment'], price: 4999 },
    { title: 'PPF - Paint Protection Film', detail: '• 3 Years Warranty  • Every 3 Years (Recommended)', time: 'Takes 6 Days', details: ['Avery PPF -Paint Protection Film', '', '', '', '', ''], price: 29999 },
    { title: 'Anti Rust Underbody Coating', detail: '• 3 Months Warranty  • Every 1 Year (Recommended)', time: 'Takes 24 Hours', details: ['Underbody TeflonCoating', 'Protective Anti -Corrosion Treatment', '', '', '', ''], price: 1999 },
    { title: 'Silencer Coating', detail: '• 3 Months Warranty  • Every 1 Year (Recommended)', time: 'Takes 6 Hours', details: ['Silencer Anti Rust Coating', '2 Layers of Protection', 'Silencer Corrosion Protection', '', '', ''], price: 1499 },
  ],
  'Car Spa & Cleaning': [
    { title: 'Winter Care Package', detail: '• 1 Month Warranty  • Free Pickup and Drop', time: 'Takes 3 Hours', details: ['Coolant Leakage Inspection', 'Coolant Replacement', 'AC Blower Cleaning', 'Radiator Flushing', 'AC Gas Check', ''], price: 1999 },
    { title: '360° Deep Cleaning', detail: '• 1 Month Warranty  • Brand New Festive Look', time: 'Takes 6 Hours', details: ['Exterior Rubbing & Polishing', 'Interior Vacuum Cleaning', 'Tyre Dressing & Alloy Polishing', 'Interior Wet Shampooing & Detailing', 'Pressure Washing', 'Free Pickup & Drop'], price: 2999 },
    { title: 'Car Interior Spa', detail: '• Every 3 Months (Recommended)', time: 'Takes 6 Hours', details: ['Pressure Car Wash', 'Interior Vacuum Cleaning', 'Interior Wet Shampooing and Detailing', 'Anti Viral & Bacterial Treatment', 'Dashboard Polishing', ''], price: 1999 },
    { title: 'Deep All Round Spa', detail: '• Every 6 Months (Recommended)', time: 'Takes 6 Hours', details: ['Interior Vacuum Cleaning', 'Interior Wet Shampooing and Detailing', 'Rubbing with Compound', 'Dashboard Polishing', 'Pressure Car Wash', ''], price: 2499 },
    { title: 'Premium Top Wash', detail: '• Applicable on Walk-in Only  • Preserving Paint & Finish', time: 'Revitalize Your Ride in Just 1 Hour', details: ['Exterior Top Wash', 'Hand Drying', 'Rinsing', 'Tyre external wash', '', ''], price: 499 },
    { title: 'Car Wash & Wax', detail: '• Maintains Car Shine  • Recommended Every 2 Months', time: 'Takes 2 Hours', details: ['Car Wash', 'Dashboard and Tyre Polish', 'Interior Vacuuming', 'Body Wax', '', ''], price: 999 },
    { title: 'Car Rubbing & Polishing', detail: '• Takes 6 Hours', time: 'Every 6 Months Recommended', details: ['Machine Rubbing with Compound', 'Pressure Car Wash', 'Alloy Polishing', 'Wax Polishing', 'Tyre Dressing', ''], price: 1999 },
    { title: 'Rat / Pest Repellent Treatment', detail: '• 1 Month Warranty  • No Toxic Pesticides Used', time: 'Takes 3 Hours', details: ['Rat Repellent Treatment', 'Protects Car Wiring from Pests', 'Free Pickup & Drop', 'Sprayed on Underbody and Engine Bay', 'Prevents Pest Breeding inside Car', ''], price: 1499 },
    { title: 'Car Inspection / Diagnostics', detail: '• 25 Points Checklist  • Every 1 Month (Recommended)', time: 'Takes 4 Hours', details: ['Underbody Inspection', 'Upfront Estimate', '25 Points Checklist', '', '', ''], price: 499 },
    { title: 'Sunroof Service', detail: '• 1000 Kms or 1 Month Warranty  • Every 15000 Kms or 12 Months', time: 'Takes 6 Hours', details: ['Roof Opening & Refitting', 'Drainage Tube Clog/Debris Removal', 'Sunroof Lubrication', 'Sunroof Cleaning', '', ''], price: 1999 },
  ],
  'Car Inspections': [
    { title: 'Second Hand Car Inspection', detail: '• Available at Doorstep  • Scanner Report Provided', time: 'Takes 4 Hours', details: ['50 Points CheckList', 'Physical Car Diagnosis', 'Get Car Valuation', 'Full Car Scanning', 'Upfront Estimate', ''], price: 1999 },
    { title: 'Road Trip Inspection', detail: '• Recommended for Long Road Trips', time: 'Takes 4 Hours', details: ['Wheel Alignment & Balancing', 'Detailed Health Card', 'Free Pickup & Drop', 'Full Car Scanning', 'Fluid Leakage Inspection', ''], price: 1499 },
    { title: 'Engine Scanning', detail: '• Scanner Report Provided  • OEM Scanner Used', time: 'Takes 3 Hours', details: ['Electrical Scanning', 'Sensor Reset', 'Error Code Deletion', 'Inspection of Exhaust Smoke', '', ''], price: 999 },
    { title: 'Insurance Claim Inspection', detail: '• Real Time Claim Tracking Mechanism  • Free Pick-Up/Drop', time: 'Cashless Facility', details: ['Claim Intimation', 'Co-ordination with Insurance Company', 'Policy Inspection', 'Surveyor Estimate Approval', '2 Years Warranty on Paint Jobs', ''], price: 0 },
    { title: 'Car Fluids Check', detail: '• Free Pickup Included  • On Leakage or Check Light (Recommended)', time: 'Takes 3 Hours', details: ['Brake Fluid Check', 'Engine Oil Check', 'Battery Water Inspection', 'Coolant Check', 'Power Steering Oil Check', ''], price: 499 },
    { title: 'Complete Suspension Inspection', detail: '• 25 Points Check List  • On Suspension Noise (Recommended)', time: 'Takes 4 Hours', details: ['Front Shocker Check', 'Shocker Mount Check', 'Jumping Rod Bush Check', 'Rear Shocker Check', 'Link Rod Inspection', ''], price: 999 },
    { title: 'Radiator Replacement', detail: '• 1 Month Warranty  • Recommended: in case of Blockage in the Radiator Vessels', time: 'Takes 6 Hours', details: ['Radiator Replacement (OES)', 'Radiator Hoses, Thermostat Valves Cost Additional', 'Free Pickup & Drop', 'Spare Part Cost Only', 'Coolant Cost Additional', ''], price: 3999 },
    { title: 'Radiator Fan Motor Replacement', detail: '• 1 Month Warranty  • Recommended: in case of Radiator Fan not working', time: 'Takes 6 Hours', details: ['Radiator Fan Motor Replacement (OES)', 'Coolant and Radiator Flush Cost Additional', 'Opening & Fitting of Radiator Fan Motor', 'Free Pickup & Drop', '', ''], price: 2499 },
    { title: 'Radiator Flush & Clean', detail: '• Protects Radiator from Corrosion  • Free Pickup and Drop', time: 'Takes 2 Hours', details: ['Coolant Draining', 'Anti - Freeze Coolant Replacement', 'Coolant Leakage Inspection', 'Radiator Flushing', 'Radiator Cleaning', ''], price: 999 },
    { title: 'Car Waterlog Assistance', detail: '• Recommended: in Case of Car Flooding', time: 'Takes 6 Hours', details: ['Physical Car Diagnosis', 'Detailed Health Card', '50 Points Check-List', 'Free Pickup & Drop', '', ''], price: 1999 },
    { title: 'Car Engine Issues', detail: '• Recommended: in Case of Engine Vibrations', time: 'Takes 6 Hours', details: ['Full Car Scanning', 'Detailed Health Card', '25 Points Check-List', 'Free Pickup & Drop', '', ''], price: 1499 },
    { title: 'Problem with Car Brakes & Wheels', detail: '• Recommended: in Case of Vibrations while Braking', time: 'Takes 6 Hours', details: ['Physical Car Diagnosis', 'Detailed Health Card', '50 Points Check-List', 'Free Pickup & Drop', '', ''], price: 1499 },
    { title: 'Damaged Car Body or Interiors', detail: '• Recommended: In Case of Dirty Seat Covers', time: 'Takes 6 Hours', details: ['Physical Car Diagnosis', 'Free Pickup & Drop', 'Car Interior Inspection', '', '', ''], price: 999 },
  ],
  'Windshields & Lights': [
    { title: 'Front Windshield Replacement', detail: '• 1 Month Warranty on Fitting  • On Crack in Windshield (Recommended)', time: 'Takes 6 Hours', details: ['Windshield (ISI Approved)', 'Sensor Charges Additional (If Applicable)', 'Free Pickup & Drop', 'Opening & Fitting of New Windshield', 'Consumables - Sealant/Bond/Adhesive', ''], price: 4999 },
    { title: 'Rear Windshield Replacement', detail: '• 1 Month Warranty on Fitting  • On Crack in Windshield (Recommended)', time: 'Takes 6 Hours', details: ['Rear Windshield (ISI Approved)', 'Defogger Charges Additional (If Applicable)', 'Free Pickup & Drop', 'Opening & Fitting of New Windshield', 'Consumables - Sealant/Bond/Adhesive', ''], price: 4999 },
    { title: 'Door Glass Replacement', detail: '• 1 Month Warranty on Fitting  • On Crack in Door Glass (Recommended)', time: 'Takes 6 Hours', details: ['Door Glass (AIS Approved)', 'Consumables - Bond/Adhesive', 'UV Glass Charges Additional (If Applicable)', 'Opening & Fitting of New Door Glass', 'Free Pickup & Drop', ''], price: 2999 },
    { title: 'Front Headlight', detail: '• 1 Month Warranty on Fitting  • For Broken / Cracked Lights (Recommended)', time: 'Takes 4 Hours', details: ['Headlight OES (Price for single unit)', 'Free Pickup & Drop', 'Opening & Fitting of Bumper/Headlight', 'Projector/LEDs/DRLs Additional (If Applicable)', '', ''], price: 3999 },
    { title: 'Rear Taillight', detail: '• 1 Month Warranty on Fitting  • For Broken / Cracked Lights (Recommended)', time: 'Takes 4 Hours', details: ['Tail Light OES (Price for single unit)', 'Free Pickup & Drop', 'Tail Light Price Will Differ From Car Model to Model', 'Opening & Fitting of Tail Light', 'Bulbs/LEDs Additional (If Applicable)', ''], price: 2999 },
    { title: 'Fog Light', detail: '• 1 Month Warranty on Fitting', time: 'Takes 4 Hours', details: ['Opening & Fitting of Bumper + Fog Lamp', 'Switch/Marness Wiring Check', 'Projectors/LEDs/DRLs Additional (If Applicable)', 'Fog Light Assembly Replacement (Single Unit)', 'Free Pickup & Drop', ''], price: 1999 },
    { title: 'Side Mirror Replacement', detail: '• 1 Month Warranty  • Recommended: In Case of Broken / Cracked Side Mirror', time: 'Takes 4 Hours', details: ['Side Mirror Replacement OES (Single Unit)', 'Semi & Fully Automatic Side Mirror Cost Additional', 'Free Pickup & Drop', 'Opening & Fitting of Side Mirror', 'Switch/Wiring Harness Cost Additional', ''], price: 2999 },
  ],
  'Suspension & Fitments': [
    { title: 'EPS Module Repair', detail: '• 1 Month Warranty  • Recommended: In Case of Hard Steering', time: 'Takes 6 Hours', details: ['EPS Module Repair', 'Torque Sensor Additional if Needed', 'Steering Rack, Steering Motor Additional if Needed', 'Free Pickup & Drop', '', ''], price: 3999 },
    { title: 'Steering Rack Repair', detail: '• 1 Month Warranty  • Recommended: In Case of Hard Steering', time: 'Takes 6 Hours', details: ['Steering Rack Repair', 'Steering Rod Resurfacing', 'Free Pickup & Drop', 'Steering Bush Kit, Lathe Work, Wheel Alignment Included', 'Calibration and Pinion Cost Additional (If Needed)', ''], price: 4999 },
    { title: 'Front Shock Absorber Replacement', detail: '• 1 Month Warranty  • Free Pickup and Drop', time: 'Takes 6 Hours', details: ['Shock Strut / Damper OES Replacement (Single Unit)', 'Shockor Mount, Shockor Coil Spring Additional Charges', 'Airmatic Shock Absorber Cost Additional (If Applicable)', 'Opening & Fitting of Front Shock Absorber', 'Free Pickup & Drop', ''], price: 4999 },
    { title: 'Rear Shock Absorber Replacement', detail: '• 1 Month Warranty  • Free Pickup and Drop', time: 'Takes 6 Hours', details: ['Shock Strut / Damper OES Replacement (Single Unit)', 'Shockor Mount, Shockor Coil Spring Additional Charges', 'Airmatic Shock Absorber Cost Additional (If Applicable)', 'Opening & Fitting of Rear Shock Absorber', 'Free Pickup & Drop', ''], price: 4999 },
    { title: 'Suspension Lower Arm Replacement', detail: '• 1 Month Warranty  • Recommended: In Case Vibration in the Steering Wheel', time: 'Takes 6 Hours', details: ['Suspension Lower Arm Replacement (OES Single Unit)', 'Spare Part Cost Only', 'Free Pickup & Drop', 'Complete Suspension Inspection', 'Wheel Alignment Cost Additional', ''], price: 2999 },
    { title: 'Link Rod Replacement', detail: '• 1 Month Warranty  • Recommended: In Case Loose Steering Wheel', time: 'Takes 6 Hours', details: ['Link Rod Replacement (OES Single Unit)', 'Spare Part Cost Only', 'Free Pickup & Drop', 'Complete Suspension Inspection', 'Wheel Alignment Cost Additional', ''], price: 1999 },
    { title: 'Tie Rod End Replacement', detail: '• 1 Month Warranty  • Recommended: In case of Vibration in the Steering Wheel', time: 'Takes 6 Hours', details: ['Tie Rod End Replacement (OES)', 'Spare Part Cost Only', 'Free Pickup & Drop', 'Complete Suspension Inspection', 'Camber Bolt & Wheel Alignment Cost Additional', ''], price: 1999 },
    { title: 'Complete Suspension Inspection', detail: '• 25 Points Check List  • On Suspension Noise (Recommended)', time: 'Takes 6 Hours', details: ['Front Shocker Check', 'Shockor Mount Check', 'Jumping Rod Bush Check', 'Rear Shocker Check', 'Link Rod Inspection', ''], price: 999 },
    { title: 'Front Shocker Mount Replacement', detail: '• 1 Month Warranty  • Recommended: In Case of Excessive Noise / Vibration from Suspension', time: 'Takes 6 Hours', details: ['Front Shocker Mount Replacement (OES Single Unit)', 'Shocker Mount Bearings, Cap Cost Additional', 'Wheel Alignment Cost Additional', 'Opening & Fitting of Front Shocker Mount', 'Airmatic Shock Absorber Mount Cost Additional', 'Free Pickup & Drop'], price: 2999 },
    { title: 'Front Axle Repair', detail: '• Recommended: In Case of Noise Coming from Suspension  • In Case of Excessive Noise / Vibration from Suspension', time: 'Takes 6 Hours', details: ['Front Axle Repair (Single Unit)', 'Includes Replacement of Axle Bearings & Boot', 'Free Pickup & Drop', 'Opening & Fitting of Front Axle', 'Wheel Bearing Cost Additional (If Required)', ''], price: 3999 },
    { title: 'Radiator Replacement', detail: '• 1 Month Warranty  • Recommended: In Case of Blockage in the Radiator Vessels', time: 'Takes 6 Hours', details: ['Radiator Replacement (OES)', 'Radiator Hoses, Thermostat Valves Cost Additional', 'Free Pickup & Drop', 'Spare Part Cost Only', 'Coolant Cost Additional', ''], price: 3999 },
    { title: 'Engine Mounting Replacement', detail: '• 1 Month Warranty  • Recommended: In Case of Noise from Engine', time: 'Takes 6 Hours', details: ['Engine Mounting Replacement (OES)', 'Single Unit Only', 'Spare Part Price Only', 'Free Pickup & Drop', '', ''], price: 2999 },
    { title: 'Gear Box Mounting Replacement', detail: '• 1 Month Warranty  • Recommended: In Case of Noise from Engine', time: 'Takes 6 Hours', details: ['Gear Box Mounting Replacement (OES)', 'Single Unit Only', 'Spare Part Price Only', 'Free Pickup & Drop', '', ''], price: 2999 },
    { title: 'Fuel Pump Replacement', detail: '• 1 Month Warranty  • Recommended: In Case of Car Jerking while Accelerating', time: 'Takes 6 Hours', details: ['Fuel Pump Assy. Replacement', 'Fuel Line & Injectors Cleaning Cost Additional (If Needed)', 'OES Spare Part Cost Only', 'Fuel Pipes Cost Additional (If Needed)', 'Free Pickup & Drop', ''], price: 4999 },
    { title: 'ECM Repair', detail: '• 1 Month Warranty  • Recommended: In case of Car Not Starting', time: 'Takes 6 Hours', details: ['ECM Repair', 'Opening & Fitting of ECM', 'Repairing of Electrical Circuits with Diodes & Capacitor', 'Circuit Board & Programming Cost Additional', 'Free Pickup & Drop', ''], price: 3999 },
    { title: 'Radiator Fan Motor Replacement', detail: '• 1 Month Warranty  • Recommended: In case of Radiator Fan not working', time: 'Takes 6 Hours', details: ['Radiator Fan Motor Replacement (OES)', 'Coolant and Radiator Flush Cost Additional', 'Opening & Fitting of Radiator Fan Motor', 'Free Pickup & Drop', '', ''], price: 2499 },
    { title: 'Water Pump Replacement', detail: '• 1 Month Warranty  • Recommended: In case of Engine Overheating', time: 'Takes 6 Hours', details: ['Water Pump Replacement (OES)', 'Coolant and Radiator Flush Cost Additional', 'Spare Part Cost Only', 'Free Pickup & Drop', '', ''], price: 3999 },
    { title: 'Premium Top Wash', detail: '• Applicable on Walk-in Only  • Preserving Paint & Finish', time: 'Handwash Your Ride in Just 1 Hour', details: ['Exterior Top Wash', 'Hand Drying', 'Rinsing', 'Tyre external wash', '', ''], price: 499 },
    { title: 'Car Wash & Wax', detail: '• Maintains Car Shine  • Recommended Every 2 Months', time: 'Takes 2 Hours', details: ['Car Wash', 'Dashboard and Tyre Polish', 'Interior Vacuuming', 'Body Wax', '', ''], price: 999 },
    { title: 'Starter Motor Repair', detail: '• 1 Month Warranty  • Recommended: In Case of Car Not Starting', time: 'Takes 6 Hours', details: ['Starter Motor Repair', 'Armature Additional If Required', 'Opening & Fitting of Starter Motor', 'Free Pickup & Drop', '', ''], price: 2999 },
    { title: 'Mud Flaps', detail: '• 1 Month Warranty on Fitting  • Excellent Durability', time: 'Takes 2 Hours', details: ['Mud Flaps Set of 4', 'Prevents Soil Accumulation', 'Easy Fitment', 'Protects Car Underside', '', ''], price: 499 },
    { title: 'Door Latch Replacement', detail: '• 1 Month Warranty  • Recommended: In Case of Door Not Opening', time: 'Takes 6 Hours', details: ['Inner Door Latch Mechanism Part Replacement', 'Outside Door Handle Cost Additional (If Needed)', 'OES Spare Part Cost Only', 'Paint/Trim Cost Additional (If Needed)', 'Free Pickup & Drop', ''], price: 1999 },
    { title: 'Power Window Repair', detail: '• 1 Month Warranty  • Recommended: In Case of Window Not Working', time: 'Takes 3 Hours', details: ['Power Window Mechanism Repair', 'Power Window Switch Cost Additional', 'Free Pickup & Drop', '', '', ''], price: 1999 },
    { title: 'Noise with Car Suspension & Steering', detail: '• Recommended: In Case of Noise Coming from Suspension', time: 'Takes 2 Hours', details: ['Steering System Inspection', '25 Points Check-list', 'Complete Suspension Inspection', 'Free Pickup & Drop', '', ''], price: 999 },
    { title: 'Faulty Electricals', detail: '• Recommended: In Case of Electrical Malfunctioning', time: 'Takes 2 Hours', details: ['Fault Car Scanning', 'Detailed Health Card', '25 Points Check-list', 'Free Pickup & Drop', '', ''], price: 999 },
  ],
  'Clutch & Body Parts': [
    { title: 'Clutch Set Replacement', detail: '• 1 Month Warranty  • Recommended: In Case of Hard Clutch & Pickup Issue', time: 'Takes 8 Hours', details: ['Clutch Set (Clutch Plate + Pressure Plate) Replacement', 'Clutch Cable / Wire, Release Bearing / Clutch Cylinder, Flywheel, Slave Cylinder in Add Ons', 'Automatic Transmission Clutch rates may vary', 'Opening & Fitting of Clutch Set', 'Clutch Oil, Gear Oil Cost Additional', 'Free Pickup & Drop'], price: 5999 },
    { title: 'Flywheel Replacement', detail: '• 1 Month Warranty  • Recommended: In case of Noisy Clutch', time: 'Takes 8 Hours', details: ['Flywheel OES Replacement', 'Clutch Set, Clutch Bearing, Clutch Cable / Wire, Clutch Cylinder, Slave Cylinder in Add Ons', 'Automatic Transmission Clutch rates may vary', 'Spare Part Price Only', 'Clutch Oil, Gear Oil Additional', 'Free Pickup & Drop'], price: 3999 },
    { title: 'Clutch Bearing Replacement', detail: '• 1 Month Warranty  • Recommended: In case of Clutch Pedal Vibrations', time: 'Takes 8 Hours', details: ['Clutch Bearing OES Replacement', 'Clutch Set, Clutch Cable / Wire, Clutch Cylinder, Flywheel, Hydraulic Bearing in Add Ons', 'Automatic Transmission Clutch rates may vary', 'Spare Part Price Only', 'Clutch Oil, Gear Oil Cost Additional', 'Free Pickup & Drop'], price: 1999 },
    { title: 'Flywheel Turning', detail: '• Recommended: In case of Burning Smell from Clutch', time: 'Takes 8 Hours', details: ['Resurfacing of Flywheel', 'Opening & Fitting of Flywheel Cost Additional', 'Free Pickup & Drop', 'Inspection of Clutch System', 'Clutch Plates, Pressure Plate, Clutch Bearing & Clutch Cable Cost Additional', ''], price: 1499 },
    { title: 'Clutch Overhaul', detail: '• 1 Month Warranty on Labour', time: 'Takes 8 Hours', details: ['Opening & Fitting + Inspection Of Below Items', 'Clutch Plate', 'Pressure Plate', 'Release Bearing', '', ''], price: 2999 },
    { title: 'Front Bumper Replacement', detail: '• 1 Month Warranty on Fitting  • For Broken / Cracked Bumper (Recommended)', time: 'Takes 6 Hours', details: ['Opening & Fitting of Front Bumper', 'Free Pickup & Drop', 'Paint Cost Additional', 'Front Bumper Replacement (Black Colour)', 'Brackets, Grills, Cladding Additional', ''], price: 3999 },
    { title: 'Rear Bumper Replacement', detail: '• 1 Month Warranty on Fitting  • For Broken / Cracked Bumper (Recommended)', time: 'Takes 6 Hours', details: ['Opening & Fitting of Rear Bumper', 'Free Pickup & Drop', 'Paint Cost Additional', 'Rear Bumper Replacement (Black Colour)', 'Brackets, Grills, Cladding Additional', ''], price: 3999 },
    { title: 'Right Front Door Replacement', detail: '• Recommended: In Case Broken / Damaged Door', time: 'Takes 8 Hours', details: ['Right Front Door Replacement (Single Unit)', 'Hinges, Weatherstrip, Handle, Cost Additional', 'Paint Cost Additional', 'Opening & Fitting of Right Front Door', 'Trim, Lock, Window Glass & Channel Cost Additional', 'Free Pickup & Drop'], price: 7999 },
    { title: 'Right Rear Door Replacement', detail: '• Recommended: In Case Broken / Damaged Door', time: 'Takes 8 Hours', details: ['Right Rear Door Replacement (Single Unit)', 'Hinges, Weatherstrip, Handle, Cost Additional', 'Paint Cost Additional', 'Opening & Fitting of Right Rear Door', 'Trim, Lock, Window Glass & Channel Cost Additional', 'Free Pickup & Drop'], price: 7999 },
    { title: 'Fender Replacement', detail: '• Recommended: In Case Corroded / Broken / Damaged Fender', time: 'Takes 6 Hours', details: ['Fender Replacement', 'Fender Lining, Indicator, Hinge / Support Cost Additional', 'Free Pickup & Drop', 'Opening & Fitting of Fender', 'Paint Cost Additional', ''], price: 4999 },
    { title: 'Boot Replacement', detail: '• Recommended: In Case Corroded / Broken / Damaged Boot', time: 'Takes 6 Hours', details: ['Boot Replacement', 'Hinges, Ring, Boot Strip / Shocker Cost Additional', 'Free Pickup & Drop', 'Opening & Fitting of Boot', 'Paint Cost Additional', ''], price: 4999 },
    { title: 'Bonnet Replacement', detail: '• Recommended: In Case Corroded / Broken / Damaged Bonnet', time: 'Takes 6 Hours', details: ['Bonnet Replacement', 'Hinges, Stay Rod / Shockers Cost Additional', 'Free Pickup & Drop', 'Opening & Fitting of Bonnet', 'Paint Cost Additional', ''], price: 4999 },
    { title: 'Left Front Door Replacement', detail: '• Recommended: In Case Broken / Damaged Door', time: 'Takes 8 Hours', details: ['Left Front Door Replacement (Single Unit)', 'Hinges, Weatherstrip, Handle, Cost Additional', 'Paint Cost Additional', 'Opening & Fitting of Left Front Door', 'Trim, Lock, Window Glass & Channel Cost Additional', 'Free Pickup & Drop'], price: 7999 },
    { title: 'Left Rear Door Replacement', detail: '• Recommended: In Case Corroded Door  • Recommended: In Case Broken / Damaged Door', time: 'Takes 6 Hours', details: ['Left Rear Door Replacement (Single Unit)', 'Opening & Fitting of Left Rear Door', 'Hinges, Weatherstrip, Handle, Cost Additional', 'Trim, Lock, Window Glass & Channel Cost Additional', 'Paint Cost Additional', 'Free Pickup & Drop'], price: 7999 },
    { title: 'Clutch & Transmission Troubles', detail: '• Recommended: In Case of Hard Clutch', time: 'Takes 6 Hours', details: ['25 Points Checklist', 'Clutch & Gear Box Inspection', 'Physical Car Diagnosis', 'Free Pickup & Drop', '', ''], price: 999 },
    { title: 'ABS Issue', detail: '• Recommended: In Case of ABS Dashboard Light', time: 'Takes 6 Hours', details: ['Full Car Scanning', 'Brake Electrical System Inspection', '25 Points Check-List', 'Free Pickup & Drop', '', ''], price: 1499 },
    { title: 'Sony Go Eco (DSX-A410BT)', detail: '• 1 Month Warranty on Fitting  • 55W Max Power & Extra Bass', time: 'Takes 4 Hours', details: ['Opening & Fitting of Stereo', 'Free Pickup & Drop', '10+ Band Equalizer & 2 Pre Out', 'Wiring, Frame and Coupler Cost Extra (If Required)', 'USB For iPhone, iPod', ''], price: 3999 },
    { title: 'Sony Go X (XAV-1500)', detail: '• 1 Month Warranty on Fitting  • Dynamic Stage Organiser', time: 'Takes 4 Hours', details: ['Opening & Fitting of Stereo', 'Free Pickup & Drop', 'Configurable Steering Wheel Remote Input', 'Wiring, Frame and Coupler Cost Extra (If Required)', 'Bluetooth Connectivity', ''], price: 4999 },
    { title: 'Sony Go Play (XAV-AX5500)', detail: '• 1 Month Warranty on Fitting  • 10+ Band Equaliser & 3 Pre Out(5V)', time: 'Takes 4 Hours', details: ['Opening & Fitting of Stereo', 'Free Pickup & Drop', 'Dual USB with 1.5A High Current Battery Charge', 'Wiring, Frame and Coupler Cost Extra (If Required)', 'Bluetooth Connectivity', ''], price: 7999 },
    { title: 'Sony Go Play+ (XAV-AX7000)', detail: '• 1 Month Warranty on Fitting  • 10+ Band Equaliser & 3 Pre Out(5V)', time: 'Takes 4 Hours', details: ['Opening & Fitting of Stereo', 'Free Pickup & Drop', '1 Year Manufacturer Warranty', 'Wiring, Frame and Coupler Cost Extra (If Required)', 'USB For iPhone, iPod', ''], price: 9999 },
  ],
  'Insurance Claims': [
    { title: 'Know Your Policy', detail: '• Call Within 2 Hour  • Regarding Doubts with Claim Intimation', time: 'Call Within 2 Hour', details: ['Complete Information about your Policy', 'Suggestions on Purchase of New Policy', 'Vehicle IDV and Premium Rate Suggestions', 'Expenditure Assessment', 'Connect with Insurance Agent', ''], price: 0 },
    { title: 'Accidental Denting & Painting (Insurance)', detail: '• Recommended: In case of Comprehensive Policy', time: 'Takes 24 Hours', details: ['Accidental Repair in Insurance', 'Surveyor Estimate Approval', 'File Charge Included', 'Claim Intimation', 'Body Panel Replacement (If Required)', ''], price: 0 },
    { title: 'Fire Damage Assistance (Insurance)', detail: '• Recommended: In case of Comprehensive Policy', time: 'Takes 24 Hours', details: ['Repairing of Fire Damage in Insurance', 'Surveyor Estimate Approval', 'Claim Intimation', 'File Charge Included', '', ''], price: 0 },
    { title: 'Car Flood Damage (Insurance)', detail: '• Recommended: In case of Comprehensive Policy', time: 'Takes 24 Hours', details: ['Repairing of Flood Damage in Insurance', 'Surveyor Estimate Approval', 'Claim Intimation', 'File Charge Included', '', ''], price: 0 },
    { title: 'Windshield Replacement (Insurance)', detail: '• On Cracks in Windshield (Recommended)', time: 'Takes 24 Hours', details: ['Claim Intimation', 'Coordination with Insurance Company', 'Available at Doorstep', 'Surveyor Estimate Approval', 'Windshield Replacement/Repair', ''], price: 0 },
    { title: 'Tyres & Wheel Replacement (Insurance)', detail: '• Recommended: In case of Tyre & Wheel Damage Due to Accident  • Recommended: In case of Comprehensive Policy', time: 'Takes 24 Hours', details: ['Tyres & Wheel Replacement in Insurance', 'Surveyor Estimate Approval', 'Claim Intimation', 'File Charge Included', '', ''], price: 0 },
    { title: 'Battery Replacement (Insurance)', detail: '• Recommended: In case of Battery Theft  • Recommended: In case of Comprehensive Policy', time: 'Takes 24 Hours', details: ['Battery Replacement in Insurance', 'Surveyor Estimate Approval', 'Claim Intimation', 'File Charge Included', '', ''], price: 0 },
    { title: 'Key Replacement (Insurance)', detail: '• Recommended: In case of Comprehensive Policy', time: 'Takes 24 Hours', details: ['Car Key Replacement in Insurance', 'Surveyor Estimate Approval Process', 'Claim Intimation Process', 'File Charge Included', '', ''], price: 0 },
    { title: 'ECM Replacement (Insurance)', detail: '• Recommended: In case of Comprehensive Policy', time: 'Takes 24 Hours', details: ['ECM Replacement in Insurance', 'Surveyor Estimate Approval', 'Claim Intimation', 'File Charge Included', '', ''], price: 0 },
    { title: 'Car Theft Claim (Insurance)', detail: '• Recommended: In case of Comprehensive Policy', time: 'Takes 24 Hours', details: ['Repairing of Flood Damage in Insurance', 'Surveyor Estimate Approval', 'Claim Intimation', 'File Charge Included', '', ''], price: 0 },
    { title: 'Doorstep Accidental Inspection', detail: '• 25 Points Checklist  • Every 1 Month (Recommended)', time: 'Takes 4 Hours', details: ['Body Damage Inspection', 'Insurance Claim Advice', '25 Points Checklist', 'Policy Inspection', '', ''], price: 0 },
    { title: 'Towing (Insurance)', detail: '• Real Time Claim Tracking Mechanism  • Free Towing', time: 'Cashless Facility', details: ['Claim Intimation', 'Co-ordination with Insurance Company', 'Towing Reimbursement', 'Available at Doorstep', '', ''], price: 0 },
    { title: 'Insurance Claim Inspection', detail: '• Real Time Claim Tracking Mechanism  • Free Pick-up/Drop', time: 'Cashless Facility', details: ['Claim Intimation', 'Co-ordination with Insurance Company', 'Policy Inspection', 'Surveyor Estimate Approval', '2 Years Warranty on Paint Jobs', ''], price: 0 },
  ],
  'SOS Service': [
    { title: 'Battery Jumpstart', detail: '• Available at Doorstep', time: 'Takes 4 Hours', details: ['Battery Jumpstart', 'Car Battery Check', '', '', '', ''], price: 499 },
    { title: 'Car Engine Scanning', detail: '• Available at Doorstep • Scanner Report Provided', time: 'Takes 4 Hours', details: ['Electrical scanning', 'Sensor reset', 'Error code deletion', 'Inspection of exhaust smoke', '', ''], price: 999 },
    { title: 'Car Fluid Leakage', detail: '• Takes 4 Hours • SOS Points Check • Health Card Provided', time: 'Takes 4 Hours', details: ['Battery Jumpstart', 'Car Battery Check', '', '', '', ''], price: 999 },
    { title: 'Wheel-Lift Tow (20 Kms)', detail: '• Available at Doorstep • Up to 10 Kms', time: 'Takes 4 Hours', details: ['Flat Bed Towing', 'Wheel Lift Towing', '', '', '', ''], price: 1999 },
    { title: 'Car Self Starter Issue', detail: '• Available at Doorstep', time: 'Takes 4 Hours', details: ['Critical System Points Check', 'Car Battery Check', 'Underbody Inspection', '', '', ''], price: 1499 },
    { title: 'Flat-Bed Tow (20 Kms)', detail: '• Available at Doorstep • Up to 10 Kms', time: 'Takes 4 Hours', details: ['Flat Bed Towing', 'Wheel Lift Towing', '', '', '', ''], price: 1999 },
    { title: 'Clutch Breakdown', detail: '• Stuck Gear • In Case of Stuck Clutch Pedal', time: 'Takes 4 Hours', details: ['In Case of Clutch Pedal Free', '', '', '', '', ''], price: 1999 },
    { title: 'Car Flooding', detail: '• Takes 4 Hours • Assistance in Case of Car Not Starting • Assistance in Case of Car Stuck in Floods', time: 'Takes 4 Hours', details: ['Assistance in Case of Car Not Starting', 'Assistance in Case of Car Stuck in Floods', '', '', '', ''], price: 2999 },
    { title: 'Insurance Accident', detail: '• Takes 4 Hours • Assistance in Case of Car Not Starting • Assistance in Case of Car Stuck in Floods', time: 'Takes 4 Hours', details: ['Assistance in Case of Car Not Starting', 'Assistance in Case of Car Stuck in Floods', '', '', '', ''], price: 0 },
    { title: 'Brake Failure', detail: '• In Case of Brake Fail • In Case of Brake Pedal Free', time: 'Takes 4 Hours', details: ['In Case of Brake Fail', 'In Case of Brake Pedal Free', '', '', '', ''], price: 1999 },
    { title: 'Wrong Fuel Emergency', detail: '• In Case of Wrong Fuel in Fuel Tank • In Case of Car Fuel Mixture', time: 'Takes 4 Hours', details: ['In Case of Wrong Fuel in Fuel Tank', 'In Case of Car Fuel Mixture', '', '', '', ''], price: 2999 },
    { title: 'Critical Dashboard Light', detail: '• In Case of Dashboard Warning Light • In Case of Electrical Malfunctions', time: 'Takes 4 Hours', details: ['In Case of Dashboard Warning Light', 'In Case of Electrical Malfunctions', '', '', '', ''], price: 1499 },
  ],
};

async function init() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 30000,
    });
    console.log('✅ Connected to MongoDB');
    await createProducts();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
}

async function createProducts() {
  try {
    console.log('🔄 Creating products from subcategories...\n');

    let totalCreated = 0;
    let totalUpdated = 0;
    let totalErrors = 0;

    // Get all categories from database
    const categories = await Category.find().sort({ displayOrder: 1 });
    console.log(`📋 Found ${categories.length} categories in database\n`);

    for (const category of categories) {
      const categoryName = category.name;
      const products = productsByCategory[categoryName];

      if (!products || products.length === 0) {
        console.log(`⚠️  No products defined for category: ${categoryName}`);
        continue;
      }

      console.log(`\n📦 Processing category: ${categoryName} (${products.length} products)`);

      for (let i = 0; i < products.length; i++) {
        const productData = products[i];
        
        try {
          // Ensure servicePoints has exactly 6 items
          let servicePoints = [...productData.details];
          while (servicePoints.length < 6) {
            servicePoints.push('');
          }
          servicePoints = servicePoints.slice(0, 6);

          const productPayload = {
            name: productData.title,
            title: productData.title,
            image: 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(productData.title), // Placeholder image
            price: productData.price || 999,
            description: productData.detail || '',
            servicePoints: servicePoints,
            timeTaken: productData.time || 'Takes 4 Hours',
            category: category._id,
            warranty: productData.detail || '',
            isActive: true,
            displayOrder: i + 1,
          };

          // Check if product exists
          const existingProduct = await Product.findOne({ 
            name: productData.title,
            category: category._id 
          });

          if (existingProduct) {
            // Update existing product
            Object.assign(existingProduct, productPayload);
            await existingProduct.save();
            console.log(`   ✅ Updated: ${productData.title}`);
            totalUpdated++;
          } else {
            // Create new product
            await Product.create(productPayload);
            console.log(`   ✅ Created: ${productData.title}`);
            totalCreated++;
          }
        } catch (error) {
          console.error(`   ❌ Error with ${productData.title}:`, error.message);
          totalErrors++;
        }
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   Created: ${totalCreated}`);
    console.log(`   Updated: ${totalUpdated}`);
    console.log(`   Errors: ${totalErrors}`);
    console.log(`   Total Processed: ${totalCreated + totalUpdated + totalErrors}\n`);

    // Display products by category
    console.log('📋 Products by Category:');
    for (const category of categories) {
      const productCount = await Product.countDocuments({ category: category._id });
      console.log(`   ${category.name}: ${productCount} products`);
    }

    console.log('\n✨ Products setup complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating products:', error);
    process.exit(1);
  }
}

init();

