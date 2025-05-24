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
  trash,
  tv,
  users,
  yt,
} from "../../utils/Icons";
import Button from "../Button/Button";

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
        return "";
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
        return "";
    }
  };

  console.log("type", type);

  return (
    <IncomeItemStyled indicator={indicatorColor}>
      {type === "expense" ? expenseCatIcon() : categoryIcon()}

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
              {comment}
              {description}
            </p>
          </div>
          <div className="delete-btn" onClick={() => deleteItem(id)}>
            <Trash2 size={16} />
          </div>
        </div>
      </div>
    </IncomeItemStyled>
  );
}

const IncomeItemStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  padding: 0.5rem;
  margin: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 63%;
  color: var(--primary-color);
  // background-color: red;
  margin-left: 12rem !important;
  .icon {
    width: 80px;
    height: 80px;
    // background-color:green;
    border-radius: 20px;
    background: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    i {
      font-size: 2.6rem;
    }
  }

  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    // color:red;
    width: 100%;
    // background-color: red;
    // padding: 2rem
    // padding-right: 3rem;

    h5 {
      font-size: 1.5rem;
      // padding-left: 2rem;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: ${(props) => props.indicator};
      }
    }

    .inner-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      // padding: 2rem;
      // background-color: red;
      .text {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        p {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary-color);
          opacity: 0.8;
        }
      }

    .delete-btn {
    cursor: pointer;
    background: rgba(255, 87, 87, 0.15);
    border-radius: 50%;
    // margin-bottom:2rem;
    width: 40px;
    height: 40px;
    min-width: 40px; 
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ff5757;
    // transition: all 0.4s ease-in-out;

    // &:hover {
    //   background: rgba(255, 87, 87, 0.7);
    //   color: #fff;
    // }
  }
`;

export default IncomeItem;
