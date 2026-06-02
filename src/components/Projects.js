import React from "react";
import { motion } from "framer-motion";
import senpy from "../assets/senpy.png";
import talk2data from "../assets/Talk2Data.png";
import codemorf from "../assets/codemorf.png";
import dq from "../assets/DQ.png";
import dataaudit from "../assets/Datasudit.png";
import RAGify from "../assets/Ragify.png";
import MediPredict from "../assets/Medipridict.png";
import SalePoint from "../assets/salepoint.png";

import "./Projects.css";

const mock = [
  {
    title: "SenPy",
    tags: ["ChatBot", "MultiModal"],
    img: senpy,
    desc: "A robust multimodal chatbot leveraging advanced language models and the OpenAI API, offering real-time, context-aware conversations from both text and image inputs. Session management maintains coherent dialogue history, while a responsive, scalable interface ensures seamless user experiences and smooth asynchronous communication.",
  },
  {
    title: "Talk2Data",
    tags: ["Rag", "Data Analysis"],
    img: talk2data,
    desc: "Interactive platform for data analysis and visualization users can upload CSV/JSON files, connect databases, or link cloud storage, and then query data conversationally. Automatically translates user prompts into executable SQL, extracts insights, and renders results using intuitive visual components.",
  },
  {
    title: "CodeMorphAI",
    tags: ["WebApp", "GenAI", "Code Migration"],
    img: codemorf,
    desc: "A comprehensive tool for modernizing legacy applications, utilizing large language models for seamless code migration, automated documentation, test generation, and data modeling. Modular design accelerates enterprise transformation by reducing manual effort in codebase upgrades.",
  },
  {
    title: "IntelliDQ",
    tags: ["Data Quality", "Data Cleansing", "Self Healing"],
    img: dq,
    desc: "Advanced platform for proactive data quality management. Combines rule-based logic and generative AI to evaluate data health, detect inconsistencies, recommend corrections, and implement self-healing solutions powered by machine learning for sustained data integrity.",
  },
  {
    title: "Data Audit",
    tags: ["ETL Testing", "Data Validation"],
    img: dataaudit,
    desc: "Automated system for post-ETL data validation, scrutinizing everything from row counts to subtle discrepancies. Identifies fault lines with high precision across disparate data systems, helping ensure reliable migrations and consistent datasets.",
  },
  {
    title: "RAGify",
    tags: ["Rag", "LangChain", "VectorDB"],
    img: RAGify,
    desc: "Retrieval-augmented generation utility enabling users to upload large document repositories and extract precise, natural language responses. Features semantic search via vector databases and advanced contextual retrieval, tailored for knowledge-intensive workflows.",
  },
  {
    title: "MediPredict",
    tags: ["GenAI", "ML", "ChatBot"],
    img: MediPredict,
    desc: "Predictive analytics solution for pharmaceutical brands—leverages healthcare professional (HCP) data to estimate loyalty and preference trends. Enriches large language models with domain context to drive strategic recommendations and brand engagement insights.",
  },
  {
    title: "SalePoint",
    tags: ["POS", "Modern WebApp"],
    img: SalePoint,
    desc: "Modern point-of-sale system tailored for retail. Integrates billing, inventory, and sales analytics, and employs forecasting algorithms to optimize stock levels and anticipate demand for goods and services, empowering smarter business operations.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section alt">
      <h2 className="section-title">Selected Projects</h2>
      <div className="grid">
        {mock.map((p, i) => (
          <motion.figure
            key={p.title}
            className="project"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="thumb">
              <img src={p.img} alt={p.title} />
            </div>
            <figcaption>
              <motion.div className="tooltip">{p.desc}</motion.div>
              <h4>{p.title}</h4>
              <div className="tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
