import React, { useState, useEffect } from 'react';
import { Client as ConversationsClient } from '@twilio/conversations';

const Chat = ({ token }) => {
  const [conversationsClient, setConversationsClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const initConversations = async () => {
      const client = await ConversationsClient.create(token);
      setConversationsClient(client);

      client.on('conversationAdded', (conversation) => {
        conversation.getMessages().then((messages) => {
          setMessages(messages.items);
        });

        conversation.on('messageAdded', (message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });
      });
    };

    initConversations();
  }, [token]);

  const sendMessage = async () => {
    if (conversationsClient && message.trim()) {
      const conversation = await conversationsClient.getConversationBySid('<CONVERSATION_SID>');
      await conversation.sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg.body}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;