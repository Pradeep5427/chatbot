import { configureStore } from "@reduxjs/toolkit";
import chatbot from "../Features/Chatbot/chatbot";

export const store = configureStore({
  reducer: {
    chatbotDetails: chatbot,
  },
});

export default store;
