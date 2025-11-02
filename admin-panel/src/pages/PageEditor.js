import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
  AppBar,
  Toolbar,
  Divider,
} from '@mui/material';
import {
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import ImageUpload from '../components/ImageUpload';

const PageEditor = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editingSection, setEditingSection] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentEdit, setCurrentEdit] = useState({});
  const [pageData, setPageData] = useState(null);

  // Helper function to get default image URLs from main website
  // Note: Vite processes image imports, so we try different path formats
  const getDefaultImageUrl = (imagePath) => {
    // Try accessing via the main website URL
    // The images are served by Vite dev server
    const baseUrl = 'http://localhost:5173';
    // Remove leading slash if present for consistency
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return `${baseUrl}${cleanPath}`;
  };

  // Helper to get default content based on page ID
  const getDefaultContent = (pageId) => {
    if (pageId === 'home') {
      return getDefaultHomePageContent();
    } else if (pageId === 'about') {
      return getDefaultAboutPageContent();
    } else if (pageId === 'services') {
      return getDefaultServicesPageContent();
    } else if (pageId === 'contact') {
      return getDefaultContactPageContent();
    }
    return {};
  };

  // Default content structure for Home page with current website images
  const getDefaultHomePageContent = () => ({
    hero1: {
      image: getDefaultImageUrl('/src/assets/image/hero-1.jpg'),
      title: 'We Service Your Car Like It\'s Ours',
      description: 'Car repairing costs rise significantly when they don\'t get serviced at the right intervals and in the right way. We believe in fixing problems before you notice them.',
      buttonText: 'Book your Service',
    },
    hero2: {
      image: getDefaultImageUrl('/src/assets/image/hero-2.jpg'),
      title: 'Top-rated car repair workshop in Surat.',
      description: 'Get expert multi-brand service, engine diagnostics, AC repair, and certified auto mechanics at High Beam Auto tech Pvt. Ltd.',
      buttonText: 'Book a Service',
    },
    // Services section removed - now managed in Categories page
    carRepair: {
      image: getDefaultImageUrl('/src/assets/image/service.png'),
      title: 'Car Repairing, Made Simple to Learn',
      description: 'You don\'t need to be a mechanic to learn car repairs. From oil changes to engine basics, we break it down so anyone can learn. Whether you\'re a curious beginner or want to go pro, our workshops are where you start.',
    },
    coreValuesHeader: {
      title: 'Our core values:',
    },
    coreValues: [
      {
        id: 1,
        image: getDefaultImageUrl('/src/assets/image/easy.gif'),
        title: 'We Make It Easy',
        description: 'From booking a car repair, regular maintenance services to buying a car or even joining a workshop, we simplify every step so you can focus on what matters the most: the ride.',
      },
      {
        id: 2,
        image: getDefaultImageUrl('/src/assets/image/financing.gif'),
        title: 'Flexible Financing, Built Around You',
        description: 'Whether you\'re purchasing a pre-owned car or paying for repairs, our transparent financing options are designed to fit your budget, no fuss, no chaos.',
      },
      {
        id: 3,
        image: getDefaultImageUrl('/src/assets/image/expertise.gif'),
        title: 'More Than Repairs - Real Automotive Expertise',
        description: 'We don\'t just believe in fixing issues, we restore performance. With a keen understanding of what every car needs, we ensure that every job is done right',
      },
      {
        id: 4,
        image: getDefaultImageUrl('/src/assets/image/cost.gif'),
        title: 'No Hidden Costs. No Guesswork.',
        description: 'We have upfront pricing, precise estimates and an honest diagnosis. So you don\'t overpay and won\'t under-deliver.',
      },
    ],
    about: {
      image: getDefaultImageUrl('/src/assets/image/about-car.png'),
      sectionTitle: 'Why Choose Us',
      features: [
        {
          title: 'Trusted Car Repair & Maintenance',
          description: 'From maintenance services to full engine overhauls, we provide end-to-end repair solutions with consistent quality and care.',
        },
        {
          title: 'Get in Touch with Experts',
          description: 'Need help with your car? Our experienced team is just a call away. We are ready to offer guidance, support and service you can trust and implement.',
        },
        {
          title: 'Backed by Years of Experience',
          description: 'With 15+ years of extensive industry knowledge and hands-on expertise, we bring efficient solutions that we have used for years to solve even the most complex automotive challenges.',
        },
      ],
      buttonText: 'Get Start',
    },
  });

  // Default content for About Us page
  const getDefaultAboutPageContent = () => ({
    hero1: {
      image: getDefaultImageUrl('/src/assets/image/hero-3.jpg'),
      title: 'We Service Your Car Like It\'s Ours',
      description: 'Car repairing costs rise significantly when they don\'t get serviced at the right intervals and in the right way. We believe in fixing problems before you notice them.',
      buttonText: 'Book a Service',
    },
    hero2: {
      image: getDefaultImageUrl('/src/assets/image/hero-4.jpg'),
      title: 'Top-rated car repair workshop in Surat.',
      description: 'Get expert multi-brand service, engine diagnostics, AC repair, and certified auto mechanics at High Beam Auto tech Pvt. Ltd.',
      buttonText: 'Book a Service',
    },
    ourStory: {
      image: getDefaultImageUrl('/src/assets/image/about-car.png'),
      sectionTitle: 'ABOUT US',
      title: 'Our Story',
      paragraph1: 'High Beam Auto Tech Private Limited is a testament to the relentless pursuit of excellence in the automotive industry. Established in 2010 under the name Radhe Automotive, our journey began with a simple yet ambitious vision – to provide top-notch car services that exceed customer expectations.',
      paragraph2: 'Over the years, we have evolved, grown, and adapted to the changing automotive landscape. Today, we proudly stand as a multi-brand and premium car service provider that caters to the diverse needs of car enthusiasts and discerning vehicle owners.',
    },
    gallery: {
      image1: getDefaultImageUrl('/src/assets/image/g1.png'),
      image2: getDefaultImageUrl('/src/assets/image/g2.png'),
      image3: getDefaultImageUrl('/src/assets/image/g3.png'),
      image4: getDefaultImageUrl('/src/assets/image/g4.png'),
      image5: getDefaultImageUrl('/src/assets/image/g5.png'),
      yearsText: '45 years in business',
    },
    commitment: {
      image: getDefaultImageUrl('/src/assets/image/h21.png'),
      title: 'Our Commitment',
      description: 'At High Beam Auto Tech, we are driven by a steadfast commitment to excellence, innovation, and customer satisfaction. Our team of highly skilled technicians and professionals shares a common passion for cars and a dedication to delivering the highest quality service.',
      points: [
        'Trusted Car Repair and Maintenance Services',
        'Contact Us for Expert Assistance',
        'Extensive Experience in the Industry',
      ],
    },
    vision: {
      image: getDefaultImageUrl('/src/assets/image/about-car.png'),
      title: 'Our Vision',
      description: 'We are striving to become the most trusted name in the world of automotive care by consistently delivering expert repair services, offering quality second hand vehicles and empowering the next generation of mechanics through hands-on workshops. We aren\'t just fixing cars but we are building a one stop for all your car\'s needs.',
    },
    brandsSection: {
      title: 'Brands We Work With',
      description: 'We provide expert service and maintenance for all major automotive brands',
    },
    faq: {
      title: 'Frequently Asked Questions',
      questions: [
        {
          question: 'How often should I get my car serviced?',
          answer: 'Regular maintenance keeps your car safe and reliable. Most manufacturers recommend an oil change every 5,000–10,000 km or every 6–12 months, depending on usage and oil type.',
        },
        {
          question: 'What should I inspect before buying a used car?',
          answer: 'Check tire tread, rust, electrical systems and request a comprehensive service history report. Always get the vehicle inspected by a professional - our experts can help identify hidden issues so you invest in trust not surprises.',
        },
        {
          question: 'Why is my "Check Engine" light on?',
          answer: 'That warning light could signal anything from a loose gas cap to a serious emission or ignition issue. Don\'t ignore it! We use advanced diagnostics to read the codes, explain what\'s safe to ignore, and what needs immediate attention and fixing.',
        },
        {
          question: 'Can I learn to repair my own car?',
          answer: 'Absolutely! With the right guidance, you can. That\'s why we offer hands-on workshops covering basic upkeep, diagnostic and even deeper repairs. We guide small classes or one-on-one sessions so you\'ll learn how and why things work—no mechanics jargon, just approachable practical teaching.',
        },
      ],
    },
  });

  // Default content for Services page
  const getDefaultServicesPageContent = () => ({
    serviceDetails: {
      image: getDefaultImageUrl('/src/assets/image/service.png'),
      paragraph1: 'High Beam Auto Tech Private Limited is a testament to the relentless pursuit of excellence in the automotive industry. Established in 2010 under the name Radhe Automotive, our journey began with a simple yet ambitious vision – to provide top-notch car services that exceed customer expectations.',
      paragraph2: 'Over the years, we have evolved, grown, and adapted to the changing automotive landscape. Today, we proudly stand as a multi-brand and premium car service provider that caters to the diverse needs of car enthusiasts and discerning vehicle owners.',
      buttonText: 'See Your Service Options',
    },
    benefitsHeader: {
      title: 'Customers Get Great benefits!',
    },
    benefits: [
      {
        id: 1,
        image: getDefaultImageUrl('/src/assets/image/f1.png'),
        title: 'We Make It Easy',
        description: 'From booking a car repair, regular maintenance services to buying a car or even joining a workshop, we simplify every step so you can focus on what matters the most: the ride.',
      },
      {
        id: 2,
        image: getDefaultImageUrl('/src/assets/image/f2.png'),
        title: 'Flexible Financing, Built Around You',
        description: 'Whether you\'re purchasing a pre-owned car or paying for repairs, our transparent financing options are designed to fit your budget, no fuss, no chaos.',
      },
      {
        id: 3,
        image: getDefaultImageUrl('/src/assets/image/f3.png'),
        title: 'More Than Repairs - Real Automotive Expertise',
        description: 'We don\'t just believe in fixing issues, we restore performance. With a keen understanding of what every car needs, we ensure that every job is done right',
      },
      {
        id: 4,
        image: getDefaultImageUrl('/src/assets/image/f4.png'),
        title: 'No Hidden Costs. No Guesswork.',
        description: 'We have upfront pricing, precise estimates and an honest diagnosis. So you don\'t overpay and won\'t under-deliver.',
      },
    ],
    scheduleService: {
      title: 'Schedule Service',
      description: 'Use our loan calculator to calculate payments over the life of your loan. Enter your information to see how much your monthly payments could be. You can adjust length of loan, down payment and interest rate to see how those changes raise or lower your payments.',
      disclaimer: 'By submitting this form you will be scheduling a service booking at no obligation and will be contacted within 48 hours by a service advisor.',
    },
    openingHours: {
      title: 'Opening hours',
      sunday: '9:00-7:00',
      monday: '9:00-7:00',
      tuesday: '9:00-7:00',
      wednesday: '9:00-7:00',
      thursday: '9:00-7:00',
      friday: '9:00-7:00',
      saturday: '9:00-7:00',
    },
  });

  // Default content for Contact Us page
  const getDefaultContactPageContent = () => ({
    hero1: {
      image: getDefaultImageUrl('/src/assets/image/hero-5.jpg'),
      title: 'We Service Your Car Like It\'s Ours',
      description: 'Car repairing costs rise significantly when they don\'t get serviced at the right intervals and in the right way. We believe in fixing problems before you notice them.',
      buttonText: 'Book a Service',
    },
    hero2: {
      image: getDefaultImageUrl('/src/assets/image/hero-6.jpg'),
      title: 'Top-rated car repair workshop in Surat.',
      description: 'Get expert multi-brand service, engine diagnostics, AC repair, and certified auto mechanics at High Beam Auto tech Pvt. Ltd.',
      buttonText: 'Book a Service',
    },
    contactHeader: {
      title: 'Contact Us',
    },
    mapEmbed: {
      iframeUrl: 'https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d59502.15729949907!2d72.85081845098193!3d21.23641505600087!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x3be04f391ec2df19%3A0x9c519671732d10dd!2sVIP%20Circle%2C%20to%2C%20Sudama%20Chowk%2C%20opp.%20IT%20Park%2C%20Mota%20Varachha%2C%20Surat%2C%20Gujarat%20394101!3m2!1d21.234675!2d72.871937!5e0!3m2!1sen!2sin!4v1753357657562!5m2!1sen!2sin',
    },
    getInTouch: {
      title: 'Get In Touch',
      description: 'You\'ll be the first ones to be informed regarding offers, deals and events held by us. We\'d love to make you our priority.',
    },
    contactDetails: {
      address: 'VIP Circle, Sudama Chowk, opp. IT Park, Mota Varachha, Surat, Gujarat 394101',
      addressLink: 'https://maps.app.goo.gl/2gBHbFiDhQcWz4pr9',
      email: 'highbeamautotechpvtltd@gmail.com',
      phone: '+91 084609 22202',
      phoneLink: 'tel:+9108460922202',
      socialMedia: {
        facebook: 'https://www.facebook.com/people/High-Beam-Auto-Tech-Pvt-Ltd/61564380057760/#',
        instagram: 'https://www.instagram.com/highbeamautotech/?hl=en',
      },
    },
  });

  // Load page data
  const { data: fetchedPage, isLoading } = useQuery(
    ['page', pageId],
    async () => {
      try {
        const response = await axios.get(`/api/pages/${pageId}`, {
          timeout: 3000, // 3 second timeout
        });
        return response.data.data.page;
      } catch (error) {
        // If page doesn't exist or timeout, return null to use defaults
        return null;
      }
    },
    {
      retry: false, // Don't retry on failure
      staleTime: 60000, // Consider data fresh for 60 seconds
    }
  );

  // Helper to merge saved data with defaults, keeping defaults if saved is empty
  const mergeWithDefaults = (savedData, defaults) => {
    const merged = { ...defaults };
    
    if (savedData) {
      // Convert sections array to object format if needed
      let savedObject = savedData;
      if (Array.isArray(savedData.sections)) {
        savedObject = {};
        savedData.sections.forEach(section => {
          savedObject[section.sectionId] = section.content;
        });
      }
      
      // Deep merge, but keep default images if saved image is empty
      Object.keys(savedObject).forEach(key => {
        if (typeof savedObject[key] === 'object' && savedObject[key] !== null && !Array.isArray(savedObject[key])) {
          merged[key] = {
            ...defaults[key],
            ...savedObject[key],
            // Keep default image if saved image is empty
            image: savedObject[key].image || defaults[key]?.image || '',
          };
        } else if (Array.isArray(savedObject[key])) {
          // Merge arrays
          merged[key] = savedObject[key].map((item, index) => ({
            ...(defaults[key]?.[index] || {}),
            ...item,
            // Keep default image if saved image is empty
            image: item.image || defaults[key]?.[index]?.image || '',
          }));
        } else {
          merged[key] = savedObject[key];
        }
      });
    }
    
    return merged;
  };

  useEffect(() => {
    const defaults = getDefaultContent(pageId);
    if (fetchedPage) {
      const mergedData = mergeWithDefaults(fetchedPage, defaults);
      setPageData(mergedData);
    } else {
      setPageData(defaults);
    }
  }, [fetchedPage, pageId]);

  // Save mutation
  const saveMutation = useMutation(
    async (data) => {
      // Remove services and servicesHeader from home page data (now managed separately)
      const dataToSave = { ...data };
      if (pageId === 'home') {
        delete dataToSave.services;
        delete dataToSave.servicesHeader;
      }
      
      // Convert object to sections array format
      const sections = Object.keys(dataToSave).map((key, index) => ({
        sectionId: key,
        sectionType: getSectionType(key),
        content: dataToSave[key],
        order: index,
      }));

      const pagePayload = {
        pageId,
        pageName: getPageName(pageId),
        sections,
        isActive: true,
      };

      if (fetchedPage) {
        // Update existing
        const response = await axios.put(`/api/pages/${pageId}`, pagePayload, {
          timeout: 10000, // 10 second timeout
        });
        return response.data;
      } else {
        // Create new
        const response = await axios.post('/api/pages', pagePayload, {
          timeout: 10000, // 10 second timeout
        });
        return response.data;
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['page', pageId]);
        queryClient.invalidateQueries('pages');
        toast.success('Page saved successfully!');
      },
      onError: (error) => {
        console.error('Save page error:', error);
        const errorMessage = error.response?.data?.message || 
                           error.response?.data?.error || 
                           error.message || 
                           'Failed to save page';
        toast.error(errorMessage);
      },
    }
  );

  const getSectionType = (sectionId) => {
    if (sectionId.startsWith('hero')) return 'hero';
    if (sectionId.startsWith('service')) return 'service';
    if (sectionId === 'carRepair') return 'image';
    if (sectionId.startsWith('coreValue')) return 'value';
    if (sectionId === 'about') return 'feature';
    if (sectionId === 'footer') return 'footer';
    return 'text';
  };

  const getPageName = (id) => {
    const names = {
      home: 'Home Page',
      about: 'About Us',
      services: 'Services',
      contact: 'Contact Us',
      footer: 'Footer',
    };
    return names[id] || id;
  };

  const handleEdit = (sectionKey, field, value = null) => {
    setEditingSection({ sectionKey, field, currentValue: value || pageData[sectionKey]?.[field] || '' });
    setCurrentEdit({
      sectionKey,
      field,
      value: value !== null ? value : pageData[sectionKey]?.[field] || '',
    });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    const newData = { ...pageData };
    
    if (currentEdit.sectionKey.includes('.')) {
      // Nested field (e.g., 'about.features.0.title')
      const [parent, ...path] = currentEdit.sectionKey.split('.');
      let target = newData[parent];
      for (let i = 0; i < path.length - 1; i++) {
        target = target[path[i]];
      }
      target[path[path.length - 1]][currentEdit.field] = currentEdit.value;
    } else if (Array.isArray(newData[currentEdit.sectionKey])) {
      // Array field (e.g., services[0].title)
      const match = currentEdit.sectionKey.match(/(\w+)\[(\d+)\]/);
      if (match) {
        const [, arrayKey, index] = match;
        newData[arrayKey][parseInt(index)][currentEdit.field] = currentEdit.value;
      }
    } else {
      // Simple field
      newData[currentEdit.sectionKey] = {
        ...newData[currentEdit.sectionKey],
        [currentEdit.field]: currentEdit.value,
      };
    }

    setPageData(newData);
    setEditDialogOpen(false);
    setCurrentEdit({});
  };

  const handleSave = () => {
    saveMutation.mutate(pageData);
  };

  // Render function based on page type
  const renderPageEditor = () => {
    if (pageId === 'home') {
      return renderHomePageEditor();
    } else if (pageId === 'about') {
      return renderAboutPageEditor();
    } else if (pageId === 'services') {
      return renderServicesPageEditor();
    } else if (pageId === 'contact') {
      return renderContactPageEditor();
    }
    return <Typography>Unknown page type</Typography>;
  };

  // Home Page Editor
  const renderHomePageEditor = () => (
    <>
      {/* Hero Section 1 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Hero Section 1</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageUpload
              label="Hero 1 Background Image"
              value={pageData.hero1?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.hero1 = { ...newData.hero1, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1}>
              <TextField
                fullWidth
                label="Title"
                value={pageData.hero1?.title || ''}
                onChange={(e) => {
                  const newData = { ...pageData };
                  newData.hero1 = { ...newData.hero1, title: e.target.value };
                  setPageData(newData);
                }}
                size="small"
              />
              <IconButton onClick={() => handleEdit('hero1', 'title')}>
                <EditIcon />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={pageData.hero1?.description || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero1 = { ...newData.hero1, description: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Button Text"
              value={pageData.hero1?.buttonText || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero1 = { ...newData.hero1, buttonText: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Hero Section 2 */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Hero Section 2</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageUpload
              label="Hero 2 Background Image"
              value={pageData.hero2?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={pageData.hero2?.title || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, title: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={pageData.hero2?.description || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, description: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Button Text"
              value={pageData.hero2?.buttonText || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, buttonText: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Car Repair Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Car Repair Section</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageUpload
              label="Car Repair Image"
              value={pageData.carRepair?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.carRepair = { ...newData.carRepair, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              value={pageData.carRepair?.title || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.carRepair = { ...newData.carRepair, title: e.target.value };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={pageData.carRepair?.description || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.carRepair = { ...newData.carRepair, description: e.target.value };
                setPageData(newData);
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Core Values Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Core Values Section</Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Section Title"
          value={pageData.coreValuesHeader?.title || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.coreValuesHeader = { ...newData.coreValuesHeader, title: e.target.value };
            setPageData(newData);
          }}
          sx={{ mb: 3 }}
        />
        <Grid container spacing={2}>
          {pageData.coreValues?.map((value, index) => (
            <Grid item xs={12} md={6} key={value.id}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Value {index + 1}
                </Typography>
                <ImageUpload
                  label={`Value ${index + 1} Image`}
                  value={value.image || ''}
                  onChange={(url) => {
                    const newData = { ...pageData };
                    newData.coreValues[index].image = url;
                    setPageData(newData);
                  }}
                  showPreview={true}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Title"
                  value={value.title || ''}
                  onChange={(e) => {
                    const newData = { ...pageData };
                    newData.coreValues[index].title = e.target.value;
                    setPageData(newData);
                  }}
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  label="Description"
                  value={value.description || ''}
                  onChange={(e) => {
                    const newData = { ...pageData };
                    newData.coreValues[index].description = e.target.value;
                    setPageData(newData);
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* About Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>About Section</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageUpload
              label="About Section Image"
              value={pageData.about?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.about = { ...newData.about, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Section Title"
              value={pageData.about?.sectionTitle || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.about = { ...newData.about, sectionTitle: e.target.value };
                setPageData(newData);
              }}
            />
          </Grid>
          {pageData.about?.features?.map((feature, index) => (
            <Grid item xs={12} key={index}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Feature {index + 1}
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  label="Title"
                  value={feature.title || ''}
                  onChange={(e) => {
                    const newData = { ...pageData };
                    newData.about.features[index].title = e.target.value;
                    setPageData(newData);
                  }}
                  sx={{ mb: 1 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  label="Description"
                  value={feature.description || ''}
                  onChange={(e) => {
                    const newData = { ...pageData };
                    newData.about.features[index].description = e.target.value;
                    setPageData(newData);
                  }}
                />
              </Paper>
            </Grid>
          ))}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Button Text"
              value={pageData.about?.buttonText || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.about = { ...newData.about, buttonText: e.target.value };
                setPageData(newData);
              }}
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );

  // About Page Editor
  const renderAboutPageEditor = () => (
    <>
      {/* Hero Sections */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Hero Section 1</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageUpload
              label="Hero 1 Background Image"
              value={pageData.hero1?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.hero1 = { ...newData.hero1, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              value={pageData.hero1?.title || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero1 = { ...newData.hero1, title: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Button Text"
              value={pageData.hero1?.buttonText || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero1 = { ...newData.hero1, buttonText: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={pageData.hero1?.description || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero1 = { ...newData.hero1, description: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Hero Section 2</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageUpload
              label="Hero 2 Background Image"
              value={pageData.hero2?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              value={pageData.hero2?.title || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, title: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Button Text"
              value={pageData.hero2?.buttonText || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, buttonText: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={pageData.hero2?.description || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, description: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Our Story Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Our Story</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ImageUpload
              label="Story Image"
              value={pageData.ourStory?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.ourStory = { ...newData.ourStory, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Section Title"
              value={pageData.ourStory?.sectionTitle || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.ourStory = { ...newData.ourStory, sectionTitle: e.target.value };
                setPageData(newData);
              }}
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Main Title"
              value={pageData.ourStory?.title || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.ourStory = { ...newData.ourStory, title: e.target.value };
                setPageData(newData);
              }}
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Paragraph 1"
              value={pageData.ourStory?.paragraph1 || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.ourStory = { ...newData.ourStory, paragraph1: e.target.value };
                setPageData(newData);
              }}
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Paragraph 2"
              value={pageData.ourStory?.paragraph2 || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.ourStory = { ...newData.ourStory, paragraph2: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Gallery Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Gallery Section</Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Years in Business Text"
          value={pageData.gallery?.yearsText || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.gallery = { ...newData.gallery, yearsText: e.target.value };
            setPageData(newData);
          }}
          size="small"
          sx={{ mb: 2 }}
        />
        <Grid container spacing={2}>
          {[1, 2, 3, 4, 5].map((num) => (
            <Grid item xs={12} sm={6} md={4} key={num}>
              <ImageUpload
                label={`Gallery Image ${num}`}
                value={pageData.gallery?.[`image${num}`] || ''}
                onChange={(url) => {
                  const newData = { ...pageData };
                  newData.gallery = { ...newData.gallery, [`image${num}`]: url };
                  setPageData(newData);
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Commitment Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Our Commitment</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ImageUpload
              label="Commitment Image"
              value={pageData.commitment?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.commitment = { ...newData.commitment, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              value={pageData.commitment?.title || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.commitment = { ...newData.commitment, title: e.target.value };
                setPageData(newData);
              }}
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Description"
              value={pageData.commitment?.description || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.commitment = { ...newData.commitment, description: e.target.value };
                setPageData(newData);
              }}
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>Commitment Points</Typography>
            {(pageData.commitment?.points || []).map((point, index) => (
              <TextField
                key={index}
                fullWidth
                size="small"
                label={`Point ${index + 1}`}
                value={point || ''}
                onChange={(e) => {
                  const newData = { ...pageData };
                  const points = [...(newData.commitment?.points || [])];
                  points[index] = e.target.value;
                  newData.commitment = { ...newData.commitment, points };
                  setPageData(newData);
                }}
                sx={{ mb: 1 }}
              />
            ))}
          </Grid>
        </Grid>
      </Paper>

      {/* Vision Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Our Vision</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ImageUpload
              label="Vision Image"
              value={pageData.vision?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.vision = { ...newData.vision, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              value={pageData.vision?.title || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.vision = { ...newData.vision, title: e.target.value };
                setPageData(newData);
              }}
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Description"
              value={pageData.vision?.description || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.vision = { ...newData.vision, description: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Brands Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Brands We Work With</Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Section Title"
          value={pageData.brandsSection?.title || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.brandsSection = { ...newData.brandsSection, title: e.target.value };
            setPageData(newData);
          }}
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Description"
          value={pageData.brandsSection?.description || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.brandsSection = { ...newData.brandsSection, description: e.target.value };
            setPageData(newData);
          }}
          size="small"
        />
      </Paper>

      {/* FAQ Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Frequently Asked Questions</Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="FAQ Section Title"
          value={pageData.faq?.title || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.faq = { ...newData.faq, title: e.target.value };
            setPageData(newData);
          }}
          size="small"
          sx={{ mb: 3 }}
        />
        {(pageData.faq?.questions || []).map((faq, index) => (
          <Paper key={index} variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>Question {index + 1}</Typography>
            <TextField
              fullWidth
              size="small"
              label="Question"
              value={faq.question || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                const questions = [...(newData.faq?.questions || [])];
                questions[index] = { ...questions[index], question: e.target.value };
                newData.faq = { ...newData.faq, questions };
                setPageData(newData);
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              size="small"
              label="Answer"
              value={faq.answer || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                const questions = [...(newData.faq?.questions || [])];
                questions[index] = { ...questions[index], answer: e.target.value };
                newData.faq = { ...newData.faq, questions };
                setPageData(newData);
              }}
            />
          </Paper>
        ))}
      </Paper>
    </>
  );

  // Services Page Editor - defined after renderAboutPageEditor
  const renderServicesPageEditor = () => (
    <>
      {/* Service Details Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Service Details Section</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <ImageUpload
              label="Service Image"
              value={pageData.serviceDetails?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.serviceDetails = { ...newData.serviceDetails, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Paragraph 1"
              value={pageData.serviceDetails?.paragraph1 || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.serviceDetails = { ...newData.serviceDetails, paragraph1: e.target.value };
                setPageData(newData);
              }}
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Paragraph 2"
              value={pageData.serviceDetails?.paragraph2 || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.serviceDetails = { ...newData.serviceDetails, paragraph2: e.target.value };
                setPageData(newData);
              }}
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Button Text"
              value={pageData.serviceDetails?.buttonText || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.serviceDetails = { ...newData.serviceDetails, buttonText: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Benefits Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Benefits Section</Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Section Title"
          value={pageData.benefitsHeader?.title || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.benefitsHeader = { ...newData.benefitsHeader, title: e.target.value };
            setPageData(newData);
          }}
          size="small"
          sx={{ mb: 3 }}
        />
        <Grid container spacing={2}>
          {(pageData.benefits || []).map((benefit, index) => (
            <Grid item xs={12} sm={6} md={3} key={benefit.id || index}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="subtitle2" gutterBottom>Benefit {index + 1}</Typography>
                <ImageUpload
                  label={`Benefit ${index + 1} Image`}
                  value={benefit.image || ''}
                  onChange={(url) => {
                    const newData = { ...pageData };
                    newData.benefits[index].image = url;
                    setPageData(newData);
                  }}
                  showPreview={true}
                />
                <TextField
                  fullWidth
                  size="small"
                  label="Title"
                  value={benefit.title || ''}
                  onChange={(e) => {
                    const newData = { ...pageData };
                    newData.benefits[index].title = e.target.value;
                    setPageData(newData);
                  }}
                  sx={{ mb: 1, mt: 1 }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  size="small"
                  label="Description"
                  value={benefit.description || ''}
                  onChange={(e) => {
                    const newData = { ...pageData };
                    newData.benefits[index].description = e.target.value;
                    setPageData(newData);
                  }}
                />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Schedule Service Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Schedule Service Section</Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Section Title"
          value={pageData.scheduleService?.title || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.scheduleService = { ...newData.scheduleService, title: e.target.value };
            setPageData(newData);
          }}
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={pageData.scheduleService?.description || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.scheduleService = { ...newData.scheduleService, description: e.target.value };
            setPageData(newData);
          }}
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={2}
          label="Disclaimer Text"
          value={pageData.scheduleService?.disclaimer || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.scheduleService = { ...newData.scheduleService, disclaimer: e.target.value };
            setPageData(newData);
          }}
          size="small"
        />
      </Paper>

      {/* Opening Hours Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Opening Hours</Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Section Title"
          value={pageData.openingHours?.title || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.openingHours = { ...newData.openingHours, title: e.target.value };
            setPageData(newData);
          }}
          size="small"
          sx={{ mb: 2 }}
        />
        <Grid container spacing={2}>
          {['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'].map((day) => (
            <Grid item xs={12} sm={6} md={4} key={day}>
              <TextField
                fullWidth
                label={day.charAt(0).toUpperCase() + day.slice(1)}
                value={pageData.openingHours?.[day] || ''}
                onChange={(e) => {
                  const newData = { ...pageData };
                  newData.openingHours = { ...newData.openingHours, [day]: e.target.value };
                  setPageData(newData);
                }}
                size="small"
              />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </>
  );

  // Contact Page Editor - defined after renderServicesPageEditor
  const renderContactPageEditor = () => (
    <>
      {/* Hero Sections - same as About page */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Hero Section 1</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageUpload
              label="Hero 1 Background Image"
              value={pageData.hero1?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.hero1 = { ...newData.hero1, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              value={pageData.hero1?.title || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero1 = { ...newData.hero1, title: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Button Text"
              value={pageData.hero1?.buttonText || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero1 = { ...newData.hero1, buttonText: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={pageData.hero1?.description || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero1 = { ...newData.hero1, description: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Hero Section 2</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <ImageUpload
              label="Hero 2 Background Image"
              value={pageData.hero2?.image || ''}
              onChange={(url) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, image: url };
                setPageData(newData);
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Title"
              value={pageData.hero2?.title || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, title: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Button Text"
              value={pageData.hero2?.buttonText || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, buttonText: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              value={pageData.hero2?.description || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.hero2 = { ...newData.hero2, description: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Contact Header */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Contact Header</Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Page Title"
          value={pageData.contactHeader?.title || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.contactHeader = { ...newData.contactHeader, title: e.target.value };
            setPageData(newData);
          }}
          size="small"
        />
      </Paper>

      {/* Map Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Map Embed</Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Google Maps Embed URL"
          value={pageData.mapEmbed?.iframeUrl || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.mapEmbed = { ...newData.mapEmbed, iframeUrl: e.target.value };
            setPageData(newData);
          }}
          size="small"
          helperText="Paste the full Google Maps embed URL here"
        />
      </Paper>

      {/* Get In Touch Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Get In Touch Section</Typography>
        <Divider sx={{ mb: 2 }} />
        <TextField
          fullWidth
          label="Section Title"
          value={pageData.getInTouch?.title || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.getInTouch = { ...newData.getInTouch, title: e.target.value };
            setPageData(newData);
          }}
          size="small"
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Description"
          value={pageData.getInTouch?.description || ''}
          onChange={(e) => {
            const newData = { ...pageData };
            newData.getInTouch = { ...newData.getInTouch, description: e.target.value };
            setPageData(newData);
          }}
          size="small"
        />
      </Paper>

      {/* Contact Details */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>Contact Details</Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              value={pageData.contactDetails?.address || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.contactDetails = { ...newData.contactDetails, address: e.target.value };
                setPageData(newData);
              }}
              size="small"
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Address Link (Google Maps)"
              value={pageData.contactDetails?.addressLink || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.contactDetails = { ...newData.contactDetails, addressLink: e.target.value };
                setPageData(newData);
              }}
              size="small"
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Email"
              value={pageData.contactDetails?.email || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.contactDetails = { ...newData.contactDetails, email: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone"
              value={pageData.contactDetails?.phone || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.contactDetails = { ...newData.contactDetails, phone: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Phone Link (tel:)"
              value={pageData.contactDetails?.phoneLink || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.contactDetails = { ...newData.contactDetails, phoneLink: e.target.value };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
        </Grid>
        <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>Social Media Links</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Facebook URL"
              value={pageData.contactDetails?.socialMedia?.facebook || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.contactDetails = {
                  ...newData.contactDetails,
                  socialMedia: {
                    ...newData.contactDetails?.socialMedia,
                    facebook: e.target.value,
                  },
                };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Instagram URL"
              value={pageData.contactDetails?.socialMedia?.instagram || ''}
              onChange={(e) => {
                const newData = { ...pageData };
                newData.contactDetails = {
                  ...newData.contactDetails,
                  socialMedia: {
                    ...newData.contactDetails?.socialMedia,
                    instagram: e.target.value,
                  },
                };
                setPageData(newData);
              }}
              size="small"
            />
          </Grid>
        </Grid>
      </Paper>
    </>
  );

  if (isLoading || !pageData) {
    return <LoadingSpinner />;
  }

  return (
    <Box>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/content')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            Editing: {getPageName(pageId)}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saveMutation.isLoading}
          >
            {saveMutation.isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {renderPageEditor()}

        {/* Save Button */}
        <Box display="flex" justifyContent="center" mt={4} mb={4}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saveMutation.isLoading}
          >
            {saveMutation.isLoading ? 'Saving Changes...' : 'Save All Changes'}
          </Button>
        </Box>
      </Container>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit {currentEdit.field}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={currentEdit.value || ''}
            onChange={(e) => setCurrentEdit({ ...currentEdit, value: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PageEditor;

