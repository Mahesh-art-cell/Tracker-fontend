// import React, { useState, useEffect } from 'react';
// import Header from './Header';
// import './Feature.css';

// function Feature() {
//   const [activeFeature, setActiveFeature] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);

//     const interval = setInterval(() => {
//       setActiveFeature((prev) => (prev + 1) % features.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const features = [
//     {
//       title: "Expense Reporting",
//       description: "Create expense reports in minutes with smart OCR technology and automated receipt scanning.",
//       icon: "📝"
//     },
//     {
//       title: "Receipt Management",
//       description: "Digitize and organize receipts automatically with our intelligent scanning technology.",
//       icon: "🧾"
//     },
//     {
//       title: "Approval Workflows",
//       description: "Customize multi-level approval workflows to match your organization's expense policies.",
//       icon: "✅"
//     },
//     {
//       title: "Policy Compliance",
//       description: "Set up expense policies and let the system automatically flag violations during submission.",
//       icon: "📋"
//     },
//     {
//       title: "Corporate Cards",
//       description: "Sync corporate card transactions automatically and match them with receipts effortlessly.",
//       icon: "💳"
//     },
//     {
//       title: "Analytics & Reporting",
//       description: "Gain insights into spending patterns with detailed analytics and customizable reports.",
//       icon: "📊"
//     }
//   ];

//   return (
//     <div className="feature-container">
//       <Header />

//       <div className={`hero-section ${isVisible ? 'fade-in' : ''}`}>
//         <h1>Streamline Your Expense Management</h1>
//         <p>Simplify expense reporting, enforce compliance, and gain complete visibility into your spending</p>
//         <button className="cta-button">Start Free Trial</button>
//       </div>

//       <div className="features-section">
//         <h2>Powerful Features to Transform Your Expense Management</h2>

//         <div className="features-grid">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className={`feature-card ${index === activeFeature ? 'active' : ''}`}
//               onClick={() => setActiveFeature(index)}
//             >
//               <div className="feature-icon">{feature.icon}</div>
//               <h3>{feature.title}</h3>
//               <p>{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* <div className="testimonial-section">
//         <div className="testimonial-container">
//           <div className="testimonial slide-in-right">
//             <p>"Zoho Expense has reduced our expense processing time by 60% and improved compliance across all departments."</p>
//             <div className="testimonial-author">
//               <h4>Sarah Johnson</h4>
//               <p>CFO, TechSolutions Inc.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//        */}
//       <div className="cta-section">
//         <div className="cta-content slide-in-left">
//           <h2>Ready to simplify expense management?</h2>
//           <p>Join thousands of businesses that trust Zoho Expense</p>
//           <div className="cta-buttons">
//             <button className="primary-button">Start Free Trial</button>
//             <button className="secondary-button">Schedule Demo</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Feature;