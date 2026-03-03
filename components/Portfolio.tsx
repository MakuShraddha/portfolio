"use client";

import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function Portfolio() {
  return (
    <main className="bg-black text-white scroll-smooth">

      {/* NAVBAR */}
      <nav className="fixed w-full top-0 backdrop-blur-md bg-black/40 border-b border-white/10 z-50 px-10 py-4 flex justify-between">
        <h1 className="text-2xl font-bold text-cyan-400">Shraddha Maku</h1>
        <div className="space-x-8 text-gray-300 hidden md:block">
          <a href="#about" className="hover:text-cyan-400 transition">About</a>
          <a href="#academics" className="hover:text-cyan-400 transition">Academics</a>
          <a href="#projects" className="hover:text-cyan-400 transition">Projects</a>
          <a href="#achievements" className="hover:text-cyan-400 transition">Achievements</a>
          <a href="#hobbies" className="hover:text-cyan-400 transition">Hobbies</a>
          <a href="#contact" className="hover:text-cyan-400 transition">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen flex items-center px-10 pt-28">
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">

          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
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
                />
              </span>
            </h1>

            <p className="mt-6 text-gray-400 text-lg max-w-xl">
              Final-year Computer Science student passionate about developing innovative and scalable software solutions, AI-driven applications, and modern technologies. Actively seeking entry-level software development opportunities.
            </p>

            <div className="mt-8 flex gap-6">
              <a
                href="https://github.com/MakuShraddha"
                target="_blank"
                className="px-6 py-3 bg-cyan-500 rounded-xl transition hover:shadow-[0_0_20px_#00ffff]"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/shraddhamaku/"
                target="_blank"
                className="px-6 py-3 border border-cyan-400 rounded-xl transition hover:shadow-[0_0_20px_#00ffff] hover:bg-cyan-400 hover:text-black"
              >
                LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex justify-center">
            <Image
              src="/profile.jpeg"
              alt="Shraddha"
              width={480}
              height={580}
              className="rounded-3xl object-cover transition duration-500 hover:shadow-[0_0_40px_#00ffff]"
            />
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <motion.section
        id="about"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-10 bg-gray-950"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">About Me</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            I am Shraddha Maku, a final-year Computer Science student at Malla Reddy College of Engineering for Women. 
            I possess strong programming fundamentals in Python, OOP concepts, SQL basics, and hands-on experience 
            in Machine Learning and Data Analytics. I am highly motivated, detail-oriented, and eager to contribute 
            effectively to real-world software engineering teams.
          </p>
        </div>
      </motion.section>

      {/* ACADEMICS */}
      <motion.section
        id="academics"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-10 bg-black"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Academics</h2>
          <div className="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_25px_#00ffff] transition">
            <h3 className="text-2xl font-semibold text-cyan-400">
              B.Tech – Computer Science Engineering
            </h3>
            <p className="text-gray-400 mt-2">
              Malla Reddy College of Engineering for Women
            </p>
            <p className="text-gray-500 mt-2">Final Year Student</p>
          </div>
        </div>
      </motion.section>

      {/* PROJECTS */}
      <motion.section
        id="projects"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-10 bg-black"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
          <div className="grid md:grid-cols-2 gap-10">

            <ProjectCard
              title="AI Loan Eligibility Advisory System"
              description="Machine Learning-based credit risk assessment system that predicts loan approval probability using classification models."
              points={[
                "Extensive data preprocessing & feature engineering",
                "Model training using Scikit-learn",
                "Performance evaluation & cross-validation",
                "REST API-based system architecture"
              ]}
            />

            <ProjectCard
              title="Fraud Detection in Banking Data"
              description="Anomaly detection system to identify fraudulent financial transactions using supervised learning techniques."
              points={[
                "Advanced feature engineering pipeline",
                "Classification modeling & performance tuning",
                "Precision-recall optimization",
                "Data visualization & reporting"
              ]}
            />

            <ProjectCard
              title="Smart Bookmark Manager"
              description="Full-stack bookmark management system with secure authentication and real-time database operations."
              points={[
                "Google OAuth integration",
                "Supabase PostgreSQL schema design",
                "Real-time CRUD operations",
                "Responsive modern UI"
              ]}
            />

            <ProjectCard
              title="Spam Email Classifier (92% Accuracy)"
              description="NLP-based spam detection model using probabilistic classification."
              points={[
                "TF-IDF vectorization",
                "Naive Bayes classifier",
                "Model accuracy optimization",
                "Streamlit deployment"
              ]}
            />

          </div>
        </div>
      </motion.section>

      {/* ACHIEVEMENTS */}
      <motion.section
        id="achievements"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-10 bg-gray-950"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Achievements</h2>
          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-gray-900 p-6 rounded-xl border border-white/10 hover:shadow-[0_0_25px_#00ffff] transition">
              <h3 className="text-xl font-bold text-cyan-400">AIR 566 – NCAT 2025</h3>
              <p className="text-gray-400 mt-3">
                Secured All India Rank 566 among thousands of participants nationwide.
              </p>
            </div>

            <div className="bg-gray-900 p-6 rounded-xl border border-white/10 hover:shadow-[0_0_25px_#00ffff] transition">
              <h3 className="text-xl font-bold text-cyan-400">Infosys Springboard – AI Intern</h3>
              <p className="text-gray-400 mt-3">
                Successfully completed AI Internship with hands-on exposure to real-world AI workflows.
              </p>
            </div>

          </div>
        </div>
      </motion.section>

      {/* HOBBIES */}
      <motion.section
        id="hobbies"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 px-10 bg-black overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Beyond Code – Photography
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto mb-10">
            I enjoy capturing unique perspectives through photography and 
            designing digital invitation cards. These creative pursuits 
            enhance my creativity, and attention to 
            detail — qualities that positively influence my approach to 
            software development.
          </p>
          <div className="flex animate-scroll gap-6">
            {["photo1.jpeg","photo2.jpeg","photo3.jpeg","photo4.jpeg","photo5.jpeg","photo6.jpeg",
              "photo1.jpeg","photo2.jpeg","photo3.jpeg","photo4.jpeg","photo5.jpeg","photo6.jpeg"].map((img, index) => (
              <div key={index} className="flex-shrink-0 w-48 rounded-xl overflow-hidden">
                <Image
                  src={`/hobbies/${img}`}
                  alt="Photography"
                  width={200}
                  height={200}
                  className="object-cover h-48 w-full transition duration-500 hover:scale-110 hover:shadow-[0_0_25px_#00ffff]"
                />
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
          }
        `}</style>
      </motion.section>

      {/* CONTACT */}
      <motion.section
        id="contact"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-24 text-center bg-black"
      >
        <h2 className="text-4xl font-bold mb-6">Contact</h2>
        <p className="text-gray-400 max-w-3xl mx-auto mb-10">
          I am actively seeking internships and entry-level software development opportunities. 
          I am open to remote and on-site roles and eager to contribute to impactful engineering projects.
        </p>

        <a
          href="mailto:shraddhamaku@gmail.com"
          className="text-cyan-400 text-xl transition hover:shadow-[0_0_20px_#00ffff]"
        >
          shraddhamaku@gmail.com
        </a>
      </motion.section>

    </main>
  );
}

function ProjectCard({ title, description, points }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gray-900 p-8 rounded-2xl border border-white/10 hover:shadow-[0_0_30px_#00ffff] transition"
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