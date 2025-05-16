import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";


export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-5", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "space-y-4",
        caption: "relative flex items-center justify-center pt-1",
        caption_label: "text-sm font-medium",
        nav: "flex items-center space-x-1",
        button_previous: "absolute left-2 cursor-pointer",
        button_next: "absolute right-2 cursor-pointer",
        month_grid: "w-full border-collapse",
        weekdays: "flex justify-between px-1",
        weekday: "w-9 text-center text-[0.8rem] font-normal text-muted-foreground",
        week: "flex w-full",
        day: 'flex justify-center align-items h-9 w-9 p-0 font-normal text-sm text-center',
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
        today: "bg-accent text-white rounded-md",
        outside:
          "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        range_end: "rounded-r-md",
        hidden: "invisible",
        ...classNames,
      }}
      
      // modifiersClassNames={{
      //   disabled: "text-muted-foreground opacity-50 pointer-events-none",
      //   selected: "bg-localfind-100",
      // }}
      // components={{
      //   IconLeft: () => <ChevronLeft className="h-4 w-4" />,
      //   IconRight: () => <ChevronRight className="h-4 w-4" />,
      // }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
