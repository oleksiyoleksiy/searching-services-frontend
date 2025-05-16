import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CalendarIcon, Clock, ArrowRight } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { Service } from '@/types';
import availabilityService from '@/services/availabilityService';
import bookingService from '@/services/bookingService';

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  providerId: string;
  providerName: string;
  preselectedService?: string;
  services?: Service[]
}

// Sample services
const services = [
  { id: '1', name: 'Basic Service', price: '$50' },
  { id: '2', name: 'Standard Service', price: '$80' },
  { id: '3', name: 'Premium Service', price: '$120' },
];

const formSchema = z.object({
  service: z.string().min(1, "Please select a service"),
  date: z.date({
    required_error: "Please select a date",
  }),
  start_time: z.string().min(1, "Please select a time slot"),
  // name: z.string().min(2, "Name must be at least 2 characters"),
  // contact: z.string().min(5, "Please provide a valid email or phone number"),
  // comments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const BookingModal: React.FC<BookingModalProps> = ({
  open,
  onOpenChange,
  providerId,
  services,
  providerName,
  preselectedService
}) => {
  const [step, setStep] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      service: preselectedService || '',
      // comments: '',
    },
  });

  const onDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      form.setValue('date', date);
      fetchTimeSlots(date);
    }
  };

  const fetchTimeSlots = async (date: Date) => {
    const response = await availabilityService.index(providerId, `date=${format(date, 'yyyy-MM-dd')}`)


    if (response) {
      setTimeSlots(response);
    }
  }

  const nextStep = () => {
    if (step === 0 && !form.getValues('service')) {
      form.setError('service', { message: 'Please select a service' });
      return;
    }

    if (step === 1 && (!form.getValues('date') || !form.getValues('start_time'))) {
      if (!form.getValues('date')) form.setError('date', { message: 'Please select a date' });
      if (!form.getValues('start_time')) form.setError('start_time', { message: 'Please select a time slot' });
      return;
    }

    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const onSubmit = async (data: FormValues) => {

    try {
      const response = await bookingService.store(Number(data.service), {
        ...data,
      })

      if (response) {
        setIsSubmitted(true);
        form.reset()
        setStep(0)
        toast.success("Booking request received!");
      }
    } catch (e: any) {
      console.log(e);
      
    }
  };

  const handleClose = () => {
    setStep(preselectedService ? 1 : 0);
    setIsSubmitted(false);
    form.reset();
    setStep(0)
    onOpenChange(false);
  };

  useEffect(() => {
    if (preselectedService) {
      form.setValue('service', preselectedService);
      setStep(1)
    }
  }, [preselectedService])

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isSubmitted ? 'Booking Confirmed' : `Book with ${providerName}`}
          </DialogTitle>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-6 text-center">
            <div className="mb-4 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-medium">Thank you for your booking request!</h3>
            <p className="mt-2 text-sm text-gray-500">
              We've received your booking request and will contact you shortly to confirm your appointment.
            </p>
            <Button className="mt-4 bg-localfind-600 hover:bg-localfind-700" onClick={handleClose}>
              Close
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Step 0: Service Selection */}
              {step === 0 && (
                <div>
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Select a Service</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            {services?.map(service => (
                              <FormItem
                                key={service.id}
                                className="flex items-center space-x-3 space-y-0 border rounded-md p-3 cursor-pointer hover:bg-gray-50"
                              >
                                <FormControl>
                                  <RadioGroupItem value={String(service.id)} />
                                </FormControl>
                                <div className="flex-1">
                                  <FormLabel className="cursor-pointer flex justify-between">
                                    <span>{service.name}</span>
                                    <span className="text-localfind-600">{service.price}</span>
                                  </FormLabel>
                                </div>
                              </FormItem>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 flex justify-end">
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-localfind-600 hover:bg-localfind-700"
                    >
                      Next
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2">
                        <FormLabel>Select a Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(date) => onDateSelect(date)}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedDate && (
                    <FormField
                      control={form.control}
                      name="start_time"
                      render={({ field }) => (
                        <FormItem className="mt-4 flex flex-col gap-2">
                          <FormLabel>Select a Time</FormLabel>
                          {timeSlots.length > 0 ? <div className="grid grid-cols-3 gap-2">
                            {timeSlots?.map((time) => (
                              <Button
                                key={time}
                                type="button"
                                variant={field.value === time ? "default" : "outline"}
                                className={field.value === time ? "bg-localfind-600 hover:bg-localfind-700" : ""}
                                onClick={() => form.setValue('start_time', time)}
                              >
                                <Clock className="mr-1 h-4 w-4" />{time}
                              </Button>
                            ))}
                          </div> : <p className='w-full flex justify-center p-5'>no available options for this day</p>}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <div className="pt-4 flex justify-between">
                    {!preselectedService && (
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Back
                      </Button>
                    )}

                    <Button type="submit" className="bg-localfind-600 hover:bg-localfind-700">
                      Submit Request
                    </Button>
                  </div>
                </div>
              )}

              {/* {step === 2 && (
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Email or Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="Your email or phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comments"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Additional Comments (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Add any special requests or information"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="submit" className="bg-localfind-600 hover:bg-localfind-700">
                      Submit Request
                    </Button>
                  </div>
                </div>
              )} */}
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
