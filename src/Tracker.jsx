// // Tracker.jsx
// import React, { useMemo } from "react";
// import styled from "styled-components";
// import bg from "./img/bg.png";
// import { MainLayout } from "./styles/Layouts";
// import Orb from "./Components/Orb/Orb";
// import Navigation from "./Components/Navigation/Navigation";
// import Dashboard from "./Components/Dashboard/Dashboard";
// import Income from "./Components/Income/Income";
// import Expenses from "./Components/Expenses/Expenses";
// import { Routes, Route } from "react-router-dom";

// function Tracker() {
//   const orbMemo = useMemo(() => <Orb />, []);

//   return (
//     <AppStyled bg={bg} className="App">
//       {orbMemo}
//       <MainLayout>
//         <Navigation />
//         <main>
//           <Routes>
//             <Route path="" element={<Dashboard />} />
//             <Route path="transactions" element={<Dashboard />} />
//             <Route path="incomes" element={<Income />} />
//             <Route path="expenses" element={<Expenses />} />
//           </Routes>
//         </main>
//       </MainLayout>
//     </AppStyled>
//   );
// }

// const AppStyled = styled.div`
//   height: 100vh;
//   background-image: url(${(props) => props.bg});
//   position: relative;
//   main {
//     flex: 1;
//     background: rgba(252, 246, 249, 0.78);
//     border: 3px solid #ffffff;
//     backdrop-filter: blur(4.5px);
//     border-radius: 32px;
//     overflow-x: hidden;
//     &::-webkit-scrollbar {
//       width: 0;
//     }
//   }
// `;

// export default Tracker;

import React, { useMemo } from "react";
import styled from "styled-components";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import { Outlet } from "react-router-dom"; 

function Tracker() {
  const orbMemo = useMemo(() => <Orb />, []);

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <MainLayout>
        <Navigation />
        <main>
          <Outlet />
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${(props) => props.bg});
  position: relative;

  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default Tracker;
