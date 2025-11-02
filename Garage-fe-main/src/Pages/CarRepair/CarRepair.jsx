import React, { useState, useEffect } from 'react'
import Header from '../../compomnents/Header/Header'
import { Container, Row, Col, Button, Card, Badge, Form, Modal } from 'react-bootstrap';
import { CheckCircle, Clock } from 'react-bootstrap-icons';
import { FaCar, FaSnowflake, FaBatteryFull, FaPaintRoller, FaTools, FaSoap, FaClipboardList, FaLightbulb, FaWrench, FaCogs, FaShieldAlt, FaUserClock, FaDotCircle } from 'react-icons/fa';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from "../../config/emailjs";
import contentApi, { getImageUrl } from '../../services/contentApi';
// import './Tabs.css';
import Cars_details1 from "../../assets/image/car_details/1.jpg";
import Cars_details2 from "../../assets/image/car_details/2.jpg";
import Cars_details3 from "../../assets/image/car_details/3.jpg";
import Cars_details4 from "../../assets/image/car_details/4.jpg";
import Cars_details5 from "../../assets/image/car_details/5.jpg";
import Cars_details6 from "../../assets/image/car_details/6.jpg";
import Cars_details7 from "../../assets/image/car_details/7.jpg";
import Cars_details8 from "../../assets/image/car_details/8.jpg";
import Cars_details9 from "../../assets/image/car_details/9.jpg";
import Cars_details10 from "../../assets/image/car_details/10.jpg";
import Cars_details11 from "../../assets/image/car_details/11.jpg";

import Ac_services1 from "../../assets/image/car_details/12.jpg";
import Ac_services2 from "../../assets/image/car_details/13.jpg";
import Ac_services3 from "../../assets/image/car_details/14.jpg";
import Ac_services4 from "../../assets/image/car_details/15.jpg";
import Ac_services5 from "../../assets/image/car_details/16.jpg";
import Ac_services6 from "../../assets/image/car_details/17.jpg";
import Ac_services7 from "../../assets/image/car_details/18.jpg";
import Ac_services8 from "../../assets/image/car_details/19.jpg";
import Ac_services9 from "../../assets/image/car_details/20.jpg";
import Ac_services10 from "../../assets/image/car_details/21.jpg";
import Ac_services11 from "../../assets/image/car_details/22.jpg";
import Ac_services12 from "../../assets/image/car_details/23.png";
import Ac_services13 from "../../assets/image/car_details/24.png";
import Ac_services14 from "../../assets/image/car_details/25.jpg";

import batteries_services1 from "../../assets/image/car_details/26.png";
import batteries_services2 from "../../assets/image/car_details/27.png";
import batteries_services3 from "../../assets/image/car_details/28.png";
import batteries_services4 from "../../assets/image/car_details/29.jpg";
import batteries_services5 from "../../assets/image/car_details/30.jpg";

import tyres1 from "../../assets/image/car_details/31.jpg";
import tyres2 from "../../assets/image/car_details/32.png";
import tyres3 from "../../assets/image/car_details/33.jpg";
import tyres4 from "../../assets/image/car_details/34.jpg";

import painting1 from "../../assets/image/car_details/35.jpg";
import painting2 from "../../assets/image/car_details/36.jpg";
import painting3 from "../../assets/image/car_details/47.jpg";
import painting4 from "../../assets/image/car_details/37.jpg";
import painting5 from "../../assets/image/car_details/48.jpg";
import painting6 from "../../assets/image/car_details/38.png";
import painting7 from "../../assets/image/car_details/49.jpg";
import painting8 from "../../assets/image/car_details/50.jpg";
import painting9 from "../../assets/image/car_details/39.jpg";
import painting10 from "../../assets/image/car_details/40.jpg";
import painting11 from "../../assets/image/car_details/41.jpg";
import painting12 from "../../assets/image/car_details/42.jpg";
import painting13 from "../../assets/image/car_details/43.jpg";
import painting14 from "../../assets/image/car_details/44.jpg";
import painting15 from "../../assets/image/car_details/45.jpg";
import painting16 from "../../assets/image/car_details/46.jpg";

import detailing1 from "../../assets/image/car_details/51.jpg";
import detailing2 from "../../assets/image/car_details/52.jpg";
import detailing3 from "../../assets/image/car_details/53.jpg";
import detailing4 from "../../assets/image/car_details/54.jpg";
import detailing5 from "../../assets/image/car_details/55.jpg";
import detailing6 from "../../assets/image/car_details/56.jpg";
import detailing7 from "../../assets/image/car_details/57.jpg";
import detailing8 from "../../assets/image/car_details/58.png";

import Spa1 from "../../assets/image/car_details/59.jpg";
import Spa2 from "../../assets/image/car_details/60.jpg";
import Spa3 from "../../assets/image/car_details/61.jpg";
import Spa4 from "../../assets/image/car_details/62.jpg";
import Spa5 from "../../assets/image/car_details/63.jpg";
import Spa6 from "../../assets/image/car_details/64.jpg";
import Spa7 from "../../assets/image/car_details/65.jpg";
import Spa8 from "../../assets/image/car_details/66.jpg";
import Spa9 from "../../assets/image/car_details/67.jpg";
import Spa10 from "../../assets/image/car_details/68.jpg";

import inspections1 from "../../assets/image/car_details/69.jpg";
import inspections2 from "../../assets/image/car_details/70.jpg";
import inspections3 from "../../assets/image/car_details/71.jpg";
import inspections4 from "../../assets/image/car_details/72.jpg";
import inspections5 from "../../assets/image/car_details/73.jpg";
import inspections6 from "../../assets/image/car_details/74.jpg";
import inspections7 from "../../assets/image/car_details/75.jpg";
import inspections8 from "../../assets/image/car_details/76.jpg";
import inspections9 from "../../assets/image/car_details/77.jpg";
import inspections10 from "../../assets/image/car_details/78.jpg";
import inspections11 from "../../assets/image/car_details/79.jpg";
import inspections12 from "../../assets/image/car_details/80.jpg";
import inspections13 from "../../assets/image/car_details/81.jpg";

import lights1 from "../../assets/image/car_details/82.jpg";
import lights2 from "../../assets/image/car_details/83.jpg";
import lights3 from "../../assets/image/car_details/84.jpg";
import lights4 from "../../assets/image/car_details/85.jpg";
import lights5 from "../../assets/image/car_details/86.jpg";
import lights6 from "../../assets/image/car_details/87.jpg";
import lights7 from "../../assets/image/car_details/88.jpg";

import suspension1 from "../../assets/image/car_details/89.jpg";
import suspension2 from "../../assets/image/car_details/90.jpg";
import suspension3 from "../../assets/image/car_details/91.jpg";
import suspension4 from "../../assets/image/car_details/92.jpg";
import suspension5 from "../../assets/image/car_details/93.jpg";
import suspension6 from "../../assets/image/car_details/94.jpg";
import suspension7 from "../../assets/image/car_details/95.jpg";
import suspension8 from "../../assets/image/car_details/96.jpg";
import suspension9 from "../../assets/image/car_details/97.jpg";
import suspension10 from "../../assets/image/car_details/98.jpg";
import suspension11 from "../../assets/image/car_details/99.jpg";
import suspension12 from "../../assets/image/car_details/100.jpg";
import suspension13 from "../../assets/image/car_details/101.jpg";
import suspension14 from "../../assets/image/car_details/102.jpg";
import suspension15 from "../../assets/image/car_details/103.jpg";
import suspension16 from "../../assets/image/car_details/104.jpg";
import suspension17 from "../../assets/image/car_details/105.jpg";
import suspension18 from "../../assets/image/car_details/106.jpg";
import suspension19 from "../../assets/image/car_details/107.jpg";
import suspension20 from "../../assets/image/car_details/108.jpg";
import suspension21 from "../../assets/image/car_details/109.jpg";
import suspension22 from "../../assets/image/car_details/110.jpg";
import suspension23 from "../../assets/image/car_details/111.jpg";
import suspension24 from "../../assets/image/car_details/112.jpg";
import suspension25 from "../../assets/image/car_details/113.jpg";

import clutch1 from "../../assets/image/car_details/114.jpg";
import clutch2 from "../../assets/image/car_details/115.jpg";
import clutch3 from "../../assets/image/car_details/116.jpg";
import clutch4 from "../../assets/image/car_details/117.jpg";
import clutch5 from "../../assets/image/car_details/118.jpg";
import clutch6 from "../../assets/image/car_details/119.png";
import clutch7 from "../../assets/image/car_details/133.png";
import clutch8 from "../../assets/image/car_details/120.png";
import clutch9 from "../../assets/image/car_details/121.png";
import clutch10 from "../../assets/image/car_details/122.png";
import clutch11 from "../../assets/image/car_details/123.png";
import clutch12 from "../../assets/image/car_details/124.png";
import clutch13 from "../../assets/image/car_details/125.png";
import clutch14 from "../../assets/image/car_details/126.png";
import clutch15 from "../../assets/image/car_details/127.jpg";
import clutch16 from "../../assets/image/car_details/128.jpg";
import clutch17 from "../../assets/image/car_details/129.jpg";
import clutch18 from "../../assets/image/car_details/130.jpg";
import clutch19 from "../../assets/image/car_details/131.jpg";
import clutch20 from "../../assets/image/car_details/132.jpg";

import claims1 from "../../assets/image/car_details/134.jpg";
import claims2 from "../../assets/image/car_details/135.jpg";
import claims3 from "../../assets/image/car_details/136.jpg";
import claims4 from "../../assets/image/car_details/137.jpg";
import claims5 from "../../assets/image/car_details/138.jpg";
import claims6 from "../../assets/image/car_details/139.jpg";
import claims7 from "../../assets/image/car_details/140.jpg";
import claims8 from "../../assets/image/car_details/141.jpg";
import claims9 from "../../assets/image/car_details/142.jpg";
import claims10 from "../../assets/image/car_details/143.jpg";
import claims11 from "../../assets/image/car_details/144.jpg";
import claims12 from "../../assets/image/car_details/145.jpg";
import claims13 from "../../assets/image/car_details/146.jpg";

import sos1 from "../../assets/image/car_details/147.png";
import sos2 from "../../assets/image/car_details/148.png";
import sos3 from "../../assets/image/car_details/149.png";
import sos4 from "../../assets/image/car_details/150.png";
import sos5 from "../../assets/image/car_details/151.png";
import sos6 from "../../assets/image/car_details/152.png";
import sos7 from "../../assets/image/car_details/153.png";
import sos8 from "../../assets/image/car_details/154.png";
import sos9 from "../../assets/image/car_details/155.png";
import sos10 from "../../assets/image/car_details/156.png";
import sos11 from "../../assets/image/car_details/157.png";
import sos12 from "../../assets/image/car_details/158.png";

import hero from '../../assets/image/hero-2.jpg';
import "./CarRepair.css";

