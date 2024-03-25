import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: 1,
    botName: "Sample-1",
    botDescription: "card-1",
    wizardPicture:
      "https://i.pinimg.com/originals/4d/b1/3a/4db13a49a45387c5dda644b365b78f1b.jpg",
  },
];

export const chatbot = createSlice({
  name: "chatbotActions",
  initialState,
  reducers: {
    addChatBot(state, action) {
      state.push(action.payload);
    },
    deleteChatBot(state, action) {
      const { id } = action.payload;
      console.log("reducerID..", id);
      const existingBot = state.find((user) => user.id === id);
      if (existingBot) {
        return state.filter((bot) => bot.id != id);
      }
    },
  },
});

export const { addChatBot, deleteChatBot } = chatbot.actions;

export default chatbot.reducer;
