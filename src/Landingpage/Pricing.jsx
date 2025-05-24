// import React, { useState } from 'react';
// import Header from './Header';
// import './Pricing.css';

// function Pricing() {
//   const [isAnnual, setIsAnnual] = useState(false);

//   return (
//     <div className="pricing-container" id="pricing">
//       <Header/>
//       <div className="pricing-hero">
//         <h1 className="fade-in">Simple, Transparent Pricing</h1>
//         <p className="subtitle fade-in-delay">Choose the plan that fits your needs. All plans include a 14-day free trial.</p>

//         <div className="pricing-toggle fade-in-delay-2">
//           <span className={!isAnnual ? 'active' : ''}>Monthly</span>
//           <label className="switch">
//             <input
//               type="checkbox"
//               checked={isAnnual}
//               onChange={() => setIsAnnual(!isAnnual)}
//             />
//             <span className="slider round"></span>
//           </label>
//           <span className={isAnnual ? 'active' : ''}>Annually <span className="save-badge pulse">Save 20%</span></span>
//         </div>
//       </div>

//       <div className="pricing-plans">
//         <div className="pricing-card fade-in-left">
//           <div className="pricing-card-header">
//             <h3>Basic</h3>
//             <div className="price">
//               <span className="currency">₹</span>
//               <span className="amount">{isAnnual ? '7' : '9'}</span>
//               <span className="period">/{isAnnual ? 'user/month' : 'user/month'}</span>
//             </div>
//             <p className="billing-note">{isAnnual ? 'billed annually' : ''}</p>
//             <p className="plan-description">Perfect for small teams just getting started</p>
//           </div>
//           <div className="pricing-card-features">
//             <ul>
//               <li><span className="feature-check">✓</span> Up to 5 users</li>
//               <li><span className="feature-check">✓</span> 20GB storage</li>
//               <li><span className="feature-check">✓</span> Basic expense reporting</li>
//               <li><span className="feature-check">✓</span> Email support</li>
//               <li className="feature-disabled"><span className="feature-x">✕</span> Approval workflows</li>
//               <li className="feature-disabled"><span className="feature-x">✕</span> Custom rules</li>
//             </ul>
//           </div>
//           <button className="btn-select hover-effect">Start Free Trial</button>
//         </div>

//         <div className="pricing-card popular slide-up">
//           <div className="popular-badge">Most Popular</div>
//           <div className="pricing-card-header">
//             <h3>Premium</h3>
//             <div className="price">
//               <span className="currency">₹</span>
//               <span className="amount">{isAnnual ? '23' : '29'}</span>
//               <span className="period">/{isAnnual ? 'user/month' : 'user/month'}</span>
//             </div>
//             <p className="billing-note">{isAnnual ? 'billed annually' : ''}</p>
//             <p className="plan-description">Ideal for growing businesses and teams</p>
//           </div>
//           <div className="pricing-card-features">
//             <ul>
//               <li><span className="feature-check">✓</span> Up to 20 users</li>
//               <li><span className="feature-check">✓</span> 50GB storage</li>
//               <li><span className="feature-check">✓</span> Advanced reporting</li>
//               <li><span className="feature-check">✓</span> 24/7 priority support</li>
//               <li><span className="feature-check">✓</span> Approval workflows</li>
//               <li className="feature-disabled"><span className="feature-x">✕</span> Custom rules</li>
//             </ul>
//           </div>
//           <button className="btn-select hover-effect">Start Free Trial</button>
//         </div>

