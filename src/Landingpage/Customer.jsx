


// import React from 'react';
// import './Customer.css'
// import { Bell, Calendar, ChevronRight, File, Home, MessageSquare, PieChart, Settings, Users, User } from 'lucide-react';
// import Header from './Header';
// import Footer from './Footer';

// function Dash() {
//   const teamMembers = [
//     { id: 1, name: 'Christina M.', role: 'Project Manager', status: 'active', progress: 75 },
//     { id: 2, name: 'James R.', role: 'UI/UX Designer', status: 'active', progress: 60 },
//     { id: 3, name: 'Gregory J.', role: 'Frontend Developer', status: 'active', progress: 85 },
//     { id: 4, name: 'Angela P.', role: 'Backend Developer', status: 'active', progress: 45 },
//   ];

//   const projects = [
//     { id: 1, name: 'Website Redesign', client: 'Acme Corporation', date: 'Jan 15, 2025', status: 'in progress' },
//     { id: 2, name: 'Mobile Dashboard App', client: 'XYZ Technology', date: 'Feb 28, 2025', status: 'in progress' },
//     { id: 3, name: 'Social Media App', client: 'SocialConnect', date: 'Mar 20, 2025', status: 'active' },
//     { id: 4, name: 'Web + Mobile Website', client: 'Global Enterprise', date: 'Apr 10, 2025', status: 'pending' },
//   ];

//   const notifications = [
//     { id: 1, title: 'Team Meeting', description: 'Scheduled for tomorrow 2:00 PM', time: '2h ago' },
//     { id: 2, title: 'UX Improvement', description: 'Jacob submitted the latest designs', time: '5h ago' },
//     { id: 3, title: 'Weekly Meeting', description: 'Discuss project progress with team', time: '1d ago' },
//   ];

//   // Weekly hours data for chart
//   const weeklyHours = [
//     { day: 'Mon', hours: 5 },
//     { day: 'Tue', hours: 7 },
//     { day: 'Wed', hours: 3 },
//     { day: 'Thu', hours: 8 },
//     { day: 'Fri', hours: 6 },
//     { day: 'Sat', hours: 4 },
//     { day: 'Sun', hours: 2 },
//   ];

//   // Financial data for line chart
//   const financialData = [
//     { month: 'Jan 2025', revenue: 40, cost: 30 },
//     { month: 'Feb 2025', revenue: 45, cost: 35 },
//     { month: 'Mar 2025', revenue: 55, cost: 32 },
//     { month: 'Apr 2025', revenue: 60, cost: 40 },
//     { month: 'May 2025', revenue: 58, cost: 45 },
//     { month: 'Jun 2025', revenue: 65, cost: 48 },
//   ];

//   return (
//     <div className="dashboard-layout no-sidebar">
//       <Header/>

//       {/* Main Content */}
//       <div className="main-content full-width">
//         {/* Header */}
//         <div className="dashboard-header">
//           <h1>Customer Income and Expense</h1>
//           <div className="user-profile">
//             <div className="search-bar">
//               <input type="text" placeholder="Search..." />
//             </div>
//             <div className="user-info">
//               <span>Hi, Srujana</span>
//               <div className="avatar-icon">
//                 <User size={24} />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Dashboard Grid */}
//         <div className="dashboard-grid">
//           {/* Team Members Card */}
//           <div className="card team-card">
//             <div className="card-header">
//               <h2>Team Members</h2>
//             </div>
//             <div className="card-body">
//               {teamMembers.map(member => (
//                 <div key={member.id} className="team-member">
//                   <div className="member-avatar-icon">
//                     <User size={24} />
//                   </div>
//                   <div className="member-details">
//                     <h3>{member.name}</h3>
//                     <p>{member.role}</p>
//                   </div>
//                   <div className="progress-circle">
//                     <svg width="40" height="40" viewBox="0 0 40 40">
//                       <circle cx="20" cy="20" r="15" fill="none" stroke="#eaeaea" strokeWidth="5" />
//                       <circle
//                         cx="20"
//                         cy="20"
//                         r="15"
//                         fill="none"
//                         stroke="#6c5ce7"
//                         strokeWidth="5"
//                         strokeDasharray={`${2 * Math.PI * 15 * member.progress / 100} ${2 * Math.PI * 15 * (1 - member.progress / 100)}`}
//                         strokeDashoffset="0"
//                         transform="rotate(-90 20 20)"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Project Status Card */}
//           <div className="card project-card">
//             <div className="card-header">
//               <h2>Project Status</h2>
//             </div>
//             <div className="card-body">
//               {projects.map(project => (
//                 <div key={project.id} className={`project-item ${project.id === 3 ? 'active' : ''}`}>
//                   <div className="project-info">
//                     <h3>{project.name}</h3>
//                     <p>{project.client}</p>
//                   </div>
//                   <div className="project-date">
//                     <p>{project.date}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Billable Hours Card */}
//           <div className="card hours-card">
//             <div className="card-header">
//               <h2>Billable Hours</h2>
//               <div className="tab-selector">
//                 <span className="tab active">This Week</span>
//                 <span className="tab">Last Week</span>
//               </div>
//             </div>
//             <div className="card-body">
//               <div className="bar-chart">
//                 {weeklyHours.map((day, index) => (
//                   <div key={index} className="chart-column">
//                     <div className="bar" style={{ height: `${day.hours * 10}px` }}></div>
//                     <div className="day-label">{day.day}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* Notifications Card */}
//           <div className="card notifications-card">
//             <div className="card-header">
//               <h2>Notifications</h2>
//             </div>
//             <div className="card-body">
//               {notifications.map(notification => (
//                 <div key={notification.id} className="notification">
//                   <div className="notification-icon">
//                     <Bell size={16} />
//                   </div>
//                   <div className="notification-content">
//                     <h3>{notification.title}</h3>
//                     <p>{notification.description}</p>
//                   </div>
//                   <div className="notification-time">
//                     <span>{notification.time}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Financial Projections Card */}
//           <div className="card financial-card">
//             <div className="card-header">
//               <h2>Financial Projections</h2>
//               <div className="chart-legend">
//                 <div className="legend-item">
//                   <span className="legend-color revenue"></span>
//                   <span>Income</span>
//                 </div>
//                 <div className="legend-item">
//                   <span className="legend-color cost"></span>
//                   <span>Expense</span>
//                 </div>
//               </div>
//             </div>
//             <div className="card-body">
//               <div className="line-chart">
//                 <div className="chart-grid">
//                   <div className="grid-line">90%</div>
//                   <div className="grid-line">80%</div>
//                   <div className="grid-line">70%</div>
//                   <div className="grid-line">60%</div>
//                   <div className="grid-line">50%</div>
//                   <div className="grid-line">40%</div>
//                 </div>
//                 <svg width="100%" height="200" viewBox="0 0 600 200">
//                   {/* Revenue Line */}
//                   <path
//                     d="M50,120 L150,108 L250,85 L350,70 L450,75 L550,60"
//                     fill="none"
//                     stroke="#6c5ce7"
//                     strokeWidth="3"
//                   />
//                   {/* Cost Line */}
//                   <path
//                     d="M50,140 L150,130 L250,135 L350,120 L450,105 L550,95"
//                     fill="none"
//                     stroke="#e84393"
//                     strokeWidth="3"
//                   />
//                 </svg>
//                 <div className="chart-labels">
//                   {financialData.map((item, index) => (
//                     <div key={index} className="month-label">{item.month.substring(0, 3)}</div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Dash;