import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Send } from 'lucide-react';
import { Chat, Message } from '@/types';
import messageService from '@/services/messageService';
import chatService from '@/services/chatService';



const ProviderChat = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState({
    content: ''
  });

  const handleSelectContact = (contactId: number) => {
    setSelectedChatId(contactId);

  };

  const handleSendMessage = async () => {
    if (!formData.content.trim() || !selectedChatId) return;

    const response = await messageService.store(Number(selectedChatId), formData)

    if (response) {
      setMessages(prev => [...prev, response])
      setFormData({ content: '' });
    }

  };

  const fetchMessages = async () => {
    const response = await messageService.index(selectedChatId!)

    if (response) {
      setMessages(response)
    }
  }

  const fetchChats = async () => {
    const response = await chatService.index()
    console.log(response);
    
    if (response) {
      setChats(response)
    }
  }

  useEffect(() => {
    if (selectedChatId) {
      fetchMessages()
    }
  }, [selectedChatId])

  useEffect(() => {
    fetchChats()
  }, [])

  const selectedChat = chats.find(c => c.id === selectedChatId)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Chat</h2>
        <p className="text-muted-foreground">Communicate with your clients</p>
      </div>

      <Card className="h-[70vh]">
        <div className="grid h-full lg:grid-cols-[320px_1fr]">
          {/* Contacts sidebar */}
          <div className="border-r min-w-0">
            <div className="p-4 font-medium">Conversations</div>
            <Separator />
            <div className="h-[calc(70vh-53px)] overflow-auto min-w-0">
              {chats.map(chat => (
                <div
                  key={chat.id}
                  className={`p-4 flex gap-5 items-center cursor-pointer hover:bg-gray-50 ${selectedChatId === chat.id ? 'bg-gray-100' : ''}`}
                  onClick={() => handleSelectContact(chat.id)}
                >
                  <Avatar className="h-10 w-10">
                    <img src={chat.user.avatar} alt={chat.user.name} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{chat.user.name}</p>
                      <span className="text-xs text-gray-500">
                        {chat.last_message.created_at}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm text-gray-500 truncate max-w-full">{chat.last_message.content}</p>
                      {/* {contact.unread > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 rounded-full text-[10px] flex items-center justify-center">
                          {contact.unread}
                        </Badge>
                      )} */}
                    </div>
                    {/* <p className="text-xs text-localfind-600">{chat.service}</p> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex flex-col h-full">
            {selectedChatId ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img
                      src={selectedChat?.user.avatar}
                      alt={selectedChat?.user.name}
                    />
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedChat?.user.name}</p>
                    {/* <p className="text-xs text-localfind-600">
                      {selectedChat?.service}
                    </p> */}
                  </div>
                </div>

                {/* Chat messages */}
                <div className="flex-1 overflow-auto p-4">
                  {messages?.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${message.is_owner ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${message.is_owner
                        ? 'bg-localfind-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                        }`}>
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 ${message.is_owner ? 'text-white/70' : 'text-gray-500'
                          }`}>
                          {message.created_at}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat input */}
                <div className="p-4 border-t">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={formData.content}
                      onChange={(e) => setFormData({ content: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!formData.content.trim()}
                      className="bg-localfind-600 hover:bg-localfind-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center p-4">
                <div>
                  <p className="text-muted-foreground">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProviderChat;