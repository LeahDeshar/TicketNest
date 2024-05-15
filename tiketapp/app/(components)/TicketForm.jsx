"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = () => {
  const startingTkData = {
    title: "",
    description: "",
    status: "open",
    category: "Hardware Problem",
    priority: 1,
    progress: 0,
  };
  const [tkData, setTkData] = useState(startingTkData);
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTkData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <form>
        <h3>Create Your Ticket</h3>
        <label>Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={tkData.title}
          required={true}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default TicketForm;
