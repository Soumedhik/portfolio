import React from "react";
import {
  JavascriptOriginal,
  PythonOriginal,
  Html5Original,
  Css3Original,
  ExpressOriginal,
  ReactOriginal,
  NextjsOriginal,
  TailwindcssOriginal,
  BootstrapPlain,
  NodejsOriginal,
  CPlain,
  DjangoPlain,
  MysqlOriginalWordmark,
  PhotoshopOriginal,
  FigmaOriginal,
  BlenderOriginal,
} from "devicons-react";

// Profile Description
export const profileDescription = [
  "Hello, I'm Soumedhik Bharati, a passionate and innovative Computer Science Engineering undergraduate specializing in machine learning, deep learning, and artificial intelligence. With hands-on research and industry experience, I have engineered state-of-the-art models in NLP, computer vision, and time series forecasting, contributing to projects spanning academic, industrial, and open-source domains. I excel in solving complex AI problems and optimizing ML pipelines, driven by a commitment to advancing technology with practical impact.",
];

// Research Experience
export const researchExperience = [
  {
    key: 1,
    institution: "Xu Lab, Carnegie Mellon University",
    role: "Research Assistant",
    duration: "Sept 2025 – Present",
    description: [
      "Engineered a few-shot transfer learning pipeline by fine-tuning a 1.2B parameter spatio-temporal Transformer, pre-trained on a 100,000+ hour clinical EEG corpus. Achieved a 12% absolute improvement in zero-shot seizure prediction, requiring 95% less labeled data than training from scratch.",
      "Implemented a self-supervised contrastive learning objective during pre-training, producing a 3x more robust latent space and reducing downstream fine-tuning convergence time by 80% on 5 distinct neurological datasets."
    ],
    type: "research",
  },
  {
    key: 2,
    institution: "Sister Nivedita University",
    role: "Undergraduate Researcher",
    duration: "Mar 2024 – Present",
    description: [
      "Designed HCAT-Net, a novel architecture for ordinal EEG emotion classification from 1D time-series data. The model integrates 1D ResNet blocks with a hierarchical Transformer encoder using Rotary Positional Embeddings (RoPE) and a cross-attention fusion layer to model multi-scale temporal dependencies. Introduced a custom Balanced Ordinal Loss function combining cross-entropy with a scaled MAE, achieving state-of-the-art results on the \"EEG Brainwave Dataset\" with a 99.8% test accuracy, 100% ROC-AUC, and a 99.7% MCC (presented at CIACON 2025).",
      "Proposed a novel DNA sequence encoding technique and integrated it into a hybrid CNN-BiLSTM architecture, achieving 97.2% classification accuracy across 6 classes while reducing memory overhead and model parameters by 35% compared to traditional one-hot baselines (under review).",
      "Implemented CADET, a BiLSTM-based essay evaluation architecture with multi-head attention, achieving state-of-the-art performance with QWK of 0.98, MSE of 2.88, and R2 of 0.96 on the ASAP dataset (under review).",
      "Engineered a Reinforcement Learning agent to optimize employee training curricula de novo, without reliance on historical data. Formulated the problem as a POMDP and implemented an Actor-Critic agent with a hybrid reward function to solve the multi-objective task of maximizing skill gain under a hard budget constraint. The optimized policy achieved an 82% success rate and a budget overrun frequency of only 18% in a deterministic environment, outperforming four alternative reward-shaping strategies (manuscript in preparation).",
      "Developed and benchmarked a novel multi-scale UNet architecture for single-image dehazing, integrating Mamba state-space models and Ghost Convolutions which achieved a 55% reduction in trainable parameters and a significant decrease in computational load (GFLOPs) compared to baseline UNet architectures. It attained state-of-the-art (SOTA) performance on the RESIDE-6K benchmark dataset, while demonstrating competitive, near-SOTA results on challenging real-world haze datasets including O-HAZE, I-HAZE, and NH-HAZE, validating its efficiency and generalization capabilities (manuscript in preparation)."
    ],
    type: "research",
  },
  {
    key: 3,
    institution: "Indian Institute of Technology Kharagpur",
    role: "Research Intern",
    duration: "May 2025 – July 2025",
    description: [
      "Developed a novel Information Retrieval (IR) reranking pipeline utilizing Large Language Models with a multi-stage caching mechanism to accelerate large-scale, reproducible experiments (manuscript in preparation).",
      "Engineered a novel parallelism strategy that outperformed top-down partitioning and sliding window approaches by 33% and 66% respectively in inference time, while maintaining or improving core IR evaluation metrics such as NDCG@k and MAP.",
      "Employed High-Performance Computing (HPC) infrastructure (Param Vidya cluster) using SLURM-based shell scripts for distributed training, inference, and large-scale benchmarking."
    ],
    type: "research",
  },
  {
    key: 4,
    institution: "Collaborative Research with University of Lille",
    role: "Research Collaborator",
    duration: "Feb 2025 – Present",
    description: [
      "Developed a deep learning surrogate model to rapidly predict the coherent evolution of a quantum system, bypassing direct numerical integration of the Schrödinger equation. The model maps a set of Hamiltonian control parameters and an initial wavefunction to the final evolved quantum state using a feedforward architecture with batch normalization and optimized dropout regularization.",
      "Achieved an R² of 0.94 against the ground-truth solver and demonstrated the superiority of a Huber loss function for handling heavy-tailed error distributions in the state space.",
      "Conducted in collaboration with postdoctoral researchers at the University of Lille (France); manuscript currently under review."
    ],
    type: "research",
  },
];

