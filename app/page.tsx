"use client";

import Image from "next/image";
import { Github, Linkedin, Bot, User, FileText } from "lucide-react";
import { FaXTwitter, FaSpotify } from "react-icons/fa6";
import { SiHuggingface } from "react-icons/si";
import { ExperienceItem } from "./components/ExperienceItem";
import { GithubGraph } from "./components/GithubGraph";
import { TechStack } from "./components/TechStack";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";



import { getMarkdownContent } from "./data/content";



export default function Home() {
  const [time, setTime] = useState<string>("");
  const [mode, setMode] = useState<"human" | "agent">("human");

  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const markdownContent = getMarkdownContent(time);

  const [starPositions, setStarPositions] = useState<Array<{top: string; left: string; duration: number; delay: number}>>([]);

  useEffect(() => {
    setStarPositions(
      [...Array(50)].map(() => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 5,
      }))
    );
  }, []);

  return (
    <div className={`relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-16 text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300`}>
      {/* Twinkling Stars Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {starPositions.map((pos, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] w-[2px] bg-gray-400 dark:bg-white rounded-full shadow-[0_0_3px_rgba(156,163,175,0.6)] dark:shadow-[0_0_3px_white]"
            style={{
              top: pos.top,
              left: pos.left,
            }}
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: pos.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: pos.delay,
            }}
          />
        ))}
      </div>
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {mode === "agent" ? (
          /* Agent Mode - Markdown View */
          <motion.main
            key="agent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-start text-left px-4 sm:px-0"
          >
            <pre
              className="w-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-black dark:text-gray-300 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased"
              style={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace' }}
            >
              {markdownContent}
            </pre>
          </motion.main>
        ) : (
          /* Human Mode - Original View */
          <motion.main
            key="human"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-center text-center"
          >
            {/* Profile Image */}
            <div className="relative mb-2 h-40 w-40 sm:h-56 sm:w-56 overflow-hidden">
              <Image
                src="/window.png"
                alt="Profile"
                fill
                className="object-contain"
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-black dark:via-black/60 backdrop-blur-[1px]" />
            </div>

            {/* Hero Text */}
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl">
              Mayank Sharma
            </h1>

            {/* Subtitle Info */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
              <span>I love to build</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span>New Delhi</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center gap-1.5">
                <span className="tabular-nums text-xs sm:text-sm">{time || "00:00:00"}</span>
                <span className="text-[10px] uppercase tracking-wider sm:text-xs">IST</span>
              </div>
            </div>

            <div className="mb-8 w-full space-y-4 text-left text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              <p>
                I'm an Engineering student that's trying to get into Research while learning and working on backend and GenAI stuff. Amateur badminton player, pro cook (at home) and an avid music lover.
              </p>
            </div>

            {/* Experience Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Experience
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Digital India Corporation, MeitY"
                  role="Intern, 2025"
                  collapsible={true}
                  link="https://dic.gov.in/"
                >
                  <div className="space-y-2">
                    <p>Developed a document-grounded RAG assistant with LangChain, Ollama (Gemma 3), FAISS, and FastAPI, enabling scalable semantic retrieval and inference from internal PDFs.</p>
                    <p>Designed and implemented a document-grounded Retrieval-Augmented Generation (RAG) assistant using LangChain and Ollama (Gemma 3), leveraging open-source embedding models to vectorize internal PDF content for high-accuracy semantic retrieval.</p>
                    <p>Built end-to-end preprocessing and chunking pipelines for unstructured data, fine-tuned document retrieval with FAISS, and integrated the system with FastAPI to expose scalable inference endpoints; also documented APIs and conducted functional validation.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["AI", "RAG", "Python", "Langchain", "FAISS"].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Recallr AI Inc."
                  role="Founding Engineer, 2025"
                  collapsible={true}
                  link="https://recallrai.com/"
                >
                  <div className="space-y-2">
                    <p>Building Long term memory for conversational AI agents, enabling them to remember and recall information across sessions.</p>
                    <p>Got selected for an interview at Y Combinator for the Summer 2025 batch.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["AI", "Memory Systems", "Y Combinator"].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Stapes AI"
                  role="Co-Founder, 2024 - 2025"
                  collapsible={true}
                  link="https://github.com/orgs/stapesai/"
                >
                  <div className="space-y-2">
                    <p>Co-Founded an AI Home Automation company, successfully shipping v1.0 of the product in a month and acquired 50+ beta testers.</p>
                    <p>Developed high-end home automation solution, integrating AI agent with Smart TV, Fire Stick, Apple CarPlay and switch board integrations.</p>
                    <p>Currently white-labeling the home automation tech to other players.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["AI", "IoT", "Home Automation", "Startup"].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Google Developers Group"
                  role="Core Member, 2023 - 2024"
                  collapsible={true}
                  link="https://www.gdgsrm.com/"
                >
                  <div className="space-y-2">
                    <p>Technical core member AI&amp;ML team of GDSC Club at SRMIST.</p>
                    <p>Co-organized Research Summit: SRM 2024, featuring Mr. Abhijeet Bhattacharya, Product Engineer at Coding Blocks, attended by about 50+ students.</p>
                    <p>Facilitated student presentations and discussions on research ideas.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["ML Workshops", "Community Building"].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </ExperienceItem>
              </div>
            </div>


            {/* Education Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Education
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="SRM Institute of Science and Technology"
                  role="2022 - 2026"
                >
                  <p>Bachelor of Technology in Computer Science, Specialization in AI and ML; CGPA: 9.1</p>
                </ExperienceItem>
                <ExperienceItem
                  title="Surajkund International School"
                  role="2020 - 2022"
                >
                  <p>Higher Secondary Education; Percentage: 82%</p>
                </ExperienceItem>
                <ExperienceItem
                  title="Surajkund International School"
                  role="2018 - 2020"
                >
                  <p>Secondary Education; Percentage: 92%</p>
                </ExperienceItem>
              </div>
            </div>

            {/* Contributions Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                GitHub Contributions
              </h2>
              <GithubGraph />
            </div>

            {/* Skills / Tech Stack Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Skills
              </h2>
              <TechStack />
            </div>

            {/* Side Projects Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Side Projects
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="RAG based Chat Assistant"
                  role=""
                  collapsible={true}
                  link="https://github.com/shar-mayank/RAG-based-Chat-Assistant"
                >
                  <div className="space-y-2">
                    <p>Built a RAG pipeline for semantic QA over PDFs using LangChain, FAISS, and Ollama (Gemma 3). Implemented document parsing, OCR fallback, and recursive chunking for embeddings.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["Python", "LangChain", "FastAPI", "FAISS", "PostgreSQL", "Ollama"].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Automatic Speech Recognition System"
                  role=""
                  collapsible={true}
                  link="https://github.com/stapesai/ASR"
                >
                  <div className="space-y-2">
                    <p>Two Whisper models (750M &amp; 1.1B) were fine-tuned for Hindi ASR using 10k hours of Gram Vani audio. The models were optimized for real-time transcription with a latency of 200-300ms on 30s audio chunks.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["PyTorch", "Transformers", "FastAPI", "WebSockets", "Whisper"].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Garden Of Days"
                  role=""
                  collapsible={true}
                  link="https://github.com/shar-mayank/Garden-Of-Days"
                >
                  <div className="space-y-2">
                    <p>Garden Of Days is a lightweight SwiftUI journaling app that encourages a short daily memory entry for every day of the year. It stores entries using SwiftData and includes a companion widget.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {["SwiftUI", "SwiftData", "WidgetKit"].map((tag) => (
                        <span key={tag} className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-full border border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400">{tag}</span>
                      ))}
                    </div>
                  </div>
                </ExperienceItem>
              </div>
            </div>

            {/* Achievements Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Achievements
              </h2>
              <div className="space-y-8">
                <div className="group border-l-2 border-gray-200 dark:border-gray-800 pl-6 transition-all hover:border-black dark:hover:border-white">
                  <div className="mb-1">
                    <span className="text-base font-semibold text-black dark:text-white">Multiple Hackathons Ranker</span>
                    <span className="ml-2 text-sm text-gray-400 dark:text-gray-500">2024</span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    Ranked among top 10 teams out of 100+ teams in many Hackathons.
                  </p>
                </div>
                <div className="group border-l-2 border-gray-200 dark:border-gray-800 pl-6 transition-all hover:border-black dark:hover:border-white">
                  <div className="mb-1">
                    <span className="text-base font-semibold text-black dark:text-white">CBSE Merit Certificate Holder</span>
                    <span className="ml-2 text-sm text-gray-400 dark:text-gray-500">2020</span>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    Scored 99/100 marks in English in 10th Board Exams.
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Certifications
              </h2>
              <div className="space-y-8">
                <div className="group border-l-2 border-gray-200 dark:border-gray-800 pl-6 transition-all hover:border-black dark:hover:border-white">
                  <div className="mb-1">
                    <a
                      href="https://drive.google.com/file/d/1cTszy0XvMCLTO4-PkWh3T_Qqlz8QCgYo/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                    >
                      NPTEL Data Mining
                    </a>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    IIT, Kharagpur
                  </p>
                </div>
                <div className="group border-l-2 border-gray-200 dark:border-gray-800 pl-6 transition-all hover:border-black dark:hover:border-white">
                  <div className="mb-1">
                    <a
                      href="https://drive.google.com/file/d/1M90GAeOA3QlYiW9YzRdwTyP3NA1k7mxX/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base font-semibold text-black dark:text-white underline underline-offset-4 decoration-gray-300 dark:decoration-gray-700 hover:decoration-black dark:hover:decoration-white transition-colors"
                    >
                      Bootcamp on Big Data &amp; Data Science
                    </a>
                  </div>
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    CDAC, Noida
                  </p>
                </div>
              </div>
            </div>

            {/* Get in Touch Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Connect with me on{" "}
                  <a
                    href="https://www.linkedin.com/in/shar-mayank/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    LinkedIn
                  </a>{" "}
                  or{" "} shoot an {" "}
                  <a
                    href="mailto:sharmayank1608@gmail.com"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    email
                  </a>
                </p>
              </div>
            </div>

          </motion.main>
        )}
      </AnimatePresence>

      {/* Glass Island Navbar */}
      <nav className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900 sm:gap-6 sm:px-6">
        {/* Mode Toggle Switch */}
        <div className="flex items-center">
          <button
            onClick={() => setMode(mode === "human" ? "agent" : "human")}
            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 dark:bg-zinc-700 p-1 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none"
            role="switch"
            aria-checked={mode === "agent"}
            title={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
          >
            <div
              className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white dark:bg-white shadow-sm transition duration-200 ease-in-out ${mode === "agent" ? "translate-x-5" : "translate-x-0"
                }`}
            >
              {mode === "human" ? (
                <User className="h-3 w-3 text-black" />
              ) : (
                <Bot className="h-3 w-3 text-black" />
              )}
            </div>
          </button>
        </div>
        <a
          href="https://drive.google.com/file/d/1QWXviTixZHIa0lVxUtyuG1q5C9jLAHZr/view"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Resume"
        >
          <FileText className="h-5 w-5" />
        </a>
        <div className="h-6 w-px bg-gray-200 dark:bg-zinc-700" />
        <a
          href="https://github.com/shar-mayank"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/shar-mayank/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <a
          href="https://x.com/sharmayank16"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <FaXTwitter className="h-5 w-5" />
        </a>
        <a
          href="https://huggingface.co/sharmayank"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <SiHuggingface className="h-5 w-5" />
        </a>
        <a
          href="https://open.spotify.com/user/31nnp65x2sxb2pctdl574jxc2lte?si=c65340a35e574601"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
        >
          <FaSpotify className="h-5 w-5" />
        </a>
      </nav>


    </div >
  );
}
