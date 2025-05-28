// import React from "react";
// import styled from "styled-components";
// import { dateFormat } from "../../utils/dateFormat";
// import { Trash2 } from "lucide-react";

// import {
//   bitcoin,
//   book,
//   calender,
//   card,
//   circle,
//   clothing,
//   comment,
//   dollar,
//   food,
//   freelance,
//   medical,
//   money,
//   piggy,
//   stocks,
//   takeaway,
//   trash,
//   tv,
//   users,
//   yt,
// } from "../../utils/Icons";
// import Button from "../Button/Button";

// function IncomeItem({
//   id,
//   title,
//   amount,
//   date,
//   category,
//   description,
//   deleteItem,
//   indicatorColor,
//   type,
// }) {
//   const categoryIcon = () => {
//     switch (category) {
//       case "salary":
//         return money;
//       case "freelancing":
//         return freelance;
//       case "investments":
//         return stocks;
//       case "stocks":
//         return users;
//       case "bitcoin":
//         return bitcoin;
//       case "bank":
//         return card;
//       case "youtube":
//         return yt;
//       case "other":
//         return piggy;
//       default:
//         return "";
//     }
//   };

//   const expenseCatIcon = () => {
//     switch (category) {
//       case "education":
//         return book;
//       case "groceries":
//         return food;
//       case "health":
//         return medical;
//       case "subscriptions":
//         return tv;
//       case "takeaways":
//         return takeaway;
//       case "clothing":
//         return clothing;
//       case "travelling":
//         return freelance;
//       case "other":
//         return circle;
//       default:
//         return "";
//     }
//   };

//   console.log("type", type);

//   return (
//     <IncomeItemStyled indicator={indicatorColor}>
//       {type === "expense" ? expenseCatIcon() : categoryIcon()}

//       <div className="content">
//         <h5>{title}</h5>
//         <div className="inner-content">
//           <div className="text">
//             <p>
//               {dollar} {amount}
//             </p>
//             <p>
//               {calender} {dateFormat(date)}
//             </p>
//             <p>
//               {comment}
//               {description}
//             </p>
//           </div>
//           <div className="delete-btn" onClick={() => deleteItem(id)}>
//             <Trash2 size={16} />
//           </div>
//         </div>
//       </div>
//     </IncomeItemStyled>
//   );
// }

// const IncomeItemStyled = styled.div`
//   background: #fcf6f9;
//   border: 2px solid #ffffff;
//   box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
//   border-radius: 20px;
//   padding: 0.5rem;
//   margin: 1.5rem;
//   display: flex;
//   align-items: center;
//   gap: 1rem;
//   width: 63%;
//   color: var(--primary-color);
//   // background-color: red;
//   margin-left: 12rem !important;
//   .icon {
//     width: 80px;
//     height: 80px;
//     // background-color:green;
//     border-radius: 20px;
//     background: #f5f5f5;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border: 2px solid #ffffff;
//     i {
//       font-size: 2.6rem;
//     }
//   }

//   .content {
//     flex: 1;
//     display: flex;
//     flex-direction: column;
//     gap: 0.2rem;
//     // color:red;
//     width: 100%;
//     background-color: red;
//     // padding: 2rem
//     // padding-right: 3rem;

//     h5 {
//       font-size: 1.5rem;
//       // padding-left: 2rem;
//       position: relative;
//       &::before {
//         content: "";
//         position: absolute;
//         left: 0;
//         top: 50%;
//         transform: translateY(-50%);
//         width: 0.8rem;
//         height: 0.8rem;
//         border-radius: 50%;
//         background: ${(props) => props.indicator};
//       }
//     }

//     .inner-content {
//       display: flex;
//       justify-content: space-between;
//       align-items: center;
//       width: 100%;
//       // padding: 2rem;
//       // background-color: red;
//       .text {
//         display: flex;
//         align-items: center;
//         gap: 1.5rem;
//         p {
//           display: flex;
//           align-items: center;
//           gap: 0.5rem;
//           color: var(--primary-color);
//           opacity: 0.8;
//         }
//       }

//     .delete-btn {
//     cursor: pointer;
//     background: rgba(255, 87, 87, 0.15);
//     border-radius: 50%;
//     // margin-bottom:2rem;
//     width: 40px;
//     height: 40px;
//     min-width: 40px; 
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     color: #ff5757;
//     // transition: all 0.4s ease-in-out;

//     // &:hover {
//     //   background: rgba(255, 87, 87, 0.7);
//     //   color: #fff;
//     // }
//   }
// `;

// export default IncomeItem;



import React from "react";
import styled from "styled-components";
import { dateFormat } from "../../utils/dateFormat";
import { Trash2 } from "lucide-react";

import {
  bitcoin,
  book,
  calender,
  card,
  circle,
  clothing,
  comment,
  dollar,
  food,
  freelance,
  medical,
  money,
  piggy,
  stocks,
  takeaway,
  tv,
  users,
  yt,
} from "../../utils/Icons";

function IncomeItem({
  id,
  title,
  amount,
  date,
  category,
  description,
  deleteItem,
  indicatorColor,
  type,
}) {
  const categoryIcon = () => {
    switch (category) {
      case "salary":
        return money;
      case "freelancing":
        return freelance;
      case "investments":
        return stocks;
      case "stocks":
        return users;
      case "bitcoin":
        return bitcoin;
      case "bank":
        return card;
      case "youtube":
        return yt;
      case "other":
        return piggy;
      default:
        return circle;
    }
  };

  const expenseCatIcon = () => {
    switch (category) {
      case "education":
        return book;
      case "groceries":
        return food;
      case "health":
        return medical;
      case "subscriptions":
        return tv;
      case "takeaways":
        return takeaway;
      case "clothing":
        return clothing;
      case "travelling":
        return freelance;
      case "other":
        return circle;
      default:
        return circle;
    }
  };

  return (
    <IncomeItemStyled indicator={indicatorColor}>
      <div className="icon">{type === "expense" ? expenseCatIcon() : categoryIcon()}</div>

      <div className="content">
        <h5>{title}</h5>
        <div className="inner-content">
          <div className="text">
            <p>
              {dollar} {amount}
            </p>
            <p>
              {calender} {dateFormat(date)}
            </p>
            <p>
              {comment} {description}
            </p>
          </div>
          <div className="delete-btn" onClick={() => deleteItem(id)}>
            <Trash2 size={18} />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #fff;
  border: 2px solid #f0f0f0;
  border-left: 6px solid ${(props) => props.indicator || "#007bff"};
  border-radius: 12px;
  padding: 1rem;
  margin: 1rem auto;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 90%;
  max-width: 800px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
  }

  .icon {
    font-size: 2rem;
    padding: 0.8rem;
    background: #f9f9f9;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h5 {
      font-size: 1.4rem;
      color: #333;
      margin-bottom: 0.2rem;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: -1.2rem;
        top: 50%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .text {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.95rem;
          color: #666;
        }
      }

      .delete-btn {
        cursor: pointer;
        background: #ffe6e6;
        border-radius: 50%;
        width: 36px;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ff4d4d;
        transition: background 0.3s;

        &:hover {
          background: #ff4d4d;
          color: white;
        }
      }
    }
  }
`;

export default IncomeItem;
