import React from "react";

const StatCard = ({ title, value, icon }) => {
return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 hover:shadow-lg transition">

      {/* Icon Box */}
    <div className="bg-blue-100 text-blue-600 p-4 rounded-xl">
        {icon}
    </div>

      {/* Text */}
    <div>
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
    
    </div>
);
};

export default StatCard;
