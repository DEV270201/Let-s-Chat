"use client";

import { timeStamp } from "console";
import React,{ useEffect, useState, useRef } from "react";
import { toast } from 'react-hot-toast';
import ChatMessage from "../ChatMessage";

interface message {
    type: "user" | "system";
    content: string;
    timeStamp: Date;
    username?: string;
}

interface ChatProps {
  messages: message[];
  currentUser?: string|null;
}

export default function Chat({messages, currentUser}: ChatProps) {

  const chatRef =  useRef<HTMLDivElement|null>(null);

  useEffect(() => {
    if(chatRef.current) {
      console.log("scrolling");
      chatRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  return (
        <div className="bg-deepblack w-full rounded my-2 overflow-auto p-2 flex flex-col">
          {
            messages.map((msg, index) => (
               <ChatMessage key={index} type={msg.type as "user" | "system"} content={msg.content} timeStamp={msg.timeStamp} username={msg.username} currentUser={msg.username === currentUser} />
            ))
          }
          <div className="" ref={chatRef}></div>
        </div>
  );
}
