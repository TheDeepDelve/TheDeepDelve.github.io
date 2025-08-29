import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// --- SVG Icons ---
// Using inline SVGs to keep everything in one file and for easy styling.

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-github"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.54 2.73c0 5.46 3.3 6.65 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);

const LinkedinIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-linkedin"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-mail"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const ExternalLinkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
);

const PaperclipIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-paperclip"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
);


const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-sparkles"><path d="M12 3L9.27 9.27L3 12l6.27 2.73L12 21l2.73-6.27L21 12l-6.27-2.73z"/></svg>
);


// --- Data from your Resume ---
const portfolioData = {
    name: "Harsh Deep",
    title: "Software Developer",
    email: "harshdeep7199@gmail.com",
    linkedin: "https://www.linkedin.com/in/harshdeep7199",
    github: "https://github.com/TheDeepDelve",
    resumeUrl: "/Harsh Deep_Resume.pdf",
    profile: "Computer Science Student with a proven ability to design, develop and deploy software solutions. Skilled in Software Development cycle, testing and DevOps, with expertise in Java, Python and Web Technologies.",
    skills: [
        { name: 'C++', icon: '/icons/cpp.png' },
        { name: 'Java', icon: '/icons/java.png' },
        { name: 'Python', icon: '/icons/python.png' },
        { name: 'JavaScript', icon: '/icons/javascript.png' },
        { name: 'React.js', icon: '/icons/react.png' },
        { name: 'Tailwind CSS', icon: '/icons/tailwind.png' },
        { name: 'MySQL', icon: '/icons/mysql.png' },
        { name: 'MongoDB', icon: '/icons/mongodb.png' },
        { name: 'PostgreSQL', icon: '/icons/psql.png' },
        { name: 'Node.js', icon: '/icons/node.png' },
        { name: 'Firebase', icon: '/icons/firebase.png' },
        { name: 'Google Cloud', icon: '/icons/gcp.jpg' },
        { name: 'AWS', icon: '/icons/aws.png' },
        { name: 'TensorFlow', icon: '/icons/tf.png' },
        { name: 'OpenCV', icon: '/icons/opencv.png' },
        { name: 'MediaPipe', icon: '/icons/mediapipe.png' },
        { name: 'Scikit-Learn', icon: '/icons/sklearn.png' },
        { name: 'Seaborn', icon: '/icons/seaborn.png' },
        { name: 'Git', icon: '/icons/git.png' },
        { name: 'Prometheus', icon: '/icons/prometheus.png' },
        { name: 'Grafana', icon: '/icons/grafana.png' },
    ],
    experience: [
        {
            role: "Project Intern",
            company: "Samsung R&D Institute",
            date: "Mar 2025 - Present",
            description: "Collaborating with senior engineers to design, develop, and test an on-device agent using Vision Language Models (VLMs) to extract and interpret TV screen content. Applied Salesforce BLIP model for facial recognition, achieving 90% accuracy."
        },
        {
            role: "Event Coordinator",
            company: "Phase Shift Technical Fest",
            date: "Nov 2024 - Dec 2024",
            description: "Directed and coordinated a coding and data science event, mentoring 5 volunteers in event operations, resulting in a 95% positive feedback rating from participants."
        }
    ],
    projects: [
        {
            title: "API Server with Observability",
            description: "Engineered a Node.js API server with a full observability stack. Improved system stability visibility by over 50% and reduced issue identification time by 20% using Prometheus, Grafana, and Alertmanager.",
            tags: ["Node.js", "Prometheus", "Grafana", "Postman"],
            github: "https://github.com/TheDeepDelve/API-Server",
            image: "/projects/api-server.png" 
        },
        {
            title: "Explore Bharat",
            description: "Created an end-to-end full-stack travel platform with a responsive UI and a scalable Express.js backend. Optimized server-side logic, reducing average page load time by 20%.",
            tags: ["Express.js", "REST APIs", "MySQL", "React"],
            github: "https://github.com/TheDeepDelve/ExploreBharat", 
            live: "https://explorebharat.vercel.app",
            image: "/projects/explore-bharat.png"
        },
        {
            title: "Fi Compass",
            description: "Architected a proof-of-concept AI financial partner using Gemini for proactive financial planning. Integrated a mock data server, React frontend, and Firebase NoSQL database.",
            tags: ["Python", "Firebase", "GCP", "Gemini", "React"],
            github: "https://github.com/TheDeepDelve/fi-compass",
            image: "/projects/fi-compass.jpg",
            live: "https://fi-compass-3b008.web.app/"
        },
        {
            title: "IntelliMotion",
            description: "An OpenCV and MediaPipe-based real-time computer vision system for hand gesture recognition and pose tracking. Enabled volume control and workout tracking with a response time of under 100ms.This work was published as a research paper.",
            tags: ["OpenCV", "MediaPipe", "Python"],
            github: "https://github.com/TheDeepDelve/IntelliMotion",
            research: "https://ieeexplore.ieee.org/document/11108613",
            image: "/projects/intellimotion.png"
        },
        {
            title: "Bill Buddy",
            description: "Android application designed to simplify expense tracking, group bill splitting, and financial discussions. Built with Kotlin and Firebase for a modern, intuitive interface.",
            tags: ["Kotlin", "Firebase", "XML"],
            github: "https://github.com/TheDeepDelve/BillBuddy",
            image: "/projects/bill-buddy.png"
        },
        {
            title: "Multi Agent Tales",
            description: "An advanced AI storytelling platform where multiple specialized agents collaborate to generate dynamic, multi-perspective narratives. Features include Google Gemini integration, intelligent rate limiting, configurable genres, and orchestrated story progression for professional-grade story generation.",
            tags: ["Python", "NLP", "Gemini", "Flask"],
            github: "https://github.com/TheDeepDelve/Multi-Agent-Tales",
            image: "/projects/multi-agent.png"
        },
        {
            title: "2048 Game",
            description: "Java implementation of the 2048 game, featuring intuitive tile movement and merging on a 4x4 grid. Built with Java Swing and AWT to deliver a responsive, visually appealing UI. Leveraging custom painting and the Java Collections Framework, this project enhances game performance with improved rendering speed and input response time.",
            tags: ["Java", "Java Swing", "Java AWT"],
            github: "https://github.com/TheDeepDelve/2048-Game",
            image: "/projects/2048.jpg"
        },
        {
            title: "Nutri Soil",
            description: "A Machine Learning-based model that predicts optimal crops based on soil nutrient data, achieving 98% accuracy using Random Forest on a dataset of 2,200 samples. The model is deployed through a Flask-based web application, providing farmers with real-time, data-driven crop recommendations.",
            tags: ["Machine Learning", "Flask", "Scikit-Learn", "Seaborn", "Matplotlib"],
            github: "https://github.com/TheDeepDelve/NutriSoil",
            image: "/projects/nutrisoil.png"
        },
        {
            title: "Rubik's Cube",
            description: "Developed for the Collins Aerospace Hackathon - AeroHack '25 Design Challenge. An interactive 3D Rubik's Cube solver built with React and Python that explores the contrast between machine-optimal and human-style solving strategies. This full-stack application features a fluid, animated UI powered by React Three Fiber and a robust Flask backend that serves solutions from two distinct algorithms.",
            tags: ["React", "Three.js","Flask", "pycuber", "kociemba", "Tailwind CSS"],
            github: "https://github.com/TheDeepDelve/Rubiks-Cube",
            image: "/projects/rubiks-cube.png"
        }
    ],
    publications: [
        {
            title: "IntelliMotion: Real-Time Hand Gesture and Pose Tracking Using OpenCV and MediaPipe",
            journal: "Published in IEEE ETCC 2025, Bengaluru.",
            github: "https://github.com/TheDeepDelve/IntelliMotion",
            research: "https://ieeexplore.ieee.org/document/10075136" 
        }
    ],
    achievements: [
        "Finalist in Google Cloud Agentic AI Day Hackathon 2025 (Top 7% nationwide).",
        "Qualified Aptitude & Logical Reasoning Round of Hack Vega Hiring Challenge.",
        "Secured 93.7 percentile in Naukri Campus Young Turks Skills Contest."
    ]
};

