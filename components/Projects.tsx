"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  { title: "SenPy", tags: ["ChatBot", "MultiModal"], img: "/assets/senpy.png", link: null, desc: "Multimodal chatbot leveraging LLMs and OpenAI API for real-time, context-aware conversations from both text and image inputs." },
  { title: "Talk2Data", tags: ["RAG", "Data Analysis"], img: "/assets/Talk2Data.png", link: null, desc: "Interactive data analysis platform — query your data conversationally. Translates prompts into SQL and renders visual results." },
  { title: "CodeMorphAI", tags: ["GenAI", "Code Migration"], img: "/assets/codemorf.png", link: null, desc: "Modernizes legacy apps using LLMs for seamless code migration, automated documentation, and test generation." },
  { title: "IntelliDQ", tags: ["Data Quality", "Self Healing"], img: "/assets/DQ.png", link: null, desc: "Data quality platform combining rule-based logic and GenAI to evaluate, detect, and self-heal data inconsistencies." },
  { title: "Data Audit", tags: ["ETL Testing", "Validation"], img: "/assets/Datasudit.png", link: null, desc: "Automated post-ETL validation system that identifies fault lines with precision across disparate data systems." },
  { title: "RAGify", tags: ["RAG", "LangChain", "VectorDB"], img: "/assets/Ragify.png", link: null, desc: "Upload large document repositories and extract precise natural language responses via semantic search and vector databases." },
  { title: "MediPredict", tags: ["GenAI", "ML", "ChatBot"], img: "/assets/Medipridict.png", link: null, desc: "Predictive analytics for pharma brands — leverages HCP data and LLMs to estimate loyalty trends and brand insights." },
  { title: "SalePoint", tags: ["POS", "WebApp"], img: "/assets/salepoint.png", link: null, desc: "Modern POS system for retail integrating billing, inventory, and sales analytics with demand forecasting." },
  { title: "Kaamgaar", tags: ["Platform", "NextJS", "PostgreSQL"], img: "/assets/Kaamgaar.png", link: "https://kaamgaar.in", desc: "Construction workforce platform connecting Indian workers and vendors. Workers register skills, vendors find verified talent." },
  { title: "Stonamart", tags: ["E-commerce", "Platform"], img: "/assets/sonamart.png", link: null, desc: "E-commerce platform — coming soon. Live link will be available shortly." },
];

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-label">What We&apos;ve Built</div>
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((p, i) => {
          const cardBody = (
            <>
              <div className="project-thumb">
                <Image src={p.img} alt={p.title} fill style={{ objectFit: "cover" }} sizes="300px" />
              </div>
              <div className="project-body">
                <div className="project-title-row">
                  <h4>{p.title}</h4>
                  {p.link && <span className="project-link-icon">↗</span>}
                </div>
                <div className="project-tags">
                  {p.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
                <p className="project-desc">{p.desc}</p>
              </div>
              <div className="project-overlay">
                <p className="project-overlay-title">{p.title}</p>
                <p className="project-overlay-desc">{p.desc}</p>
              </div>
            </>
          );

          return (
            <motion.div
              key={p.title}
              className="project-card"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              {p.link ? (
                <a href={p.link} target="_blank" rel="noopener noreferrer">{cardBody}</a>
              ) : (
                cardBody
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
