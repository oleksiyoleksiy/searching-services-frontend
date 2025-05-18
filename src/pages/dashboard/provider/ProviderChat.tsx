import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';
import { Send } from 'lucide-react';

// Mock data for chat contacts
const mockContacts = [
  {
    id: '1',
    name: 'John Smith',
    lastMessage: 'When will you arrive for the cleaning?',
    time: new Date(2025, 4, 27, 14, 30),
    unread: 2,
    avatar: 'https://i.pravatar.cc/150?img=1',
    service: 'Home Cleaning',
  },
  {
    id: '2',
    name: 'Alice Johnson',
    lastMessage: 'Thanks for the service!',
    time: new Date(2025, 4, 26, 10, 15),
    unread: 0,
    avatar: 'https://i.pravatar.cc/150?img=2',
    service: 'Lawn Mowing',
  },
  {
    id: '3',
    name: 'Bob Williams',
    lastMessage: 'I need to reschedule my appointmentI need to reschedule my appointmentI need to reschedule my appointmentI need to reschedule my appointmentI need to reschedule my appointmentI need to reschedule my appointmentI need to reschedule my appointment',
    time: new Date(2025, 4, 25, 9, 45),
    unread: 1,
    avatar: 'https://i.pravatar.cc/150?img=3',
    service: 'Home Cleaning',
  },
];

// Mock data for messages
const mockMessages = {
  '1': [
    {
      id: '1',
      text: 'Hi, I booked a cleaning service for tomorrow.',
      sender: 'client',
      time: new Date(2025, 4, 27, 14, 0),
    },
    {
      id: '2',
      text: 'Yes, we have you scheduled for 2pm.',
      sender: 'provider',
      time: new Date(2025, 4, 27, 14, 10),
    },
    {
      id: '3',
      text: 'When will you arrive for the cleaning?',
      sender: 'client',
      time: new Date(2025, 4, 27, 14, 30),
    },
  ],
  '2': [
    {
      id: '1',
      text: 'The lawn looks great!',
      sender: 'client',
      time: new Date(2025, 4, 26, 10, 0),
    },
    {
      id: '2',
      text: "I'm glad you're happy with our service.",
      sender: 'provider',
      time: new Date(2025, 4, 26, 10, 5),
    },
    {
      id: '3',
      text: 'Thanks for the service!',
      sender: 'client',
      time: new Date(2025, 4, 26, 10, 15),
    },
  ],
  '3': [
    {
      id: '1',
      text: ' I need to reschedule my appointmentI need to reschedule my appointmentI need to reschedule my appointmentI need to reschedule my appointment',
      sender: 'client',
      time: new Date(2025, 4, 25, 9, 45),
    },
  ],
};

const ProviderChat = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [selectedContact, setSelectedContact] = useState<string | null>(null);
  const [messages, setMessages] = useState<any>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSelectContact = (contactId: string) => {
    setSelectedContact(contactId);
    // Clear unread messages
    setContacts(contacts.map(contact =>
      contact.id === contactId ? { ...contact, unread: 0 } : contact
    ));
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedContact) return;

    const newMessageObj = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: 'provider',
      time: new Date(),
    };

    setMessages({
      ...messages,
      [selectedContact]: [...(messages[selectedContact] || []), newMessageObj],
    });

    setNewMessage('');
  };

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
              {contacts.map(contact => (
                <div
                  key={contact.id}
                  className={`p-4 flex gap-5 items-center cursor-pointer hover:bg-gray-50 ${selectedContact === contact.id ? 'bg-gray-100' : ''}`}
                  onClick={() => handleSelectContact(contact.id)}
                >
                  <Avatar className="h-10 w-10">
                    <img src={contact.avatar} alt={contact.name} />
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{contact.name}</p>
                      <span className="text-xs text-gray-500">
                        {format(contact.time, 'p')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2">
                      <p className="text-sm text-gray-500 truncate max-w-full">{contact.lastMessage}</p>
                      {contact.unread > 0 && (
                        <Badge variant="destructive" className="h-5 w-5 rounded-full text-[10px] flex items-center justify-center">
                          {contact.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-localfind-600">{contact.service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex flex-col h-full">
            {selectedContact ? (
              <>
                {/* Chat header */}
                <div className="p-4 border-b flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <img
                      src={contacts.find(c => c.id === selectedContact)?.avatar}
                      alt={contacts.find(c => c.id === selectedContact)?.name}
                    />
                  </Avatar>
                  <div>
                    <p className="font-medium">{contacts.find(c => c.id === selectedContact)?.name}</p>
                    <p className="text-xs text-localfind-600">
                      {contacts.find(c => c.id === selectedContact)?.service}
                    </p>
                  </div>
                </div>

                {/* Chat messages */}
                <div className="flex-1 overflow-auto p-4">
                  {messages[selectedContact]?.map((message: any) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex ${message.sender === 'provider' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-lg px-4 py-2 ${message.sender === 'provider'
                        ? 'bg-localfind-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                        }`}>
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'provider' ? 'text-white/70' : 'text-gray-500'
                          }`}>
                          {format(message.time, 'p')}
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
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
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