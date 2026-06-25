'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, ArrowRight, Clock, BookOpen, Award, Users,
  Code2, ChevronDown, ChevronUp, Terminal,
} from 'lucide-react';
import SectionParticles from '@/components/SectionParticles';

// ── Per-course hero video sources ───────────────────────
const courseVideos = {
  fullstack:                'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4',
  'ai-ml':                  'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
  'mobile-app-development': 'https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4',
  'frontend-development':   'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
  'backend-development':    'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4',
  reactjs:                  'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
  nodejs:                   'https://videos.pexels.com/video-files/3129957/3129957-uhd_2560_1440_30fps.mp4',
  'web-design':             'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
  'data-analysis':          'https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4',
  'graphic-design-course':  'https://videos.pexels.com/video-files/3209828/3209828-uhd_2560_1440_25fps.mp4',
  'hr-business-development':'https://videos.pexels.com/video-files/3130284/3130284-uhd_2560_1440_30fps.mp4',
  'digital-marketing-course':'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
};

// ── Per-course accent colors ─────────────────────────────
const courseAccents = {
  fullstack:                { primary: '168,85,247', secondary: '232,121,249', name: 'purple' },
  'ai-ml':                  { primary: '139,92,246', secondary: '167,139,250', name: 'violet' },
  'mobile-app-development': { primary: '59,130,246', secondary: '96,165,250',  name: 'blue' },
  'frontend-development':   { primary: '34,211,238', secondary: '103,232,249', name: 'cyan' },
  'backend-development':    { primary: '34,197,94',  secondary: '74,222,128',  name: 'green' },
  reactjs:                  { primary: '56,189,248', secondary: '125,211,252', name: 'sky' },
  nodejs:                   { primary: '163,230,53', secondary: '190,242,100', name: 'lime' },
  'web-design':             { primary: '236,72,153', secondary: '244,114,182', name: 'pink' },
  'data-analysis':          { primary: '249,115,22', secondary: '251,146,60',  name: 'orange' },
  'graphic-design-course':  { primary: '239,68,68',  secondary: '248,113,113', name: 'red' },
  'hr-business-development':{ primary: '20,184,166', secondary: '45,212,191',  name: 'teal' },
  'digital-marketing-course':{ primary: '234,179,8', secondary: '250,204,21',  name: 'yellow' },
};

// ── Per-course right-side illustration config ────────────
const courseIllustrations = {
  fullstack: {
    type: 'code',
    title: 'MERN Stack',
    lines: [
      { text: 'import React, { useState } from "react";', color: 'text-purple-300' },
      { text: 'import express from "express";', color: 'text-cyan-300' },
      { text: 'import mongoose from "mongoose";', color: 'text-green-300' },
      { text: '', color: '' },
      { text: 'const app = express();', color: 'text-yellow-300' },
      { text: 'app.use(express.json());', color: 'text-gray-400' },
      { text: '', color: '' },
      { text: 'mongoose.connect(process.env.MONGO_URI)', color: 'text-orange-300' },
      { text: '  .then(() => console.log("DB Connected ✓"))', color: 'text-green-400' },
      { text: '', color: '' },
      { text: 'app.listen(5000, () => {', color: 'text-purple-300' },
      { text: '  console.log("Server running 🚀");', color: 'text-cyan-400' },
      { text: '});', color: 'text-purple-300' },
    ],
    badges: ['React.js', 'Node.js', 'MongoDB', 'Express'],
  },
  'ai-ml': {
    type: 'code',
    title: 'AI / ML Pipeline',
    lines: [
      { text: 'import tensorflow as tf', color: 'text-violet-300' },
      { text: 'import numpy as np', color: 'text-blue-300' },
      { text: 'from sklearn.model_selection import train_test_split', color: 'text-cyan-300' },
      { text: '', color: '' },
      { text: '# Build neural network', color: 'text-gray-500' },
      { text: 'model = tf.keras.Sequential([', color: 'text-violet-300' },
      { text: '  tf.keras.layers.Dense(128, activation="relu"),', color: 'text-green-300' },
      { text: '  tf.keras.layers.Dropout(0.2),', color: 'text-yellow-300' },
      { text: '  tf.keras.layers.Dense(10, activation="softmax")', color: 'text-green-300' },
      { text: '])', color: 'text-violet-300' },
      { text: '', color: '' },
      { text: 'model.compile(optimizer="adam",', color: 'text-orange-300' },
      { text: '  loss="sparse_categorical_crossentropy")', color: 'text-orange-300' },
    ],
    badges: ['Python', 'TensorFlow', 'Keras', 'Scikit-learn'],
  },
  'mobile-app-development': {
    type: 'dashboard',
    title: 'App Dashboard',
    metrics: [
      { label: 'Downloads', value: '12.4K', trend: '+18%', color: 'text-blue-400' },
      { label: 'Active Users', value: '8.2K', trend: '+12%', color: 'text-cyan-400' },
      { label: 'Rating', value: '4.8★', trend: '+0.2', color: 'text-yellow-400' },
      { label: 'Retention', value: '76%', trend: '+5%', color: 'text-green-400' },
    ],
    badges: ['React Native', 'Flutter', 'Firebase', 'Dart'],
  },
  'frontend-development': {
    type: 'code',
    title: 'Frontend Dev',
    lines: [
      { text: 'import { useState, useEffect } from "react";', color: 'text-cyan-300' },
      { text: 'import { motion } from "framer-motion";', color: 'text-purple-300' },
      { text: '', color: '' },
      { text: 'export default function Hero() {', color: 'text-yellow-300' },
      { text: '  const [active, setActive] = useState(false);', color: 'text-green-300' },
      { text: '', color: '' },
      { text: '  return (', color: 'text-gray-400' },
      { text: '    <motion.div', color: 'text-cyan-300' },
      { text: '      initial={{ opacity: 0, y: 20 }}', color: 'text-purple-300' },
      { text: '      animate={{ opacity: 1, y: 0 }}', color: 'text-purple-300' },
      { text: '      className="hero-section"', color: 'text-green-300' },
      { text: '    >', color: 'text-cyan-300' },
      { text: '      <h1>Build the Web</h1>', color: 'text-white' },
    ],
    badges: ['HTML5', 'CSS3', 'JavaScript', 'React.js'],
  },
  'backend-development': {
    type: 'code',
    title: 'Backend API',
    lines: [
      { text: 'const express = require("express");', color: 'text-green-300' },
      { text: 'const jwt = require("jsonwebtoken");', color: 'text-yellow-300' },
      { text: '', color: '' },
      { text: 'router.post("/api/auth/login", async (req, res) => {', color: 'text-green-300' },
      { text: '  const { email, password } = req.body;', color: 'text-cyan-300' },
      { text: '  const user = await User.findOne({ email });', color: 'text-purple-300' },
      { text: '', color: '' },
      { text: '  if (!user) return res.status(401)', color: 'text-red-400' },
      { text: '    .json({ error: "Invalid credentials" });', color: 'text-red-400' },
      { text: '', color: '' },
      { text: '  const token = jwt.sign({ id: user._id },', color: 'text-orange-300' },
      { text: '    process.env.JWT_SECRET, { expiresIn: "7d" });', color: 'text-orange-300' },
      { text: '  res.json({ token, user });', color: 'text-green-400' },
    ],
    badges: ['Node.js', 'Express', 'PostgreSQL', 'Docker'],
  },
  reactjs: {
    type: 'code',
    title: 'React.js',
    lines: [
      { text: 'import { useReducer, useCallback } from "react";', color: 'text-sky-300' },
      { text: 'import { createSlice } from "@reduxjs/toolkit";', color: 'text-purple-300' },
      { text: '', color: '' },
      { text: 'const counterSlice = createSlice({', color: 'text-sky-300' },
      { text: '  name: "counter",', color: 'text-green-300' },
      { text: '  initialState: { value: 0 },', color: 'text-yellow-300' },
      { text: '  reducers: {', color: 'text-sky-300' },
      { text: '    increment: (state) => { state.value += 1; },', color: 'text-cyan-300' },
      { text: '    decrement: (state) => { state.value -= 1; },', color: 'text-cyan-300' },
      { text: '    reset: (state) => { state.value = 0; },', color: 'text-cyan-300' },
      { text: '  },', color: 'text-sky-300' },
      { text: '});', color: 'text-sky-300' },
      { text: 'export const { increment, decrement } = counterSlice.actions;', color: 'text-purple-300' },
    ],
    badges: ['React.js', 'Redux', 'Hooks', 'Vite'],
  },
  nodejs: {
    type: 'code',
    title: 'Node.js Server',
    lines: [
      { text: 'const { Server } = require("socket.io");', color: 'text-lime-300' },
      { text: 'const io = new Server(httpServer, { cors: { origin: "*" } });', color: 'text-green-300' },
      { text: '', color: '' },
      { text: 'io.on("connection", (socket) => {', color: 'text-lime-300' },
      { text: '  console.log("User connected:", socket.id);', color: 'text-cyan-300' },
      { text: '', color: '' },
      { text: '  socket.on("join_room", (room) => {', color: 'text-yellow-300' },
      { text: '    socket.join(room);', color: 'text-green-300' },
      { text: '    io.to(room).emit("user_joined", socket.id);', color: 'text-cyan-300' },
      { text: '  });', color: 'text-yellow-300' },
      { text: '', color: '' },
      { text: '  socket.on("send_message", (data) => {', color: 'text-yellow-300' },
      { text: '    io.to(data.room).emit("receive_message", data);', color: 'text-lime-400' },
    ],
    badges: ['Node.js', 'Express', 'Socket.io', 'MongoDB'],
  },
  'web-design': {
    type: 'dashboard',
    title: 'Design System',
    metrics: [
      { label: 'Components', value: '48', trend: 'Built', color: 'text-pink-400' },
      { label: 'Screens', value: '24', trend: 'Designed', color: 'text-purple-400' },
      { label: 'Prototypes', value: '6', trend: 'Delivered', color: 'text-cyan-400' },
      { label: 'Client Score', value: '98%', trend: 'Satisfaction', color: 'text-green-400' },
    ],
    badges: ['Figma', 'Adobe XD', 'CSS3', 'Bootstrap'],
  },
  'data-analysis': {
    type: 'dashboard',
    title: 'Analytics Dashboard',
    metrics: [
      { label: 'Data Points', value: '1.2M', trend: 'Processed', color: 'text-orange-400' },
      { label: 'Accuracy', value: '94.7%', trend: '+2.1%', color: 'text-green-400' },
      { label: 'Dashboards', value: '12', trend: 'Created', color: 'text-blue-400' },
      { label: 'Insights', value: '340+', trend: 'Generated', color: 'text-yellow-400' },
    ],
    badges: ['Python', 'Pandas', 'Power BI', 'SQL'],
  },
  'graphic-design-course': {
    type: 'dashboard',
    title: 'Design Portfolio',
    metrics: [
      { label: 'Logos Created', value: '24', trend: 'Projects', color: 'text-red-400' },
      { label: 'Brand Kits', value: '8', trend: 'Delivered', color: 'text-pink-400' },
      { label: 'Social Posts', value: '120+', trend: 'Designed', color: 'text-orange-400' },
      { label: 'Client Rating', value: '5.0★', trend: 'Average', color: 'text-yellow-400' },
    ],
    badges: ['Photoshop', 'Illustrator', 'Figma', 'Canva'],
  },
  'hr-business-development': {
    type: 'dashboard',
    title: 'HR & BD Metrics',
    metrics: [
      { label: 'Placements', value: '200+', trend: 'Successful', color: 'text-teal-400' },
      { label: 'Clients Won', value: '45', trend: 'This Quarter', color: 'text-cyan-400' },
      { label: 'Retention', value: '92%', trend: 'Employee', color: 'text-green-400' },
      { label: 'Revenue', value: '₹2.4Cr', trend: 'Generated', color: 'text-yellow-400' },
    ],
    badges: ['CRM Tools', 'LinkedIn', 'HubSpot', 'Zoho'],
  },
  'digital-marketing-course': {
    type: 'dashboard',
    title: 'Marketing Analytics',
    metrics: [
      { label: 'Impressions', value: '2.8M', trend: '+34%', color: 'text-yellow-400' },
      { label: 'Conversions', value: '18.4%', trend: '+6%', color: 'text-green-400' },
      { label: 'ROAS', value: '4.2x', trend: '+0.8x', color: 'text-orange-400' },
      { label: 'Organic Traffic', value: '68K', trend: '+22%', color: 'text-cyan-400' },
    ],
    badges: ['SEO', 'Google Ads', 'Meta Ads', 'Analytics'],
  },
};