// --- Reusable Animated Component ---
const AnimatedSection = ({ children, id, className }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.section
            id={id}
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.section>
    );
};


// --- Components ---

// const Navbar = () => {
//     const [scrolled, setScrolled] = useState(false);

//     const handleLinkClick = (e, targetId) => {
//         e.preventDefault();
//         const targetElement = document.getElementById(targetId);
//         if (targetElement) {
//             targetElement.scrollIntoView({ behavior: 'smooth' });
//         }
//     };

//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 20);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     return (
//         <motion.nav
//             initial={{ y: -100 }}
//             animate={{ y: 0 }}
//             transition={{ duration: 0.5, ease: "easeOut" }}
//             className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
//         >
//             <div className={`w-full px-6`}>
//                 <div className="flex justify-between items-center bg-slate-900/60 backdrop-blur-lg border border-slate-700/50 rounded-full px-6 py-3 shadow-lg">
//                     <a href="#home" onClick={(e) => handleLinkClick(e, 'home')}>
//   <img 
//     src="/Harsh Logo.png"    
//     alt="Logo"
//     className="h-10 w-10 object-contain hover:opacity-80 transition-opacity"
//   />
// </a>
//                     <div className="hidden md:flex items-center gap-x-8 text-xl font-medium text-slate-300">
//                         <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-white transition-colors">About</a>
//                         <a href="#experience" onClick={(e) => handleLinkClick(e, 'experience')} className="hover:text-white transition-colors">Experience</a>
//                         <a href="#projects" onClick={(e) => handleLinkClick(e, 'projects')} className="hover:text-white transition-colors">Projects</a>
//                         <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-white transition-colors">Contact</a>
//                     </div>
//                     <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="bg-sky-500/10 text-sky-400 px-4 py-2 rounded-full text-sm font-medium border border-sky-500/30 hover:bg-sky-500/20 transition-colors">
//                         View Resume
//                     </a>
//                 </div>
//             </div>
//         </motion.nav>
//     );
// };

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    const handleLinkClick = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-4'}`}
        >
            <div className={`mx-auto w-full max-w-4xl px-4`}>
                <div className="flex justify-between items-center bg-slate-900/60 backdrop-blur-lg border border-slate-700/50 rounded-full px-4 sm:px-6 py-3 shadow-lg">
                    <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="text-xl sm:text-2xl font-bold text-white hover:text-sky-400 transition-colors"><img 
    src="/Harsh Logo.png"    
    alt="Logo"
    className="h-10 w-10 object-contain hover:opacity-80 transition-opacity"
  /></a>
                    <div className="hidden md:flex items-center gap-x-8 text-sm font-medium text-slate-300">
                        <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-white transition-colors">About</a>
                        <a href="#experience" onClick={(e) => handleLinkClick(e, 'experience')} className="hover:text-white transition-colors">Experience</a>
                        <a href="#projects" onClick={(e) => handleLinkClick(e, 'projects')} className="hover:text-white transition-colors">Projects</a>
                        <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-white transition-colors">Contact</a>
                    </div>
                    <a href={portfolioData.resumeUrl} target="_blank" rel="noopener noreferrer" className="bg-sky-500/10 text-sky-400 px-4 py-2 rounded-full text-xs sm:text-sm font-medium border border-sky-500/30 hover:bg-sky-500/20 transition-colors">
                        View Resume
                    </a>
                </div>
            </div>
        </motion.nav>
    );
};