// Icon mapping for categories - supports both icon image URLs and React Icon identifiers
const getCategoryIcon = (category) => {
    // If category is an object with icon property
    if (category && typeof category === 'object') {
        const iconValue = category.icon;
        
        // Check if icon is an image URL (starts with http or /)
        if (iconValue && (iconValue.startsWith('http') || iconValue.startsWith('/'))) {
            return (
                <img 
                    src={getImageUrl(iconValue)} 
                    alt={category.name || 'Category icon'} 
                    style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                />
            );
        }
        
        // Otherwise, treat as React Icon identifier
        const iconIdentifier = iconValue || category.name || category;
        const iconMap = {
            'FaCar': <FaCar />,
            'FaSnowflake': <FaSnowflake />,
            'FaBatteryFull': <FaBatteryFull />,
            'FaDotCircle': <FaDotCircle />,
            'FaPaintRoller': <FaPaintRoller />,
            'FaTools': <FaTools />,
            'FaSoap': <FaSoap />,
            'FaClipboardList': <FaClipboardList />,
            'FaLightbulb': <FaLightbulb />,
            'FaWrench': <FaWrench />,
            'FaCogs': <FaCogs />,
            'FaShieldAlt': <FaShieldAlt />,
            'FaUserClock': <FaUserClock />,
        };
        return iconMap[iconIdentifier] || <FaCar />;
    }
    
    // Fallback for category names (backward compatibility)
    const iconMap = {
        'Periodic Services': <FaCar />,
        'AC Service & Repair': <FaSnowflake />,
        'Batteries': <FaBatteryFull />,
        'Tyres & Wheel Care': <FaDotCircle />,
        'Denting & Painting': <FaPaintRoller />,
        'Detailing Services': <FaTools />,
        'Car Spa & Cleaning': <FaSoap />,
        'Car Inspections': <FaClipboardList />,
        'Windshields & Lights': <FaLightbulb />,
        'Suspension & Fitments': <FaWrench />,
        'Clutch & Body Parts': <FaCogs />,
        'Insurance Claims': <FaShieldAlt />,
        'SOS Service': <FaUserClock />,
    };
    return iconMap[category] || <FaCar />; // Default icon
};

