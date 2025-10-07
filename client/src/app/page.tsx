"use client";
import { useEffect, useRef, useState } from "react";   
import { toast } from 'react-hot-toast';
import Chat from './(components)/Chat/index';
import { Socket,io } from 'socket.io-client';

interface Message {
  type: "user" | "system";
  content: string;
  timeStamp: Date;
  username?: string;
}

export default function Home() {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const currentUserName = useRef<string|null>(null);
  

  useEffect(() => {
    //connecting the io server
    socketRef.current = io("http://localhost:3001");

    socketRef.current.on('connect', () => {
      console.log('Connected to server');
      // setIsConnected(true);
    });

    //listening for the messages from the server if any
    socketRef.current.on('message', (data) => {
      console.log('Message received:', data);
      if(data.username && data.type === 'system') currentUserName.current = data.username;
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    //listening for the disconnection event from the server
    socketRef.current.on('disconnect', () => {
      console.log('Disconnected from server');
      // setIsConnected(false);
    });
     
    //logging if any error occurs
    socketRef.current.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

  },[]);

  const updateText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let {value} = e.target;
    setText(value.replace(/\s+/g, ' '));
  }

  return (
    <div className="w-full h-full flex justify-center items-center bg-darkaccent rounded overflow-auto">
      <div className="xl:w-[50%] md:w-[75%] w-[95%] h-full flex flex-col items-center">
        <Chat messages={messages} currentUser={currentUserName.current}/>
          <div className="w-full flex flex-col items-center justify-center my-3">
            <textarea
              className="w-full h-32 rounded bg-deepblack border border-gray-500 text-gray-300 p-3 outline-none mt-5 resize-none focus:border-limegreen/60 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="Lets chat something!"
              value={text}
              onChange={updateText}
              // disabled={loading}
            />

            <div className="w-full flex justify-end items-center my-2">
              <div className="font-semibold text-xs sm:text-md md:text-lg shadow-sm shadow-limegreen/35 p-1 rounded w-28 text-center mt-2 text-gray-200">
                <span>{text.length >= 10 ? text.length : "0" + text.length}</span> / 175
              </div>
            </div>
            <button className="mt-2 w-full px-2 py-2 bg-darkaccent text-limegreen border border-limegreen rounded hover:bg-limegreen hover:text-darkaccent hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={text.length === 0 || text.length > 175 || !text.trim()}
              onClick={()=> {
                socketRef.current?.emit('message', text);
                setText("");
              }}
              >
             {'Send Message'}
            </button>
          </div>
      </div>
    </div>
  );
}
