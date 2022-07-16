import React, { useEffect, useState } from "react";
import { getTime } from "../../../commons/getDate";
import DetailSidebarUI from "./DetailSidebar.presenter";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { CREATE_PAYMENT } from "./DetailSibebar.queries";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

interface data {
  roomId: string;
  date: string;
  start_time: string;
  end_time: string;
  price: number;
  guest: number;
}

interface aaa {
  time: string;
  clicked: boolean;
}

const hour: Array<aaa> = [
  { time: "09:00", clicked: false },
  { time: "10:00", clicked: false },
  { time: "11:00", clicked: false },
  { time: "12:00", clicked: false },
  { time: "13:00", clicked: false },
  { time: "14:00", clicked: false },
  { time: "15:00", clicked: false },
  { time: "16:00", clicked: false },
  { time: "17:00", clicked: false },
  { time: "18:00", clicked: false },
  { time: "19:00", clicked: false },
  { time: "20:00", clicked: false },
  { time: "21:00", clicked: false },
  { time: "22:00", clicked: false },
];

export default function DetailSidebarContainer() {
  const router = useRouter();

  const [createPayment] = useMutation(CREATE_PAYMENT);

  const [date, setDate] = useState("");
  const [guest, setGuest] = useState(1);
  const [ToggleGuest, setToggleGuest] = useState(false);
  const [price, setPrice] = useState(0);

  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [choiceEndPoint, setChoiceEndPoint] = useState<boolean>(false);

  const onClickSetStartTime = (event: React.MouseEvent<HTMLDivElement>) => {
    setStartTime((event.target as HTMLDivElement).id);
    console.log(startTime);
    setChoiceEndPoint(true);
  };

  const onClickSetEndTime = (event: React.MouseEvent<HTMLDivElement>) => {
    if ((event.target as HTMLDivElement).id < startTime) {
      alert("예약시작 이후의 시간을 골라주세요");
      return;
    } else {
      setEndTime((event.target as HTMLDivElement).id);
      setChoiceEndPoint(false);
      setToggleGuest((prev) => !prev);
    }
  };

  useEffect(() => {
    const duration =
      Number(endTime.replace(":", "")) / 100 -
      Number(startTime.replace(":", "")) / 100;
    setPrice(duration * 20000);
  }, [endTime]);
  // 게스트 초기값
  const onIncrease = () => {
    setGuest((prev) => prev + 1);
  };
  const onDecrease = () => {
    if (guest == 0) {
      return;
    } else {
      setGuest((prev: number) => prev - 1);
    }
  };

  // 다음날짜 구하기
  const Nextday = new Date();
  Nextday.setDate(Nextday.getDate() + 1);
  // maxDate 30일
  const MaxDay = new Date();
  MaxDay.setDate(MaxDay.getDate() + 30);

  const onChangeDate = (newValue: string) => {
    const date = getTime(newValue);
    setDate(date);
  };

  console.log(router.query.detailid);
  // 게스트 시간
  const onClickTime = () => {
    setToggleGuest((prev) => !prev);
  };

  const onClickPay = async () => {
    try {
      const result = await createPayment({
        variables: {
          createPaymentInput: {
            roomId: router.query.detailid,
            date,
            start_time: startTime,
            end_time: endTime,
            amount: price,
            guest: guest,
          },
        },
      });
      router.push("/mypage");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      <DetailSidebarUI
        hour={hour}
        price={price}
        date={date}
        Nextday={Nextday}
        MaxDay={MaxDay}
        onChangeDate={onChangeDate}
        guest={guest}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onClickTime={onClickTime}
        ToggleGuest={ToggleGuest}
        startTime={startTime}
        endTime={endTime}
        onClickSetStartTime={onClickSetStartTime}
        onClickSetEndTime={onClickSetEndTime}
        choiceEndPoint={choiceEndPoint}
        onClickPay={onClickPay}
      />
    </>
  );
}
