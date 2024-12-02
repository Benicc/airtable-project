import React, { useState } from "react";

type TabProps = {
  tabs: string[]; // Array of tab labels
  content: string[]; // Corresponding tab content
};

const Tabs: React.FC<TabProps> = ({ tabs, content }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Tab Headers */}
      <div className="flex border-b">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`flex-1 py-2 text-center ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        <p>{content[activeTab]}</p>
      </div>
    </div>
  );
};

export default Tabs;