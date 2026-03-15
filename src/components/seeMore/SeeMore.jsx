import React, { useState } from "react";

const SeeMore = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  if (text.length <= 20) {
    return <span> {text}</span>;
  }
  return (
    <span>
      {isExpanded ?  text  : text?.substring(0, 20) + "..."}
      <span
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          color: "blue",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "14px",
          marginLeft: "5px",
          textDecoration: "underline",
        }}
      >
        {isExpanded ? " less" : "more"}
      </span>
    </span>
  );
};

export default SeeMore;
