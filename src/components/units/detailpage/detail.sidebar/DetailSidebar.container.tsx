import React, { useEffect, useRef, useState } from "react";
import { getTime } from "../../../commons/getDate";
import DetailSidebarUI from "./DetailSidebar.presenter";
import { CREATE_PAYMENT, FETCH_RESERVATION } from "./DetailSibebar.queries";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Head from "next/head";
import { useRecoilState } from "recoil";
import { accessTokenState, reservedState } from "../../../../commons/store";

declare const window: typeof globalThis & {
  IMP: any;
};

type timeTable = {
  start_time: string;
  end_time: string;
  reserved: boolean;
};

const hour: Array<timeTable> = [
  { start_time: "12:00", end_time: "18:00", reserved: false },
  { start_time: "19:00", end_time: "12:00", reserved: false },
];

const DumDum = [
  {
    name: "🍞 식전빵",
    price: "5000",
    countable: true,
  },
  {
    name: "🍷 웰컴쥬스 (1pet)",
    price: "4000",
    countable: true,
  },
  {
    name: "🍽️ 식기 기본세팅(예약한 인원수)",
    price: "10000",
    countable: false,
  },
  {
    name: "🍺 생맥주",
    price: "3000",
    countable: true,
  },
  {
    name: "🧂 소금,후추 각종 향신료",
    price: "3000",
    countable: false,
  },
  {
    name: "사용 후 애프터서비스",
    price: "3000",
    countable: false,
  },
  {
    name: "🔉 블루투스 스피커",
    price: "8000",
    countable: false,
  },
];

export default function DetailSidebarContainer() {
  const router = useRouter();
  const client = useApolloClient();

  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const cartRef = useRef(null);

  const [date, setDate] = useState<string>("");
  const [guest, setGuest] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);
  const [sidePrice, setSidePrice] = useState<number>(0);
  const [option, setOption] = useState<number>(0);
  const [choiceEndPoint, setChoiceEndPoint] = useState<boolean>(false);
  const [timeTable, setTimeTable] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [reserved, setReserved] = useRecoilState<any>(reservedState);
  const [clicked, setClicked] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [end, setEnd] = useState(0);
  const [add, setAdd] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const [createPayment] = useMutation(CREATE_PAYMENT);

  const onClickSetTime = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newClicked = [];
    newClicked.push((event.target as HTMLButtonElement).value);
    setClicked(newClicked);
    if (Number(startTime.slice(0, 2)) > Number(endTime.slice(0, 2))) {
      setPrice(100000);
    } else {
      setPrice(60000);
    }
    console.log(price, clicked);
    setTimeTable(false);
  };

  const onClickCancel = () => {
    setTimeTable((prev) => !prev);
  };

  useEffect(() => {
    setStartTime(clicked.length === 0 ? "" : clicked[0].slice(0, 5));
    setEndTime(clicked.length === 0 ? "" : clicked[0].slice(6));
    if (Number(startTime.slice(0, 2)) > Number(endTime.slice(0, 2))) {
      setPrice(100000);
    } else if (Number(startTime.slice(0, 2)) < Number(endTime.slice(0, 2))) {
      setPrice(60000);
    } else {
      setPrice(0);
    }
  }, [clicked, startTime]);

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

  const onClickTime = () => {
    if (!date) {
      alert("날짜를 선택해주세요.");
    } else {
      setTimeTable((prev) => !prev);
    }
    return;
  };

  // 다음날짜 구하기
  const Nextday = new Date();
  Nextday.setDate(Nextday.getDate() + 1);
  // maxDate 30일
  const MaxDay = new Date();
  MaxDay.setDate(MaxDay.getDate() + 30);

  const onChangeDate = async (newValue: string) => {
    const date = getTime(newValue);
    setDisabled(false);
    setDate(date);

    const reserved = await client.query({
      query: FETCH_RESERVATION,
      variables: {
        room: router.query.detailid,
        date: date,
      },
    });
    const reservedTime = reserved.data.fetchReservation;
    setReserved(reservedTime);
  };

  const onClickCartOpen = () => {
    setCart([]);
    setAdd([]);
    if (guest === 0) {
      alert("예약 인원을 설정해주세요.");
    } else {
      setIsModalVisible((prev) => !prev);
    }
  };

  const handleOk = () => {
    setDisabled(true);
    setIsModalVisible((prev) => !prev);
  };

  const handleCancel = () => {
    setIsModalVisible((prev) => !prev);
  };

  const requestPay = () => {
    if (!accessToken) {
      alert("로그인 후 이용해주세요");
      router.push("/login");
    } else if (!price || !date || !startTime || !endTime) {
      alert("필수 정보를 입력해주세요.");
      return;
    } else {
      const IMP = window.IMP; // 생략 가능
      IMP.init("imp49910675"); // Example: imp00000000

      IMP.request_pay(
        {
          // param
          pg: "html5_inicis",
          pay_method: "card",
          // merchant_uid: "ORD20180131-0000011",
          name: "SHAKI",
          amount: 100,
          m_redirect_url: "/",
        },
        (rsp: any) => {
          // callback
          if (rsp.success) {
            try {
              const result = createPayment({
                variables: {
                  createPaymentInput: {
                    roomId: router.query.detailid,
                    date,
                    start_time: startTime,
                    end_time: endTime,
                    amount: price + sidePrice,
                    guest: guest,
                    point: (price + sidePrice) / 10,
                    impUid: "imp49910675",
                  },
                },
              });
              alert("결제 되었습니다. 마이페이지로 이동합니다.");
              router.push("/mypage");
            } catch (error) {
              alert("결제에 실패하였습니다.");
            }
          } else {
            // ...,
            // 결제 실패 시 로직,
            // ...
            alert("결제가 취소되었습니다.");
          }
        }
      );
    }
  };

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src="https://code.jquery.com/jquery-1.12.4.min.js"
        ></script>
        <script
          type="text/javascript"
          src="https://cdn.iamport.kr/js/iamport.payment-1.2.0.js"
        ></script>
      </Head>
      <DetailSidebarUI
        DumDum={DumDum}
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
        timeTable={timeTable}
        startTime={startTime}
        endTime={endTime}
        choiceEndPoint={choiceEndPoint}
        requestPay={requestPay}
        onClickCancel={onClickCancel}
        clicked={clicked}
        reserved={reserved}
        onClickCartOpen={onClickCartOpen}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        sidePrice={sidePrice}
        setSidePrice={setSidePrice}
        option={option}
        setOption={setOption}
        cart={cart}
        setCart={setCart}
        cartRef={cartRef}
        add={add}
        setAdd={setAdd}
        disabled={disabled}
        onClickSetTime={onClickSetTime}
      />
    </>
  );
}
