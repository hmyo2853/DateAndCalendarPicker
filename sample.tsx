import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const DAY_OF_THE_WEEK = ["일", "월", "화", "수", "목", "금", "토"];
  const [isOpen, setIsOpen] = useState(false);
  const [today, setToday] = useState(dayjs());

  const firstDateOfMonth = `${today.get("year")}-${today.get("month") + 1}-01`;
  const lastDateOfMonth = today.endOf("month");

  const dayOfCurrentMonthArray = [];

  const selectDate = (date: string) => {
    setIsOpen(false);
    setToday(dayjs(date));
  };

  const handleDay = (num: number) => {
    setToday(today.add(num, "day"));
  };

  const handleMonth = (num: number) => {
    setToday(today.add(num, "month"));
  };

  for (let i = 0; i < 7; i++) {
    dayOfCurrentMonthArray.push(
      dayjs(firstDateOfMonth).day(i).format("YYYY-MM-DD")
    );
  }

  for (let i = 1; i < lastDateOfMonth.get("date") + 1; i++) {
    const date = `${today.get("year")}-${(today.get("month") + 1)
      .toString()
      .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
    if (!dayOfCurrentMonthArray.includes(date)) {
      dayOfCurrentMonthArray.push(date);
    }
  }

  for (let i = lastDateOfMonth.day() + 1; i < 7; i++) {
    dayOfCurrentMonthArray.push(lastDateOfMonth.day(i).format("YYYY-MM-DD"));
  }

  return (
    <div
      style={{
        width: "100wh",
        height: "100vh",
        backgroundColor: "white",
        color: "#222",
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem",
        cursor: "default",
      }}
    >
      <div>
        <h1 style={{ paddingBottom: "2rem" }}>DatePicker</h1>
        <div
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "260px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "default",
              padding: "8px",
              border: "1px solid #cdcdcd",
              borderRadius: "8px",
            }}
          >
            <div
              onClick={() => handleDay(-1)}
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "4px",
              }}
            >
              <Image
                width={16}
                height={16}
                src={"/arrow-left-solid.svg"}
                alt="왼쪽 화살표"
              />
            </div>
            <h4
              onClick={() => setIsOpen(!isOpen)}
              style={{ padding: "0 1rem" }}
            >
              {`${today.format("YYYY-MM-DD")} (${
                DAY_OF_THE_WEEK[today.day()]
              })`}
            </h4>
            <div
              onClick={() => handleDay(1)}
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "4px",
              }}
            >
              <Image
                width={16}
                height={16}
                src={"/arrow-right-solid.svg"}
                alt="오른쪽 화살표"
              />
            </div>
          </div>
          {isOpen && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                width: "260px",
                padding: "8px",
                border: "1px solid #cdcdcd",
                backgroundColor: "#fff",
                borderRadius: "8px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div onClick={() => handleMonth(-1)} style={{ padding: "4px" }}>
                  <Image
                    width={16}
                    height={16}
                    src={"/angle-left-solid.svg"}
                    alt="월 왼쪽 화살표"
                  />
                </div>
                <h3>{today.get("month") + 1 + "월"}</h3>
                <div onClick={() => handleMonth(1)} style={{ padding: "4px" }}>
                  <Image
                    width={16}
                    height={16}
                    src={"/angle-right-solid.svg"}
                    alt="월 오른쪽 화살표"
                  />
                </div>
              </div>
              <div
                style={{
                  marginTop: "8px",
                  border: 0,
                  borderColor: "#cdcdcd",
                  borderTopWidth: 1,
                  borderLeftWidth: 1,
                  borderStyle: "solid",
                }}
              >
                <div style={{ display: "flex", flexDirection: "row" }}>
                  {DAY_OF_THE_WEEK.map((day) => (
                    <div
                      key={day}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "34.42px",
                        height: "34.42px",
                        border: 0,
                        borderColor: "#cdcdcd",
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        borderStyle: "solid",
                        fontSize: "14px",
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                  }}
                >
                  {dayOfCurrentMonthArray.map((date, idx) => (
                    <div
                      key={idx}
                      onClick={() => selectDate(date)}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "34.42px",
                        height: "34.42px",
                        border: 0,
                        borderColor: "#cdcdcd",
                        borderRightWidth: 1,
                        borderBottomWidth: 1,
                        borderStyle: "solid",
                        fontSize: "14px",
                        backgroundColor:
                          dayjs(date).format("YYYY-MM-DD") ===
                          today.format("YYYY-MM-DD")
                            ? "#f6e8ff" // 선택된 날짜와 같으면 연보라색 배경
                            : "white", // 다르면 흰색 배경
                        color:
                          dayjs(date).format("M") !== today.format("M")
                            ? "#a1a1a1" // 선택된 날짜와 달이 다른 날은 회색 폰트 컬러
                            : dayjs(date).format("YYYY-MM-DD") ===
                              today.format("YYYY-MM-DD")
                            ? "#ba00ff" // 선택된 날짜와 같은 날은 보라색 폰트 컬러
                            : "#222", // 그 외 아무날짜도 아닌 경우 진한 회색 폰트 컬러
                      }}
                    >
                      {dayjs(date).format("D")}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          style={{
            width: "599px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            cursor: "default",
            gap: 40,
            padding: "1rem",
          }}
        >
          다른 영역
        </div>
      </div>
    </div>
  );
}
