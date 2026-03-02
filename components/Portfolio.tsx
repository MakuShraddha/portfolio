"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";
import { useRef } from "react";

export default function Portfolio() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <main ref={ref} className="bg-black text-white scroll-smooth">

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 backdrop-blur-md bg-black/40 border-b border-white/10 z-50 px-10 py-4 flex justify-between">
        <h1 className="text-2xl font-bold text-cyan-400">Shraddha Maku</h1>
        <div className="space-x-8 text-gray-300 hidden md:block">
          <a href="#about" className="hover:text-cyan-400">About</a>
          <a href="#academics" className="hover:text-cyan-400">Academics</a>
          <a href="#projects" className="hover:text-cyan-400">Projects</a>
          <a href="#contact" className="hover:text-cyan-400">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-10 pt-28">
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">

          <div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Designing Intelligent Systems for{" "}
              <span className="text-cyan-400">
                <Typewriter
                  words={[
                    "Real-World Scale.",
                    "AI Applications.",
                    "Innovative Solutions.",
                  ]}
                  loop
                  cursor
                  cursorStyle="|"
                />
              </span>
            </h1>
                  <br /><br />
            <p className="mt-6 text-gray-400 text-lg max-w-xl">
              Final-year Computer Science student passionate about developing innovative and scalable software solutions, AI-driven applications, and modern technologies. I am actively seeking entry-level software development opportunities where I can apply my skills, learn from experienced teams, and contribute to impactful projects.
            </p>

            <div className="mt-8 flex gap-6">
              <a
                href="https://github.com/MakuShraddha"
                target="_blank"
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl transition"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/shraddhamaku/"
                target="_blank"
                className="px-6 py-3 border border-cyan-400 hover:bg-cyan-400 hover:text-black rounded-xl transition"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="/profile.jpeg"
              alt="Shraddha Maku"
              width={480}
              height={580}
              className="rounded-3xl shadow-2xl shadow-cyan-500/30 object-cover"
            />
          </div>

        </div>
      </section>

      {/* ABOUT */}
      <motion.section
        id="about"
        style={{ opacity, y }}
        className="py-24 px-10 bg-gray-950"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">About Me</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            I am Shraddha Maku, a final-year Computer Science student at
            Malla Reddy College of Engineering for Women. I have strong
            programming fundamentals in Python, OOP concepts, SQL basics,
            and hands-on experience in Machine Learning and Data Analytics.
            I am highly motivated, detail-oriented, and eager to contribute
            effectively to real-world software engineering teams.
          </p>
        </div>
      </motion.section>

      {/* ACADEMICS */}
      <section id="academics" className="py-24 px-10 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-10 text-center">Academics</h2>
          <div className="bg-gray-900 p-8 rounded-2xl border border-white/10">
            <h3 className="text-2xl font-semibold text-cyan-400">
              B.Tech – Computer Science Engineering
            </h3>
            <p className="text-gray-400 mt-2">
              Malla Reddy College of Engineering for Women
            </p>
            <p className="text-gray-500 mt-2">
              Final Year Student
            </p>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-10 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>

          <div className="grid md:grid-cols-2 gap-10">

            {/* 1 */}
            <ProjectCard
              title="AI Loan Eligibility Advisory System"
              description="ML-powered credit risk prediction system."
              points={[
                "Data preprocessing & feature engineering",
                "Scikit-learn model training",
                "REST API architecture"
              ]}
            />

            {/* 2 */}
            <ProjectCard
              title="Fraud Detection in Banking Data"
              description="Anomaly detection system for financial transactions."
              points={[
                "Feature engineering pipeline",
                "Classification modeling",
                "Data visualization & evaluation"
              ]}
            />

            {/* 3 */}
            <ProjectCard
              title="Smart Bookmark Manager"
              description="Full-stack bookmark manager using Supabase."
              points={[
                "Google OAuth authentication",
                "PostgreSQL schema design",
                "Real-time CRUD operations"
              ]}
            />

            {/* 4 */}
            <ProjectCard
              title="Spam Email Classifier (92% Accuracy)"
              description="NLP-based spam detection system."
              points={[
                "Naive Bayes model",
                "TF-IDF vectorization",
                "Streamlit deployment"
              ]}
            />

          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="py-24 px-10 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Achievements</h2>
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-cyan-400">
                AIR 566 – NCAT 2025
              </h3>
              <p className="text-gray-400 mt-3">
                Secured All India Rank 566 among thousands of participants.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-cyan-400">
                Infosys Springboard – AI Intern
              </h3>
              <p className="text-gray-400 mt-3">
                Completed AI Internship with practical industry exposure.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 px-10 bg-gray-950 overflow-hidden">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold mb-12 text-center">
      Beyond Code – Photography
    </h2>

    <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
      I enjoy capturing unique perspectives and storytelling moments through photography.
      It enhances my creativity and attention to detail — qualities I apply in engineering.
    </p>

    {/* Animated Scroll Container */}
    <div className="relative w-full overflow-hidden">
      <div className="flex animate-scroll gap-6">
        {[
          "photo1.jpeg",
          "photo2.jpeg",
          "photo3.jpeg",
          "photo4.jpeg",
          "photo5.jpeg",
          "photo6.jpeg",
        ].map((img, index) => (
          <div key={index} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-xl overflow-hidden cursor-pointer relative">
            <Image
              src={`/hobbies/${img}`}
              alt={`Photography ${index + 1}`}
              width={224} // approximate for w-56
              height={150}
              className="object-cover w-full h-40 sm:h-48 md:h-56 transition-transform duration-500 hover:scale-110"
            />

            <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition duration-500 flex items-center justify-center">
              <span className="text-white text-sm sm:text-base font-semibold tracking-wide">
                Captured Moment
              </span>
            </div>
          </div>
        ))}

        {/* Duplicate images for seamless scrolling */}
        {[
          "photo1.jpeg",
          "photo2.jpeg",
          "photo3.jpeg",
          "photo4.jpeg",
          "photo5.jpeg",
          "photo6.jpeg",
        ].map((img, index) => (
          <div key={`dup-${index}`} className="flex-shrink-0 w-40 sm:w-48 md:w-56 rounded-xl overflow-hidden cursor-pointer relative">
            <Image
              src={`/hobbies/${img}`}
              alt={`Photography ${index + 1}`}
              width={224}
              height={150}
              className="object-cover w-full h-40 sm:h-48 md:h-56 transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  </div>

  {/* Animation CSS */}
  <style jsx>{`
    @keyframes scroll {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    .animate-scroll {
      display: flex;
      gap: 1.5rem;
      animation: scroll 30s linear infinite;
    }
  `}</style>
</section>

      {/* CONTACT */}
      <section id="contact" className="py-24 text-center bg-black" >
        <h2 className="text-4xl font-bold mb-6">Contact</h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
            I am actively seeking internships and entry-level opportunities in 
            software development and related fields,where I can 
            apply my skills in while continuing to learn and grow professionally.
            Feel free to reach out via email.I am open to remote or on-site opportunities.
        </p>
        <a
          href="mailto:shraddhamaku@gmail.com"
          className="text-cyan-400 text-xl hover:underline"
        >
          shraddhamaku@gmail.com
        </a>
      </section>

    </main>
  );
}

/* Reusable Project Card */

type ProjectCardProps = {
  title: string;
  description: string;
  points: string[];
};

function ProjectCard({ title, description, points }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900 p-8 rounded-2xl border border-white/10"
    >
      <h3 className="text-xl font-bold text-cyan-400">{title}</h3>
      <p className="text-gray-400 mt-4">{description}</p>

      <ul className="mt-4 text-gray-500 list-disc list-inside space-y-2">
        {points.map((point: string, index: number) => (
          <li key={index}>{point}</li>
        ))}
      </ul>
    </motion.div>
  );
}