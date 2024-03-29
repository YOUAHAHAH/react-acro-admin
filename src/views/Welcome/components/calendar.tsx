import { Calendar, Tag } from "@arco-design/web-react";
import { nowDate, DateInnerContent } from "@/utils/timeConfig";
import { Dayjs } from "dayjs";

const data = [
  {
    time: "04-10",
    content: "04-10"
  },
  {
    time: "04-12",
    content: "04-12"
  },
  {
    time: "04-14",
    content: "04-14"
  },
  {
    time: "04-16",
    content: "04-16"
  }
];

const calendar = () => {
  const customizedInnerContent: DateInnerContent = (currentDate: Dayjs) => {
    return data.map(item => {
      if (currentDate.format("MM-DD") === item.time) {
        return (
          <Tag color="blue" key={item.time}>
            {item.content}
          </Tag>
        );
      }
    });
  };

  return (
    <div className="w-full overflow-auto">
      <Calendar
        defaultValue={nowDate("YYYY-MM-DD")}
        dateInnerContent={customizedInnerContent}
      />
    </div>
  );
};

export default calendar;
