import React, { useState, useEffect, useRef } from 'react';
import {
  Home as HomeIcon, Info, Code, Briefcase, Mail, Github, Linkedin, Database,
  PieChart, GitBranch, Smartphone, Coffee, Server, Cloud, Zap, Table, BarChart3,
  Monitor, FileText, Cpu, Wifi, Layers, Workflow, Lightbulb, Settings, Sun, Moon, Menu, Award, Trophy
} from 'lucide-react';

// Home Component
const Home = () => {
  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const phrases = ["a Computer Science student", "an aspiring software developer", "a Full-stack enthusiast", "a Machine Learning explorer"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 100; // milliseconds per character
  const deletingSpeed = 50; // milliseconds per character
  const delayBetweenPhrases = 1500; // milliseconds

  useEffect(() => {
    let typer;
    const handleTyping = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      if (isDeleting) {
        setCurrentText(prev => prev.substring(0, prev.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      } else {
        setCurrentText(prev => currentPhrase.substring(0, prev.length + 1));
        if (currentText === currentPhrase) {
          setIsDeleting(true);
          typer = setTimeout(handleTyping, delayBetweenPhrases);
          return;
        }
      }
      typer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
    };

    typer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(typer);
  }, [currentText, isDeleting, currentPhraseIndex]);


  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      {/* Parallax Background Elements */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          transform: `translateY(${offsetY * 0.2}px) scale(1.1)`, // Slower movement, slightly larger
          background: 'radial-gradient(circle at center, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
        }}
      ></div>
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          transform: `translateY(${offsetY * 0.4}px) scale(1.05)`, // Faster movement
          background: 'radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.1) 0%, transparent 60%)',
        }}
      ></div>
      <div
        className="absolute top-1/4 left-1/4 w-48 h-48 bg-blue-500 rounded-full mix-blend-screen filter blur-xl opacity-10 animate-blob"
        style={{ transform: `translate(${offsetY * 0.1}px, ${offsetY * -0.05}px)` }}
      ></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-screen filter blur-xl opacity-10 animate-blob animation-delay-200"
        style={{ transform: `translate(${offsetY * -0.15}px, ${offsetY * 0.08}px)` }}
      ></div>

      <div className="relative z-10 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
          Welcome to My Portfolio
        </h1>
        <p className="text-lg md:text-xl mb-2 max-w-2xl leading-relaxed animate-slide-up">
          Hi, I'm Shiva Ranjane, <span className="font-semibold text-pink-300">{currentText}</span><span className="animate-blink">|</span>
        </p>
      
        {/* Resume Download Section */}
        <div className="mt-10 animate-fade-in animation-delay-400">
          <a
            href="/Shiva_Ranjane_Resume.pdf" // Corrected path: Directly reference the file name as it's in the public folder
            download="Shiva_Ranjane_Resume.pdf"
            className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
          >
            <FileText className="mr-2" size={20} /> Download Resume
          </a>
        </div>
      </div>
    </div>
  );
};

// About Component
const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-800 text-white shadow-lg rounded-lg m-4 md:m-8 animate-fade-in">
      <h2 className="text-4xl font-bold mb-6 text-purple-400">About Me</h2>
      <div className="text-lg space-y-4 max-w-3xl text-center">
        <p>A highly motivated and versatile Computer Science student with a strong foundation in full-stack web development, specializing in the MERN stack (React, Node.js, Express, MongoDB). 
          Proficient in core programming languages including C++, Python, I possess a keen interest and growing expertise in Deep Learning and Generative AI. 
          My experience extends to building scalable web applications, REST APIs, and IoT solutions.
          I am a quick learner, adept at problem-solving, and thrive in collaborative environments, consistently seeking opportunities to contribute to impactful and innovative software solutions.</p>
        <h3 className="text-2xl font-semibold mt-6 text-pink-400">Languages</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>Tamil (Native)</li>
          <li>English</li>
          <li>Hindi</li>
        </ul>
      </div>
    </div>
  );
};

// Reusable TimelineItem Component
const TimelineItem = ({ title, subtitle, date, description, icon: Icon }) => (
  <div className="flex items-start mb-8 w-full">
    <div className="flex flex-col items-center mr-6">
      <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-lg">
        {Icon && <Icon size={24} />}
      </div>
      <div className="w-px flex-grow bg-gray-600 mt-2"></div>
    </div>
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex-grow transform hover:scale-[1.02] transition-transform duration-300 ease-in-out border border-gray-700">
      <h3 className="text-2xl font-semibold mb-1 text-pink-400">{title}</h3>
      <p className="text-gray-300 text-lg mb-2">{subtitle}</p>
      <p className="text-gray-400 text-sm mb-3">{date}</p>
      <ul className="list-disc list-inside space-y-1 text-gray-300">
        {Array.isArray(description) ? (
          description.map((desc, i) => <li key={i}>{desc}</li>)
        ) : (
          <li>{description}</li>
        )}
      </ul>
    </div>
  </div>
);