// Work Experience
export const workExperience = [
  {
    key: 1,
    company: "Exalt.ai",
    designation: "Product Engineer",
    duration: "Jun. 2025 – Present",
    description: [
      "Deployed a production-scale RAG pipeline for a high-traffic news summarization service, implementing a hybrid retrieval strategy fusing BM25 sparse lexical search with dense vectors from a Faiss index, and employing a ColBERT-style re-ranker to enhance contextual relevance and mitigate hallucination.",
      "Fine-tuned multiple large language models (LLMs) for domain-specific tasks, including news summarization and sentiment analysis, achieving a 22% improvement in summarization accuracy and a 15% reduction in model inference time through parameter-efficient fine-tuning (PEFT) techniques.",
      "Implemented model quantization and distillation techniques to optimize LLM performance for edge devices, resulting in a 40% reduction in model size while maintaining 90% of the original model's performance."
    ],
    type: "work",
  },
  {
    key: 2,
    company: "Raapid.ai",
    designation: "R&D Intern",
    duration: "Apr. 2025 – Jun. 2025",
    description: [
      "Developed a novel deep learning model for Hierarchical Condition Category (HCC) code extraction from unstructured clinical notes, improving accuracy by 12% over the existing baseline.",
      "Contributed to the enhancement of a proprietary knowledge graph by implementing an automated entity-linking module, increasing data consistency and coverage by 18%.",
      "Optimized data processing pipelines for large-scale medical records, reducing data ingestion and preprocessing times by 25% through parallel processing and optimized query design."
    ],
    type: "work",
  },
];

// Position of Responsibility
export const positionOfResponsibility = [
  {
    key: 1,
    organization: "Google Developer Group (GDG), SNU",
    designation: "Core Technical Team ML Lead",
    duration: "Feb 2024 – Present",
    description: [
      "Led advanced workshops on transformer architectures and attention mechanisms, training 100+ students in deep learning implementation.",
      "Developed comprehensive curriculum covering PyTorch, TensorFlow, and deep learning architectures."
    ],
    lorLink: "https://drive.google.com/file/d/1hZOrwa98kFi8kpwwD7SrjJZhgkVzlZw8/view?usp=sharing",
    type: "responsibility",
  },
  {
    key: 2,
    organization: "SKEPSIS",
    designation: "Machine Learning Lead",
    duration: "Oct 2023 – Present",
    description: [
      "Led 5 research initiatives in NLP and computer vision, supervising teams of 4-6 undergraduate researchers.",
      "Mentored 60+ students across multiple machine learning projects, with 4 successful project completions."
    ],
    lorLink: "https://drive.google.com/file/d/1UZKZxhpG31odsKAuNjj5v3gTTt7aHlqa/view?usp=sharing",
    type: "responsibility",
  },
];