const Services = [
    { title: 'Periodic Services', icon: <FaCar /> },
    { title: 'AC Service & Repair', icon: <FaSnowflake /> },
    { title: 'Batteries', icon: <FaBatteryFull /> },
    { title: 'Tyres & Wheel Care', icon: <FaDotCircle /> },
    { title: 'Denting & Painting', icon: <FaPaintRoller /> },
    { title: 'Detailing Services', icon: <FaTools /> },
    { title: 'Car Spa & Cleaning', icon: <FaSoap /> },
    { title: 'Car Inspections', icon: <FaClipboardList /> },
    { title: 'Windshields & Lights', icon: <FaLightbulb /> },
    { title: 'Suspension & Fitments', icon: <FaWrench /> },
    { title: 'Clutch & Body Parts', icon: <FaCogs /> },
    { title: 'Insurance Claims', icon: <FaShieldAlt /> },
    { title: 'SOS Service', icon: <FaUserClock /> },
];
const tabContent = {
    'Periodic Services': [
        {
            title: 'Basic Service',
            image: Cars_details1,
            detail: ' • 1000 Kms or 1 Month Warranty • Every 5000 Kms or 3 Months (Recommended)',
            time: '4 Hrs Taken',
            details: ['Wiper Fluid Replacement', 'Battery Water Top Up', 'Car Wash', 'Engine Oil Replacement', 'Interior Vacuuming ( Carpet & Seats )'],
            tag: '',
        },
        {
            title: 'Standard Service',
            image: Cars_details2,
            detail: ' • 1000 Kms or 1 Month Warranty • Every 10,000 Kms or 6 Months (Recommended)',
            time: '6 Hrs Taken',
            details: ['Car Scanning', 'Battery Water Top up', 'Interior Vacuuming ( Carpet & Seats )', 'Wiper Fluid Replacement', 'Car Wash', 'Front Brake Pads Serviced', 'Rear Brake Shoes Serviced'],
            tag: 'RECOMMENDED',
        },
        {
            title: 'Comprehensive Service',
            image: Cars_details3,
            detail: ' • 1000 Kms or 1 Month Warranty • Every 20,000 Kms or 12 Months (Recommended)',
            time: '8 Hrs Taken',
            details: ['AC Filter Replacement', 'Wiper Fluid Replacement', 'Interior Vacuuming ( Carpet & Seats )', 'Wheel Balancing', 'Fuel Filter Checking', 'Battery Water Top up', 'Rear Brake Shoes Serviced', 'Wheel Alignment', 'Car Scanning', 'Car Wash', 'Front Brake Pads Serviced', 'Tyre Rotation'],
            tag: 'FREE AC GAS TOP-UP',
        },
        {
            title: 'Front Brake Pads',
            image: Cars_details4,
            detail: '• 1 Month Warranty • Every 20,000 Kms or 12 Months (Recommended)',
            time: 'Takes 3 Hours',
            details: [
                'Opening & Fitting of Front Brake Pads',
                'Applicable for Set of 2 Front Brake Pads',
                'Front Brake Disc Cleaning',
                'Front Brake Pads Replacement (GoMechanic)',
                'Inspection of Front Brake Calipers'
            ],
            tag: 'GoMechanic Exclusive',
        },

        {
            title: 'Rear Brake Shoes',
            image: Cars_details5,
            detail: '• 1 Month Warranty • Every 20,000 Kms or 12 Months (Recommended)',
            time: 'Takes 3 Hours',
            details: [
                'Opening & Fitting of Rear Brake Pads',
                'Applicable for Set of 2 Rear Brake Pads',
                'Rear Brake Disc Cleaning',
                'Rear Brake Shoes Replacement (OES)',
                'Inspection of Rear Brake Calipers'
            ],
            tag: 'Labour Included',
        },

        {
            title: 'Front Brake Discs',
            image: Cars_details6,
            detail: '• 1 Month Warranty • Corrosion Resistance',
            time: 'Takes 5 Hours',
            details: [
                'Front Brake Disc Replacement (Single OES Unit)',
                'Reduces Vibrations and Brake Noises',
                'Free Pickup & Drop',
                'Opening & Fitting of Front Brake Disc',
                'Increases Brake Life & Safety'
            ],
            tag: 'Labour Included',
        },

        {
            title: 'Caliper Pin Replacement',
            image: Cars_details7,
            detail: '• Recommended: In case of Noise coming from Brakes',
            time: 'Takes 8 Hours',
            details: [
                'Caliper Pin Replacement (OES)',
                'Caliper Assembly Cost Additional',
                'Opening & Fitting of Caliper Pin',
                'Free Pickup & Drop'
            ],
            tag: 'New',
        },
        {
            title: 'Disc Turning',
            image: Cars_details8,
            detail: '• 1 Month Warranty on Labour',
            time: 'Takes 4 Hours',
            details: [
                'Opening & Fitting of Brake Discs',
                'Applicable For Set of 2 Discs (2 Wheels)',
                'Inspection of Brake Discs',
                'Resurfacing of Brake Discs/Rotors'
            ]
        },
        {
            title: 'Handbrake Wire Replacement',
            image: Cars_details9,
            detail: '• Recommended: In Case Handbrake Stops Working',
            time: 'Takes 4 Hours',
            details: [
                'Handbrake Wire Replacement (Single OES Unit)',
                'Electronic Parking Brake Cost Additional',
                'Free Pickup & Drop',
                'Brake Drum Inspection',
                'Wheel Cylinder, Ratchet, Clamps Cost Additional'
            ],
            tag: 'New',
        },

        {
            title: 'Brake Drums Turning',
            image: Cars_details10,
            detail: '• 1 Month Warranty • Recommended: In Case of Screeching Noise from Brakes',
            time: 'Takes 4 Hours',
            details: [
                'Brake Drums Turning',
                'Refacing of Brake Drums',
                'Free Pickup & Drop',
                'Opening & Fitting of Brake Drums',
                'Applicable for Set of 2 Brake Drums'
            ]
        },

        {
            title: 'Wheel Cylinder Replacement',
            image: Cars_details11,
            detail: '• Recommended: In case of Poor Braking',
            time: 'Takes 8 Hours',
            details: [
                'Wheel Cylinder Replacement (OES)',
                'Brake Shoe & Brake Fluid Cost Additional',
                'Opening & Fitting of Wheel Cylinder',
                'Free Pickup & Drop'
            ],
            tag: 'New',
        },
    ],
    'AC Service & Repair': [
        {
            title: 'Regular AC Service',
            image: Ac_services1,
            detail: '• 500 Kms or 1 Month Warranty • Every 5,000 Kms or 3 Months (Recommended)',
            time: 'Takes 4 Hours',
            details: [
                'AC Vent Cleaning',
                'AC Gas (upto 400 gms)',
                'AC Filter Cleaning',
                'AC Inspection',
                'Condenser Cleaning'
            ],
            tag: 'Free AC Unit Inspection',
        },
        {
            title: 'High Performance AC Service',
            image: Ac_services2,
            detail: '• 1,000 Kms or 1 Month Warranty • Every 10,000 Kms or 1 Year (Recommended)',
            time: 'Takes 8 Hours',
            details: [
                'AC Vent Cleaning',
                'Dashboard Removing Refitting',
                'AC Gas (Upto 600gms)',
                'AC Leak Test',
                'Dashboard Cleaning'
            ],
            tag: 'Recommended',
        },
        {
            title: 'Cooling Coil Replacement',
            image: Ac_services3,
            detail: '• 3 Months Warranty • Recommended: In case of No / Less Cooling',
            time: 'Takes 8 Hours',
            details: [
                'Cooling Coil Replacement (OES)',
                'AC Pipe, Valve, Sensors Cost Additional',
                'Free Pickup & Drop',
                'Spare Part Cost Only',
                'AC Gas, Compressor Oil Cost Additional'
            ],
            tag: '',
        },
        {
            title: 'Condenser Replacement',
            image: Ac_services4,
            detail: '• 3 Months Warranty • Recommended: In Case of Condenser Leakage or Less Cooling',
            time: 'Takes 8 Hours',
            details: [
                'Condenser Replacement (OES)',
                'AC Pipe, Valve, Sensors Cost Additional',
                'Free Pickup & Drop',
                'Spare Part Cost Only',
                'AC Gas, Compressor Oil Cost Additional'
            ],
            tag: 'Free AC Gas Top Up',
        },
        {
            title: 'Compressor Replacement',
            image: Ac_services5,
            detail: '• 3 Months Warranty • Recommended: In Case of Compressor Leakage or Less Cooling',
            time: 'Takes 8 Hours',
            details: [
                'Compressor Replacement (OES)',
                'AC Pipe, Valve, Sensors Cost Additional',
                'Free Pickup & Drop',
                'Spare Part Cost Only',
                'AC Gas, Compressor Oil Cost Additional'
            ],
            tag: 'Free Regular AC Service',
        },
        {
            title: 'Heating Coil Replacement',
            image: Ac_services6,
            detail: '• 3 Months Warranty • Recommended: In case of Heater not working',
            time: 'Takes 8 Hours',
            details: [
                'Heating Coil Replacement (OES)',
                'Spare Part Cost Only',
                'Free Pickup & Drop',
                'Hoses Additional (If Required)',
                'Coolant and Radiator Flush Cost Additional'
            ],
            tag: 'Spare Part Price Only',
        },
        {
            title: 'V-Belt Replacement',
            image: Ac_services7,
            detail: '• 1 Month Warranty • Recommended: In Case of whining noise from Engine',
            time: 'Takes 8 Hours',
            details: [
                'V-Belt Replacement (OES)',
                'Pulleys, Bearing, Timing Cost Additional',
                'Free Pickup & Drop',
                'Opening & Fitting of V-Belt',
                'Scanning Cost Additional'
            ],
            tag: 'Labour Included',
        },
        {
            title: 'AC Blower Motor Replacement',
            image: Ac_services8,
            detail: '• 1 Month Warranty • Recommended: In Case of Rattling, Humming Noise from AC Blower',
            time: 'Takes 8 Hours',
            details: [
                'AC Blower Motor Replacement (OES)',
                'AC Filter, Vents, Casing Cost Additional',
                'Free Pickup & Drop',
                'Spare Part Cost Only',
                'Wiring Cost Additional (If Needed)'
            ],
            tag: 'New',
        },
        {
            title: 'Radiator Replacement',
            image: Ac_services9,
            detail: '• 1 Month Warranty • Recommended: In Case of Blockage in the Radiator Vessels',
            time: 'Takes 8 Hours',
            details: [
                'Radiator Replacement (OES)',
                'Radiator Hoses, Thermostat Valves Cost Additional',
                'Free Pickup & Drop',
                'Spare Part Cost Only',
                'Coolant Cost Additional'
            ],
            tag: 'Spare Part Price Only',
        },
        {
            title: 'Radiator Fan Motor Replacement',
            image: Ac_services10,
            detail: '• 1 Month Warranty • Recommended: In Case of Radiator Fan not working',
            time: 'Takes 6 Hours',
            details: [
                'Radiator Fan Motor Replacement (OES)',
                'Coolant and Radiator Flush Cost Additional',
                'Opening & Fitting of Radiator Fan Motor',
                'Free Pickup & Drop'
            ],
            tag: 'Labour Included',
        },
        {
            title: 'Radiator Flush & Clean',
            image: Ac_services11,
            detail: '• Protects Radiator from Corrosion • Free Pickup and Drop',
            time: 'Takes 2 Hours',
            details: [
                'Coolant Draining',
                'Anti-Freeze Coolant Replacement',
                'Coolant Leakage Inspection',
                'Radiator Flushing',
                'Radiator Cleaning'
            ],
            tag: '',
        },
        {
            title: 'AC Inspection',
            image: Ac_services12,
            detail: '• Applicable on Walk-ins Only',
            time: 'Takes 1 Hour',
            details: [
                'AC Unit Inspection',
                'Upfront Estimate',
                'AC Gas Inspection'
            ],
            tag: 'Under 49',
        },
        {
            title: 'AC Condenser Cleaning',
            image: Ac_services13,
            detail: '• Recommended: In case of AC Performance Issues',
            time: 'Takes 1 Hour',
            details: [
                'AC Condenser Cleaning',
                'Bumper Opening & Refitting Price Additional'
            ],
            tag: 'Under 99',
        },
        {
            title: 'Drive Belt Lubrication',
            image: Ac_services14,
            detail: '• Recommended: In case of Squeaking Noise or Wear',
            time: 'Takes 1 Hour',
            details: [
                'Drive Belt Lubrication'
            ],
            tag: 'Under 199',
        }

    ],
    'Batteries': [
        {
            title: 'Amaron (55 Months Warranty)',
            image: batteries_services1,
            detail: '• 35 Amp Hour • 55 Months Warranty • Free of Cost Installation',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Old Battery Price Included',
                'Free Installation',
                'Available at Doorstep'
            ],
            tag: '',
        },
        {
            title: 'Amaron (72 Months Warranty)',
            image: batteries_services1,
            detail: '• 35 Amp Hour • 66 Months Warranty • Free of Cost Installation',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Old Battery Price Included',
                'Free Installation',
                'Available at Doorstep'
            ],
            tag: '',
        },
        {
            title: 'Exide (55 Months Warranty)',
            image: batteries_services2,
            detail: '• 40 Amp Hour • 55 Months Warranty • Free of Cost Installation',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Old Battery Price Included',
                'Free Installation',
                'Available at Doorstep'
            ],
            tag: '',
        },
        {
            title: 'Exide (66 Months Warranty)',
            image: batteries_services2,
            detail: '• 35 Amp Hour • 66 Months Warranty • Free of Cost Installation',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Old Battery Price Included',
                'Free Installation',
                'Available at Doorstep'
            ],
            tag: '',
        },
        {
            title: 'Livguard (60 Months Warranty)',
            image: batteries_services3,
            detail: '• 35 Amp Hour • 60 Months Warranty • Free of Cost Installation',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Old Battery Price Included',
                'Free Installation',
                'Available at Doorstep'
            ],
            tag: '',
        },
        {
            title: 'Livguard (72 Months Warranty)',
            image: batteries_services3,
            detail: '• 35 Amp Hour • 72 Months Warranty • Free of Cost Installation',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Old Battery Price Included',
                'Free Installation',
                'Available at Doorstep'
            ],
            tag: '',
        },
        {
            title: 'Alternator Replacement',
            image: batteries_services4,
            detail: '• 1 Month Warranty • Recommended: In Case of frequently Discharging Battery',
            time: 'Takes 6 Hours',
            details: [
                'Alternator Replacement',
                'Alternator Belt Additional',
                'Opening & Fitting of Alternator',
                'Free Pickup & Drop'
            ],
            tag: '',
        },
        {
            title: 'Alternator Repair',
            image: batteries_services5,
            detail: '• 3 Months Warranty • Recommended: In Case of frequently Discharging Battery',
            time: 'Takes 6 Hours',
            details: [
                'Alternator Repair',
                'Alternator Belt Additional',
                'Opening & Fitting of Alternator',
                'Free Pickup & Drop'
            ],
            tag: '',
        },
    ],
    'Tyres & Wheel Care': [
        {
            title: 'Apollo Alnac 4GS',
            image: tyres1,
            detail: '• Size - 175/65 R15 84H • 5 years warranty • Tubeless • Fitting Cost Included',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Tyres Inspection for Tread',
                'Tyre Replacement at Service Center',
                'Alignment & Balancing Charges Extra'
            ],
            tag: '',
        },
        {
            title: 'MRF ZVTV',
            image: tyres2,
            detail: '• Size - 175/65 R15 84TL • 6 years warranty • Tubeless • Fitting Cost Included',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Tyres Inspection for Tread',
                'Tyre Replacement at Service Center',
                'Alignment & Balancing Charges Extra'
            ],
            tag: '',
        },
        {
            title: 'JK UX Royale',
            image: tyres2,
            detail: '• Size - 175/65 R15 • 5 years warranty • Tubeless • Fitting Cost Included',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Tyres Inspection for Tread',
                'Tyre Replacement at Service Center',
                'Alignment & Balancing Charges Extra'
            ],
            tag: '',
        },
        {
            title: 'Bridgestone B290',
            image: tyres2,
            detail: '• Size - 175/65 R15 84T • 5 years warranty • Tubeless • Fitting Cost Included',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Tyres Inspection for Tread',
                'Tyre Replacement at Service Center',
                'Alignment & Balancing Charges Extra'
            ],
            tag: '',
        },
        {
            title: 'Bridgestone B250',
            image: tyres2,
            detail: '• Size - 175/65 R15 87H • 5 years warranty • Tubeless • Fitting Cost Included',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Tyres Inspection for Tread',
                'Tyre Replacement at Service Center',
                'Alignment & Balancing Charges Extra'
            ],
            tag: '',
        },
        {
            title: 'Goodyear Assurance TripleMax',
            image: tyres2,
            detail: '• Size - 175/65 R15 88 • 5 years warranty • Tubeless • Fitting Cost Included',
            time: '',
            details: [
                'Free Pickup & Drop',
                'Tyres Inspection for Tread',
                'Tyre Replacement at Service Center',
                'Alignment & Balancing Charges Extra'
            ],
            tag: '',
        },
        {
            title: 'Complete Wheel Care',
            image: tyres3,
            detail: '• Every 6 Months or 5,000 Kms (Recommended)',
            time: 'Takes 4 Hours',
            details: [
                'Automated Wheel Balancing',
                'Alloy Weights Additional',
                'Steering Adjustment and Correction',
                'Weight Correction',
                'Laser Assisted Wheel Alignment'
            ],
            tag: '',
        },
        {
            title: 'Mud Flaps',
            image: tyres4,
            detail: '• 1 Month Warranty on Fitting • Excellent Durability',
            time: 'Takes 2 Hours',
            details: [
                'Mud Flaps Set of 4',
                'Protects Car Underbody',
                'Prevents Soil Accumulation',
                'Easy Fitment'
            ],
            tag: '',
        },

    ],
    'Denting & Painting': [
        {
            title: 'Front Bumper Paint',
            image: painting1,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Bonnet Paint',
            image: painting2,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Rear Bumper Paint',
            image: painting3,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Boot Paint',
            image: painting4,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Full Body Dent Paint',
            image: painting5,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 6 Days',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: 'FREE DEEP ALL ROUND CLEANING',
        },
        {
            title: 'Alloy Paint',
            image: painting6,
            detail: '• 1 Year Warranty • 1 Year (Recommended)',
            time: 'Takes 24 Hours',
            details: [
                'Grade A Primer',
                '4 Layers of Painting',
                'High Temperature Paint',
                'Alloy Preservation'
            ],
            tag: '',
        },
        {
            title: 'Left Fender Paint',
            image: painting7,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Left Front Door Paint',
            image: painting8,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Left Rear Door Paint',
            image: painting9,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Left Quarter Panel Paint',
            image: painting10,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Left Running Board Paint',
            image: painting11,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Right Fender Paint',
            image: painting12,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Right Front Door Paint',
            image: painting13,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Right Rear Door Paint',
            image: painting14,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Right Quarter Panel Paint',
            image: painting15,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
        {
            title: 'Right Running Board Paint',
            image: painting16,
            detail: '• 2 Years Warranty on Paint',
            time: 'Takes 24 Hours',
            details: [
                'Removal of Minor Dent & Scratches',
                'High Quality DuPont Paint',
                'Panel Rubbing & Polishing',
                'Grade A Primer Applied',
                'Clear Coat Protective Layer Paint'
            ],
            tag: '',
        },
    ],
    'Detailing Services': [
        {
            title: '3M™ Car Rubbing & Polishing',
            image: detailing1,
            detail: '• Every 6 Months (Recommended)',
            time: 'Takes 6 Hours',
            details: [
                'Pressure Car Wash',
                'Alloy Polishing',
                'Rubbing with 3M Compound',
                'Tyre Dressing',
                'Machine Rubbing',
                '3M Wax Polishing'
            ],
            tag: 'RECOMMENDED',
        },
        {
            title: 'Ceramic Coating',
            image: detailing2,
            detail: '• 1 Year Warranty  • Every 3 Years (Recommended)',
            time: 'Takes 3 Days',
            details: [
                'Complete Paint Correction',
                'Safely Removal of Minor Scratches',
                'Exterior Car Wash',
                '2 Layers of Coating',
                'Deep All Round Spa'
            ],
            tag: 'FREE ALL ROUND CLEANING',
        },
        {
            title: "Meguiar's Ceramic Coating",
            image: detailing3,
            detail: '• 1 Year Warranty  • Every 3 Years (Recommended)',
            time: 'Takes 3 Days',
            details: [
                'Complete Paint Correction',
                'Removes Minor Scratches',
                'Exterior Car Wash',
                '2 Layers of Coating',
                'Deep All Round Spa'
            ],
            tag: 'FREE INTERIOR SPA',
        },
        {
            title: "Meguiar's Teflon Coating",
            image: detailing4,
            detail: '• 3 Months Warranty  • Every 1 Year (Recommended)',
            time: 'Takes 24 Hours',
            details: [
                'Pre-Coating Rubbing and Polishing',
                'Removes Minor Scratches',
                "Full Body Meguiar's Teflon Coating",
                'Ultra Shine Polishing',
                'Exterior Car Wash',
                "Meguiar's Exterior Anti-Rust Treatment"
            ]
        },
        {
            title: '3M™ Teflon Coating',
            image: detailing5,
            detail: '• 3 Months Warranty  • Every 1 Year (Recommended)',
            time: 'Takes 24 Hours',
            details: [
                'Pre-Coating Rubbing and Polishing',
                'Removes Minor Scratches',
                'Full Body 3M Teflon Coating',
                'Ultra Shine Polishing',
                'Exterior Car Wash',
                '3M Exterior Anti-Rust Treatment'
            ]
        },
        {
            title: 'PPF - Paint Protection Film',
            image: detailing6,
            detail: '• 3 Years Warranty  • Every 3 Years (Recommended)',
            time: 'Takes 6 Days',
            details: [
                'Avery PPF -Paint Protection Film'
            ],
            tag: 'FREE INTERIOR SPA',
        },
        {
            title: 'Anti Rust Underbody Coating',
            image: detailing7,
            detail: '• 3 Months Warranty  • Every 1 Year (Recommended)',
            time: 'Takes 24 Hours',
            details: [
                'Underbody TeflonCoating',
                'Protective Anti -Corrosion Treatment'
            ]
        },
        {
            title: 'Silencer Coating',
            image: detailing8,
            detail: '• 3 Months Warranty  • Every 1 Year (Recommended)',
            time: 'Takes 6 Hours',
            details: [
                'Silencer Anti Rust Coating',
                '2 Layers of Protection',
                'Silencer Corrosion Protection'
            ]
        },
    ],
    'Car Spa & Cleaning': [
        {
            title: 'Winter Care Package',
            image: Spa1,
            detail: '• 1 Month Warranty  • Free Pickup and Drop',
            time: 'Takes 3 Hours',
            details: [
                'Coolant Leakage Inspection',
                'Coolant Replacement',
                'AC Blower Cleaning',
                'Radiator Flushing',
                'AC Gas Check'
            ],
            tag: 'NEW'
        },
        {
            title: '360° Deep Cleaning',
            image: Spa2,
            detail: '• 1 Month Warranty  • Brand New Festive Look',
            time: 'Takes 6 Hours',
            details: [
                'Exterior Rubbing & Polishing',
                'Interior Vacuum Cleaning',
                'Tyre Dressing & Alloy Polishing',
                'Interior Wet Shampooing & Detailing',
                'Pressure Washing',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Car Interior Spa',
            image: Spa3,
            detail: '• Every 3 Months (Recommended)',
            time: 'Takes 6 Hours',
            details: [
                'Pressure Car Wash',
                'Interior Vacuum Cleaning',
                'Interior Wet Shampooing and Detailing',
                'Anti Viral & Bacterial Treatment',
                'Dashboard Polishing'
            ],
            tag: 'FREE CAR INSPECTION'
        },
        {
            title: 'Deep All Round Spa',
            image: Spa4,
            detail: '• Every 6 Months (Recommended)',
            time: 'Takes 6 Hours',
            details: [
                'Interior Vacuum Cleaning',
                'Interior Wet Shampooing and Detailing',
                'Rubbing with Compound',
                'Dashboard Polishing',
                'Pressure Car Wash'
            ],
            tag: 'RECOMMENDED'
        },
        {
            title: 'Premium Top Wash',
            image: Spa5,
            detail: '• Applicable on Walk-in Only  • Preserving Paint & Finish',
            time: 'Revitalize Your Ride in Just 1 Hour',
            details: [
                'Exterior Top Wash',
                'Hand Drying',
                'Rinsing',
                'Tyre external wash'
            ]
        },
        {
            title: 'Car Wash & Wax',
            image: Spa6,
            detail: '• Maintains Car Shine  • Recommended Every 2 Months',
            time: 'Takes 2 Hours',
            details: [
                'Car Wash',
                'Dashboard and Tyre Polish',
                'Interior Vacuuming',
                'Body Wax'
            ]
        },
        {
            title: 'Car Rubbing & Polishing',
            image: Spa7,
            detail: '• Takes 6 Hours',
            time: 'Every 6 Months Recommended',
            details: [
                'Machine Rubbing with Compound',
                'Pressure Car Wash',
                'Alloy Polishing',
                'Wax Polishing',
                'Tyre Dressing'
            ]
        },
        {
            title: 'Rat / Pest Repellent Treatment',
            image: Spa8,
            detail: '• 1 Month Warranty  • No Toxic Pesticides Used',
            time: 'Takes 3 Hours',
            details: [
                'Rat Repellent Treatment',
                'Protects Car Wiring from Pests',
                'Free Pickup & Drop',
                'Sprayed on Underbody and Engine Bay',
                'Prevents Pest Breeding inside Car'
            ]
        },
        {
            title: 'Car Inspection / Diagnostics',
            image: Spa9,
            detail: '• 25 Points Checklist  • Every 1 Month (Recommended)',
            time: 'Takes 4 Hours',
            details: [
                'Underbody Inspection',
                'Upfront Estimate',
                '25 Points Checklist'
            ]
        },
        {
            title: 'Sunroof Service',
            image: Spa10,
            detail: '• 1000 Kms or 1 Month Warranty  • Every 15000 Kms or 12 Months',
            time: 'Takes 6 Hours',
            details: [
                'Roof Opening & Refitting',
                'Drainage Tube Clog/Debris Removal',
                'Sunroof Lubrication',
                'Sunroof Cleaning'
            ]
        },
    ],
    'Car Inspections': [
        {
            title: 'Second Hand Car Inspection',
            image: inspections1,
            detail: '• Available at Doorstep  • Scanner Report Provided',
            time: 'Takes 4 Hours',
            details: [
                '50 Points CheckList',
                'Physical Car Diagnosis',
                'Get Car Valuation',
                'Full Car Scanning',
                'Upfront Estimate'
            ],
            tag: 'GET 15% OFF ON PERIODIC SERVICE'
        },
        {
            title: 'Road Trip Inspection',
            image: inspections2,
            detail: '• Recommended for Long Road Trips',
            time: 'Takes 4 Hours',
            details: [
                'Wheel Alignment & Balancing',
                'Detailed Health Card',
                'Free Pickup & Drop',
                'Full Car Scanning',
                'Fluid Leakage Inspection'
            ],
            tag: 'NEW'
        },
        {
            title: 'Engine Scanning',
            image: inspections3,
            detail: '• Scanner Report Provided  • OEM Scanner Used',
            time: 'Takes 3 Hours',
            details: [
                'Electrical Scanning',
                'Sensor Reset',
                'Error Code Deletion',
                'Inspection of Exhaust Smoke'
            ]
        },
        {
            title: 'Insurance Claim Inspection',
            image: inspections4,
            detail: '• Real Time Claim Tracking Mechanism  • Free Pick-Up/Drop',
            time: 'Cashless Facility',
            details: [
                'Claim Intimation',
                'Co-ordination with Insurance Company',
                'Policy Inspection',
                'Surveyor Estimate Approval',
                '2 Years Warranty on Paint Jobs'
            ]
        },
        {
            title: 'Car Fluids Check',
            image: inspections5,
            detail: '• Free Pickup Included  • On Leakage or Check Light (Recommended)',
            time: 'Takes 3 Hours',
            details: [
                'Brake Fluid Check',
                'Engine Oil Check',
                'Battery Water Inspection',
                'Coolant Check',
                'Power Steering Oil Check'
            ]
        },
        {
            title: 'Complete Suspension Inspection',
            image: inspections6,
            detail: '• 25 Points Check List  • On Suspension Noise (Recommended)',
            time: 'Takes 4 Hours',
            details: [
                'Front Shocker Check',
                'Shocker Mount Check',
                'Jumping Rod Bush Check',
                'Rear Shocker Check',
                'Link Rod Inspection'
            ]
        },
        {
            title: 'Radiator Replacement',
            image: inspections7,
            detail: '• 1 Month Warranty  • Recommended: in case of Blockage in the Radiator Vessels',
            time: 'Takes 6 Hours',
            details: [
                'Radiator Replacement (OES)',
                'Radiator Hoses, Thermostat Valves Cost Additional',
                'Free Pickup & Drop',
                'Spare Part Cost Only',
                'Coolant Cost Additional'
            ],
            tag: 'SPARE PART PRICE ONLY'
        },
        {
            title: 'Radiator Fan Motor Replacement',
            image: inspections8,
            detail: '• 1 Month Warranty  • Recommended: in case of Radiator Fan not working',
            time: 'Takes 6 Hours',
            details: [
                'Radiator Fan Motor Replacement (OES)',
                'Coolant and Radiator Flush Cost Additional',
                'Opening & Fitting of Radiator Fan Motor',
                'Free Pickup & Drop'
            ],
            tag: 'LABOUR INCLUDED'
        },
        {
            title: 'Radiator Flush & Clean',
            image: inspections9,
            detail: '• Protects Radiator from Corrosion  • Free Pickup and Drop',
            time: 'Takes 2 Hours',
            details: [
                'Coolant Draining',
                'Anti - Freeze Coolant Replacement',
                'Coolant Leakage Inspection',
                'Radiator Flushing',
                'Radiator Cleaning'
            ]
        },
        {
            title: 'Car Waterlog Assistance',
            image: inspections10,
            detail: '• Recommended: in Case of Car Flooding',
            time: 'Takes 6 Hours',
            details: [
                'Physical Car Diagnosis',
                'Detailed Health Card',
                '50 Points Check-List',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Car Engine Issues',
            image: inspections11,
            detail: '• Recommended: in Case of Engine Vibrations',
            time: 'Takes 6 Hours',
            details: [
                'Full Car Scanning',
                'Detailed Health Card',
                '25 Points Check-List',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Problem with Car Brakes & Wheels',
            image: inspections12,
            detail: '• Recommended: in Case of Vibrations while Braking',
            time: 'Takes 6 Hours',
            details: [
                'Physical Car Diagnosis',
                'Detailed Health Card',
                '50 Points Check-List',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Damaged Car Body or Interiors',
            image: inspections13,
            detail: '• Recommended: In Case of Dirty Seat Covers',
            time: 'Takes 6 Hours',
            details: [
                'Physical Car Diagnosis',
                'Free Pickup & Drop',
                'Car Interior Inspection'
            ]
        },
    ],
    'Windshields & Lights': [
        {
            title: 'Front Windshield Replacement',
            image: lights1,
            detail: '• 1 Month Warranty on Fitting  • On Crack in Windshield (Recommended)',
            time: 'Takes 6 Hours',
            details: [
                'Windshield (ISI Approved)',
                'Sensor Charges Additional (If Applicable)',
                'Free Pickup & Drop',
                'Opening & Fitting of New Windshield',
                'Consumables - Sealant/Bond/Adhesive'
            ],
            tag: 'Labour Included'
        },
        {
            title: 'Rear Windshield Replacement',
            image: lights2,
            detail: '• 1 Month Warranty on Fitting  • On Crack in Windshield (Recommended)',
            time: 'Takes 6 Hours',
            details: [
                'Rear Windshield (ISI Approved)',
                'Defogger Charges Additional (If Applicable)',
                'Free Pickup & Drop',
                'Opening & Fitting of New Windshield',
                'Consumables - Sealant/Bond/Adhesive'
            ],
            tag: 'Labour Included'
        },
        {
            title: 'Door Glass Replacement',
            image: lights3,
            detail: '• 1 Month Warranty on Fitting  • On Crack in Door Glass (Recommended)',
            time: 'Takes 6 Hours',
            details: [
                'Door Glass (AIS Approved)',
                'Consumables - Bond/Adhesive',
                'UV Glass Charges Additional (If Applicable)',
                'Opening & Fitting of New Door Glass',
                'Free Pickup & Drop'
            ],
            tag: 'Labour Included'
        },
        {
            title: 'Front Headlight',
            image: lights4,
            detail: '• 1 Month Warranty on Fitting  • For Broken / Cracked Lights (Recommended)',
            time: 'Takes 4 Hours',
            details: [
                'Headlight OES (Price for single unit)',
                'Free Pickup & Drop',
                'Opening & Fitting of Bumper/Headlight',
                'Projector/LEDs/DRLs Additional (If Applicable)'
            ]
        },
        {
            title: 'Rear Taillight',
            image: lights5,
            detail: '• 1 Month Warranty on Fitting  • For Broken / Cracked Lights (Recommended)',
            time: 'Takes 4 Hours',
            details: [
                'Tail Light OES (Price for single unit)',
                'Free Pickup & Drop',
                'Tail Light Price Will Differ From Car Model to Model',
                'Opening & Fitting of Tail Light',
                'Bulbs/LEDs Additional (If Applicable)'
            ]
        },
        {
            title: 'Fog Light',
            image: lights6,
            detail: '• 1 Month Warranty on Fitting',
            time: 'Takes 4 Hours',
            details: [
                'Opening & Fitting of Bumper + Fog Lamp',
                'Switch/Marness Wiring Check',
                'Projectors/LEDs/DRLs Additional (If Applicable)',
                'Fog Light Assembly Replacement (Single Unit)',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Side Mirror Replacement',
            image: lights7,
            detail: '• 1 Month Warranty  • Recommended: In Case of Broken / Cracked Side Mirror',
            time: 'Takes 4 Hours',
            details: [
                'Side Mirror Replacement OES (Single Unit)',
                'Semi & Fully Automatic Side Mirror Cost Additional',
                'Free Pickup & Drop',
                'Opening & Fitting of Side Mirror',
                'Switch/Wiring Harness Cost Additional'
            ]
        }
    ],
    'Suspension & Fitments': [
        {
            title: 'EPS Module Repair',
            image: suspension1,
            detail: '• 1 Month Warranty  • Recommended: In Case of Hard Steering',
            time: 'Takes 6 Hours',
            details: [
                'EPS Module Repair',
                'Torque Sensor Additional if Needed',
                'Steering Rack, Steering Motor Additional if Needed',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Steering Rack Repair',
            image: suspension2,
            detail: '• 1 Month Warranty  • Recommended: In Case of Hard Steering',
            time: 'Takes 6 Hours',
            details: [
                'Steering Rack Repair',
                'Steering Rod Resurfacing',
                'Free Pickup & Drop',
                'Steering Bush Kit, Lathe Work, Wheel Alignment Included',
                'Calibration and Pinion Cost Additional (If Needed)'
            ],
            tag: 'New'
        },
        {
            title: 'Front Shock Absorber Replacement',
            image: suspension3,
            detail: '• 1 Month Warranty  • Free Pickup and Drop',
            time: 'Takes 6 Hours',
            details: [
                'Shock Strut / Damper OES Replacement (Single Unit)',
                'Shockor Mount, Shockor Coil Spring Additional Charges',
                'Airmatic Shock Absorber Cost Additional (If Applicable)',
                'Opening & Fitting of Front Shock Absorber',
                'Free Pickup & Drop'
            ],
            tag: 'Free Car Wash'
        },
        {
            title: 'Rear Shock Absorber Replacement',
            image: suspension4,
            detail: '• 1 Month Warranty  • Free Pickup and Drop',
            time: 'Takes 6 Hours',
            details: [
                'Shock Strut / Damper OES Replacement (Single Unit)',
                'Shockor Mount, Shockor Coil Spring Additional Charges',
                'Airmatic Shock Absorber Cost Additional (If Applicable)',
                'Opening & Fitting of Rear Shock Absorber',
                'Free Pickup & Drop'
            ],
            tag: 'Labour Included'
        },
        {
            title: 'Suspension Lower Arm Replacement',
            image: suspension5,
            detail: '• 1 Month Warranty  • Recommended: In Case Vibration in the Steering Wheel',
            time: 'Takes 6 Hours',
            details: [
                'Suspension Lower Arm Replacement (OES Single Unit)',
                'Spare Part Cost Only',
                'Free Pickup & Drop',
                'Complete Suspension Inspection',
                'Wheel Alignment Cost Additional'
            ],
            tag: 'Spare Part Price Only'
        },
        {
            title: 'Link Rod Replacement',
            image: suspension6,
            detail: '• 1 Month Warranty  • Recommended: In Case Loose Steering Wheel',
            time: 'Takes 6 Hours',
            details: [
                'Link Rod Replacement (OES Single Unit)',
                'Spare Part Cost Only',
                'Free Pickup & Drop',
                'Complete Suspension Inspection',
                'Wheel Alignment Cost Additional'
            ],
            tag: 'Spare Part Price Only'
        },
        {
            title: 'Tie Rod End Replacement',
            image: suspension7,
            detail: '• 1 Month Warranty  • Recommended: In case of Vibration in the Steering Wheel',
            time: 'Takes 6 Hours',
            details: [
                'Tie Rod End Replacement (OES)',
                'Spare Part Cost Only',
                'Free Pickup & Drop',
                'Complete Suspension Inspection',
                'Camber Bolt & Wheel Alignment Cost Additional'
            ],
            tag: 'Spare Part Price Only'
        },
        {
            title: 'Complete Suspension Inspection',
            image: suspension8,
            detail: '• 25 Points Check List  • On Suspension Noise (Recommended)',
            time: 'Takes 6 Hours',
            details: [
                'Front Shocker Check',
                'Shockor Mount Check',
                'Jumping Rod Bush Check',
                'Rear Shocker Check',
                'Link Rod Inspection'
            ]
        },
        {
            title: 'Front Shocker Mount Replacement',
            image: suspension9,
            detail: '• 1 Month Warranty  • Recommended: In Case of Excessive Noise / Vibration from Suspension',
            time: 'Takes 6 Hours',
            details: [
                'Front Shocker Mount Replacement (OES Single Unit)',
                'Shocker Mount Bearings, Cap Cost Additional',
                'Wheel Alignment Cost Additional',
                'Opening & Fitting of Front Shocker Mount',
                'Airmatic Shock Absorber Mount Cost Additional',
                'Free Pickup & Drop'
            ],
            tag: 'Labour Included'
        },
        {
            title: 'Front Axle Repair',
            image: suspension10,
            detail: '• Recommended: In Case of Noise Coming from Suspension  • In Case of Excessive Noise / Vibration from Suspension',
            time: 'Takes 6 Hours',
            details: [
                'Front Axle Repair (Single Unit)',
                'Includes Replacement of Axle Bearings & Boot',
                'Free Pickup & Drop',
                'Opening & Fitting of Front Axle',
                'Wheel Bearing Cost Additional (If Required)'
            ]
        },
        {
            title: 'Radiator Replacement',
            image: suspension11,
            detail: '• 1 Month Warranty  • Recommended: In Case of Blockage in the Radiator Vessels',
            time: 'Takes 6 Hours',
            details: [
                'Radiator Replacement (OES)',
                'Radiator Hoses, Thermostat Valves Cost Additional',
                'Free Pickup & Drop',
                'Spare Part Cost Only',
                'Coolant Cost Additional'
            ],
            tag: 'Spare Part Price Only'
        },
        {
            title: 'Engine Mounting Replacement',
            image: suspension12,
            detail: '• 1 Month Warranty  • Recommended: In Case of Noise from Engine',
            time: 'Takes 6 Hours',
            details: [
                'Engine Mounting Replacement (OES)',
                'Single Unit Only',
                'Spare Part Price Only',
                'Free Pickup & Drop'
            ],
            tag: 'Spare Part Price Only'
        },
        {
            title: 'Gear Box Mounting Replacement',
            image: suspension13,
            detail: '• 1 Month Warranty  • Recommended: In Case of Noise from Engine',
            time: 'Takes 6 Hours',
            details: [
                'Gear Box Mounting Replacement (OES)',
                'Single Unit Only',
                'Spare Part Price Only',
                'Free Pickup & Drop'
            ],
            tag: 'Spare Part Price Only'
        },
        {
            title: 'Fuel Pump Replacement',
            image: suspension14,
            detail: '• 1 Month Warranty  • Recommended: In Case of Car Jerking while Accelerating',
            time: 'Takes 6 Hours',
            details: [
                'Fuel Pump Assy. Replacement',
                'Fuel Line & Injectors Cleaning Cost Additional (If Needed)',
                'OES Spare Part Cost Only',
                'Fuel Pipes Cost Additional (If Needed)',
                'Free Pickup & Drop'
            ],
            tag: 'Spare Part Price Only'
        },
        {
            title: 'ECM Repair',
            image: suspension15,
            detail: '• 1 Month Warranty  • Recommended: In case of Car Not Starting',
            time: 'Takes 6 Hours',
            details: [
                'ECM Repair',
                'Opening & Fitting of ECM',
                'Repairing of Electrical Circuits with Diodes & Capacitor',
                'Circuit Board & Programming Cost Additional',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Radiator Fan Motor Replacement',
            image: suspension16,
            detail: '• 1 Month Warranty  • Recommended: In case of Radiator Fan not working',
            time: 'Takes 6 Hours',
            details: [
                'Radiator Fan Motor Replacement (OES)',
                'Coolant and Radiator Flush Cost Additional',
                'Opening & Fitting of Radiator Fan Motor',
                'Free Pickup & Drop'
            ],
            tag: 'Labour Included'
        },
        {
            title: 'Water Pump Replacement',
            image: suspension17,
            detail: '• 1 Month Warranty  • Recommended: In case of Engine Overheating',
            time: 'Takes 6 Hours',
            details: [
                'Water Pump Replacement (OES)',
                'Coolant and Radiator Flush Cost Additional',
                'Spare Part Cost Only',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Premium Top Wash',
            image: suspension18,
            detail: '• Applicable on Walk-in Only  • Preserving Paint & Finish',
            time: 'Handwash Your Ride in Just 1 Hour',
            details: [
                'Exterior Top Wash',
                'Hand Drying',
                'Rinsing',
                'Tyre external wash'
            ]
        },
        {
            title: 'Car Wash & Wax',
            image: suspension19,
            detail: '• Maintains Car Shine  • Recommended Every 2 Months',
            time: 'Takes 2 Hours',
            details: [
                'Car Wash',
                'Dashboard and Tyre Polish',
                'Interior Vacuuming',
                'Body Wax'
            ]
        },
        {
            title: 'Starter Motor Repair',
            image: suspension20,
            detail: '• 1 Month Warranty  • Recommended: In Case of Car Not Starting',
            time: 'Takes 6 Hours',
            details: [
                'Starter Motor Repair',
                'Armature Additional If Required',
                'Opening & Fitting of Starter Motor',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Mud Flaps',
            image: suspension21,
            detail: '• 1 Month Warranty on Fitting  • Excellent Durability',
            time: 'Takes 2 Hours',
            details: [
                'Mud Flaps Set of 4',
                'Prevents Soil Accumulation',
                'Easy Fitment',
                'Protects Car Underside'
            ]
        },
        {
            title: 'Door Latch Replacement',
            image: suspension22,
            detail: '• 1 Month Warranty  • Recommended: In Case of Door Not Opening',
            time: 'Takes 6 Hours',
            details: [
                'Inner Door Latch Mechanism Part Replacement',
                'Outside Door Handle Cost Additional (If Needed)',
                'OES Spare Part Cost Only',
                'Paint/Trim Cost Additional (If Needed)',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Power Window Repair',
            image: suspension23,
            detail: '• 1 Month Warranty  • Recommended: In Case of Window Not Working',
            time: 'Takes 3 Hours',
            details: [
                'Power Window Mechanism Repair',
                'Power Window Switch Cost Additional',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Noise with Car Suspension & Steering',
            image: suspension24,
            detail: '• Recommended: In Case of Noise Coming from Suspension',
            time: 'Takes 2 Hours',
            details: [
                'Steering System Inspection',
                '25 Points Check-list',
                'Complete Suspension Inspection',
                'Free Pickup & Drop'
            ],
        },
        {
            title: 'Faulty Electricals',
            image: suspension25,
            detail: '• Recommended: In Case of Electrical Malfunctioning',
            time: 'Takes 2 Hours',
            details: [
                'Fault Car Scanning',
                'Detailed Health Card',
                '25 Points Check-list',
                'Free Pickup & Drop'
            ],
        },
    ],
    'Clutch & Body Parts': [
        {
            title: 'Clutch Set Replacement',
            image: clutch1,
            detail: '• 1 Month Warranty  • Recommended: In Case of Hard Clutch & Pickup Issue',
            time: 'Takes 8 Hours',
            details: [
                'Clutch Set (Clutch Plate + Pressure Plate) Replacement',
                'Clutch Cable / Wire, Release Bearing / Clutch Cylinder, Flywheel, Slave Cylinder in Add Ons',
                'Automatic Transmission Clutch rates may vary',
                'Opening & Fitting of Clutch Set',
                'Clutch Oil, Gear Oil Cost Additional',
                'Free Pickup & Drop'
            ],
            tag: 'FREE 60 POINT INSPECTION'
        },
        {
            title: 'Flywheel Replacement',
            image: clutch2,
            detail: '• 1 Month Warranty  • Recommended: In case of Noisy Clutch',
            time: 'Takes 8 Hours',
            details: [
                'Flywheel OES Replacement',
                'Clutch Set, Clutch Bearing, Clutch Cable / Wire, Clutch Cylinder, Slave Cylinder in Add Ons',
                'Automatic Transmission Clutch rates may vary',
                'Spare Part Price Only',
                'Clutch Oil, Gear Oil Additional',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Clutch Bearing Replacement',
            image: clutch3,
            detail: '• 1 Month Warranty  • Recommended: In case of Clutch Pedal Vibrations',
            time: 'Takes 8 Hours',
            details: [
                'Clutch Bearing OES Replacement',
                'Clutch Set, Clutch Cable / Wire, Clutch Cylinder, Flywheel, Hydraulic Bearing in Add Ons',
                'Automatic Transmission Clutch rates may vary',
                'Spare Part Price Only',
                'Clutch Oil, Gear Oil Cost Additional',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Flywheel Turning',
            image: clutch4,
            detail: '• Recommended: In case of Burning Smell from Clutch',
            time: 'Takes 8 Hours',
            details: [
                'Resurfacing of Flywheel',
                'Opening & Fitting of Flywheel Cost Additional',
                'Free Pickup & Drop',
                'Inspection of Clutch System',
                'Clutch Plates, Pressure Plate, Clutch Bearing & Clutch Cable Cost Additional'
            ]
        },
        {
            title: 'Clutch Overhaul',
            image: clutch5,
            detail: '• 1 Month Warranty on Labour',
            time: 'Takes 8 Hours',
            details: [
                'Opening & Fitting + Inspection Of Below Items',
                'Clutch Plate',
                'Pressure Plate',
                'Release Bearing'
            ],
            tag: 'FREE CAR WASH'
        },
        {
            title: 'Front Bumper Replacement',
            image: clutch6,
            detail: '• 1 Month Warranty on Fitting  • For Broken / Cracked Bumper (Recommended)',
            time: 'Takes 6 Hours',
            details: [
                'Opening & Fitting of Front Bumper',
                'Free Pickup & Drop',
                'Paint Cost Additional',
                'Front Bumper Replacement (Black Colour)',
                'Brackets, Grills, Cladding Additional'
            ],
        },
        {
            title: 'Rear Bumper Replacement',
            image: clutch7,
            detail: '• 1 Month Warranty on Fitting  • For Broken / Cracked Bumper (Recommended)',
            time: 'Takes 6 Hours',
            details: [
                'Opening & Fitting of Rear Bumper',
                'Free Pickup & Drop',
                'Paint Cost Additional',
                'Rear Bumper Replacement (Black Colour)',
                'Brackets, Grills, Cladding Additional'
            ]
        },
        {
            title: 'Right Front Door Replacement',
            image: clutch8,
            detail: '• Recommended: In Case Broken / Damaged Door',
            time: 'Takes 8 Hours',
            details: [
                'Right Front Door Replacement (Single Unit)',
                'Hinges, Weatherstrip, Handle, Cost Additional',
                'Paint Cost Additional',
                'Opening & Fitting of Right Front Door',
                'Trim, Lock, Window Glass & Channel Cost Additional',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Right Rear Door Replacement',
            image: clutch9,
            detail: '• Recommended: In Case Broken / Damaged Door',
            time: 'Takes 8 Hours',
            details: [
                'Right Rear Door Replacement (Single Unit)',
                'Hinges, Weatherstrip, Handle, Cost Additional',
                'Paint Cost Additional',
                'Opening & Fitting of Right Rear Door',
                'Trim, Lock, Window Glass & Channel Cost Additional',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Fender Replacement',
            image: clutch10,
            detail: '• Recommended: In Case Corroded / Broken / Damaged Fender',
            time: 'Takes 6 Hours',
            details: [
                'Fender Replacement',
                'Fender Lining, Indicator, Hinge / Support Cost Additional',
                'Free Pickup & Drop',
                'Opening & Fitting of Fender',
                'Paint Cost Additional'
            ]
        },
        {
            title: 'Boot Replacement',
            image: clutch11,
            detail: '• Recommended: In Case Corroded / Broken / Damaged Boot',
            time: 'Takes 6 Hours',
            details: [
                'Boot Replacement',
                'Hinges, Ring, Boot Strip / Shocker Cost Additional',
                'Free Pickup & Drop',
                'Opening & Fitting of Boot',
                'Paint Cost Additional'
            ]
        },
        {
            title: 'Bonnet Replacement',
            image: clutch12,
            detail: '• Recommended: In Case Corroded / Broken / Damaged Bonnet',
            time: 'Takes 6 Hours',
            details: [
                'Bonnet Replacement',
                'Hinges, Stay Rod / Shockers Cost Additional',
                'Free Pickup & Drop',
                'Opening & Fitting of Bonnet',
                'Paint Cost Additional'
            ]
        },
        {
            title: 'Left Front Door Replacement',
            image: clutch13,
            detail: '• Recommended: In Case Broken / Damaged Door',
            time: 'Takes 8 Hours',
            details: [
                'Left Front Door Replacement (Single Unit)',
                'Hinges, Weatherstrip, Handle, Cost Additional',
                'Paint Cost Additional',
                'Opening & Fitting of Left Front Door',
                'Trim, Lock, Window Glass & Channel Cost Additional',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Left Rear Door Replacement',
            image: clutch14,
            detail: '• Recommended: In Case Corroded Door  • Recommended: In Case Broken / Damaged Door',
            time: 'Takes 6 Hours',
            details: [
                'Left Rear Door Replacement (Single Unit)',
                'Opening & Fitting of Left Rear Door',
                'Hinges, Weatherstrip, Handle, Cost Additional',
                'Trim, Lock, Window Glass & Channel Cost Additional',
                'Paint Cost Additional',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Clutch & Transmission Troubles',
            image: clutch15,
            detail: '• Recommended: In Case of Hard Clutch',
            time: 'Takes 6 Hours',
            details: [
                '25 Points Checklist',
                'Clutch & Gear Box Inspection',
                'Physical Car Diagnosis',
                'Free Pickup & Drop'
            ],
        },
        {
            title: 'ABS Issue',
            image: clutch16,
            detail: '• Recommended: In Case of ABS Dashboard Light',
            time: 'Takes 6 Hours',
            details: [
                'Full Car Scanning',
                'Brake Electrical System Inspection',
                '25 Points Check-List',
                'Free Pickup & Drop'
            ]
        },
        {
            title: 'Sony Go Eco (DSX-A410BT)',
            image: clutch17,
            detail: '• 1 Month Warranty on Fitting  • 55W Max Power & Extra Bass',
            time: 'Takes 4 Hours',
            details: [
                'Opening & Fitting of Stereo',
                'Free Pickup & Drop',
                '10+ Band Equalizer & 2 Pre Out',
                'Wiring, Frame and Coupler Cost Extra (If Required)',
                'USB For iPhone, iPod'
            ]
        },
        {
            title: 'Sony Go X (XAV-1500)',
            image: clutch18,
            detail: '• 1 Month Warranty on Fitting  • Dynamic Stage Organiser',
            time: 'Takes 4 Hours',
            details: [
                'Opening & Fitting of Stereo',
                'Free Pickup & Drop',
                'Configurable Steering Wheel Remote Input',
                'Wiring, Frame and Coupler Cost Extra (If Required)',
                'Bluetooth Connectivity',
                '3 More View All'
            ]
        },
        {
            title: 'Sony Go Play (XAV-AX5500)',
            image: clutch19,
            detail: '• 1 Month Warranty on Fitting  • 10+ Band Equaliser & 3 Pre Out(5V)',
            time: 'Takes 4 Hours',
            details: [
                'Opening & Fitting of Stereo',
                'Free Pickup & Drop',
                'Dual USB with 1.5A High Current Battery Charge',
                'Wiring, Frame and Coupler Cost Extra (If Required)',
                'Bluetooth Connectivity',
                '5 More View All'
            ]
        },
        {
            title: 'Sony Go Play+ (XAV-AX7000)',
            image: clutch20,
            detail: '• 1 Month Warranty on Fitting  • 10+ Band Equaliser & 3 Pre Out(5V)',
            time: 'Takes 4 Hours',
            details: [
                'Opening & Fitting of Stereo',
                'Free Pickup & Drop',
                '1 Year Manufacturer Warranty',
                'Wiring, Frame and Coupler Cost Extra (If Required)',
                'USB For iPhone, iPod',
                '7 More View All'
            ]
        }

    ],
    'Insurance Claims': [
        {
            title: 'Know Your Policy',
            image: claims1,
            detail: '• Call Within 2 Hour  • Regarding Doubts with Claim Intimation',
            time: 'Call Within 2 Hour',
            details: [
                'Complete Information about your Policy',
                'Suggestions on Purchase of New Policy',
                'Vehicle IDV and Premium Rate Suggestions',
                'Expenditure Assessment',
                'Connect with Insurance Agent'
            ]
        },
        {
            title: 'Accidental Denting & Painting (Insurance)',
            image: claims2,
            detail: '• Recommended: In case of Comprehensive Policy',
            time: 'Takes 24 Hours',
            details: [
                'Accidental Repair in Insurance',
                'Surveyor Estimate Approval',
                'File Charge Included',
                'Claim Intimation',
                'Body Panel Replacement (If Required)'
            ]
        },
        {
            title: 'Fire Damage Assistance (Insurance)',
            image: claims3,
            detail: '• Recommended: In case of Comprehensive Policy',
            time: 'Takes 24 Hours',
            details: [
                'Repairing of Fire Damage in Insurance',
                'Surveyor Estimate Approval',
                'Claim Intimation',
                'File Charge Included'
            ]
        },
        {
            title: 'Car Flood Damage (Insurance)',
            image: claims4,
            detail: '• Recommended: In case of Comprehensive Policy',
            time: 'Takes 24 Hours',
            details: [
                'Repairing of Flood Damage in Insurance',
                'Surveyor Estimate Approval',
                'Claim Intimation',
                'File Charge Included'
            ]
        },
        {
            title: 'Windshield Replacement (Insurance)',
            image: claims5,
            detail: '• On Cracks in Windshield (Recommended)',
            time: 'Takes 24 Hours',
            details: [
                'Claim Intimation',
                'Coordination with Insurance Company',
                'Available at Doorstep',
                'Surveyor Estimate Approval',
                'Windshield Replacement/Repair'
            ]
        },
        {
            title: 'Tyres & Wheel Replacement (Insurance)',
            image: claims6,
            detail: '• Recommended: In case of Tyre & Wheel Damage Due to Accident  • Recommended: In case of Comprehensive Policy',
            time: 'Takes 24 Hours',
            details: [
                'Tyres & Wheel Replacement in Insurance',
                'Surveyor Estimate Approval',
                'Claim Intimation',
                'File Charge Included'
            ]
        },
        {
            title: 'Battery Replacement (Insurance)',
            image: claims7,
            detail: '• Recommended: In case of Battery Theft  • Recommended: In case of Comprehensive Policy',
            time: 'Takes 24 Hours',
            details: [
                'Battery Replacement in Insurance',
                'Surveyor Estimate Approval',
                'Claim Intimation',
                'File Charge Included'
            ]
        },
        {
            title: 'Key Replacement (Insurance)',
            image: claims8,
            detail: '• Recommended: In case of Comprehensive Policy',
            time: 'Takes 24 Hours',
            details: [
                'Car Key Replacement in Insurance',
                'Surveyor Estimate Approval Process',
                'Claim Intimation Process',
                'File Charge Included'
            ]
        },
        {
            title: 'ECM Replacement (Insurance)',
            image: claims9,
            detail: '• Recommended: In case of Comprehensive Policy',
            time: 'Takes 24 Hours',
            details: [
                'ECM Replacement in Insurance',
                'Surveyor Estimate Approval',
                'Claim Intimation',
                'File Charge Included'
            ]
        },
        {
            title: 'Car Theft Claim (Insurance)',
            image: claims10,
            detail: '• Recommended: In case of Comprehensive Policy',
            time: 'Takes 24 Hours',
            details: [
                'Repairing of Flood Damage in Insurance',
                'Surveyor Estimate Approval',
                'Claim Intimation',
                'File Charge Included'
            ]
        },
        {
            title: 'Doorstep Accidental Inspection',
            image: claims11,
            detail: '• 25 Points Checklist  • Every 1 Month (Recommended)',
            time: 'Takes 4 Hours',
            details: [
                'Body Damage Inspection',
                'Insurance Claim Advice',
                '25 Points Checklist',
                'Policy Inspection'
            ]
        },
        {
            title: 'Towing (Insurance)',
            image: claims12,
            detail: '• Real Time Claim Tracking Mechanism  • Free Towing',
            time: 'Cashless Facility',
            details: [
                'Claim Intimation',
                'Co-ordination with Insurance Company',
                'Towing Reimbursement',
                'Available at Doorstep'
            ]
        },
        {
            title: 'Insurance Claim Inspection',
            image: claims13,
            detail: '• Real Time Claim Tracking Mechanism  • Free Pick-up/Drop',
            time: 'Cashless Facility',
            details: [
                'Claim Intimation',
                'Co-ordination with Insurance Company',
                'Policy Inspection',
                'Surveyor Estimate Approval',
                '2 Years Warranty on Paint Jobs'
            ]
        }

    ],
    'SOS Service': [
        {
            title: 'Battery Jumpstart',
            image: sos1,
            detail: '• Available at Doorstep',
            time: 'Takes 4 Hours',
            details: [
                'Battery Jumpstart',
                'Car Battery Check'
            ]
        },
        {
            title: 'Car Engine Scanning',
            image: sos2,
            detail: '• Available at Doorstep • Scanner Report Provided',
            time: 'Takes 4 Hours',
            details: [
                'Electrical scanning',
                'Sensor reset',
                'Error code deletion',
                'Inspection of exhaust smoke'
            ]
        },
        {
            title: 'Car Fluid Leakage',
            image: sos3,
            detail: '• Takes 4 Hours • SOS Points Check • Health Card Provided',
            time: 'Takes 4 Hours',
            details: [
                'Battery Jumpstart',
                'Car Battery Check'
            ]
        },
        {
            title: 'Wheel-Lift Tow (20 Kms)',
            image: sos4,
            detail: '• Available at Doorstep • Up to 10 Kms',
            time: 'Takes 4 Hours',
            details: [
                'Flat Bed Towing',
                'Wheel Lift Towing'
            ]
        },
        {
            title: 'Car Self Starter Issue',
            image: sos5,
            detail: '• Available at Doorstep',
            time: 'Takes 4 Hours',
            details: [
                'Critical System Points Check',
                'Car Battery Check',
                'Underbody Inspection'
            ]
        },
        {
            title: 'Flat-Bed Tow (20 Kms)',
            image: sos6,
            detail: '• Available at Doorstep • Up to 10 Kms',
            time: 'Takes 4 Hours',
            details: [
                'Flat Bed Towing',
                'Wheel Lift Towing'
            ]
        },
        {
            title: 'Clutch Breakdown',
            image: sos7,
            detail: '• Stuck Gear • In Case of Stuck Clutch Pedal',
            time: 'Takes 4 Hours',
            details: [
                'In Case of Clutch Pedal Free'
            ]
        },
        {
            title: 'Car Flooding',
            image: sos8,
            detail: '• Takes 4 Hours • Assistance in Case of Car Not Starting • Assistance in Case of Car Stuck in Floods',
            time: 'Takes 4 Hours',
            details: [
                'Assistance in Case of Car Not Starting',
                'Assistance in Case of Car Stuck in Floods'
            ]
        },
        {
            title: 'Insurance Accident',
            image: sos9,
            detail: '• Takes 4 Hours • Assistance in Case of Car Not Starting • Assistance in Case of Car Stuck in Floods',
            time: 'Takes 4 Hours',
            details: [
                'Assistance in Case of Car Not Starting',
                'Assistance in Case of Car Stuck in Floods'
            ]
        },
        {
            title: 'Brake Failure',
            image: sos10,
            detail: '• In Case of Brake Fail • In Case of Brake Pedal Free',
            time: 'Takes 4 Hours',
            details: [
                'In Case of Brake Fail',
                'In Case of Brake Pedal Free'
            ]
        },
        {
            title: 'Wrong Fuel Emergency',
            image: sos11,
            detail: '• In Case of Wrong Fuel in Fuel Tank • In Case of Car Fuel Mixture',
            time: 'Takes 4 Hours',
            details: [
                'In Case of Wrong Fuel in Fuel Tank',
                'In Case of Car Fuel Mixture'
            ]
        },
        {
            title: 'Critical Dashboard Light',
            image: sos12,
            detail: '• In Case of Dashboard Warning Light • In Case of Electrical Malfunctions',
            time: 'Takes 4 Hours',
            details: [
                'In Case of Dashboard Warning Light',
                'In Case of Electrical Malfunctions'
            ]
        }
    ],
};
const CarRepair = () => {
    const [activeTab, setActiveTab] = useState('Periodic Services');
    const [isCarRepairModelOpen, setIsCarRepairModelOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // API data state
    const [apiCategories, setApiCategories] = useState([]);
    const [apiProducts, setApiProducts] = useState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [categoriesMap, setCategoriesMap] = useState({}); // Map category ID to name
    
    const [formData, setFormData] = useState({
        brandName: "",
        carName: "",
        phoneNumber: ""
    });

    // Convert API product to UI format
    const convertApiProductToUI = (product) => {
        return {
            title: product.title || product.name,
            image: getImageUrl(product.image),
            detail: product.warranty || product.description || '',
            time: product.timeTaken || '',
            details: product.servicePoints || [],
            tag: product.tag || '',
            // Keep original product data for reference
            _original: product
        };
    };

    // Fetch categories from API
    useEffect(() => {
        const fetchCategories = async () => {
            setIsLoadingCategories(true);
            try {
                const response = await contentApi.get('/api/categories/public');
                if (response.data.success && response.data.data?.categories) {
                    const categories = response.data.data.categories.filter(cat => cat.isActive);
                    setApiCategories(categories);
                    
                    // Create a map of category ID to name for easy lookup
                    const map = {};
                    categories.forEach(cat => {
                        map[cat._id] = cat.name;
                    });
                    setCategoriesMap(map);
                    
                    // Set first category as active if no category is selected
                    if (categories.length > 0 && !activeTab) {
                        setActiveTab(categories[0].name);
                    }
                }
            } catch (error) {
                console.warn('Failed to fetch categories from API, using hardcoded data:', error.message);
                // Keep using hardcoded Services array as fallback
            } finally {
                setIsLoadingCategories(false);
            }
        };
        
        fetchCategories();
    }, []);

    // Fetch products for selected category
    useEffect(() => {
        const fetchProducts = async () => {
            // Only fetch from API if we have API categories loaded
            if (apiCategories.length === 0) {
                setApiProducts([]);
                return;
            }

            setIsLoadingProducts(true);
            try {
                // Find the category ID by name
                const selectedCategory = apiCategories.find(cat => cat.name === activeTab);
                
                if (selectedCategory) {
                    const response = await contentApi.get('/api/products/public', {
                        params: {
                            category: selectedCategory._id,
                            isActive: 'true'
                        }
                    });
                    
                    if (response.data.success && response.data.data?.products) {
                        const products = response.data.data.products
                            .filter(product => product.isActive)
                            .map(convertApiProductToUI);
                        setApiProducts(products);
                    } else {
                        setApiProducts([]);
                    }
                } else {
                    // If category not found in API, use empty array (will fallback to hardcoded)
                    setApiProducts([]);
                }
            } catch (error) {
                console.warn('Failed to fetch products from API, using hardcoded data:', error.message);
                setApiProducts([]);
            } finally {
                setIsLoadingProducts(false);
            }
        };
        
        if (activeTab) {
            fetchProducts();
        }
    }, [activeTab, apiCategories]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleServiceSelect = (service) => {
        setSelectedService(service);
        setIsCarRepairModelOpen(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Option 1: EmailJS (requires setup)
            if (EMAILJS_CONFIG.PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
                // Prepare email template parameters
                const templateParams = {
                    to_email: 'highbeamautotechpvtltd@gmail.com',
                    service_name: selectedService?.title || 'Unknown Service',
                    service_category: activeTab,
                    service_details: selectedService?.detail || '',
                    service_time: selectedService?.time || '',
                    brand_name: formData.brandName,
                    car_name: formData.carName,
                    phone_number: formData.phoneNumber,
                    subject: `Car Service Booking - ${selectedService?.title || 'Service'}`
                };

                // Send email using EmailJS
                const response = await emailjs.send(
                    EMAILJS_CONFIG.SERVICE_ID,
                    EMAILJS_CONFIG.TEMPLATE_ID,
                    templateParams,
                    EMAILJS_CONFIG.PUBLIC_KEY
                );

                if (response.status === 200) {
                    toast.success("Service booking request sent successfully! We'll contact you soon.");
                    resetForm();
                }
            } else {
                // Option 2: Fallback - Show success and log data
                console.log('Car Service Booking Data to be sent:', {
                    serviceName: selectedService?.title,
                    serviceCategory: activeTab,
                    serviceDetails: selectedService?.detail,
                    serviceTime: selectedService?.time,
                    brandName: formData.brandName,
                    carName: formData.carName,
                    phoneNumber: formData.phoneNumber
                });
                
                toast.success("Service booking request submitted successfully! We'll contact you soon.");
                resetForm();
            }

        } catch (error) {
            console.error("Email sending failed:", error);
            toast.error("Failed to send booking request. Please try again or contact us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            brandName: "",
            carName: "",
            phoneNumber: ""
        });
        setSelectedService(null);
        setIsCarRepairModelOpen(false);
    };

    const onClickMailtoHandler = () => {
        //TODO: open default e-mail client e.g. via mailto link with text from (state) variable as body
    }
    // Determine which categories to display (API categories or hardcoded)
    const displayCategories = apiCategories.length > 0 
        ? apiCategories.map(cat => ({
            title: cat.name,
            icon: getCategoryIcon(cat) // Pass the category object to use icon field
        }))
        : Services;

    // Determine which products to display (API products or hardcoded)
    const displayProducts = apiProducts.length > 0 
        ? apiProducts 
        : (tabContent[activeTab] || []);

    return (
        <div>
            <Header />
            <Container className="my-5 car_tabs">
                <div className="d-flex justify-content-center flex-wrap gap-4 overflow-auto mb-5 tab-scroll">
                    {displayCategories.map((category, index) => (
                        <div
                            key={category.title || index}
                            className={`tabs_active d-flex align-items-center ${activeTab === category.title ? 'active' : ''}`} 
                            onClick={() => setActiveTab(category.title)}
                        >
                            <span className="me-2 fs-4">{category.icon}</span>
                            <span>{category.title}</span>
                        </div>
                    ))}
                </div>

                {/* Show loading state */}
                {isLoadingProducts && (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading products...</p>
                    </div>
                )}

                {/* Show products for selected category */}
                {!isLoadingProducts && displayProducts.length > 0 && displayProducts.map((item, idx) => (
                    <Card className="p-4 shadow-sm position-relative mb-4" key={idx}>
                        {item.tag && (
                            <Badge bg="success" className="mb-3" style={{ width: 'fit-content' }}>
                                {item.tag}
                            </Badge>
                        )}

                        <Row className='gy-4 justify-content-center'>
                            {/* Image Section */}
                            <Col md={6} lg={2} className="d-flex align-items-center">
                                <img
                                    src={getImageUrl(item.image)} // Using getImageUrl helper for proper URL handling
                                    alt={item.title}
                                    className="img-fluid"
                                />
                            </Col>

                            {/* Content Section */}
                            <Col lg={8}>
                                <h4 className="fw-bold">{item.title}</h4>
                                <p className="mb-2 text-muted">
                                    {item.detail}
                                </p>
                                <Row className='car_services'>
                                    {item.details?.map((detail, index) => (
                                        <Col md={6} key={index}>
                                            <p><CheckCircle color="green" />{detail}</p>
                                        </Col>
                                    ))}
                                </Row>
                            </Col>

                            {/* Action Section */}
                            <Col lg={2} className="text-end d-flex flex-column justify-content-between action_section">
                                <div className="d-flex align-items-center justify-content-end mb-3">
                                    <Clock className="me-2" />
                                    <span className="text-muted mb-0">{item.time}</span>
                                </div>
                                <Button variant="outline-primary" className="align-self-end" onClick={() => handleServiceSelect(item)}>SELECT CAR</Button>


                            </Col>
                        </Row>
                    </Card>
                ))}

                {/* Show message if no products found */}
                {!isLoadingProducts && displayProducts.length === 0 && (
                    <div className="text-center py-5">
                        <p className="text-muted">No products found for this category.</p>
                    </div>
                )}
                <div className='modal_details'>
                    <Modal
                        // {...props}
                        show={isCarRepairModelOpen}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                        onHide={() => setIsCarRepairModelOpen(false)}
                    >
                        
                        <div className='modal_info'>
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">
                                    Book {selectedService?.title || 'Service'}
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {selectedService && (
                                    <div className="mb-4 p-3 bg-light rounded">
                                        <h6 className="fw-bold mb-2">Selected Service:</h6>
                                        <p className="mb-1"><strong>{selectedService.title}</strong></p>
                                        <p className="mb-1 text-muted">{selectedService.detail}</p>
                                        <p className="mb-0"><small>Duration: {selectedService.time}</small></p>
                                    </div>
                                )}
                                <Form onSubmit={handleSubmit}>
                                    <Form.Label>Brand Name <span style={{color: 'red'}}>*</span> :</Form.Label>
                                    <Form.Select 
                                        name="brandName"
                                        value={formData.brandName}
                                        onChange={handleInputChange}
                                        aria-label="Choose You Brand" 
                                        className="mb-3"
                                        required
                                    >
                                        <option value="">Open this select menu</option>
                                        <option value="Aston Martin">Aston Martin</option>
                                        <option value="Audi">Audi</option>
                                        <option value="Bentley">Bentley</option>
                                        <option value="BMW">BMW</option>
                                        <option value="BYD">BYD</option>
                                        <option value="Citroen">Citroen</option>
                                        <option value="Ferrari">Ferrari</option>
                                        <option value="Honda">Honda</option>
                                        <option value="Hyundai">Hyundai</option>
                                        <option value="Isuzu">Isuzu</option>
                                        <option value="Jaguar">Jaguar</option>
                                        <option value="Jeep">Jeep</option>
                                        <option value="KIA">KIA</option>
                                        <option value="Lamborghini">Lamborghini</option>
                                        <option value="Land Rover">Land Rover</option>
                                        <option value="Lexus">Lexus</option>
                                        <option value="Mahindra">Mahindra</option>
                                        <option value="Maruti Suzuki">Maruti Suzuki</option>
                                        <option value="Maserati">Maserati</option>
                                        <option value="McLaren">McLaren</option>
                                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                                        <option value="MG">MG</option>
                                        <option value="Mini">Mini</option>
                                        <option value="Nissan">Nissan</option>
                                        <option value="Porsche">Porsche</option>
                                        <option value="Renault">Renault</option>
                                        <option value="Rolls-Royce">Rolls-Royce</option>
                                        <option value="Skoda">Skoda</option>
                                        <option value="Tata">Tata</option>
                                        <option value="Tesla">Tesla</option>
                                        <option value="Toyota">Toyota</option>
                                        <option value="Volkswagen">Volkswagen</option>
                                        <option value="Volvo">Volvo</option>
                                        <option value="Other">Other</option>
                                    </Form.Select>
                                    <Form.Group className="mb-3" controlId="formGroupEmail">
                                        <Form.Label>Car Name <span style={{color: 'red'}}>*</span> :</Form.Label>
                                        <Form.Control 
                                            type="text" 
                                            name="carName"
                                            value={formData.carName}
                                            onChange={handleInputChange}
                                            placeholder="Enter Car Name" 
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formGroupPassword">
                                        <Form.Label>Phone Number <span style={{color: 'red'}}>*</span> : </Form.Label>
                                        <Form.Control 
                                            type="tel" 
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            placeholder="Enter Phone Number" 
                                            maxLength={10}
                                            required
                                        />
                                    </Form.Group>
                                    <Modal.Footer className="px-0">
                                        <Button 
                                            variant="outline-primary" 
                                            onClick={() => setIsCarRepairModelOpen(false)}
                                            className="modal-btn"
                                        >
                                            Cancel
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            variant="outline-primary"
                                            disabled={isSubmitting}
                                            className="modal-btn"
                                        >
                                            {isSubmitting ? "Sending..." : "Submit"}
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Body>
                        </div>
                    </Modal>
                </div>
            </Container>
            <ToastContainer />
        </div>
    )
}

export default CarRepair
