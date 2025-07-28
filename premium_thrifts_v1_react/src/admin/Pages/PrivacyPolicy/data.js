import { Shield, Info, Clock, Users, Database, Lock, Globe, Bell, Feather } from "lucide-react";
export const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: Info,
      content: `Welcome to our Privacy Policy. This document explains how we collect, use, and protect your personal information when you use our platform. We are committed to ensuring the privacy and security of all user data in compliance with applicable data protection laws.`
    },
    {
      id: 'effective-date',
      title: 'Effective Date',
      icon: Clock,
      content: `This Privacy Policy is effective as of February 28, 2025, and applies to all information collected through our platform and any associated services, sales, marketing, or events.`
    },
    {
      id: 'information-we-collect',
      title: 'Information We Collect',
      icon: Database,
      content: `We collect several types of information for various purposes to provide and improve our service to you:

      • Personal Information: Name, email address, phone number, billing address, and payment information.
      • Usage Data: IP address, browser type, pages visited, time spent on pages, and other diagnostic data.
      • Cookies and Tracking Data: We use cookies and similar tracking technologies to track activity on our platform and hold certain information.`
    },
    {
      id: 'how-we-use-information',
      title: 'How We Use Your Information',
      icon: Feather,
      content: `We use the collected data for various purposes:

      • To provide and maintain our service
      • To notify you about changes to our service
      • To provide customer support
      • To gather analysis or valuable information so that we can improve our service
      • To monitor the usage of our service
      • To detect, prevent and address technical issues
      • To process transactions and send related information`
    },
    {
      id: 'data-sharing',
      title: 'Data Sharing and Disclosure',
      icon: Users,
      content: `We may share your personal information in the following situations:

      • With service providers to monitor and analyze the use of our service
      • For business transfers during mergers, sales, or acquisitions
      • With affiliates, in which case we will require those affiliates to honor this Privacy Policy
      • With your consent or at your direction
      • If required by law, such as complying with a court order or legal process`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: Lock,
      content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.`
    },
    {
      id: 'international-transfers',
      title: 'International Data Transfers',
      icon: Globe,
      content: `Your information may be transferred to and maintained on computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ. If you are located outside our country and choose to provide information to us, please note that we transfer the data to our servers for processing.`
    },
    {
      id: 'your-rights',
      title: 'Your Data Protection Rights',
      icon: Shield,
      content: `Depending on your location, you may have certain rights regarding your personal information:

      • The right to access your personal data
      • The right to rectify or update your personal data
      • The right to erase or delete your personal data
      • The right to restrict processing of your personal data
      • The right to object to processing of your personal data
      • The right to data portability
      • The right to withdraw consent`
    },
    {
      id: 'policy-updates',
      title: 'Privacy Policy Updates',
      icon: Bell,
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "effective date" at the top. You are advised to review this Privacy Policy periodically for any changes.`
    }
  ];