// GitHub Repositories
export const githubRepos = [
  {
    name: "Combined-Attention-and-Deep-Auto-Encoder-with-GloVe-Embedding-Features",
    techUsed: ["Python", "PyTorch", "TensorFlow"],
    description: "Research-grade automated essay scoring toolkit combining hierarchical attention and deep autoencoders with GloVe embeddings for high-fidelity evaluation.",
    githubLink: "https://github.com/Soumedhik/Combined-Attention-and-Deep-Auto-Encoder-with-GloVe-Embedding-Features",
    liveURL: "https://github.com/Soumedhik/Combined-Attention-and-Deep-Auto-Encoder-with-GloVe-Embedding-Features",
  },
  {
    name: "NeuroAdaptive-Affective-Decoding-from-EEG",
    techUsed: ["Python", "PyTorch", "Scikit-learn"],
    description: "EEG-based valence–arousal decoder leveraging spectral biomarkers, CNN-Transformer hybrids, and frequency-aware attention to model affective states.",
    githubLink: "https://github.com/Soumedhik/NeuroAdaptive-Affective-Decoding-from-EEG",
    liveURL: "https://github.com/Soumedhik/NeuroAdaptive-Affective-Decoding-from-EEG",
  },
  {
    name: "HashSeqLab",
    techUsed: ["Python", "PyTorch", "Scikit-learn"],
    description: "Reproducible DNA sequence classification pipeline featuring hashed k-mer embeddings and a BiLSTM-with-attention architecture for labeled genomics datasets.",
    githubLink: "https://github.com/Soumedhik/HashSeqLab",
    liveURL: "https://github.com/Soumedhik/HashSeqLab",
  },
  {
    name: "VisionAid-Assistive-Suite",
    techUsed: ["Python", "TensorFlow", "React"],
    description: "Dual-application assistive platform that identifies Indian currency notes and detects obstacles in real time to support blind and low-vision users.",
    githubLink: "https://github.com/Soumedhik/VisionAid-Assistive-Suite",
    liveURL: "https://github.com/Soumedhik/VisionAid-Assistive-Suite",
  },
  {
    name: "TextGAN-Lab",
    techUsed: ["Python", "PyTorch", "TensorFlow"],
    description: "Experimentation toolkit for advanced GAN-based text generation with modular components for training, evaluation, and ablation studies.",
    githubLink: "https://github.com/Soumedhik/TextGAN-Lab",
    liveURL: "https://github.com/Soumedhik/TextGAN-Lab",
  },
  {
    name: "Aurora-Sight-to-Sound",
    techUsed: ["Python", "PyTorch", "React"],
    description: "Cross-modal research pipeline mapping visual features to coherent musical compositions for image and video-to-audio synthesis.",
    githubLink: "https://github.com/Soumedhik/Aurora-Sight-to-Sound",
    liveURL: "https://github.com/Soumedhik/Aurora-Sight-to-Sound",
  },
  {
    name: "Resume-Insight-Engine",
    techUsed: ["Python", "Scikit-learn", "React"],
    description: "Modular framework that parses resumes, engineers interpretable features, and scores candidate fit with explainable analytics dashboards.",
    githubLink: "https://github.com/Soumedhik/Resume-Insight-Engine",
    liveURL: "https://github.com/Soumedhik/Resume-Insight-Engine",
  },
  {
    name: "ShopSense-Search",
    techUsed: ["Python", "Node.js", "React"],
    description: "Interactive semantic product search platform mixing transformer reranking with attribute-aware refinement for e-commerce discovery.",
    githubLink: "https://github.com/Soumedhik/ShopSense-Search",
    liveURL: "https://github.com/Soumedhik/ShopSense-Search",
  },
  {
    name: "Adaptive-Guided-Query-Retrieval-AGQ-IR-",
    techUsed: ["Python", "Node.js", "React"],
    description: "Conversational information retrieval engine that fuses semantic embeddings with structured product attributes for adaptive guidance.",
    githubLink: "https://github.com/Soumedhik/Adaptive-Guided-Query-Retrieval-AGQ-IR-",
    liveURL: "https://github.com/Soumedhik/Adaptive-Guided-Query-Retrieval-AGQ-IR-",
  },
  {
    name: "Text-GAN-Toolkit",
    techUsed: ["Python", "PyTorch", "TensorFlow"],
    description: "Modular research repository tailored to building, training, and benchmarking GAN architectures dedicated to text generation tasks.",
    githubLink: "https://github.com/Soumedhik/Text-GAN-Toolkit",
    liveURL: "https://github.com/Soumedhik/Text-GAN-Toolkit",
  },
  {
    name: "FiberPulseLab",
    techUsed: ["Python", "TensorFlow", "PyTorch"],
    description: "Research workspace for simulating nonlinear fiber pulse propagation with configurable numerical solvers and deep-learning surrogates.",
    githubLink: "https://github.com/Soumedhik/FiberPulseLab",
    liveURL: "https://github.com/Soumedhik/FiberPulseLab",
  },
  {
    name: "QLearning-stock-agent",
    techUsed: ["Python", "Scikit-learn", "TensorFlow"],
    description: "Q-learning agent and lightweight trading environment for experimenting with reinforcement learning under sparse financial data.",
    githubLink: "https://github.com/Soumedhik/QLearning-stock-agent",
    liveURL: "https://github.com/Soumedhik/QLearning-stock-agent",
  },
  {
    name: "Machine-Learning-Code",
    techUsed: ["Python", "Scikit-learn", "TensorFlow"],
    description: "Comprehensive collection of machine learning examples, tutorials, and reference implementations for core ML concepts.",
    githubLink: "https://github.com/Soumedhik/Machine-Learning-Code",
    liveURL: "https://github.com/Soumedhik/Machine-Learning-Code",
  },
  {
    name: "AI-Text-Detection",
    techUsed: ["Python", "TensorFlow", "Scikit-learn"],
    description: "BiLSTM-driven detector that classifies whether text is AI-generated or human-authored using linguistic feature engineering.",
    githubLink: "https://github.com/Soumedhik/AI-Text-Detection",
    liveURL: "https://github.com/Soumedhik/AI-Text-Detection",
  },
  {
    name: "Course-Material",
    techUsed: ["Python", "JavaScript", "React"],
    description: "Extensive repository of computer science lessons, examples, and projects curated for student skill-building and instruction.",
    githubLink: "https://github.com/Soumedhik/Course-Material",
    liveURL: "https://github.com/Soumedhik/Course-Material",
  },
  {
    name: "Automatic Essay Grading System",
    techUsed: ["Python", "PyTorch", "BiLSTM"],
    description: "Novel BiLSTM architecture with multi-head attention for automated essay evaluation. Achieved SOTA performance with MAE of 1.166 and QWK score of 0.674 on ASAP dataset. Winner of SIT ICOE Hackathon.",
    githubLink: "https://github.com/Soumedhik/Essay-Grading-System",
    liveURL: "https://github.com/Soumedhik/Essay-Grading-System",
  },
  {
    name: "Image Enhancement using Autoencoders",
    techUsed: ["Python", "TensorFlow", "CNN"],
    description: "Multi-scale convolutional autoencoder with sub-pixel convolution layers for single-image super-resolution. Achieved 42.8% improvement in PSNR with 31.2 dB PSNR and 0.897 SSIM on DIV2K dataset.",
    githubLink: "https://github.com/Soumedhik/Image_Enhancement_Autoencoder",
    liveURL: "https://github.com/Soumedhik/Image_Enhancement_Autoencoder",
  },
  {
    name: "Multi-Modal Face Tracking System",
    techUsed: ["Python", "VGG16", "OpenCV"],
    description: "End-to-end deep learning pipeline with VGG16 transfer learning. Achieved real-time performance (30+ FPS) with 95.2% localization accuracy and 47% model size reduction.",
    githubLink: "https://github.com/Soumedhik/-Face_Tracking_VGG16",
    liveURL: "https://github.com/Soumedhik/-Face_Tracking_VGG16",
  },
  {
    name: "Assistive System for Blind People",
    techUsed: ["Python", "YOLOv9", "Intel OneAPI"],
    description: "Multi-task computer vision system with YOLOv9 for obstacle detection (98.3% accuracy) and ResNet50 for currency recognition (99.4% accuracy). Winner of Intel OneAPI Hackathon.",
    githubLink: "https://github.com/Soumedhik/Blind-Aid-Intel_OneApi_Hackathon",
    liveURL: "https://github.com/Soumedhik/Blind-Aid-Intel_OneApi_Hackathon",
  },
  {
    name: "Image-to-Music Synthesis System",
    techUsed: ["Python", "Vision Transformer", "CLIP"],
    description: "Modular pipeline fusing 512-D semantic embeddings with quantitative features. Cross-attention network mapping visual to musical parameters with diffusion-based generators for chord, rhythm, and melody synthesis.",
    githubLink: "https://aurora-steel-theta.vercel.app/",
    liveURL: "https://aurora-steel-theta.vercel.app/",
  },
  {
    name: "Airplane Satisfaction Prediction",
    techUsed: ["Python", "Scikit-learn", "Pandas"],
    description: "Built a predictive analytics model to evaluate passenger satisfaction using airline service datasets, showcasing applied ML in customer experience optimization.",
    githubLink: "https://github.com/Soumedhik/Airplane-Satisfaction-Prediction",
    liveURL: "https://github.com/Soumedhik/Airplane-Satisfaction-Prediction",
  },
  {
    name: "Walmart Store Classifier",
    techUsed: ["Python", "Scikit-learn", "Pandas"],
    description: "Developed a decision tree model with 100% test accuracy to classify Walmart store types, integrating sales, environmental, and promotional features.",
    githubLink: "https://github.com/Soumedhik/Decision-Tree-Classifier-for-Walmart-Store-Data",
    liveURL: "https://github.com/Soumedhik/Decision-Tree-Classifier-for-Walmart-Store-Data",
  },
  {
    name: "GenAI Diet Recommender",
    techUsed: ["Python", "Hugging Face Transformers", "LangChain"],
    description: "Created a generative AI–powered recommendation engine that personalizes diet plans using LLM-driven insights into nutrition and user preferences.",
    githubLink: "https://github.com/Soumedhik/DIET-RECOMMENDER-GENAI",
    liveURL: "https://github.com/Soumedhik/DIET-RECOMMENDER-GENAI",
  },
  {
    name: "Facial Expression Detection",
    techUsed: ["Python", "TensorFlow", "OpenCV"],
    description: "Built a CNN-based emotion recognition pipeline capable of classifying facial expressions across seven affective states for human-computer interaction.",
    githubLink: "https://github.com/Soumedhik/FACIAL-EXPRESSION-DETECTION",
    liveURL: "https://github.com/Soumedhik/FACIAL-EXPRESSION-DETECTION",
  },
  {
    name: "Digit Recognition with Decision Trees",
    techUsed: ["Python", "Scikit-learn", "NumPy"],
    description: "Prototyped a decision-tree–based MNIST digit recognizer, emphasizing interpretable ML approaches suitable for teaching model fundamentals.",
    githubLink: "https://github.com/Soumedhik/Handwritten-Digit-Recognizer-using-Decision-Tree",
    liveURL: "https://github.com/Soumedhik/Handwritten-Digit-Recognizer-using-Decision-Tree",
  },
  {
    name: "InnovativeKube",
    techUsed: ["Python", "Flask", "SQL"],
    description: "Designed a nutritional analytics platform providing portion-aware meal recommendations, with modular service-based backend design.",
    githubLink: "https://github.com/Soumedhik/InnovativeKube",
    liveURL: "https://github.com/Soumedhik/InnovativeKube",
  },
  {
    name: "Malaria Detection with CNN",
    techUsed: ["Python", "TensorFlow", "OpenCV"],
    description: "Implemented a LeNet-inspired CNN architecture for automatic malaria detection from blood smear images, improving diagnostic efficiency.",
    githubLink: "https://github.com/Soumedhik/LeNet-Malaria-CNN-Classifier",
    liveURL: "https://github.com/Soumedhik/LeNet-Malaria-CNN-Classifier",
  },
  {
    name: "Mail Spam Classifier",
    techUsed: ["Python", "Scikit-learn", "NLP"],
    description: "Built a supervised NLP pipeline leveraging TF-IDF and ML algorithms to classify spam vs ham emails, designed as a hands-on ML demo.",
    githubLink: "https://github.com/Soumedhik/Mail-Spam-Classifier",
    liveURL: "https://github.com/Soumedhik/Mail-Spam-Classifier",
  },
  {
    name: "Machine Learning Lab Modules",
    techUsed: ["Python", "Scikit-learn", "NumPy"],
    description: "Repository of ML algorithms and experiments curated for teaching students key concepts in regression, classification, and clustering.",
    githubLink: "https://github.com/Soumedhik/ML_lab_6",
    liveURL: "https://github.com/Soumedhik/ML_lab_6",
  },
  {
    name: "MNIST Digit Classifier",
    techUsed: ["Python", "TensorFlow", "Keras"],
    description: "Developed a neural network baseline for MNIST handwritten digit classification, demonstrating deep learning fundamentals for students.",
    githubLink: "https://github.com/Soumedhik/MNIST-Digit-Classification-with-TensorFlow-and-Keras",
    liveURL: "https://github.com/Soumedhik/MNIST-Digit-Classification-with-TensorFlow-and-Keras",
  },
  {
    name: "Operating System Programs",
    techUsed: ["C", "Shell"],
    description: "Collection of OS algorithms (scheduling, memory, process synchronization) designed as instructional material for academic labs and student training.",
    githubLink: "https://github.com/Soumedhik/Operating-System",
    liveURL: "https://github.com/Soumedhik/Operating-System",
  },
  {
    name: "Portfolio Website",
    techUsed: ["JavaScript", "TailwindCSS", "HTML5"],
    description: "Fully responsive personal website to showcase projects, research, and achievements — deployed on Vercel.",
    githubLink: "https://github.com/Soumedhik/portfolio",
    liveURL: "https://github.com/Soumedhik/portfolio",
  },
  {
    name: "PromptPilot",
    techUsed: ["Python", "Hugging Face Transformers", "NLP"],
    description: "AI-driven prompt engineering assistant that refines user inputs into high-quality prompts for professional communication and presentations.",
    githubLink: "https://github.com/Soumedhik/PromptPilot",
    liveURL: "https://github.com/Soumedhik/PromptPilot",
  },
  {
    name: "Sentiment Analysis with Bi-RNN",
    techUsed: ["Python", "TensorFlow", "RNN"],
    description: "Trained a bidirectional RNN on noisy social media datasets to capture context and sentiment polarity effectively.",
    githubLink: "https://github.com/Soumedhik/SentimentAnalysis-BidirectionalRNN",
    liveURL: "https://github.com/Soumedhik/SentimentAnalysis-BidirectionalRNN",
  },
  {
    name: "SNU Flipbook",
    techUsed: ["Python", "Flask", "SQLAlchemy"],
    description: "Collaborative digital book recommendation and reading platform with interactive flipping interface.",
    githubLink: "https://github.com/Soumedhik/snu_flipbook",
    liveURL: "https://github.com/Soumedhik/snu_flipbook",
  },
];

