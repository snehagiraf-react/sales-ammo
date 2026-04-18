const activities = [
  {
    initials: "SJ",
    name: "Sam Jacob",
    action: "Added new product",
    time: "5 mins ago"
  },
  {
    initials: "AW",
    name: "Angel Wilson",
    action: "Shared Catalog",
    time: "12 mins ago"
  },
  {
    initials: "JM",
    name: "John Mathew",
    action: "Updated Profile",
    time: "1 hr ago"
  },
  {
    initials: "JM",
    name: "Mike John",
    action: "Updated Profile",
    time: "5 mins ago"
  }
];

export default function RecentActivity() {
  return (
    <div className="activity-card">
      <h3>Recent Activity</h3>

      {activities.map((item, index) => (
        <div key={index} className="activity-row">
          
          {/* Left Side */}
          <div className="left">
            <div className="avatar">{item.initials}</div>

            <div>
              <p className="name">{item.name}</p>
              <p className="action">{item.action}</p>
            </div>
          </div>

          {/* Right Side */}
          <p className="time">{item.time}</p>
        </div>
      ))}
    </div>
  );
}