// ── Course data ──────────────────────────────────────────
const courseData = {
  fullstack: {
    title: 'Full Stack / MERN',
    tagline: 'Build end-to-end web apps with MongoDB, Express, React & Node.js.',
    badge: 'Most Popular',
    duration: '3 Months',
    level: 'Beginner Friendly',
    color: 'purple',
    overview: 'Master the complete MERN stack and build production-ready full-stack web applications. This industry-driven program takes you from HTML basics to deploying scalable apps on the cloud. Designed for beginners and IT professionals alike, you will gain real-world experience through hands-on projects.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'REST APIs', 'Git'],
    whatYouLearn: [
      'Build responsive websites with HTML5, CSS3, and Tailwind',
      'Master modern JavaScript and DOM manipulation',
      'Develop dynamic UIs with React.js, Hooks, and React Router',
      'Create RESTful APIs using Node.js and Express.js',
      'Store and manage data with MongoDB and Mongoose ODM',
      'Implement secure user authentication using JWT and bcrypt',
      'Connect front-end and back-end via Axios and async/await',
      'Deploy full-stack apps on Vercel, Render, and Railway',
    ],
    tools: ['VS Code', 'Postman', 'MongoDB Atlas', 'GitHub', 'Vercel', 'Render'],
    projects: [
      { name: 'E-Commerce Platform', desc: 'Full-featured online store with cart, payments, and admin panel.' },
      { name: 'Social Media App', desc: 'Real-time social platform with posts, likes, and messaging.' },
      { name: 'Task Management System', desc: 'Collaborative project tracker with auth and real-time updates.' },
    ],
    careers: ['Full Stack Developer', 'Frontend Developer', 'Backend Developer', 'MERN Stack Engineer', 'Tech Lead', 'DevOps Engineer'],
    whoShouldJoin: [
      'Beginners with no prior coding experience',
      'IT graduates looking to enter web development',
      'Professionals wanting to switch to tech careers',
      'Entrepreneurs building their own web products',
    ],
    faqs: [
      { q: 'Do I need prior coding experience?', a: 'No. This course starts from the very basics and takes you to advanced full-stack development step by step.' },
      { q: 'What certificate will I receive?', a: 'You will receive a globally recognized Taruna Technology Full Stack Developer Certificate upon completion.' },
      { q: 'Are the projects real-world?', a: 'Yes. All three projects are production-grade applications you can add directly to your portfolio.' },
      { q: 'Is placement assistance provided?', a: 'Yes. We provide resume building, mock interviews, and direct referrals to our 100+ hiring partners.' },
      { q: 'What is the class schedule?', a: 'Classes are available on weekdays and weekends. Both online and offline modes are supported.' },
    ],
  },
  'ai-ml': {
    title: 'AI / Machine Learning',
    tagline: 'Master machine learning, neural networks, and AI model deployment.',
    badge: 'Hot',
    duration: '3 Months',
    level: 'Intermediate Level',
    color: 'violet',
    overview: 'Dive deep into Artificial Intelligence and Machine Learning with Python, TensorFlow, and real-world datasets. This program is designed by AI industry experts to give you practical experience building intelligent systems. From supervised learning to neural networks and cloud deployment, you will be job-ready in 3 months.',
    technologies: ['Python', 'TensorFlow', 'Keras', 'NumPy', 'Pandas', 'Scikit-learn', 'OpenCV', 'NLP'],
    whatYouLearn: [
      'Python programming for Data Science and Machine Learning',
      'Supervised and Unsupervised Learning algorithms',
      'Deep learning and neural network models with TensorFlow & Keras',
      'Computer Vision applications using OpenCV',
      'Natural Language Processing (NLP) systems',
      'Data preprocessing, feature engineering, and cleaning',
      'Model evaluation, tuning, and optimization',
      'Deploy AI/ML models on AWS, Azure, and Google Cloud',
    ],
    tools: ['Jupyter Notebook', 'Google Colab', 'VS Code', 'GitHub', 'AWS SageMaker', 'Hugging Face'],
    projects: [
      { name: 'Image Classification System', desc: 'CNN-based model to classify images across multiple categories.' },
      { name: 'Sentiment Analysis Tool', desc: 'NLP pipeline to analyze and classify customer reviews.' },
      { name: 'Recommendation Engine', desc: 'Collaborative filtering system for personalized recommendations.' },
    ],
    careers: ['ML Engineer', 'Data Scientist', 'AI Research Scientist', 'NLP Engineer', 'Computer Vision Engineer', 'AI Product Manager'],
    whoShouldJoin: [
      'Python developers wanting to enter AI/ML',
      'Data analysts looking to upskill to ML',
      'Engineers interested in building intelligent systems',
      'Researchers exploring applied AI',
    ],
    faqs: [
      { q: 'Do I need a math background?', a: 'Basic understanding of statistics helps, but we cover all necessary math concepts within the course.' },
      { q: 'Which Python version is used?', a: 'Python 3.10+ is used throughout the course with the latest library versions.' },
      { q: 'Will I work on real datasets?', a: 'Yes. You will work with real-world datasets from Kaggle, UCI, and industry sources.' },
      { q: 'Is cloud deployment covered?', a: 'Yes. You will learn to deploy models on AWS, Azure, and Google Cloud platforms.' },
      { q: 'What certificate will I receive?', a: 'A Taruna Technology AI/ML Certification recognized by our 100+ hiring partners.' },
    ],
  },
  'mobile-app-development': {
    title: 'Mobile App Development',
    tagline: 'Create cross-platform apps with React Native & Flutter.',
    badge: '',
    duration: '3 Months',
    level: 'Beginner Friendly',
    color: 'blue',
    overview: 'Learn to build stunning mobile applications for both Android and iOS using React Native, Flutter, and native development tools. This hands-on program covers everything from UI design to Firebase integration and App Store deployment. Graduate with three portfolio-ready mobile apps.',
    technologies: ['React Native', 'Flutter', 'Dart', 'Java', 'Kotlin', 'Swift', 'Firebase', 'REST APIs'],
    whatYouLearn: [
      'Cross-platform development with React Native and Flutter',
      'Android app development with Java and Kotlin',
      'iOS app development with Swift and Xcode',
      'Firebase integration for auth, database, and storage',
      'Responsive UI/UX with Material Design and Cupertino widgets',
      'Device features: camera, GPS, sensors, and push notifications',
      'RESTful API and JSON integration',
      'Publish apps to Google Play Store and Apple App Store',
    ],
    tools: ['Android Studio', 'Xcode', 'VS Code', 'Firebase Console', 'Expo', 'Figma'],
    projects: [
      { name: 'E-Commerce Mobile App', desc: 'Full-featured shopping app with cart, payments, and order tracking.' },
      { name: 'Social Networking App', desc: 'Real-time social platform with profiles, posts, and messaging.' },
      { name: 'Fitness Tracker', desc: 'Health app with workout logging, progress charts, and notifications.' },
    ],
    careers: ['Mobile App Developer', 'Flutter Developer', 'React Native Developer', 'Android Developer', 'iOS Developer', 'Mobile App Tester'],
    whoShouldJoin: [
      'Beginners who want to build mobile apps',
      'Web developers transitioning to mobile',
      'Entrepreneurs with app ideas to build',
      'IT graduates seeking mobile development careers',
    ],
    faqs: [
      { q: 'Do I need a Mac for iOS development?', a: 'A Mac is required for native iOS/Swift development. React Native and Flutter can be developed on Windows.' },
      { q: 'Will I publish a real app?', a: 'Yes. You will go through the full submission process for both Google Play and Apple App Store.' },
      { q: 'Is Flutter or React Native better?', a: 'Both are covered. You will learn both frameworks and understand when to use each.' },
      { q: 'What devices do I need?', a: 'An Android phone is sufficient. iOS testing can be done via simulators.' },
      { q: 'Is placement support included?', a: 'Yes. Resume building, portfolio review, and referrals to hiring partners are included.' },
    ],
  },
  'frontend-development': {
    title: 'Frontend Development',
    tagline: 'Master HTML, CSS, JavaScript, and modern frameworks.',
    badge: '',
    duration: '3 Months',
    level: 'Beginner Friendly',
    color: 'cyan',
    overview: 'Build beautiful, responsive, and accessible web interfaces using modern frontend technologies. This program covers everything from semantic HTML to advanced React.js patterns. You will graduate with a professional portfolio and the skills to land a frontend developer role.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS', 'Bootstrap', 'Figma', 'Git'],
    whatYouLearn: [
      'Semantic HTML5 structure and web accessibility',
      'CSS3 Flexbox, Grid, animations, and transitions',
      'JavaScript ES6+ and DOM manipulation',
      'React.js components, props, and state management',
      'React Hooks: useState, useEffect, useContext',
      'Responsive design and mobile-first approach',
      'Version control with Git and GitHub',
      'Deploying frontend apps on Vercel and Netlify',
    ],
    tools: ['VS Code', 'Chrome DevTools', 'Figma', 'GitHub', 'Vercel', 'Netlify'],
    projects: [
      { name: 'Portfolio Website', desc: 'Personal portfolio with animations, projects showcase, and contact form.' },
      { name: 'E-Commerce UI', desc: 'Fully responsive product listing, cart, and checkout interface.' },
      { name: 'Dashboard Interface', desc: 'Admin dashboard with charts, tables, and real-time data display.' },
    ],
    careers: ['Frontend Developer', 'UI Developer', 'React Developer', 'Web Designer', 'JavaScript Developer'],
    whoShouldJoin: [
      'Complete beginners with no coding background',
      'Designers wanting to learn to code',
      'Backend developers expanding to full-stack',
      'Students building their first web portfolio',
    ],
    faqs: [
      { q: 'Is this course suitable for absolute beginners?', a: 'Yes. We start from zero — no prior coding knowledge is required.' },
      { q: 'Will I learn React.js in this course?', a: 'Yes. React.js is a core part of the curriculum, covering components, hooks, and routing.' },
      { q: 'What projects will I build?', a: 'You will build a portfolio website, an e-commerce UI, and an admin dashboard.' },
      { q: 'Is Tailwind CSS covered?', a: 'Yes. Both Tailwind CSS and Bootstrap are covered for rapid UI development.' },
      { q: 'Will I get a certificate?', a: 'Yes. A Taruna Technology Frontend Development Certificate upon successful completion.' },
    ],
  },
  'backend-development': {
    title: 'Backend Development',
    tagline: 'Build robust APIs and server logic with Node.js & Express.',
    badge: '',
    duration: '3 Months',
    level: 'Intermediate',
    color: 'green',
    overview: 'Master server-side development with Node.js, Express.js, and databases. This program teaches you to design scalable architectures, build secure REST APIs, and deploy backend systems to the cloud. You will work on real-world projects that mirror production environments.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'JWT', 'REST APIs', 'Docker', 'AWS'],
    whatYouLearn: [
      'Node.js core modules and event-driven architecture',
      'Express.js framework and middleware patterns',
      'RESTful API design and best practices',
      'Database design with MongoDB and PostgreSQL',
      'Authentication and authorization with JWT and OAuth',
      'Error handling, logging, and security hardening',
      'Containerization with Docker',
      'Cloud deployment on AWS and Render',
    ],
    tools: ['VS Code', 'Postman', 'MongoDB Atlas', 'PostgreSQL', 'Docker Desktop', 'AWS EC2'],
    projects: [
      { name: 'REST API Service', desc: 'Full CRUD API with authentication, rate limiting, and documentation.' },
      { name: 'Authentication System', desc: 'JWT-based auth with refresh tokens, roles, and OAuth integration.' },
      { name: 'Real-time Chat Backend', desc: 'WebSocket-powered chat server with rooms and message persistence.' },
    ],
    careers: ['Backend Developer', 'Node.js Developer', 'API Developer', 'DevOps Engineer', 'Full Stack Developer', 'Server-Side Engineer'],
    whoShouldJoin: [
      'Frontend developers wanting to go full-stack',
      'Developers with basic JavaScript knowledge',
      'IT professionals moving into backend roles',
      'Engineers interested in cloud and DevOps',
    ],
    faqs: [
      { q: 'Do I need to know JavaScript first?', a: 'Basic JavaScript knowledge is recommended. We cover Node.js-specific concepts from the ground up.' },
      { q: 'Is SQL or NoSQL covered?', a: 'Both. You will learn MongoDB (NoSQL) and PostgreSQL (SQL) and understand when to use each.' },
      { q: 'Will Docker and AWS be covered?', a: 'Yes. Containerization with Docker and deployment on AWS are included in the curriculum.' },
      { q: 'What kind of projects will I build?', a: 'A REST API service, an authentication system, and a real-time chat backend.' },
      { q: 'Is this course suitable for beginners?', a: 'Intermediate level. Basic programming knowledge is recommended before enrolling.' },
    ],
  },
  reactjs: {
    title: 'React.js',
    tagline: 'Build dynamic user interfaces with the #1 JavaScript library.',
    badge: 'Trending',
    duration: '3 Months',
    level: 'Intermediate',
    color: 'sky',
    overview: 'Deep dive into React.js and build modern, scalable web applications. This focused program covers React fundamentals, advanced hooks, state management with Redux, performance optimization, and testing. You will graduate with three production-quality React applications in your portfolio.',
    technologies: ['React.js', 'JSX', 'Hooks', 'Redux', 'React Router', 'Axios', 'Tailwind CSS', 'Vite'],
    whatYouLearn: [
      'React fundamentals: components, props, and JSX',
      'State management with useState, useReducer, and Context API',
      'Side effects and data fetching with useEffect',
      'Redux Toolkit for global state management',
      'React Router for client-side navigation',
      'Performance optimization: memo, useMemo, useCallback',
      'Testing React components with Jest and React Testing Library',
      'Building and deploying production React apps with Vite',
    ],
    tools: ['VS Code', 'Vite', 'Redux DevTools', 'React DevTools', 'GitHub', 'Vercel'],
    projects: [
      { name: 'Task Manager App', desc: 'Drag-and-drop task board with Redux state and local persistence.' },
      { name: 'Weather Dashboard', desc: 'Real-time weather app with API integration and dynamic charts.' },
      { name: 'Blog Platform', desc: 'Full-featured blog with auth, CRUD posts, and comment system.' },
    ],
    careers: ['React Developer', 'Frontend Engineer', 'UI Developer', 'JavaScript Developer', 'Full Stack Developer'],
    whoShouldJoin: [
      'JavaScript developers ready to learn React',
      'Frontend developers wanting to master modern React',
      'Developers building SPAs and web applications',
      'Engineers preparing for React developer interviews',
    ],
    faqs: [
      { q: 'Do I need to know JavaScript before this course?', a: 'Yes. Solid JavaScript fundamentals (ES6+) are required before starting this course.' },
      { q: 'Is Redux covered in depth?', a: 'Yes. We cover Redux Toolkit, slices, thunks, and integration with React components.' },
      { q: 'Will I learn React 18 features?', a: 'Yes. The course covers React 18 including concurrent features and the new root API.' },
      { q: 'Is testing included?', a: 'Yes. Unit and integration testing with Jest and React Testing Library are covered.' },
      { q: 'What is the difference between this and the Frontend course?', a: 'This course focuses exclusively on React.js in depth, while Frontend covers the full HTML/CSS/JS/React stack.' },
    ],
  },
  nodejs: {
    title: 'Node.js',
    tagline: 'Develop scalable server-side applications with JavaScript.',
    badge: '',
    duration: '3 Months',
    level: 'Intermediate',
    color: 'lime',
    overview: 'Master Node.js for building fast, scalable server-side applications. This program covers the Node.js runtime, Express.js framework, database integration, authentication, and cloud deployment. You will build production-grade APIs and backend systems used in real-world applications.',
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'JWT', 'REST APIs', 'Socket.io', 'AWS'],
    whatYouLearn: [
      'Node.js runtime, event loop, and async programming',
      'Express.js framework and middleware patterns',
      'REST API design, versioning, and documentation',
      'Database integration with MongoDB and PostgreSQL',
      'Authentication with JWT, sessions, and OAuth',
      'Real-time communication with Socket.io',
      'Error handling, logging, and security best practices',
      'Deployment on AWS, Render, and Railway',
    ],
    tools: ['VS Code', 'Postman', 'MongoDB Atlas', 'PostgreSQL', 'Insomnia', 'GitHub'],
    projects: [
      { name: 'RESTful API Platform', desc: 'Full CRUD API with JWT auth, rate limiting, and Swagger documentation.' },
      { name: 'Real-time Chat Server', desc: 'WebSocket-powered chat with rooms, typing indicators, and message history.' },
      { name: 'E-Commerce Backend', desc: 'Complete backend with product management, orders, payments, and admin panel.' },
    ],
    careers: ['Node.js Developer', 'Backend Developer', 'API Developer', 'Full Stack Developer', 'DevOps Engineer'],
    whoShouldJoin: [
      'JavaScript developers ready to move to backend',
      'Frontend developers expanding to full-stack',
      'Developers building APIs and microservices',
      'Engineers preparing for backend developer roles',
    ],
    faqs: [
      { q: 'Do I need JavaScript knowledge before this course?', a: 'Yes. Solid JavaScript fundamentals (ES6+) are required. We recommend completing our Frontend course first.' },
      { q: 'Is Express.js covered in depth?', a: 'Yes. Express.js is the primary framework used throughout the course including middleware, routing, and error handling.' },
      { q: 'Will I learn both SQL and NoSQL databases?', a: 'Yes. Both MongoDB (NoSQL) and PostgreSQL (SQL) are covered with practical projects.' },
      { q: 'Is real-time development covered?', a: 'Yes. Socket.io for real-time communication is included in the curriculum.' },
      { q: 'What certificate will I receive?', a: 'A Taruna Technology Node.js Development Certificate recognized by our hiring partners.' },
    ],
  },
  'web-design': {
    title: 'Web Designing',
    tagline: 'Design beautiful, responsive websites with UI/UX principles.',
    badge: '',
    duration: '3 Months',
    level: 'Beginner Friendly',
    color: 'pink',
    overview: 'Learn professional web design from scratch using industry-standard tools like Figma and Adobe XD. This program covers UI/UX principles, responsive design, CSS frameworks, and prototyping. You will graduate with a strong portfolio of real-world design projects.',
    technologies: ['Figma', 'Adobe XD', 'HTML5', 'CSS3', 'Bootstrap', 'Tailwind CSS', 'Adobe Photoshop', 'Canva'],
    whatYouLearn: [
      'UI/UX design principles and design thinking',
      'Wireframing and prototyping with Figma',
      'Responsive web design and mobile-first approach',
      'CSS3 animations, transitions, and effects',
      'Bootstrap and Tailwind CSS frameworks',
      'Typography, color theory, and visual hierarchy',
      'User research and usability testing basics',
      'Portfolio building and client presentation skills',
    ],
    tools: ['Figma', 'Adobe XD', 'Adobe Photoshop', 'VS Code', 'Chrome DevTools', 'Canva'],
    projects: [
      { name: 'SaaS Landing Page', desc: 'Modern product landing page with animations, pricing, and responsive layout.' },
      { name: 'Mobile App UI Kit', desc: 'Complete UI kit for a mobile app with components, icons, and design system.' },
      { name: 'E-Commerce Website Design', desc: 'Full e-commerce website design from wireframe to high-fidelity prototype.' },
    ],
    careers: ['Web Designer', 'UI Designer', 'UX Designer', 'Frontend Developer', 'Visual Designer', 'Product Designer'],
    whoShouldJoin: [
      'Beginners with no prior design experience',
      'Developers wanting to improve their design skills',
      'Marketers building their own web presence',
      'Entrepreneurs designing their own products',
    ],
    faqs: [
      { q: 'Do I need any design experience?', a: 'No. This course starts from absolute basics and takes you to professional-level design.' },
      { q: 'Which tools will I learn?', a: 'Figma, Adobe XD, Photoshop, and CSS frameworks including Bootstrap and Tailwind.' },
      { q: 'Will I learn coding in this course?', a: 'Yes. HTML5 and CSS3 are covered so you can implement your designs in the browser.' },
      { q: 'Is Figma accessible to students?', a: 'Yes. Figma has a tier that is accessible for all course projects.' },
      { q: 'Will I get a certificate?', a: 'Yes. A Taruna Technology Web Designing Certificate upon successful completion.' },
    ],
  },
  'data-analysis': {
    title: 'Data Analysis',
    tagline: 'Analyze data and visualize insights with Python, SQL & Power BI.',
    badge: '',
    duration: '3 Months',
    level: 'Beginner to Intermediate',
    color: 'orange',
    overview: 'Learn to collect, clean, analyze, and visualize data using Python, SQL, Excel, and Power BI. This program equips you with the skills to extract meaningful business insights from raw data and present them through compelling dashboards and reports.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQL', 'Power BI', 'Excel'],
    whatYouLearn: [
      'Python programming for data manipulation with Pandas and NumPy',
      'Data cleaning, preprocessing, and feature engineering',
      'Exploratory data analysis (EDA) techniques',
      'Data visualization with Matplotlib, Seaborn, and Plotly',
      'SQL for querying and managing relational databases',
      'Power BI dashboard creation and report building',
      'Statistical analysis and hypothesis testing fundamentals',
      'Real-world data projects with business datasets',
    ],
    tools: ['Jupyter Notebook', 'VS Code', 'Power BI Desktop', 'MySQL', 'Excel', 'Google Colab'],
    projects: [
      { name: 'Sales Performance Dashboard', desc: 'Interactive Power BI dashboard analyzing sales trends, KPIs, and regional performance.' },
      { name: 'Customer Churn Analysis', desc: 'Python-based analysis identifying churn patterns with predictive insights.' },
      { name: 'E-Commerce Data Report', desc: 'End-to-end data pipeline from raw CSV to executive-ready business report.' },
    ],
    careers: ['Data Analyst', 'Business Analyst', 'BI Developer', 'Reporting Analyst', 'Data Scientist', 'Operations Analyst'],
    whoShouldJoin: [
      'Beginners interested in data and analytics careers',
      'Business professionals wanting data-driven decision skills',
      'Developers transitioning into data roles',
      'Students preparing for data analyst interviews',
    ],
    faqs: [
      { q: 'Do I need programming experience?', a: 'No. We start Python from scratch. Basic computer skills are sufficient.' },
      { q: 'Is SQL covered in this course?', a: 'Yes. SQL fundamentals including joins, aggregations, and subqueries are covered.' },
      { q: 'Will I learn Power BI?', a: 'Yes. Power BI is a core part of the curriculum including DAX formulas and dashboard design.' },
      { q: 'What datasets will I work with?', a: 'Real-world datasets from e-commerce, finance, healthcare, and marketing domains.' },
      { q: 'Will I get a certificate?', a: 'Yes. A Taruna Technology Data Analysis Certificate upon successful completion.' },
    ],
  },
  'graphic-design-course': {
    title: 'Graphic Design',
    tagline: 'Master Photoshop, Illustrator, and visual storytelling.',
    badge: '',
    duration: '3 Months',
    level: 'Beginner',
    color: 'red',
    overview: 'Learn professional graphic design using industry-standard Adobe tools. This program covers photo editing, vector illustration, brand identity design, typography, and digital content creation. You will build a strong portfolio ready for freelance or agency work.',
    technologies: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Canva', 'Figma', 'Adobe Premiere Pro'],
    whatYouLearn: [
      'Adobe Photoshop for photo editing, retouching, and compositing',
      'Adobe Illustrator for vector graphics and logo design',
      'Brand identity design including logos, colors, and typography',
      'Print design for brochures, posters, and business cards',
      'Digital design for social media, banners, and ads',
      'Typography principles and font pairing techniques',
      'Color theory and visual hierarchy',
      'Portfolio development and client presentation',
    ],
    tools: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'Canva', 'Figma', 'Adobe Color'],
    projects: [
      { name: 'Brand Identity Package', desc: 'Complete brand identity including logo, color palette, typography, and brand guidelines.' },
      { name: 'Social Media Campaign', desc: 'Full social media design kit with posts, stories, banners, and ad creatives.' },
      { name: 'Product Packaging Design', desc: 'Professional product packaging design from concept to print-ready artwork.' },
    ],
    careers: ['Graphic Designer', 'Visual Designer', 'Brand Designer', 'Creative Designer', 'Digital Artist', 'UI Designer'],
    whoShouldJoin: [
      'Complete beginners with no design background',
      'Marketers wanting to create their own visuals',
      'Entrepreneurs building their brand identity',
      'Photographers wanting to enhance their editing skills',
    ],
    faqs: [
      { q: 'Do I need any prior design experience?', a: 'No. This course is designed for absolute beginners and covers everything from scratch.' },
      { q: 'Which Adobe tools will I learn?', a: 'Photoshop, Illustrator, and InDesign are the primary tools covered in this course.' },
      { q: 'Is Canva covered?', a: 'Yes. Canva is covered for quick digital design and social media content creation.' },
      { q: 'Can I start freelancing after this course?', a: 'Yes. The course includes portfolio development and client communication skills for freelancing.' },
      { q: 'Will I get a certificate?', a: 'Yes. A Taruna Technology Graphic Design Certificate upon successful completion.' },
    ],
  },
  'hr-business-development': {
    title: 'HR & Business Dev',
    tagline: 'Develop leadership, recruitment, and business strategy skills.',
    badge: '',
    duration: '3 Months',
    level: 'Beginner Friendly',
    color: 'teal',
    overview: 'Gain practical skills in human resource management and business development. This industry-focused program covers talent acquisition, employee management, sales strategy, client relationship building, and CRM tools. Graduate ready for HR executive or business development roles.',
    technologies: ['CRM Software', 'LinkedIn Recruiter', 'MS Excel', 'Google Workspace', 'Zoho CRM', 'HubSpot'],
    whatYouLearn: [
      'End-to-end recruitment process: sourcing, screening, and onboarding',
      'Employee engagement, retention strategies, and HR policies',
      'Performance management and appraisal systems',
      'Creating compelling sales pitches, proposals, and presentations',
      'Client acquisition, relationship building, and account management',
      'Market research, lead generation, and competitor analysis',
      'Negotiation techniques and deal-closing strategies',
      'CRM tools for sales pipeline and client management',
    ],
    tools: ['HubSpot CRM', 'Zoho CRM', 'LinkedIn Recruiter', 'MS Excel', 'Google Workspace', 'Canva'],
    projects: [
      { name: 'Recruitment Campaign', desc: 'End-to-end hiring campaign from job posting to offer letter.' },
      { name: 'Business Development Plan', desc: 'Complete BD strategy with market research, leads, and pitch deck.' },
      { name: 'HR Policy Manual', desc: 'Comprehensive HR policy document for a mid-size organization.' },
    ],
    careers: ['HR Executive', 'Business Development Executive', 'Sales Executive', 'Recruiter', 'Client Relationship Manager', 'HR & BD Consultant'],
    whoShouldJoin: [
      'Freshers looking to enter HR or sales roles',
      'Professionals wanting to switch to business development',
      'Entrepreneurs building their team and client base',
      'MBA students seeking practical HR/BD skills',
    ],
    faqs: [
      { q: 'Do I need prior HR or sales experience?', a: 'No. This course is designed for beginners and covers all fundamentals from scratch.' },
      { q: 'Which CRM tools will I learn?', a: 'HubSpot and Zoho CRM are the primary tools covered, along with LinkedIn Recruiter.' },
      { q: 'Is this course suitable for MBA students?', a: 'Yes. This course complements MBA programs with practical, hands-on industry skills.' },
      { q: 'Will I get placement assistance?', a: 'Yes. Resume building, mock interviews, and referrals to our hiring partners are included.' },
      { q: 'Will I get a certificate?', a: 'Yes. A Taruna Technology HR & Business Development Certificate upon completion.' },
    ],
  },
  'digital-marketing-course': {
    title: 'Digital Marketing',
    tagline: 'Master SEO, ads, social media, and analytics for online growth.',
    badge: '',
    duration: '3 Months',
    level: 'Beginner to Intermediate',
    color: 'yellow',
    overview: 'Master digital marketing strategies including SEO, social media, PPC, email marketing, and content marketing. Learn to build and execute effective digital campaigns that drive real business results. Graduate with hands-on experience running live campaigns.',
    technologies: ['Google Ads', 'Meta Ads', 'Google Analytics', 'SEMrush', 'Mailchimp', 'Canva', 'WordPress', 'HubSpot'],
    whatYouLearn: [
      'Search Engine Optimization (SEO) — on-page and off-page',
      'Google Ads: Search, Display, Shopping, and YouTube campaigns',
      'Meta Ads: Facebook and Instagram advertising',
      'Social media marketing strategy and content planning',
      'Email marketing campaigns with Mailchimp',
      'Content marketing and copywriting for conversions',
      'Google Analytics 4 and campaign performance tracking',
      'ROI measurement, A/B testing, and campaign optimization',
    ],
    tools: ['Google Ads', 'Meta Business Suite', 'Google Analytics 4', 'SEMrush', 'Mailchimp', 'Canva'],
    projects: [
      { name: 'SEO Audit & Strategy', desc: 'Complete SEO audit and 90-day optimization plan for a real website.' },
      { name: 'Google Ads Campaign', desc: 'Live Google Search campaign with keyword research, ad copy, and optimization.' },
      { name: 'Social Media Campaign', desc: 'Full social media strategy with content calendar, creatives, and analytics report.' },
    ],
    careers: ['Digital Marketing Executive', 'SEO Specialist', 'Social Media Manager', 'PPC Specialist', 'Content Marketer', 'Marketing Analyst'],
    whoShouldJoin: [
      'Beginners wanting to enter digital marketing',
      'Business owners wanting to market their own brand',
      'Content creators wanting to monetize their skills',
      'Marketing professionals upskilling to digital',
    ],
    faqs: [
      { q: 'Do I need any prior marketing experience?', a: 'No. This course starts from the basics and covers all digital marketing channels comprehensively.' },
      { q: 'Will I run live campaigns?', a: 'Yes. You will run live Google Ads and Meta Ads campaigns as part of the curriculum.' },
      { q: 'Is SEO covered in depth?', a: 'Yes. Both on-page and off-page SEO including technical SEO are covered.' },
      { q: 'Will I learn Google Analytics?', a: 'Yes. Google Analytics 4 is covered including custom reports and conversion tracking.' },
      { q: 'Will I get a certificate?', a: 'Yes. A Taruna Technology Digital Marketing Certificate upon successful completion.' },
    ],
  },
};