const Hero = () => {
    const titles = ["Software Developer", "Data Science Enthusiast", "Full-Stack Developer"];
    const [currentTitle, setCurrentTitle] = useState(titles[0]);
    
    const handleLinkClick = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTitle(prevTitle => {
                const currentIndex = titles.indexOf(prevTitle);
                const nextIndex = (currentIndex + 1) % titles.length;
                return titles[nextIndex];
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);
    
    return (
        <section id="home" className="min-h-screen flex items-center justify-center text-center relative overflow-hidden px-4">
            <div className="absolute top-0 -left-20 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/20 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
            <div className="absolute top-1/2 -right-20 w-72 h-72 sm:w-96 sm:h-96 bg-sky-600/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/4 w-72 h-72 sm:w-96 sm:h-96 bg-pink-600/20 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            
            <div className="z-10">
                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-7xl font-bold text-white"
                >
                    {portfolioData.name}
                </motion.h1>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-4 text-lg sm:text-xl md:text-2xl text-sky-400 font-medium h-8"
                >
                     <span key={currentTitle} className="animate-fade-in-out">{currentTitle}</span>
                </motion.div>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-6 max-w-2xl mx-auto text-slate-300"
                >
                    {portfolioData.profile}
                </motion.p>
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="bg-sky-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-500/20">
                        Get In Touch
                    </a>
                    <a href="#projects" onClick={(e) => handleLinkClick(e, 'projects')} className="bg-slate-700/50 border border-slate-600 text-slate-200 font-semibold px-8 py-3 rounded-full hover:bg-slate-700 hover:border-slate-500 transition-all duration-300 transform hover:scale-105">
                        View My Work
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

const About = () => (
    <AnimatedSection id="about" className="py-24">
        <h2 className="text-3xl font-bold text-center text-white mb-12">About Me</h2>
        <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div 
                className="w-66 h-66 md:w-96 md:h-96 rounded-full bg-slate-800 border-4 border-slate-700 flex-shrink-0"
                whileHover={{ scale: 1.1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 100 }}
            >
                <img 
                    src="/Harsh Profile.png" 
                    alt="Harsh Deep"
                    className="w-full h-full rounded-full object-cover"
                />
            </motion.div>
            <div className="text-slate-300 text-sm text-center md:text-left">
                <p className="mb-6">
                    I am a final year Computer Science student at B.M.S. College of Engineering with a proven track record of applying my skills to high-impact projects. My professional experience is highlighted by my current internship at Samsung R&D, and my passion for innovation has been recognized through becoming a Finalist in the Google Cloud AI Hackathon. Furthering my contributions to the tech community, I am also a published IEEE author for my research in computer vision.
                </p>
                <ul className="space-y-4">
                    <li>
                        <strong>Full-Stack Engineering:</strong> Proficient in building and scaling applications with Node.js (Express.js), Python (Flask), React, and multiple databases (MySQL, Firebase).
                    </li>
                    <li>
                        <strong>Applied AI & Machine Learning:</strong> Experience training models (Random Forest) to 98% accuracy, deploying them with Flask, and developing conversational AI with Google's Vertex AI. Currently interning at Samsung R&D, focusing on Vision Language Models.
                    </li>
                    <li>
                        <strong>Real-Time Computer Vision:</strong> Engineered and optimized a computer vision pipeline using OpenCV and MediaPipe, achieving &lt;100ms response time. This work was published in an IEEE conference.
                    </li>
                    <li>
                        <strong>DevOps & System Performance:</strong> Implemented a full observability stack (Prometheus, Grafana), improving system visibility by 50% and reducing issue identification time by 20%.
                    </li>
                    <li>
                        <strong>Proven Achiever:</strong> Recognized as a Finalist in the Google Cloud AI Hackathon (top 7% of 9,100+ applicants) and secured a 93.7 percentile in the Naukri Campus Young Turks Skills Contest.
                    </li>
                </ul>
            </div>
        </div>
    </AnimatedSection>
);

const Skills = () => (
    <AnimatedSection id="skills" className="py-24 bg-slate-900/50">
        <h2 className="text-3xl font-bold text-center text-white mb-12">My Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4">
            {portfolioData.skills.map((skill, index) => (
                <motion.div 
                    key={index}
                    className="flex items-center gap-3 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2"
                    whileHover={{ scale: 1.1, y: -3, backgroundColor: 'rgba(51, 65, 85, 0.8)' }}
                    transition={{ type: "spring", stiffness: 100, damping: 15 }}
                >
                    <img src={skill.icon} alt={skill.name} className="w-6 h-6 object-contain" />
                    <span className="text-slate-200 font-medium">{skill.name}</span>
                </motion.div>
            ))}
        </div>
    </AnimatedSection>
);

const Experience = () => (
    <AnimatedSection id="experience" className="py-24">
        <h2 className="text-3xl font-bold text-center text-white mb-16">Professional Experience</h2>
        <div className="relative max-w-2xl mx-auto before:absolute before:left-2 before:h-full before:w-0.5 before:bg-slate-700 md:before:left-1/2 md:before:transform md:before:-translate-x-1/2">
            {portfolioData.experience.map((job, index) => (
                <div key={index} className="mb-8 flex justify-between items-center w-full md:even:flex-row-reverse">
                    <div className="md:w-1/2"></div>
                    <div className="hidden md:block w-12 text-center">
                        <div className="w-4 h-4 bg-sky-500 rounded-full border-4 border-slate-900 z-10 relative"></div>
                    </div>
                    <div className="w-full md:w-1/2 md:pr-8 pl-8 md:pl-0">
                        <motion.div
                            initial={{ x: index % 2 === 0 ? 50 : -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5 }}
                            className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 relative md:text-right"
                        >
                            <div className="absolute -left-1.5 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-slate-900 md:hidden"></div>
                            <h3 className="text-xl font-bold text-white">{job.role}</h3>
                            <p className="text-sky-400">{job.company}</p>
                            <p className="text-sm text-slate-400 mt-1">{job.date}</p>
                            <p className="text-slate-300 mt-3 text-left">{job.description}</p>
                        </motion.div>
                    </div>
                </div>
            ))}
        </div>
    </AnimatedSection>
);

const ChatMessageContent = ({ text }) => {
    // Regular expression to find URLs
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Clean the text by removing markdown for bold
    const cleanedText = text.replace(/\*\*/g, '');

    // Split the text by URLs to interleave text and links
    const parts = cleanedText.split(urlRegex);

    return (
        <p className="text-sm whitespace-pre-wrap">
            {parts.map((part, index) => {
                if (part.match(urlRegex)) {
                    return (
                        <a 
                            key={index} 
                            href={part} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sky-400 underline hover:text-sky-300"
                        >
                            {part}
                        </a>
                    );
                }
                return part;
            })}
        </p>
    );
};

const ProjectAIChatModal = ({ project, onClose }) => {
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = React.useRef(null);

    useEffect(() => {
        setChatHistory([{
            role: 'model',
            parts: [{ text: `Hi! I'm an AI assistant. Feel free to ask me anything about the "${project.title}" project.` }]
        }]);
    }, [project]);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);

    const handleSendMessage = async () => {
        if (!userInput.trim() || isLoading) return;

        const newUserMessage = { role: 'user', parts: [{ text: userInput }] };
        setChatHistory(prev => [...prev, newUserMessage]);
        setUserInput('');
        setIsLoading(true);

        try {
            const prompt = `You are an expert AI assistant for Harsh Deep's portfolio. Your task is to answer questions about his projects based on the provided information. Be helpful, concise, and professional.

            Context for the project:
            - Title: ${project.title}
            - Description: ${project.description}
            - Technologies: ${project.tags.join(', ')}
            - GitHub Link: ${project.github || 'Not available'}
            - Live Demo Link: ${project.live || 'Not available'}
            - Research Paper Link: ${project.research || 'Not available'}

            Now, answer the following question from a visitor:
            Question: "${userInput}"
            `;
            
            const fullChatHistory = [{ role: "user", parts: [{ text: prompt }] }];

            const payload = { contents: fullChatHistory };
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const result = await response.json();
            
            let text = "Sorry, I couldn't generate a response. Please try again.";
            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
                text = result.candidates[0].content.parts[0].text;
            }
            
            const newModelMessage = { role: 'model', parts: [{ text }] };
            setChatHistory(prev => [...prev, newModelMessage]);

        } catch (error) {
            console.error("Gemini API call failed:", error);
            const errorMessage = { role: 'model', parts: [{ text: "Sorry, something went wrong while connecting to the AI. Please try again later." }] };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-slate-900/80 border border-slate-700 rounded-xl w-full max-w-2xl h-[80vh] flex flex-col shadow-2xl shadow-sky-500/10"
            >
                <div className="p-4 border-b border-slate-700 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Ask AI about: <span className="text-sky-400">{project.title}</span></h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
                </div>
                <div ref={chatContainerRef} className="flex-grow p-4 overflow-y-auto space-y-4">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                                <ChatMessageContent text={msg.parts[0].text} />
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="max-w-md p-3 rounded-lg bg-slate-700 text-slate-200">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
                                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse delay-150"></div>
                                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse delay-300"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className="p-4 border-t border-slate-700">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="e.g., What was the biggest challenge?"
                            className="flex-grow bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                            disabled={isLoading}
                        />
                        <button onClick={handleSendMessage} disabled={isLoading || !userInput.trim()} className="bg-sky-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-600 transition-colors disabled:bg-slate-600 disabled:cursor-not-allowed">
                            Send
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};


const Projects = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const handleOpenModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
    };

    return (
        <>
            <AnimatedSection id="projects" className="py-24 bg-slate-900/50">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Featured Projects</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioData.projects.map((project, index) => (
                        <motion.div 
                            key={index}
                            className="bg-slate-800/50 border border-slate-700 rounded-lg overflow-hidden flex flex-col group hover:border-sky-500/50 transition-colors duration-300"
                            whileHover={{ y: -10 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            <div className="overflow-hidden">
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                                    onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/600x400/0f172a/38bdf8?text=Project+Image'; }}
                                />
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-slate-300 text-sm flex-grow">{project.description}</p>
                                <div className="flex flex-wrap gap-2 my-4">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="bg-sky-500/10 text-sky-400 text-xs font-semibold px-2.5 py-1 rounded-full">{tag}</span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between gap-4 mt-auto pt-4 border-t border-slate-700/50">
                                    <div className="flex items-center gap-4">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-2">
                                            <GithubIcon />
                                        </a>
                                        {project.live && (
                                            <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-2">
                                                <ExternalLinkIcon />
                                            </a>
                                        )}
                                        {project.research && (
                                            <a href={project.research} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-2">
                                                <PaperclipIcon />
                                            </a>
                                        )}
                                    </div>
                                    <button onClick={() => handleOpenModal(project)} className="flex items-center gap-2 text-sm text-sky-400 hover:text-white font-semibold transition-colors">
                                         ✨ Ask AI
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </AnimatedSection>
            {isModalOpen && selectedProject && (
                <ProjectAIChatModal project={selectedProject} onClose={handleCloseModal} />
            )}
        </>
    );
};

const Publications = () => (
    <AnimatedSection id="publications" className="py-24">
        <h2 className="text-3xl font-bold text-center text-white mb-12">Publications & Achievements</h2>
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-2">Publication</h3>
                <p className="text-slate-300 italic">"{portfolioData.publications[0].title}"</p>
                <p className="text-slate-400 text-sm mt-2">{portfolioData.publications[0].journal}</p>
                <div className="flex items-center gap-6 mt-4">
                    <a href={portfolioData.publications[0].github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-2 text-sm">
                        <GithubIcon /> View on GitHub
                    </a>
                    {portfolioData.publications[0].research && (
                         <a href={portfolioData.publications[0].research} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors flex items-center gap-2 text-sm">
                            <PaperclipIcon /> View Paper
                        </a>
                    )}
                </div>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
                <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
                <ul className="list-disc list-inside text-slate-300 space-y-2">
                    {portfolioData.achievements.map((ach, index) => (
                        <li key={index}>{ach}</li>
                    ))}
                </ul>
            </div>
        </div>
    </AnimatedSection>
);


const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const response = await fetch('https://portfolio-backend-1092059770219.asia-south1.run.app/api/send-email', { // Make sure this URL matches your backend server address
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', message: '' });
            } else {
                setStatus(result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Contact form submission error:', error);
            setStatus('Something went wrong. Please try again.');
        }
    };

    return (
        <AnimatedSection id="contact" className="py-24">
            <h2 className="text-3xl font-bold text-center text-white mb-4">Get In Touch</h2>
            <p className="max-w-xl mx-auto text-center text-slate-300 mb-8">
                Whether you're a recruiter looking to hire, or a developer looking to collaborate, I'm always happy to chat.
            </p>

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-300 text-left mb-2">Name</label>
                    <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Your Name" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 text-left mb-2">Email</label>
                    <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Your Email" />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 text-left mb-2">Your Message</label>
                    <textarea name="message" id="message" rows="4" required value={formData.message} onChange={handleChange} className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Type your message here..."></textarea>
                </div>
                <div>
                    <button type="submit" className="w-full bg-slate-700/50 border border-slate-600 text-slate-200 font-semibold px-8 py-3 rounded-lg hover:bg-slate-700 hover:border-slate-500 transition-all duration-300 flex items-center justify-center gap-2">
                        Send Message <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </div>
                {status && <p className="text-center text-sm text-sky-400 mt-4">{status}</p>}
            </form>
        </AnimatedSection>
    );
};

const Footer = () => (
    <footer className="py-6 text-center text-slate-500 text-sm border-t border-slate-800">
        <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
        <p className="mt-1">Designed & Built by Harsh Deep</p>
    </footer>
);


export default function App() {
  return (
    <div className="bg-slate-900 text-slate-300 font-sans leading-relaxed selection:bg-sky-500/20 selection:text-sky-300">
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Publications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
