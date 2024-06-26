"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const TicketForm = ({ ticket }) => {
  const router = useRouter();
  const startingTkData = {
    title: "",
    description: "",
    status: "not started",
    category: "Hardware Problem",
    priority: 1,
    progress: 0,
  };

  const EDITMODE = ticket?._id === "new" ? false : true;

  const [tkData, setTkData] = useState(startingTkData);
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setTkData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const res = await fetch("/api/Tickets", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ formData: tkData }),
    // });

    // if (!res.ok) {
    //   throw new Error("Error");
    // }
    if (EDITMODE) {
      const res = await fetch(`/api/Tickets/${ticket._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ formData: tkData }),
      });
      if (!res.ok) {
        throw new Error("Failed to update ticket");
      }
    } else {
      const res = await fetch("/api/Tickets", {
        method: "POST",
        body: JSON.stringify({ formData: tkData }),
        //@ts-ignore
        "Content-Type": "application/json",
      });
      if (!res.ok) {
        throw new Error("Failed to create ticket");
      }
    }
    router.refresh();
    router.push("/");
  };

  if (EDITMODE) {
    startingTkData["title"] = ticket?.title;
    startingTkData["description"] = ticket?.description;
    startingTkData["priority"] = ticket?.priority;
    startingTkData["progress"] = ticket?.progress;
    startingTkData["status"] = ticket?.status;
    startingTkData["category"] = ticket?.category;
  }
  return (
    <div className="flex justify-center">
      <form
        className=" flex flex-col justify-center w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{EDITMODE ? "Update " : "Create "} Your Ticket</h3>
        <div className="flex flex-col gap-3">
          <label>Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={tkData.title}
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>Description</label>
          <input
            id="desc"
            name="description"
            type="text"
            value={tkData.description}
            required={true}
            onChange={handleChange}
            rows="5"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>Category</label>
          <select
            name="category"
            value={tkData.category}
            onChange={handleChange}
          >
            <option value="Hardware Problem">Hardware Problem</option>
            <option value="Software Problem">Software Problem</option>
            <option value="Network Problem">Network Problem</option>
          </select>
        </div>
        <div className="flex flex-col gap-3">
          <label>Priority</label>
          <div className="flex flex-row gap-3">
            <div>
              <input
                id="priority-1"
                name="priority"
                type="radio"
                value={1}
                onChange={handleChange}
                checked={tkData.priority == 1}
              />
              <label htmlFor="priority-1">1</label>
            </div>
            <div>
              <input
                id="priority-2"
                name="priority"
                type="radio"
                value={2}
                onChange={handleChange}
                checked={tkData.priority == 2}
              />
              <label htmlFor="priority-2">2</label>
            </div>
            <div>
              <input
                id="priority-3"
                name="priority"
                type="radio"
                value={3}
                onChange={handleChange}
                checked={tkData.priority == 3}
              />
              <label htmlFor="priority-3">3</label>
            </div>
            <div>
              <input
                id="priority-4"
                name="priority"
                type="radio"
                value={4}
                onChange={handleChange}
                checked={tkData.priority == 4}
              />
              <label htmlFor="priority-4">4</label>
            </div>
            <div>
              <input
                id="priority-5"
                name="priority"
                type="radio"
                value={5}
                onChange={handleChange}
                checked={tkData.priority == 5}
              />
              <label htmlFor="priority-5">5</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <label>Progress</label>
          <input
            type="range"
            id="progress"
            name="progress"
            value={tkData.progress}
            min="0"
            max={"100"}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-3">
          <label>Status</label>
          <select name="status" value={tkData.status} onChange={handleChange}>
            <option value="not started">Not Started</option>
            <option value="started">Started</option>
            <option value="done">Done</option>
          </select>
        </div>
        <input
          type="submit"
          value={EDITMODE ? "Update Ticket" : "Create Ticket"}
          className="btn"
        />
      </form>
    </div>
  );
};

export default TicketForm;