// ── Color theme map ──────────────────────────────────────
const colorMap = {
  purple: { border: 'border-purple-500/30', text: 'text-purple-400', bg: 'bg-purple-500/10', glow: 'shadow-purple-500/20', badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30', tag: 'bg-purple-500/10 text-purple-300 border-purple-500/20', btn: 'from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-purple-900/40' },
  violet: { border: 'border-violet-500/30', text: 'text-violet-400', bg: 'bg-violet-500/10', glow: 'shadow-violet-500/20', badge: 'bg-violet-500/20 text-violet-300 border-violet-500/30', tag: 'bg-violet-500/10 text-violet-300 border-violet-500/20', btn: 'from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 shadow-violet-900/40' },
  blue:   { border: 'border-blue-500/30',   text: 'text-blue-400',   bg: 'bg-blue-500/10',   glow: 'shadow-blue-500/20',   badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',   tag: 'bg-blue-500/10 text-blue-300 border-blue-500/20',   btn: 'from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-blue-900/40' },
  cyan:   { border: 'border-cyan-500/30',   text: 'text-cyan-400',   bg: 'bg-cyan-500/10',   glow: 'shadow-cyan-500/20',   badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',   tag: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',   btn: 'from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 shadow-cyan-900/40' },
  green:  { border: 'border-green-500/30',  text: 'text-green-400',  bg: 'bg-green-500/10',  glow: 'shadow-green-500/20',  badge: 'bg-green-500/20 text-green-300 border-green-500/30',  tag: 'bg-green-500/10 text-green-300 border-green-500/20',  btn: 'from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 shadow-green-900/40' },
  sky:    { border: 'border-sky-500/30',    text: 'text-sky-400',    bg: 'bg-sky-500/10',    glow: 'shadow-sky-500/20',    badge: 'bg-sky-500/20 text-sky-300 border-sky-500/30',    tag: 'bg-sky-500/10 text-sky-300 border-sky-500/20',    btn: 'from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 shadow-sky-900/40' },
  lime:   { border: 'border-lime-500/30',   text: 'text-lime-400',   bg: 'bg-lime-500/10',   glow: 'shadow-lime-500/20',   badge: 'bg-lime-500/20 text-lime-300 border-lime-500/30',   tag: 'bg-lime-500/10 text-lime-300 border-lime-500/20',   btn: 'from-lime-600 to-green-600 hover:from-lime-500 hover:to-green-500 shadow-lime-900/40' },
  pink:   { border: 'border-pink-500/30',   text: 'text-pink-400',   bg: 'bg-pink-500/10',   glow: 'shadow-pink-500/20',   badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',   tag: 'bg-pink-500/10 text-pink-300 border-pink-500/20',   btn: 'from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-pink-900/40' },
  orange: { border: 'border-orange-500/30', text: 'text-orange-400', bg: 'bg-orange-500/10', glow: 'shadow-orange-500/20', badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30', tag: 'bg-orange-500/10 text-orange-300 border-orange-500/20', btn: 'from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 shadow-orange-900/40' },
  red:    { border: 'border-red-500/30',    text: 'text-red-400',    bg: 'bg-red-500/10',    glow: 'shadow-red-500/20',    badge: 'bg-red-500/20 text-red-300 border-red-500/30',    tag: 'bg-red-500/10 text-red-300 border-red-500/20',    btn: 'from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 shadow-red-900/40' },
  teal:   { border: 'border-teal-500/30',   text: 'text-teal-400',   bg: 'bg-teal-500/10',   glow: 'shadow-teal-500/20',   badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',   tag: 'bg-teal-500/10 text-teal-300 border-teal-500/20',   btn: 'from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 shadow-teal-900/40' },
  yellow: { border: 'border-yellow-500/30', text: 'text-yellow-400', bg: 'bg-yellow-500/10', glow: 'shadow-yellow-500/20', badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30', tag: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20', btn: 'from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 shadow-yellow-900/40' },
};



// ── Right-side illustration panel ───────────────────────
function CourseIllustration({ slug, accent }) {
  const config = courseIllustrations[slug] || courseIllustrations.fullstack;
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (config.type !== 'code') return;
    setVisibleLines(0);
    const interval = setInterval(() => {
      setVisibleLines(v => {
        if (v >= config.lines.length) { clearInterval(interval); return v; }
        return v + 1;
      });
    }, 180);
    return () => clearInterval(interval);
  }, [slug, config]);

  if (config.type === 'code') {
    return (
      <div className="glass rounded-2xl border overflow-hidden backdrop-blur-xl shadow-2xl" style={{ borderColor: `rgba(${accent.primary},0.25)` }}>
        {/* Window chrome */}
        <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/[0.06]">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-xs text-gray-500 font-mono">{config.title.toLowerCase().replace(/ /g, '-')}.js</span>
          <div className="ml-auto flex gap-1.5">
            {config.badges.map(b => (
              <span key={b} className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: `rgba(${accent.primary},0.15)`, color: `rgba(${accent.secondary},1)` }}>{b}</span>
            ))}
          </div>
        </div>
        {/* Code body */}
        <div className="p-5 font-mono text-xs space-y-1 min-h-[260px] overflow-hidden">
          {config.lines.slice(0, visibleLines).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className={`${line.color || 'text-transparent'} leading-relaxed`}
            >
              {line.text || '\u00A0'}
            </motion.div>
          ))}
          {visibleLines < config.lines.length && (
            <span className="inline-block w-2 h-4 animate-pulse" style={{ background: `rgba(${accent.primary},0.8)` }} />
          )}
        </div>
      </div>
    );
  }

  // Dashboard type
  return (
    <div className="glass rounded-2xl border overflow-hidden backdrop-blur-xl shadow-2xl" style={{ borderColor: `rgba(${accent.primary},0.25)` }}>
      <div className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border-b border-white/[0.06]">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-3 text-xs text-gray-500 font-mono">{config.title}</span>
      </div>
      <div className="p-5 space-y-4 min-h-[260px]">
        <div className="grid grid-cols-2 gap-3">
          {config.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="glass rounded-xl p-3 border border-white/[0.07] space-y-1"
            >
              <p className={`text-xl font-black ${m.color}`}>{m.value}</p>
              <p className="text-gray-400 text-xs">{m.label}</p>
              <p className="text-gray-600 text-[10px]">{m.trend}</p>
            </motion.div>
          ))}
        </div>
        {/* Mini bar chart */}
        <div className="space-y-2 pt-2">
          <p className="text-gray-600 text-[10px] font-mono">// performance metrics</p>
          {[85, 72, 91, 68].map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-16 text-[10px] text-gray-600 font-mono">metric_{i + 1}</div>
              <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${v}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ background: `rgba(${accent.primary},0.7)` }}
                />
              </div>
              <span className="text-[10px] text-gray-600 font-mono w-8">{v}%</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {config.badges.map(b => (
            <span key={b} className="px-2 py-0.5 rounded-full text-[10px] font-medium border" style={{ background: `rgba(${accent.primary},0.12)`, color: `rgba(${accent.secondary},1)`, borderColor: `rgba(${accent.primary},0.25)` }}>{b}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main page component ──────────────────────────────────
export default function CourseDetailClient({ slug }) {
  const course = courseData[slug];
  const accent = courseAccents[slug] || courseAccents.fullstack;
  const theme = colorMap[course?.color] || colorMap.purple;
  const videoSrc = courseVideos[slug] || courseVideos.fullstack;

  const [openFaq, setOpenFaq] = useState(null);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#080818] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-black text-white mb-4">Course Not Found</h1>
          <Link href="/education" className="text-purple-400 hover:text-purple-300">← Back to Education</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080818]">

      {/* ══════════════════════════════════════════════════
          HERO — unique video + rich right panel
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#080818]">

        {/* Course-specific video */}
        <video
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-[0.25] pointer-events-none"
          aria-hidden="true"
          key={videoSrc}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080818]/95 via-[#080818]/65 to-[#080818]/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080818]/55 via-transparent to-[#080818]/95 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 60% at 20% 50%, rgba(${accent.primary},0.12) 0%, transparent 60%)` }} />

        {/* Ambient glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[500px] rounded-full blur-[140px] pointer-events-none" style={{ background: `rgba(${accent.primary},0.10)` }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[400px] rounded-full blur-[120px] pointer-events-none" style={{ background: `rgba(${accent.secondary},0.07)` }} />

        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-[20%] right-[10%] w-56 h-56 rounded-full blur-[70px] animate-float" style={{ background: `rgba(${accent.primary},0.18)` }} />
          <div className="absolute bottom-[25%] left-[8%] w-48 h-48 rounded-full blur-[60px] animate-float-delayed" style={{ background: `rgba(${accent.secondary},0.12)` }} />
          <div className="absolute top-[22%] left-0 right-0 h-px animate-pulse" style={{ background: `linear-gradient(to right, transparent, rgba(${accent.primary},0.22), transparent)` }} />
          <div className="absolute top-[70%] left-0 right-0 h-px animate-pulse" style={{ background: `linear-gradient(to right, transparent, rgba(${accent.secondary},0.15), transparent)`, animationDelay: '1.2s' }} />
        </div>

        {/* Grid */}
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

        <div className="relative site-container py-20 lg:py-28 w-full">
          <div className="grid lg:grid-cols-5 gap-12 items-center">

            {/* LEFT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-5">
                <Link href="/education" className="hover:text-gray-300 transition-colors">Education</Link>
                <span>/</span>
                <span className={theme.text}>{course.title}</span>
              </div>

              {/* Eyebrow */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs tracking-widest uppercase backdrop-blur-sm mb-6"
                style={{ borderColor: `rgba(${accent.primary},0.35)`, background: `rgba(${accent.primary},0.10)`, color: `rgba(${accent.secondary},1)` }}
              >
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: `rgba(${accent.primary},1)`, boxShadow: `0 0 8px rgba(${accent.primary},0.8)` }} />
                TarunaTech Education
                {course.badge && <span className="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold" style={{ background: `rgba(${accent.primary},0.25)` }}>{course.badge}</span>}
              </motion.div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-black text-white mb-4 leading-[1.06]">
                {course.title}
              </h1>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed max-w-xl">{course.tagline}</p>

              {/* Meta pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-white/10 text-xs text-gray-300">
                  <Clock size={12} className={theme.text} />
                  {course.duration}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-white/10 text-xs text-gray-300">
                  <BookOpen size={12} className={theme.text} />
                  {course.level}
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-white/10 text-xs text-gray-300">
                  <Award size={12} className={theme.text} />
                  Certificate Included
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 glass rounded-full border border-white/10 text-xs text-gray-300">
                  <Users size={12} className={theme.text} />
                  Placement Support
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/apply-now"
                  className={`group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r ${theme.btn} text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:-translate-y-0.5`}
                >
                  Enroll Now
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="#curriculum"
                  className="inline-flex items-center gap-2 px-7 py-3.5 glass border border-white/10 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-200"
                >
                  View Curriculum
                </a>
              </div>
            </motion.div>

            {/* RIGHT — illustration */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="lg:col-span-2 hidden lg:block"
            >
              <CourseIllustration slug={slug} accent={accent} />
            </motion.div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080818] to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════════════
          OVERVIEW
      ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0b0b1f]">
        <div className="site-container">
          <div className="grid lg:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.border} ${theme.bg} text-xs ${theme.text} mb-5 tracking-widest uppercase`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse`} style={{ background: `rgba(${accent.primary},1)` }} />
                Course Overview
              </div>
              <h2 className="text-3xl font-black text-white mb-5">About This Course</h2>
              <p className="text-gray-300 leading-relaxed text-base mb-8">{course.overview}</p>

              {/* Technologies */}
              <h3 className="text-white font-bold text-lg mb-4">Technologies You&apos;ll Master</h3>
              <div className="flex flex-wrap gap-2">
                {course.technologies.map((tech) => (
                  <span key={tech} className={`px-3 py-1.5 rounded-full text-xs font-medium border ${theme.tag}`}>{tech}</span>
                ))}
              </div>
            </motion.div>

            {/* Quick info card */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card rounded-2xl p-6 border self-start" style={{ borderColor: `rgba(${accent.primary},0.2)` }}
            >
              <h3 className="text-white font-bold text-lg mb-5">Course Details</h3>
              {[
                { icon: Clock, label: 'Duration', value: course.duration },
                { icon: BookOpen, label: 'Level', value: course.level },
                { icon: Award, label: 'Certificate', value: 'Globally Recognized' },
                { icon: Users, label: 'Mode', value: 'Online & Offline' },
                { icon: Code2, label: 'Projects', value: `${course.projects.length} Real-World Projects` },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3 py-3 border-b border-white/[0.06] last:border-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${theme.bg}`}>
                    <Icon size={14} className={theme.text} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">{label}</p>
                    <p className="text-white text-sm font-medium">{value}</p>
                  </div>
                </div>
              ))}
              <Link
                href="/apply-now"
                className={`mt-5 w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r ${theme.btn} text-white font-semibold rounded-xl transition-all duration-200 shadow-lg text-sm`}
              >
                Apply Now
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHAT YOU'LL LEARN — cursor particle effect
      ══════════════════════════════════════════════════ */}
      <section id="curriculum" className="relative py-20 bg-[#080818] overflow-hidden">
        <SectionParticles />
        <div className="relative site-container" style={{ zIndex: 2 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
            style={{ position: 'relative', zIndex: 2 }}
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.border} ${theme.bg} text-xs ${theme.text} mb-4 tracking-widest uppercase`}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `rgba(${accent.primary},1)` }} />
              Curriculum
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              What You&apos;ll <span className="text-gradient">Learn</span>
            </h2>
            <p className="text-gray-500 text-sm">Move your cursor over the section — particles react to you ✨</p>
          </motion.div>

          {/* Learn grid — sits above canvas */}
          <div
            className="relative grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl p-1"
            style={{ zIndex: 2 }}
          >
            {course.whatYouLearn.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 glass-card rounded-xl p-4 border border-white/[0.07] hover:border-opacity-50 transition-all duration-300 group"
                style={{ '--hover-border': `rgba(${accent.primary},0.4)` }}
              >
                <div className="mt-0.5 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `rgba(${accent.primary},0.15)` }}>
                  <CheckCircle2 size={14} style={{ color: `rgba(${accent.primary},1)` }} />
                </div>
                <p className="text-gray-300 text-sm leading-relaxed group-hover:text-white transition-colors">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROJECTS
      ══════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-[#0b0b1f] overflow-hidden">
        <div className="relative site-container" style={{ zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.border} ${theme.bg} text-xs ${theme.text} mb-4 tracking-widest uppercase`}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `rgba(${accent.primary},1)` }} />
              Hands-On Projects
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Real-World <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-lg mx-auto">Build production-grade projects you can add directly to your portfolio.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {course.projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.52, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="glass-card rounded-2xl p-6 border border-white/[0.08] hover:border-opacity-50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, rgba(${accent.primary},0.4), transparent)` }} />
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4" style={{ background: `rgba(${accent.primary},0.15)` }}>
                  <span className="text-lg font-black" style={{ color: `rgba(${accent.primary},1)` }}>0{i + 1}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-gradient transition-all">{project.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{project.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TOOLS + CAREERS
      ══════════════════════════════════════════════════ */}
      <section className="relative py-20 bg-[#080818] overflow-hidden">
        <div className="relative site-container" style={{ zIndex: 1 }}>
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Tools */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.border} ${theme.bg} text-xs ${theme.text} mb-5 tracking-widest uppercase`}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `rgba(${accent.primary},1)` }} />
                Tools & Software
              </div>
              <h2 className="text-2xl font-black text-white mb-6">Industry Tools You&apos;ll Use</h2>
              <div className="flex flex-wrap gap-3">
                {course.tools.map((tool) => (
                  <div key={tool} className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-white/[0.08] text-sm text-gray-300 hover:border-opacity-50 transition-all">
                    <Terminal size={13} className={theme.text} />
                    {tool}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Careers */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.border} ${theme.bg} text-xs ${theme.text} mb-5 tracking-widest uppercase`}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `rgba(${accent.primary},1)` }} />
                Career Paths
              </div>
              <h2 className="text-2xl font-black text-white mb-6">Roles You Can Land</h2>
              <div className="grid grid-cols-2 gap-3">
                {course.careers.map((career, i) => (
                  <motion.div
                    key={career}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    className="flex items-center gap-2 px-3 py-2.5 glass rounded-xl border border-white/[0.07] text-sm text-gray-300"
                  >
                    <ArrowRight size={12} className={theme.text} />
                    {career}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHO SHOULD JOIN
      ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#0b0b1f]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.border} ${theme.bg} text-xs ${theme.text} mb-4 tracking-widest uppercase`}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `rgba(${accent.primary},1)` }} />
              Eligibility
            </div>
            <h2 className="text-3xl font-black text-white">Who Should Join?</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {course.whoShouldJoin.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 glass-card rounded-xl p-4 border border-white/[0.07]"
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `rgba(${accent.primary},0.15)` }}>
                  <CheckCircle2 size={13} style={{ color: `rgba(${accent.primary},1)` }} />
                </div>
                <p className="text-gray-300 text-sm">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#080818]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.border} ${theme.bg} text-xs ${theme.text} mb-4 tracking-widest uppercase`}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `rgba(${accent.primary},1)` }} />
              FAQ
            </div>
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
          </motion.div>

          <div className="space-y-3">
            {course.faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="glass-card rounded-xl border border-white/[0.08] overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                  {openFaq === i
                    ? <ChevronUp size={16} className={theme.text} />
                    : <ChevronDown size={16} className="text-gray-500" />
                  }
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-4 text-gray-400 text-sm leading-relaxed border-t border-white/[0.05] pt-3">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BOTTOM CTA
      ══════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#0b0b1f]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 border relative overflow-hidden"
            style={{ borderColor: `rgba(${accent.primary},0.2)` }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, rgba(${accent.primary},0.08) 0%, transparent 60%)` }} />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] rounded-full blur-[80px] pointer-events-none" style={{ background: `rgba(${accent.primary},0.08)` }} />
            <div className="relative">
              <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${theme.border} ${theme.bg} text-xs ${theme.text} mb-5 tracking-widest uppercase`}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: `rgba(${accent.primary},1)` }} />
                Enroll Today
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Ready to Master <span className="text-gradient">{course.title}?</span>
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
                Join hundreds of students who have transformed their careers. Real skills, real projects, real results.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/apply-now"
                  className={`group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r ${theme.btn} text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:-translate-y-0.5`}
                >
                  Apply Now
                  <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/education"
                  className="inline-flex items-center gap-2 px-7 py-3.5 glass border border-white/10 text-white font-semibold rounded-xl hover:bg-white/5 transition-all duration-200"
                >
                  View All Courses
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
