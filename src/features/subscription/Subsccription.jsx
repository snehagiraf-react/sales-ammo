import React from "react";
import { useLocation } from "react-router-dom";
import { getPageTitle } from "../../utils/getPageTitle";
import { Crown } from "lucide-react";
import "../../assets/styles/subscription.css";
import SubscriptionPlans from "../../components/subscriptionPlans";

const Subsccription = () => {
  const subcripPlans = [
    {
      billDate: "2024-07-15",
      buttonText: "Manage Billing",
      plan: "$99/month",
    },
  ];
  const location = useLocation();
  return (
    <>
      <div className="page-body">
        <div className="page-header">
          <h1 className="page-title">{getPageTitle(location.pathname)}</h1>
          <p style={{ color: "rgb(85, 85, 85)", fontSize: "13px" }}>
            Manage your subscription and billing
          </p>
        </div>
      </div>

      <div className="subscription-section">
        <h3>Current Plan</h3>
        {subcripPlans.map((plan, index) => (
          <div key={index} className="subscribe">
            <div className="subscription-content">
              <div className="subscription-left">
                <div className="subscription-plan">
                  <Crown size={24} color="#ffffff" />
                  <span>Professional Plan</span>
                </div>
                <p className="billing-date">Next billing date: {plan.billDate}</p>
                <p className="plan-price">{plan.plan}</p>
              </div>
              <div className="subscription-right">
                <button className="manage-btn">{plan.buttonText}</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SubscriptionPlans />
    </>
  );
};

export default Subsccription;
