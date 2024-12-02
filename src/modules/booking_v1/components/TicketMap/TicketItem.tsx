import React from "react";
import Room from "@mui/icons-material/Room"; // Ensure this matches your icon import
import style from "../../style/Ticket.module.css"; // Assuming your additional styles
import { TicketData } from "../../types/TicketData";
import LoadingIndicator from "@/lib/Loading";

const TicketItem = ({
  ticket,
  onClick,
  isActive,
  isLoading,
}: {
  ticket: TicketData;
  onClick: () => void;
  isActive: boolean;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div
        key={ticket.id}
        className={`${ticket.ticketStatus ? style.activeTicket : style.inactiveTicket} ${style.container} ${isActive ? style.activeBorder : ""}`}
        onClick={onClick}
      >
        <div className="flex h-32 items-center justify-center">
          <LoadingIndicator />
        </div>
      </div>
    );
  }
  return (
    <div
      key={ticket.id}
      className={`${ticket.ticketStatus ? style.activeTicket : style.inactiveTicket} ${style.container} ${isActive ? style.activeBorder : ""}`}
      onClick={onClick}
    >
      <div className="mb-2 flex items-center justify-between">
        <div className="text-[16px] font-semibold text-[#248d3b]">
          {ticket.ticketName}
        </div>
        {ticket.ticketPhone && (
          <div className="ml-2 rounded border border-[#3d3d3d] px-2 py-[1px] text-[16px] font-semibold text-black">
            {ticket.ticketPhone}
          </div>
        )}
      </div>

      {ticket.customerName && (
        <div className="mb-1 text-left">
          <span className="block text-sm font-medium text-black">
            {ticket.customerName}
          </span>
        </div>
      )}

      <div className="mb-1 text-sm">
        {ticket.ticketPhone && (
          <div className="flex items-center pb-[1px]">
            <Room className="text-[15px] text-[#0072bc]" />
            <span className="pl-[1px] font-medium text-black">
              {ticket.ticketPointUp}
            </span>
          </div>
        )}
        {ticket.ticketPhone && (
          <div className="flex items-center pb-[1px]">
            <Room className="text-[15px] text-[#c03030]" />
            <span className="pl-[1px] font-medium text-black">
              {ticket.ticketPointDown}
            </span>
          </div>
        )}
      </div>

      {ticket.ticketPhone && (
        <div className="text-right text-xs">
          <span className="block font-medium text-black">(1) {ticket.id}</span>
        </div>
      )}

      {ticket.ticketNote && (
        <div className="mt-[3px] text-left">
          <span className="block text-[14px] font-medium text-blue-600">
            * {ticket.ticketNote}
          </span>
        </div>
      )}

      <div>
        {ticket.paymentType && (
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-[13px] font-medium text-black">
                {ticket.ticketPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <div className="text-[13px] font-medium text-black">
              {ticket.paymentType === 1 && "TTTT"}
              {ticket.paymentType === 2 && "TTTX"}
              {ticket.paymentType === 3 && "TTTQ"}
            </div>
          </div>
        )}
        {ticket.paymentType && (
          <div className="mt-[1px] w-full">
            <div className="progress h-[5px] rounded bg-gray-300">
              <div
                className={`progress-bar h-full rounded ${
                  ticket.paymentType === 1
                    ? "bg-green-600"
                    : ticket.paymentType === 2
                      ? "bg-yellow-500"
                      : "bg-blue-600"
                }`}
                style={{ width: "100%" }}
              ></div>
            </div>
          </div>
        )}
        {ticket.employeeName && (
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="text-[12px] font-medium text-black">
              B: {ticket.employeeName} / {ticket.officeName}
            </span>
            {/* <span className="text-[12px] text-black font-medium">D: đại lý giọt đắng </span> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketItem;
