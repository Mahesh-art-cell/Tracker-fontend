import React from "react";
import styled from "styled-components";
import userAvatar from "../../img/money-control-hub-logo.svg";
import { useNavigate, NavLink } from "react-router-dom";
import { menuItems } from "../../utils/menuItems";

function Navigation() {
  const navigate = useNavigate();

  return (
    <NavStyled>
      <div className="user-con">
        <img src={userAvatar} alt="User avatar" />
        <div className="text">
          <h2>Tracker</h2>
          <br />
          <br />
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.link}
              className={({ isActive }) =>
                isActive ? "active nav-link" : "nav-link"
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="bottom-nav">
        <li>
          <button onClick={() => navigate("/")}>Signout</button>
        </li>
      </div>
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 280px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-con {
    height: 100px;
    display: flex;
    align-items: center;
    gap: 1rem;
    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    h2 {
      color: rgba(34, 34, 96, 1);
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;

    li {
      margin: 0.6rem 0;
      list-style-type: none;

      .nav-link {
        display: grid;
        grid-template-columns: 40px auto;
        align-items: center;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.4s ease-in-out;
        color: rgba(34, 34, 96, 0.6);
        padding-left: 1rem;
        position: relative;
        text-decoration: none;

        i {
          font-size: 1.4rem;
          transition: all 0.4s ease-in-out;
        }

        span {
          font-size: 1rem;
        }
      }

      .active {
        color: rgba(34, 34, 96, 1) !important;

        i {
          color: rgba(34, 34, 96, 1) !important;
        }

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 4px;
          height: 100%;
          background: #222260;
          border-radius: 0 10px 10px 0;
        }
      }
    }
  }

  .bottom-nav {
    list-style: none;
    padding: 0;

    li {
      list-style-type: none; 
    }

    button {
      background-color: transparent;
      color: #2c3e50;
      font-size: 16px;
      padding: 10px 20px;
      border: 2px solid #2c3e50;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
      font-weight: 500;
    }

    button:hover {
      background-color: #2c3e50;
      color: white;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    }
  }
`;

export default Navigation;