// Experience Component
const Experience = () => {
  const experienceData = [
    {
      title: "Intern",
      company: "Solar Secure Solutions",
      location: "Chennai, Tamil Nadu",
      duration: "July 2024 - Sep 2024",
      description: [
        "Full-stack Web Development Internship using modern JavaScript frameworks and database technologies.",
        "Contributed to development of user interfaces, backend services, and deployment processes.",
      ],
      icon: Briefcase,
    },
    {
      title: "Full Stack Web Development Intern",
      company: "CAAD Centre",
      location: "Selaiyur, Chennai, Tamil Nadu",
      duration: "June 2025 - July 2025",
      description: [
        "Developed a FullStack Web Application for the Institute using MERN Stack.",
        "Worked on both frontend and backend components, ensuring seamless integration and functionality.",
        "Gained hands-on experience in building scalable web applications and RESTful APIs.",
        "Deployed the application on a cloud platform, enhancing accessibility and performance.",
      ],
      icon: Briefcase,
    }
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white overflow-y-auto flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Experience</h2>
      <div className="max-w-4xl w-full relative pl-12 md:pl-20">
        <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-gray-700"></div> {/* Vertical line */}
        {experienceData.map((exp, index) => (
          <TimelineItem
            key={index}
            title={exp.title}
            subtitle={`${exp.company}, ${exp.location}`}
            date={exp.duration}
            description={exp.description}
            icon={exp.icon}
          />
        ))}
      </div>
    </div>
  );
};

