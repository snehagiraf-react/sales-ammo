import React from "react";
import "../../assets/styles/cards.css";
import { color } from "motion";
import {
  MoveUp,
  Users,
  Share2,
  ShoppingBasket,
  MoveDown,
  TrendingUp,
} from "lucide-react";

const Cards = ({ cardsData }) => {
  const dashboardCards = cardsData || [
    {
      title: "Total Users",
      value: "2,543",
      icon: <Users size={25} />,
      trend: "+12.5%",
      description: "vs last month",
      isPositive: true,
    },
    {
      title: "Total Shares",
      value: "850",
      icon: <Share2 size={25} />,
      trend: "+8.2%",
      description: "vs last month",
      isPositive: true,
    },
    {
      title: "Active Products",
      value: "1,245",
      icon: <ShoppingBasket size={25} />,
      trend: "-3.1%",
      description: "vs last month",
      isPositive: false,
    },
    {
      title: "Monthly Growth",
      value: "42.8%",
      icon: <TrendingUp size={25} />,
      trend: "+15.3%",
      description: "vs last month",
      isPositive: true,
    },
  ];
  return (
    <>
      <div className="cards-container">
        <div className="card-body">
          {dashboardCards.map((card, index) => (
            <div className="cardItem" key={index}>
              {card.trend ? (
                <div className="card-content">
                  <div className="card-left">
                    <h3 className="card-title">{card.title}</h3>
                    <p className="card-value">{card.value}</p>
                    <p
                      className={`card-trend ${card.isPositive ? "positive" : "negative"}`}
                    >
                      <span className="trend-icon">
                        {card.isPositive ? (
                          <MoveUp size={14} />
                        ) : (
                          <MoveDown size={14} />
                        )}
                      </span>
                      <span className="trend-text">
                        {card.trend} 
                      </span>
                      <span className="trend-description">
                        {card.description}
                      </span>
                    </p>
                  </div>
                  <div
                    className="card-icon"
                    style={{
                      color: "#5C308D",
                      background: "#F3F0F7"
                    }}
                  >
                    {card.icon}
                  </div>
                </div>
              ) : (
                <div className="card-category">
                  <div
                    className="card-icon-category"
                    style={{
                      color: "#5C308D",
                      background: "#F3F0F7"
                    }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="card-title-category">{card.title}</h3>
                  <p className="card-value-category">{card.value}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