//         <div className="pricing-card fade-in-right">
//           <div className="pricing-card-header">
//             <h3>Enterprise</h3>
//             <div className="price">
//               <span className="currency">₹</span>
//               <span className="amount">{isAnnual ? '63' : '79'}</span>
//               <span className="period">/{isAnnual ? 'user/month' : 'user/month'}</span>
//             </div>
//             <p className="billing-note">{isAnnual ? 'billed annually' : ''}</p>
//             <p className="plan-description">For large organizations with advanced needs</p>
//           </div>
//           <div className="pricing-card-features">
//             <ul>
//               <li><span className="feature-check">✓</span> Unlimited users</li>
//               <li><span className="feature-check">✓</span> 200GB storage</li>
//               <li><span className="feature-check">✓</span> Custom reporting</li>
//               <li><span className="feature-check">✓</span> Dedicated account manager</li>
//               <li><span className="feature-check">✓</span> Advanced approval workflows</li>
//               <li><span className="feature-check">✓</span> Custom rules</li>
//             </ul>
//           </div>
//           <button className="btn-select hover-effect">Start Free Trial</button>
//         </div>
//       </div>

//       <div className="features-comparison fade-in">
//         <h2>Compare Features</h2>
//         <div className="comparison-table-container">
//           <table className="comparison-table">
//             <thead>
//               <tr>
//                 <th>Features</th>
//                 <th>Basic</th>
//                 <th>Premium</th>
//                 <th>Enterprise</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Users</td>
//                 <td>Up to 5</td>
//                 <td>Up to 20</td>
//                 <td>Unlimited</td>
//               </tr>
//               <tr>
//                 <td>Mobile App</td>
//                 <td><span className="check">✓</span></td>
//                 <td><span className="check">✓</span></td>
//                 <td><span className="check">✓</span></td>
//               </tr>
//               <tr>
//                 <td>Receipt Scanning</td>
//                 <td><span className="check">✓</span></td>
//                 <td><span className="check">✓</span></td>
//                 <td><span className="check">✓</span></td>
//               </tr>
//               <tr>
//                 <td>Expense Reports</td>
//                 <td><span className="check">✓</span></td>
//                 <td><span className="check">✓</span></td>
//                 <td><span className="check">✓</span></td>
//               </tr>
//               <tr>
//                 <td>Approval Workflows</td>
//                 <td><span className="x">✕</span></td>
//                 <td><span className="check">✓</span></td>
//                 <td><span className="check">✓</span></td>
//               </tr>
//               <tr>
//                 <td>Custom Categories</td>
//                 <td><span className="x">✕</span></td>
//                 <td><span className="check">✓</span></td>
//                 <td><span className="check">✓</span></td>
//               </tr>
//               <tr>
//                 <td>API Access</td>
//                 <td><span className="x">✕</span></td>
//                 <td><span className="x">✕</span></td>
//                 <td><span className="check">✓</span></td>
//               </tr>
//               <tr>
//                 <td>Custom Integrations</td>
//                 <td><span className="x">✕</span></td>
//                 <td><span className="x">✕</span></td>
//                 <td><span className="check">✓</span></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className="enterprise-contact bounce-in">
//         <div className="enterprise-contact-content">
//           <img src="../../src/img/billing.png" alt="Contact Icon" className="contact-icon" />
//           <h3>Need a custom solution?</h3>
//           <p>Contact our sales team for a tailored plan that meets your specific requirements.</p>
//           <button className="btn-contact hover-effect">Contact Sales</button>
//         </div>
//       </div>

//       <div className="faq-section fade-in">
//         <h2>Frequently Asked Questions</h2>
//         <div className="faq-grid">
//           <div className="faq-item scale-in">
//             <h4>Can I change plans later?</h4>
//             <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.</p>
//           </div>
//           <div className="faq-item scale-in-delay-1">
//             <h4>Is there a free trial available?</h4>
//             <p>All our plans come with a 14-day free trial. No credit card required until you decide to continue.</p>
//           </div>
//           <div className="faq-item scale-in-delay-2">
//             <h4>How does the billing work?</h4>
//             <p>We offer both monthly and annual billing options. Annual plans come with a 20% discount.</p>
//           </div>
//           <div className="faq-item scale-in-delay-3">
//             <h4>Can I cancel my subscription?</h4>
//             <p>You can cancel your subscription at any time from your account dashboard with no cancellation fees.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Pricing;