import React from "react";
import { useState } from "react";
import "../../assets/styles/cards.css";
import { color } from "motion";
import {
  MoveUp,
  Users,
  Share2,
  ShoppingBasket,
  MoveDown,
  TrendingUp,
  MoreVertical,
  Edit2,
  Trash2,
} from "lucide-react";

const Cards = ({ cardsData, onEdit }) => {
  const [openMenu, setOpenMenu] = useState(null);
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
            <div className="cardItem" key={index} style={{ background: card.bg || undefined, color: card.color || undefined }}>
              {card.trend ? (
                <div className="card-content">
                  <div className="card-left">
                    <h3 className="card-title" style={{ color: card.color || undefined }}>{card.title}</h3>
                    <p className="card-value" style={{ color: card.color || undefined }}>{card.value}</p>
                    <p
                      className={`card-trend ${card.isPositive ? "positive" : "negative"}`}
                      style={{ color: card.color || undefined, opacity: card.color ? 0.85 : undefined }}
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
                  {card.icon && (
                  <div
                    className="card-icon"
                    style={{
                      color: "#5C308D",
                      background: "#F3F0F7"
                    }}
                  >
                    {card.icon}
                  </div>
                  )}
                </div>
              ) : (
                <div className="card-category">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", width: "100%" }}>
                    <div style={{ flex: 1 }}>
                      <div
                        className="card-icon-category"
                        style={{
                          color: card.textColor || "#5C308D",
                          background: card.backgroundColor || "#F3F0F7"
                        }}
                      >
                        {card.icon}
                      </div>
                      <h3 className="card-title-category">{card.title}</h3>
                      <p className="card-value-category">{card.value}</p>
                    </div>
                    <div style={{ position: "relative" }}>
                      <button
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          padding: "8px",
                          display: "flex",
                          alignItems: "center",
                          color: "#999"
                        }}
                        onClick={() => setOpenMenu(openMenu === index ? null : index)}
                      >
                        <MoreVertical size={20} />
                      </button>
                      {openMenu === index && (
                        <div style={{
                          position: "absolute",
                          top: "100%",
                          right: 0,
                          background: "white",
                          border: "1px solid #e0e0e0",
                          borderRadius: "8px",
                          minWidth: "150px",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                          zIndex: 10
                        }}>
                          <button
                            style={{
                              width: "100%",
                              padding: "10px 16px",
                              border: "none",
                              background: "none",
                              textAlign: "left",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontSize: "14px",
                              color: "#333",
                              borderBottom: "1px solid #f0f0f0"
                            }}
                            onClick={() => { setOpenMenu(null); onEdit && onEdit(card); }}
                          >
                            <Edit2 size={16} /> Edit
                          </button>
                          <button
                            style={{
                              width: "100%",
                              padding: "10px 16px",
                              border: "none",
                              background: "none",
                              textAlign: "left",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              fontSize: "14px",
                              color: "#d32f2f"
                            }}
                            onClick={() => setOpenMenu(null)}
                          >
                            <Trash2 size={16} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
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
