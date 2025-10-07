"use client";
import React from "react";

interface ChatMessageProps {
  type: "user" | "system";
  content: string;
  timeStamp: Date;
  username?: string;
  currentUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  type,
  content,
  timeStamp,
  username,
  currentUser,
}) => {

  console.log("date: ", timeStamp.toLocaleString())
  return (
    <>
    {
    type === "system" ? (
      <div className="w-44 p-1 h-6 rounded bg-gray-700 text-gray-300 my-1 self-center flex items-center justify-center">
        <p className="text-xs sm:text-sm text-center">{content}</p>
      </div>
    ) : (
      <>
        <div
          className={`w-32 sm:w-64 p-1 max-h-40 rounded bg-darkaccent text-gray-200 my-1 ${
            currentUser ? "self-end" : "self-start"
          }`}
        >
          <p className="text-xs">{currentUser ? 'You' : username}</p>
          <hr className="my-2 border border-gray-500" />
          <div className="w-full overflow-y-auto text-xs sm:text-sm">
            <p>{content}</p>
          </div>
          <hr className="my-2 border border-gray-500" />
            <p className="text-xs text-right my-1">
              {`${new Date(timeStamp).toLocaleString()}`}
            </p>
        </div>
      </>
    )
    }
    </>
  );
};

export default ChatMessage;
