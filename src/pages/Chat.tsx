import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import { Send, Smile, Paperclip, Phone, Video, MoreVertical, MessageCircle } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'Sarah Johnson',
      content: 'Hey! How are you doing today?',
      timestamp: '10:30 AM',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=150'
    },
    {
      id: '2',
      sender: 'You',
      content: 'I\'m doing great! Just finished my morning workout 💪',
      timestamp: '10:32 AM',
      isOwn: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    },
    {
      id: '3',
      sender: 'Sarah Johnson',
      content: 'That\'s awesome! I should really get back into exercising. Any tips?',
      timestamp: '10:35 AM',
      isOwn: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=150'
    },
    {
      id: '4',
      sender: 'You',
      content: 'Start small! Even 15 minutes a day makes a difference. I can share my routine if you\'d like 😊',
      timestamp: '10:37 AM',
      isOwn: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [activeChat, setActiveChat] = useState('Sarah Johnson');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const conversations = [
    {
      id: '1',
      name: 'Sarah Johnson',
      lastMessage: 'Start small! Even 15 minutes a day...',
      timestamp: '10:37 AM',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b287?w=150',
      online: true
    },
    {
      id: '2',
      name: 'Alex Chen',
      lastMessage: 'Thanks for the coffee recommendation!',
      timestamp: 'Yesterday',
      unread: 2,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      online: true
    },
    {
      id: '3',
      name: 'Emma Davis',
      lastMessage: 'See you at the meeting tomorrow',
      timestamp: 'Yesterday',
      unread: 0,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      online: false
    },
    {
      id: '4',
      name: 'Team Design',
      lastMessage: 'Mike: Great work on the mockups!',
      timestamp: '2 days ago',
      unread: 5,
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150',
      online: false
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now().toString(),
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto pt-4 pb-20 md:pb-4">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-6 p-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Messages</h1>
          <Navigation />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <h3 className="font-semibold">Conversations</h3>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setActiveChat(conversation.name)}
                    className={`flex items-center space-x-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors ${
                      activeChat === conversation.name ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                    }`}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                        {conversation.unread > 0 && (
                          <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                            {conversation.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Window */}
          <Card className="lg:col-span-2 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b287?w=150" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{activeChat}</h3>
                    <p className="text-sm text-green-500">Online</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Phone size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video size={16} />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreVertical size={16} />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-2 max-w-xs lg:max-w-md ${message.isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className={`rounded-lg px-3 py-2 ${
                      message.isOwn 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-4">
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm">
                  <Paperclip size={16} />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button variant="ghost" size="sm">
                  <Smile size={16} />
                </Button>
                <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;
