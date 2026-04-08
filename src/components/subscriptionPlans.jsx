import React from "react";
import Button from "./common/button";
import { Check  } from "lucide-react";
const SubscriptionPlans = () => {

  const subcripPlans = [
    {
      plan: "Starter",
      price: "$29",
      features: [
        "Up to 10 users",
        "50 Products",
        "1,000 shares/month",
        "Basic analytics",
        "Email support"
      ]
    },
    {
      plan: "Professional",
      price: "$99",
      features: [
        "Up to 50 users",
        "500 products",
        "10,000 shares/month",
        "Advanced analytics",
        "Priority support",
        "Custom branding"
      ]
    },
    {
      plan: "Enterprise",
      price: "$399",
      features: [
        "Unlimited users",
        "Unlimited products",
        "Unlimited shares",
        "Advanced analytics",
        "24/7 support",
        "API access",
        "Dedicated account manager"
      ]
    }
  ];

  return (
    <div className="subscription-cards-container">
      {subcripPlans.map((plan, index) => {
        const isCurrent = index === 1;

        return (
          <div key={index} className="subscrip-cards">

            {/* Current badge */}
            {isCurrent && <span className="current-badge">Current</span>}

            <h3 style={{fontSize:'16px', fontWeight:'600'}}>{plan.plan}</h3>
            <p style={{fontSize:'24px', fontWeight:'600'}}>{plan.price}<span>/month</span></p>

            <ul>
              {plan.features.map((feature, idx) => (
                <li key={idx}><Check size={16} style={{color:'#5C308D'}}/> {feature}</li>
              ))}
            </ul>

            <div>
              {isCurrent ? (
                <button className="current-plan-btn">
                  Current Plan
                </button>
              ) : (
                <button className="btn btn-primary">Upgrade</button>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
};

export default SubscriptionPlans;