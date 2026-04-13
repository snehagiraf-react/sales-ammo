import React from 'react'
import Cards from './common/cards'

const MatrixSummaryCards = () => {
    const summaryData = [
        {
            title: "Total Shares This Month",
            value: "18,291",
            trend: "+8.3%",
            description: "from last month",
            isPositive: true,
            bg: "#7B2FBE",
            color: "#fff",
        },
        {
            title: "Avg. Shares per User",
            value: "7.2",
            trend: "+8.3%",
            description: "from last month",
            isPositive: true,
            bg: "#9B59D6",
            color: "#fff",
        },
        {
            title: "Most Shared Category",
            value: "Electronics",
            trend: "4,500",
            description: "shares",
            isPositive: true,
            bg: "#C9A8E8",
            color: "#4a1a7a",
        },
        {
            title: "Active Users Today",
            value: "1,247",
            trend: "82%",
            description: "engagement rate",
            isPositive: true,
            bg: "#E0D0F5",
            color: "#4a1a7a",
        },
    ]

  return (
    <>
      <Cards cardsData={summaryData} />
     
    </>
  )
}

export default MatrixSummaryCards