// Education Experience
export const educationExperience = [
  {
    key: 1,
    institution: "Sister Nivedita University, Kolkata",
    duration: "Expected Sept 2026",
    degree: "B.Tech in Computer Science Engineering (CGPA: 8.68/10.0)",
    type: "education",
  },
  {
    key: 2,
    institution: "GD Goenka School, Dakshineswar", 
    duration: "2020-2022",
    degree: "Higher Secondary",
    type: "education",
  },
  {
    key: 3,
    institution: "Don Bosco School, Liluah",
    duration: "2009-2020", 
    degree: "Secondary Education",
    type: "education",
  },
];

const iconSize = 15;
const iconClass = "mx-auto";

export const skills = [
  // Programming Languages
  {
    key: 1,
    name: "Python",
    type: "language",
    icon: PythonOriginal ? (
      <PythonOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 2,
    name: "JavaScript",
    type: "language",
    icon: JavascriptOriginal ? (
      <JavascriptOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 3,
    name: "C",
    type: "language",
    icon: CPlain ? <CPlain className={iconClass} size={iconSize} /> : null,
  },
  {
    key: 4,
    name: "HTML5",
    type: "language",
    icon: Html5Original ? (
      <Html5Original className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 5,
    name: "CSS3",
    type: "language",
    icon: Css3Original ? (
      <Css3Original className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 6,
    name: "R",
    type: "language",
    icon: null,
  },
  {
    key: 7,
    name: "SQL",
    type: "language", 
    icon: MysqlOriginalWordmark ? (
      <MysqlOriginalWordmark className={iconClass} size={iconSize} />
    ) : null,
  },
  
  // Web Frameworks
  {
    key: 8,
    name: "React",
    type: "framework",
    icon: ReactOriginal ? (
      <ReactOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 9,
    name: "Next.js",
    type: "framework",
    icon: NextjsOriginal ? (
      <NextjsOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 10,
    name: "Express.js",
    type: "framework",
    icon: ExpressOriginal ? (
      <ExpressOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 11,
    name: "Node.js",
    type: "framework",
    icon: NodejsOriginal ? (
      <NodejsOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 12,
    name: "Django",
    type: "framework",
    icon: DjangoPlain ? (
      <DjangoPlain className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 13,
    name: "TailwindCSS",
    type: "framework",
    icon: TailwindcssOriginal ? (
      <TailwindcssOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 14,
    name: "Bootstrap",
    type: "framework",
    icon: BootstrapPlain ? (
      <BootstrapPlain className={iconClass} size={iconSize} />
    ) : null,
  },
  
  // ML/AI & Data Science
  {
    key: 15,
    name: "PyTorch",
    type: "ml",
    icon: null,
  },
  {
    key: 16,
    name: "TensorFlow",
    type: "ml",
    icon: null,
  },
  {
    key: 17,
    name: "Scikit-learn",
    type: "ml",
    icon: null,
  },
  
  // Design & Creative Tools
  {
    key: 18,
    name: "Photoshop",
    type: "design",
    icon: PhotoshopOriginal ? (
      <PhotoshopOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 19,
    name: "Figma",
    type: "design",
    icon: FigmaOriginal ? (
      <FigmaOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
  {
    key: 20,
    name: "Blender",
    type: "design",
    icon: BlenderOriginal ? (
      <BlenderOriginal className={iconClass} size={iconSize} />
    ) : null,
  },
];

const appsData = [
  {
    id: 1,
    name: "Google Chrome",
    icon: "/images/apps/chrome.png",
    action: "browser",
    size: "w-18 h-18",
  },
  {
    id: 2,
    name: "About Me",
    icon: "/images/apps/folder.png",
    action: "explorer",
    size: "w-18 h-18",
  },
  {
    id: 3,
    name: "Recycle Bin",
    icon: "/images/apps/recyclebin.png",
    action: "recycle",
    size: "w-14 h-14",
  },
  {
    id: 4,
    name: "Microsoft Edge",
    icon: "/images/apps/edge.png",
    action: "browser",
    size: "w-11 h-11",
  },
  {
    id: 7,
    name: "VS Code",
    icon: "/images/external/vs-code.ico",
    action: "vscode",
    size: "w-8 h-8",
  },
  {
    id: 8,
    name: "Spotify",
    icon: "/images/external/spotify-logo.png",
    action: "app",
    subAction: "spotify",
    size: "w-10 h-10",
  },
  {
    id: 9,
    name: "Videos",
    icon: "/images/apps/videos.png",
    action: "videos",
    size: "w-10 h-10",
  },
  {
    id: 10,
    name: "AI Chatbot",
    icon: "/ai.png",
    action: "notepad",
    size: "w-10 h-10",
  },
  {
    id: 11,
    name: "Pictures",
    icon: "/pic_logo.png",
    action: "pictures",
    size: "w-10 h-10",
  },
  {
    id: 12,
    name: "Contact Me",
    icon: "/images/external/contact-card.png",
    action: "contactme",
    size: "w-10 h-10",
  },
  {
    id: 13,
    name: "LinkedIn",
    icon: "/images/external/linkedin.png",
    action: "linkedin",
    size: "w-10 h-10",
  },
  {
    id: 14,
    name: "GitHub",
    icon: "/images/external/github-logo.png",
    action: "github",
    size: "w-10 h-10",
  },
];

// Conferences Data
export const conferences = [
  {
    key: 1,
    title: "9th International Conference on Data Management, Analytics & Innovation (ICDMAI 2025)",
    description: "Participated in discussions on advancements in data management and analytics. Engaged with leading researchers and industry experts in the field.",
    status: "Participated and Felicitated",
    location: "India",
    link: "https://www.icdmai.org/",
    type: "participation"
  },
  {
    key: 2,
    title: "International Annual Meeting - Belt and Road & BRICS Big Data and AI Working Committee",
    description: "Participated in discussions on skills development and AI initiatives. Contributed to international collaboration on Big Data and AI projects. Networked with global leaders in AI and data science.",
    status: "International Delegate",
    location: "Chongqing, China",
    link: "https://drive.google.com/file/d/1zdLkM9Eg9sV3kSBb0auouGKc7yV6DNrD/view?usp=sharing",
    additionalLink: "https://drive.google.com/file/d/1OI0V-9oE-5AoKc4w7t_qbPs8UqsSLhLS/view?usp=sharing",
    type: "international"
  },
  {
    key: 3,
    title: "IEEE International Conference on Computing, Intelligence and Application (CIACON 2025)",
    description: "Presented cutting-edge research on transformer networks for EEG emotion classification. Demonstrated novel hierarchical cross-attention mechanisms. Received recognition for innovative approach to ordinal loss functions.",
    status: "Certified Presenter & Best Presenter Award",
    location: "Durgapur, India",
    paperTitle: "HCAT-Net: A Novel Hierarchical Cross-Attention Transformer Network with Enriched Balanced Ordinal Loss for EEG Emotion Classification",
    recordId: "65473",
    link: "https://drive.google.com/file/d/1UTnBZj2NDuY2NHVhq6uny9vZiJb220XW/view?usp=sharing",
    type: "presentation"
  }
];

// Achievements Data
export const achievements = [
  {
    key: 1,
    title: "2nd prize in the BRICS International Vocational Skills Offline Competition 2024, Shandong, China.",
    description: "Represented India in this prestigious competition, competing against 178 top international competitors.",
    link: "https://drive.google.com/file/d/1HsaW5RM0NtZbDHeDhpHaFFTie7fcF9MT/view?usp=sharing",
    category: "international",
    prize: "2nd"
  },
  {
    key: 2,
    title: "Top 3 Teams Prize at the ICDMAI Offline Hackathon 2025.",
    description: "Competed against 1000+ teams in this prestigious event.",
    link: "https://drive.google.com/file/d/18j2yZ4JHT0riiXQEnUUsTGt2IT2Ui5iX/view?usp=sharing",
    category: "hackathon",
    prize: "Top 3"
  },
  {
    key: 3,
    title: "Best Presenter Award at IEEE CIACON 2025.",
    description: "Recognized for outstanding presentation of research on HCAT-Net for EEG Emotion Classification.",
    link: "https://drive.google.com/file/d/1UTnBZj2NDuY2NHVhq6uny9vZiJb220XW/view?usp=sharing",
    category: "academic",
    prize: "Best Presenter"
  },
  {
    key: 4,
    title: "1st place in the SAP ICOE Hackathon 2024.",
    description: "Competed against 400+ teams in this prestigious event.",
    link: "https://drive.google.com/file/d/183WWQLWCE8gLdSGYh5p39Guk8YBhGh9i/view?usp=sharing",
    category: "hackathon",
    prize: "1st"
  },
  {
    key: 5,
    title: "Selected for the India Regional Bootcamp of Google Solution Challenge 2024.",
    description: "Selected among top developers nationwide for this prestigious Google initiative.",
    link: "https://drive.google.com/file/d/1tsqE6t2-L7c3Z0igJgi8s2g_lO62HV-0/view?usp=sharing",
    category: "selection",
    prize: "Selected"
  },
  {
    key: 6,
    title: "1st prize in the ML Mania Hackathon 2024,",
    description: "MCKV College of Engineering's Pragati 2k24.",
    link: "https://drive.google.com/file/d/16kCkakwmPGdIWKRSvAjXs0ozcnRL3T7k/view?usp=sharing",
    category: "hackathon",
    prize: "1st"
  },
  {
    key: 7,
    title: "1st place in the Intel OneAPI Hackathon 2024.",
    description: "Showcased expertise in Intel's cutting-edge development tools and frameworks.",
    link: "https://drive.google.com/file/d/1-cxl-n3j10O81z4tLQTjVvo0xV56Y1e5/view?usp=sharing",
    category: "hackathon",
    prize: "1st"
  },
  {
    key: 8,
    title: "Attended and was felicitated at the 9th International Conference on Data Management, Analytics & Innovation.",
    description: "Participated in discussions on advancements in data management and analytics.",
    link: "https://www.icdmai.org/",
    category: "conference",
    prize: "Felicitation"
  },
  {
    key: 9,
    title: "Attended the International Annual Meeting of the International Alliance of Skills Development for Belt and Road and the BRICS Big Data and AI Working Committee.",
    description: "Participated in discussions on skills development and AI in Chongqing, China.",
    link: "https://drive.google.com/file/d/1zdLkM9Eg9sV3kSBb0auouGKc7yV6DNrD/view?usp=sharing",
    additionalLink: "https://drive.google.com/file/d/1OI0V-9oE-5AoKc4w7t_qbPs8UqsSLhLS/view?usp=sharing",
    category: "international",
    prize: "Participation"
  }
];

// Export default data
export default appsData;

// Social Media Links
export const socialMediaLinks = {
  linkedin: "https://www.linkedin.com/in/soumedhik-bharati/",
  github: "https://github.com/Soumedhik",
};