// Education Component
const Education = () => {
  const educationData = [
    {
      degree: "B.E. Computer Science and Engineering",
      institution: "Madras Institute of Technology",
      location: "Chennai, Tamil Nadu",
      duration: "Expected Graduation: May 2027",
      details: "CGPA: 8.04/10",
      icon: Code, // Using Code icon for engineering degree
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-800 text-white overflow-y-auto flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Education</h2>
      <div className="max-w-4xl w-full relative pl-12 md:pl-20">
        <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-gray-700"></div> {/* Vertical line */}
        {educationData.map((edu, index) => (
          <TimelineItem
            key={index}
            title={edu.degree}
            subtitle={`${edu.institution}, ${edu.location}`}
            date={edu.duration}
            description={edu.details}
            icon={edu.icon}
          />
        ))}
      </div>
    </div>
  );
};


// Certifications Component
const Certifications = () => {
  const certificationsData = [
    "MongoDB","Full-Stack Development",
    "SQL (Basic & Intermediate) by HackerRank",
    "C/C++",
    "Python",
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-800 text-white overflow-y-auto flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Certifications</h2>
      <div className="max-w-2xl w-full">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          {certificationsData.map((cert, index) => (
            <li
              key={index}
              className="bg-gray-900 p-4 rounded-xl shadow-lg transform hover:scale-105 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out border border-gray-700 flex items-center justify-center text-lg text-gray-300"
            >
              <Award className="mr-3 text-yellow-400" size={20} /> {cert}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// CompetitionsAndWorkshops Component
const CompetitionsAndWorkshops = () => {
  const competitionsData = [
    "Winner of Tech Hunt in Prayatna'24. An InterCollege Technical Symposium Conducted by ACT-MIT",
    "Participated in AINCAT'25 by Nakuri",
    "Participated in HackOn with Amazon season 5",
  ];

  const workshopsData = [
    "Conducted a hands-on workshop on IoT - Smart Building Systems at LiveWire, Selaiyur. Guided students through practical exercises using TinkerCAD software to understand basic sensors like PIR, fire, and smoke sensors.",
    "Attended a comprehensive 2-day workshop on Machine Learning and Deep Learning at IIT-Madras, covering essential concepts and practical applications.",
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white overflow-y-auto flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Competitions and Workshops</h2>

      <div className="max-w-4xl w-full space-y-8 mb-12">
        <h3 className="text-3xl font-bold text-pink-400 text-center">Competitions</h3>
        {competitionsData.map((comp, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-700 flex items-start"
          >
            <Trophy className="mr-4 mt-1 text-green-400 flex-shrink-0" size={24} />
            <p className="text-lg text-gray-300">{comp}</p>
          </div>
        ))}
      </div>

      <div className="max-w-4xl w-full space-y-8">
        <h3 className="text-3xl font-bold text-pink-400 text-center">Workshops</h3>
        {workshopsData.map((workshop, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-700 flex items-start"
          >
            <Lightbulb className="mr-4 mt-1 text-blue-400 flex-shrink-0" size={24} />
            <p className="text-lg text-gray-300">{workshop}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


// Skills Component (Reverted from 3D cube for better categorization and prominence)
const Skills = () => {
  const prominentSkills = [
    { name: "C++", icon: Code },
    { name: "Python", icon: Code },
    { name: "JavaScript", icon: Code },
    { name: "Full-stack Development (MERN)", icon: Layers },
    { name: "Deep Learning", icon: Zap },
    { name: "Generative AI", icon: Lightbulb },
  ];

  const otherSkillsData = {
    "Programming Languages": [
      { name: "C", icon: Code },
      { name: "Java", icon: Coffee },
      { name: "Node.js", icon: Server },
    ],
    "Web & Mobile Development": [
      { name: "Flutter", icon: Smartphone },
    ],
    "Database Management": [
      { name: "MySQL", icon: Database },
      { name: "SQLite", icon: Database },
      { name: "MongoDB", icon: Cloud },
      { name: "Firebase", icon: Zap },
    ],
    "Data Analysis": [
      { name: "NumPy", icon: PieChart },
      { name: "Pandas", icon: Table },
      { name: "Matplotlib", icon: BarChart3 },
      { name: "Power BI", icon: Monitor },
    ],
    "Development Tools & Frameworks": [
      { name: "GitHub", icon: Github },
      { name: "Postman", icon: Monitor },
      { name: "Gradio", icon: Monitor },
      { name: "CUDA", icon: Monitor },
    ],
    "Version Control": [
      { name: "Git (via GitHub)", icon: GitBranch },
    ],
    "IOT": [
      { name: "Arduino", icon: Cpu },
      { name: "Blynk", icon: Wifi },
      { name: "TinkerCAD", icon: Layers },
    ],
  };

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white overflow-y-auto">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Skills</h2>

      {/* Prominent Skills Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h3 className="text-3xl font-bold mb-6 text-center text-pink-400">Prominent Skills</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prominentSkills.map((skill, index) => (
            <div
              key={`prominent-${index}`}
              className="bg-gradient-to-r from-purple-700 to-pink-700 p-6 rounded-xl shadow-xl transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 ease-in-out flex items-center justify-center text-center border border-purple-600"
            >
              {skill.icon && React.createElement(skill.icon, { className: "mr-3 text-white", size: 28 })}
              <span className="text-xl font-semibold text-white">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Other Skills Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Object.entries(otherSkillsData).map(([category, skills]) => (
          <div key={category} className="bg-gray-800 p-6 rounded-xl shadow-lg transform hover:scale-[1.02] transition-transform duration-300 ease-in-out border border-gray-700">
            <h3 className="text-2xl font-semibold mb-4 text-pink-400 flex items-center">
              {category === "Programming Languages" && <Code className="mr-2" />}
              {category === "Web & Mobile Development" && <Layers className="mr-2" />}
              {category === "Database Management" && <Database className="mr-2" />}
              {category === "Data Analysis" && <BarChart3 className="mr-2" />}
              {category === "Development Tools & Frameworks" && <Settings className="mr-2" />}
              {category === "Version Control" && <GitBranch className="mr-2" />}
              {category === "IOT" && <Lightbulb className="mr-2" />}
              {category === "Deep Learning" && <Zap className="mr-2" />}
              {category === "Generative AI" && <Lightbulb className="mr-2" />}
              {category}
            </h3>
            <ul className="space-y-3">
              {skills.map((skill, index) => (
                <li key={index} className="flex items-center text-lg text-gray-300">
                  {skill.icon && React.createElement(skill.icon, { className: "mr-3 text-purple-300" })}
                  {skill.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};


// Projects Component
const Projects = () => {
  const projectsData = [
    {
      title: "Image Processing using C++",
      description: "Developed an image filter and editing application using core C++ libraries.",
      icon: Code,
      githubLink: "https://github.com/SHIVARANJANE/Clarity", // Dummy link
    },
    {
      title: "Real-time Weather Web Application (Java)",
      description: "Designed a web app integrating a weather API to fetch and display real-time updates.",
      icon: Cloud,
      githubLink: "https://github.com/SHIVARANJANE/Real-time-Weather-Web-Application-Java", // Dummy link
    },
    {
      title: "Product Inventory using MERN Stack",
      description: "Built a full-stack inventory management solution with MongoDB, Express.js, React.js, and Node.js.",
      icon: Workflow,
      githubLink: "https://github.com/SHIVARANJANE/Product_Store", // Dummy link
    },
    {
      title: "Wireless Control of AC Application Using Website (IOT)",
      description: "Used Arduino, Postman, HTML, CSS, Blynk, and Python.",
      icon: Lightbulb,
      githubLink: "https://github.com/SHIVARANJANE/Alpha_FinalProj", // Dummy link
    },
    {
      title:"Batch Management System for Training Institute",
      description:"Developed a FullStack Web Application for the Institute using MERN Stack.Worked on both frontend and backend components, ensuring seamless integration and functionality.Gained hands-on experience in building scalable web applications and RESTful APIs.Deployed the application on a cloud platform, enhancing accessibility and performance.",
      icon: Layers,
      githubLink: "https://github.com/SHIVARANJANE/batch-progress_frontend", // Dummy link
    },
    {
      title: "AI Image Generator using Stable Diffusion, PyTorch, and Gradio",
      description: "AI Image Generator using Stable Diffusion – Built a PyTorch-based generative AI app using Hugging Face diffusers and Gradio UI, allowing users to generate styled images from text prompts. Implemented attention slicing for low-VRAM inference and added prompt customization, dynamic resolution, and image download features.",
      icon: Zap,
      githubLink: "https://github.com/SHIVARANJANE/AI-Image-Generator", // Dummy link
    },{
      title: "Portfolio Website",
      description: "Developed a personal portfolio website using React.js and three.js, showcasing projects, skills, and experience.",
      icon: Monitor,
      githubLink: "https://github.com/SHIVARANJANE/Portfolio-Website", // Dummy link
    }
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-800 text-white flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-8 text-center text-purple-400">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-xl shadow-lg transform hover:scale-105 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ease-in-out border border-gray-700"
          >
            <h3 className="text-2xl font-semibold mb-3 text-pink-400 flex items-center justify-between">
              <span className="flex items-center">
                {project.icon && React.createElement(project.icon, { className: "mr-3 text-purple-300" })}
                {project.title}
              </span>
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                  aria-label={`View ${project.title} on GitHub`}
                >
                  <Github size={24} />
                </a>
              )}
            </h3>
            <p className="text-lg text-gray-300">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Component
const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-900 text-white animate-fade-in">
      <h2 className="text-4xl font-bold mb-6 text-purple-400">Contact Me</h2>
      <div className="text-lg space-y-4 text-center">
        <p className="flex items-center justify-center">
          <Mail className="mr-3 text-pink-400" /> Email:{" "}
          <a
            href="mailto:shivaranjaneravishankar@gmail.com"
            className="text-blue-400 hover:underline ml-2"
          >
            shivaranjaneravishankar@gmail.com
          </a>
        </p>
        <p className="flex items-center justify-center">
          <Smartphone className="mr-3 text-pink-400" /> Phone:{" "}
          <a href="tel:+917305946116" className="text-blue-400 hover:underline ml-2">
            +91 7305946116
          </a>
        </p>
        <p className="flex items-center justify-center">
          <Linkedin className="mr-3 text-pink-400" /> LinkedIn:{" "}
          <a
            href="https://linkedin.com/in/shiva-ranjane-ravishankar-22a982280"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline ml-2"
          >
            linkedin.com/in/shiva-ranjane-ravishankar-22a982280
          </a>
        </p>
        <p className="flex items-center justify-center">
          <Github className="mr-3 text-pink-400" /> GitHub:{" "}
          <a
            href="https://github.com/SHIVARANJANE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline ml-2"
          >
            github.com/SHIVARANJANE
          </a>
        </p>

        <h3 className="text-2xl font-semibold mt-6 text-pink-400">Coding Platform Profiles</h3>
        <p className="flex items-center justify-center">
          <Code className="mr-3 text-pink-400" /> LeetCode:{" "}
          <a
            href="https://leetcode.com/u/Shiva_Ranjane/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline ml-2"
          >
            leetcode.com/u/Shiva_Ranjane/
          </a>
        </p>
        <p className="flex items-center justify-center">
          <Code className="mr-3 text-pink-400" /> GeeksforGeeks:{" "}
          <a
            href="https://www.geeksforgeeks.org/user/shivaranjanev1s4/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline ml-2"
          >
            geeksforgeeks.org/user/shivaranjanev1s4/
          </a>
        </p>
        <p className="flex items-center justify-center">
          <Code className="mr-3 text-pink-400" /> HackerRank:{" "}
          <a
            href="https://www.hackerrank.com/profile/shivaranjanerav1"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline ml-2"
          >
            hackerrank.com/profile/shivaranjanerav1
          </a>
        </p>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null);

  // Effect to apply/remove dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle click outside for mobile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navRef]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'experience':
        return <Experience />;
      case 'education': // New case for Education
        return <Education />;
      case 'skills':
        return <Skills />; {/* Render the enhanced Skills component */}
      case 'projects':
        return <Projects />;
      case 'certifications':
        return <Certifications />;
      case 'competitions':
        return <CompetitionsAndWorkshops />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="font-inter antialiased min-h-screen flex flex-col dark:bg-gray-900 bg-gray-100 transition-colors duration-300">
      {/* Navigation Bar */}
      <nav ref={navRef} className="bg-gray-950 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-purple-300">Shiva Ranjane</h1>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <Menu size={24} />
            </button>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              <HomeIcon className="mr-1" size={18} /> Home
            </button>
            <button
              onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              <Info className="mr-1" size={18} /> About
            </button>
            <button
              onClick={() => { setCurrentPage('experience'); setIsMenuOpen(false); }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              <Briefcase className="mr-1" size={18} /> Experience
            </button>
            <button
              onClick={() => { setCurrentPage('education'); setIsMenuOpen(false); }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              <Code className="mr-1" size={18} /> Education
            </button>
            <button
              onClick={() => { setCurrentPage('skills'); setIsMenuOpen(false); }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              <Code className="mr-1" size={18} /> Skills
            </button>
            <button
              onClick={() => { setCurrentPage('projects'); setIsMenuOpen(false); }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              <Briefcase className="mr-1" size={18} /> Projects
            </button>
            <button
              onClick={() => { setCurrentPage('certifications'); setIsMenuOpen(false); }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              <Award className="mr-1" size={18} /> Certifications
            </button>
            <button
              onClick={() => { setCurrentPage('competitions'); setIsMenuOpen(false); }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              <Trophy className="mr-1" size={18} /> Competitions & Workshops
            </button>
            <button
              onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }}
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              <Mail className="mr-1" size={18} /> Contact
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun size={20} className="text-yellow-300" /> : <Moon size={20} className="text-blue-300" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu Panel */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 p-4 bg-gray-900 rounded-md shadow-lg">
            <button
              onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <HomeIcon className="mr-1" size={18} /> Home
            </button>
            <button
              onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <Info className="mr-1" size={18} /> About
            </button>
            <button
              onClick={() => { setCurrentPage('experience'); setIsMenuOpen(false); }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <Briefcase className="mr-1" size={18} /> Experience
            </button>
            <button
              onClick={() => { setCurrentPage('education'); setIsMenuOpen(false); }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <Code className="mr-1" size={18} /> Education
            </button>
            <button
              onClick={() => { setCurrentPage('skills'); setIsMenuOpen(false); }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <Code className="mr-1" size={18} /> Skills
            </button>
            <button
              onClick={() => { setCurrentPage('projects'); setIsMenuOpen(false); }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <Briefcase className="mr-1" size={18} /> Projects
            </button>
            <button
              onClick={() => { setCurrentPage('certifications'); setIsMenuOpen(false); }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <Award className="mr-1" size={18} /> Certifications
            </button>
            <button
              onClick={() => { setCurrentPage('competitions'); setIsMenuOpen(false); }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <Trophy className="mr-1" size={18} /> Competitions & Workshops
            </button>
            <button
              onClick={() => { setCurrentPage('contact'); setIsMenuOpen(false); }}
              className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors duration-200"
            >
              <Mail className="mr-1" size={18} /> Contact
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 text-white p-4 text-center text-sm shadow-inner mt-auto">
        <p>&copy; {new Date().getFullYear()} Shiva Ranjane. All rights reserved.</p>
      </footer>

      {/* Tailwind CSS Script */}
      <script src="https://cdn.tailwindcss.com"></script>
      {/* Inter Font */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>
        {`
        body {
          font-family: 'Inter', sans-serif;
          margin: 0;
          overflow-x: hidden; /* Prevent horizontal scroll */
        }
        /* Custom animations */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        .animate-pulse {
          animation: pulse 2s infinite ease-in-out;
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
        .animate-blob {
          animation: blob 7s infinite cubic-bezier(0.6, 0.01, 0.6, 1);
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        `}
      </style>
    </div>
  );
};

export default App;
