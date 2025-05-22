import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Send } from 'lucide-react';
import { Chat, Message, MessageResponse, StoreMessageResponse, User } from '@/types';
import messageService from '@/services/messageService';
import chatService from '@/services/chatService';
import { useEcho } from '@/hooks/useEcho';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Loader from '@/components/ui/loader';

interface EventResponse {
  chat_id: number
  data: StoreMessageResponse
}

const ChatPage = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null);
  const [messageResponses, setMessageResponses] = useState<MessageResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    content: ''
  });
  const bottomRef = useRef<HTMLDivElement>(null);
  const { user, accessToken } = useSelector((s: RootState) => s.auth)
  const echo = useEcho()

  const handleSelectContact = (contactId: number) => {
    setSelectedChatId(contactId);

  };

  const handleSendMessage = async () => {
    if (!formData.content.trim() || !selectedChatId) return;

    try {

      const response = await messageService.store(Number(selectedChatId), formData)

      if (response) {
        setMessageResponses(prev => prev.map(m => m.date === response.date ? { ...m, messages: [...m.messages, response.message] } : m))
        setFormData({ content: '' });
      }
    } catch (e: any) {
      console.log(e);

    }

  };

  const fetchMessages = async () => {
    const response = await messageService.index(selectedChatId!)

    if (response) {
      setMessageResponses(response)
    }
  }

  const fetchChats = async () => {
    const response = await chatService.index()

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
    fetchChats().finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    if (!accessToken || chats.length === 0) return;
    try {

      chats.forEach((chat) =>
        echo.channel(`chat.${chat.id}`)
          // .here((users: User[]) => {
          //   console.log('Users in chat:', users);
          // })
          // .joining((user: User) => {
          //   console.log('User joined:', user);
          // })
          // .leaving((user: User) => {
          //   console.log('User left:', user);
          // })
          .listen('.MessageSentEvent', (e: EventResponse) => {
            if (e.data.message.user_id === user?.id) return

            if (e.chat_id === selectedChatId) {
              setMessageResponses(prev =>
                prev.map(r =>
                  r.date === e.data.date
                    ? { ...r, messages: [...r.messages, e.data.message] }
                    : r
                )
              );
            }

            setChats(prev =>
              prev.map(c =>
                c.id === e.chat_id
                  ? { ...c, last_message: e.data.message }
                  : c
              )
            );
          })
      );

      return () => {
        chats.forEach(chat => {
          echo.leave(`chat.${chat.id}`);
        });
      }
    } catch (e: any) {
      console.log(e);

    };

  }, [accessToken, chats, selectedChatId]);



  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messageResponses])

  const selectedChat = chats.find(c => c.id === selectedChatId)

  if (isLoading) return <Loader />

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
                  key={chat.last_message?.created_at}
                  className={`p-4 flex gap-5 items-center cursor-pointer hover:bg-gray-50 ${selectedChatId === chat.id ? 'bg-gray-100' : ''}`}
                  onClick={() => handleSelectContact(chat.id)}
                >
                  <Avatar className="h-10 w-10">
                    <img
                      className='w-10 h-10 object-center object-cover'
                      src={chat.user.avatar} alt={chat.user.name} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{chat.user.name}</p>
                      <span className="text-xs text-gray-500">
                        {chat.last_message?.created_at}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm text-gray-500 truncate max-w-full">{chat.last_message?.user_id === user?.id ? 'You: ' : ''}{chat.last_message?.content}</p>
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

          <div className="flex flex-col h-full lg:overflow-hidden">
            {selectedChatId ? (
              <>
                <div className="p-4 border-b flex items-center gap-3 shrink-0">
                  <Avatar className="h-10 w-10">
                    <img
                      className='w-10 h-10 object-center object-cover'
                      src={selectedChat?.user.avatar}
                      alt={selectedChat?.user.name}
                    />
                  </Avatar>
                  <div>
                    <p className="font-medium">{selectedChat?.user.name}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messageResponses?.map((response, i) => (
                    <div key={i}>
                      <div className="flex justify-center mb-2">
                        <span className="bg-localfind-300 p-1.5 text-sm rounded-md text-white">
                          {response.date}
                        </span>
                      </div>
                      {response.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`mb-4 flex ${message.user_id === user?.id ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${message.user_id === user?.id
                              ? 'bg-localfind-600 text-white'
                              : 'bg-gray-100 text-gray-800'
                              }`}
                          >
                            <p className='break-all'>{message.content}</p>
                            <p
                              className={`text-xs mt-1 ${message.user_id === user?.id ? 'text-white/70' : 'text-gray-500'
                                }`}
                            >
                              {message.created_at}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Chat input */}
                <div className="p-4 border-t shrink-0">
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

export default ChatPage;