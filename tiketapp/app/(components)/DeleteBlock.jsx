"use client";
import { useRouter } from "next/navigation";

const { faX } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

function DeleteBlock({ id }) {
  const router = useRouter();
  const deleteTicket = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.refresh();
      }
      // router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={deleteTicket}
    />
  );
}

export default DeleteBlock;
