import KakaoMap from "../../../commons/kakaomap";
import * as My from "./Mypage.styles";
import InfiniteScroll from "react-infinite-scroller";
import { useContext } from "react";
import { ThemeContext } from "../../../../pages/_app";

type aaa = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  amount: number;
};

type payment = Array<aaa>;

type room = {
  id: string;
  remarks: string;
  name: string;
  zipcode: string;
  address: string;
  images: {
    id: string;
    url: string;
    room: room;
  };
};

interface IMypageprops {
  data?: {
    fetchLoginUser: {
      __typename?: "User";
      name: string;
      point: number;
      payment: {
        id: string;
        date: string;
        start_time: string;
        end_time: string;
        amount: number;
        room: room;
      }[];
      room: {
        id: string;
        remarks: string;
        name: string;
        zipcode: string;
        address: string;
        images: {
          id: string;
          url: string;
          room: room;
        }[];
      }[];
    };
  };
}

export default function MypageUI(props: IMypageprops) {
  const { theme } = useContext(ThemeContext);

  return (
    <My.HTML theme={theme}>
      <My.Wrapper>
        <My.TopWrapper theme={theme}>
          {/* 프로필 사진, 이름 */}
          <My.UserWrapper>
            <My.UserPictureWrapper>
              <My.UserPicture src="/mypage/profile.png" />
            </My.UserPictureWrapper>
            <My.UserNameWrapper>
              <My.UserName>
                {props.data ? `${props.data.fetchLoginUser.name}님` : "게스트"}
              </My.UserName>
            </My.UserNameWrapper>
          </My.UserWrapper>

          {/* 포인트 */}
          <My.TopBreakPoint>
            <My.PointWrapper>
              <My.PointImgWrapper>
                <My.PointImg src="/mypage/point.png" />
                <My.PointLabel>적립금</My.PointLabel>
              </My.PointImgWrapper>
              <My.PointNumberWrapper>
                <My.PointNumber>
                  {props.data?.fetchLoginUser.point
                    ? props.data?.fetchLoginUser.point
                    : 0}
                </My.PointNumber>
              </My.PointNumberWrapper>
            </My.PointWrapper>

            {/* 찜한 갯수 */}
            <My.PickedWrapper>
              <My.PickedImgWrapper>
                <My.PickedImg src="/mypage/pick.png" />
                <My.PickedLabel>찜한 갯수</My.PickedLabel>
              </My.PickedImgWrapper>
              <My.PickedNumberWrapper>
                <My.PickedNumber>
                  {props.data?.fetchLoginUser.room
                    ? props.data?.fetchLoginUser.room.length
                    : 0}
                </My.PickedNumber>
              </My.PickedNumberWrapper>
            </My.PickedWrapper>

            {/* 예약 갯수 */}
            <My.ReservationWrapper>
              <My.ReservationImgWrapper>
                <My.ReservationImg src="/mypage/calendar.png" />
                <My.ReservationLabel>예약 갯수</My.ReservationLabel>
              </My.ReservationImgWrapper>
              <My.ReservationNumberWrapper>
                <My.ReservationNumber>
                  {props.data?.fetchLoginUser.payment.length
                    ? props.data?.fetchLoginUser.payment.length
                    : 0}
                </My.ReservationNumber>
              </My.ReservationNumberWrapper>
            </My.ReservationWrapper>
          </My.TopBreakPoint>
        </My.TopWrapper>

        <My.BodyWrapper>
          <My.BodyTitleWrapper>
            <My.BodyTitleImg src="/mypage/calendar_title.png" />
            <My.BodyTitle>예약정보</My.BodyTitle>
          </My.BodyTitleWrapper>
          {props.data?.fetchLoginUser.payment[0] ? (
            props.data.fetchLoginUser.payment.map((el) => (
              <My.ReservationInfoWrapper>
                <My.InfoWrapper>
                  <My.Image src={el.room?.images[0].url} />
                  <My.Info>
                    <My.InfoDetailWrite>
                      <My.NameWrapper>
                        <My.Name>{el.room?.name}</My.Name>
                      </My.NameWrapper>
                      <My.ContentsWrapper>
                        <My.Contents>{el.room.remarks}</My.Contents>
                      </My.ContentsWrapper>
                      <My.PriceWrapper>
                        <My.Price>결제 금액: {el.amount}</My.Price>
                      </My.PriceWrapper>
                    </My.InfoDetailWrite>

                    <My.InfoDay>
                      <My.DateWrapper>
                        <My.DateImg src="/mypage/calendar_detail.png" />
                        <My.Date>예약 날짜: {el.date}</My.Date>
                      </My.DateWrapper>
                      <My.TimeWrapper>
                        <My.TimeImg src="/mypage/clock.png" />
                        <My.Time>
                          예약 시간: {el.start_time} 부터 ~ {el.end_time} 까지
                        </My.Time>
                      </My.TimeWrapper>
                      <My.MapWrapper>
                        <My.MapImg src="/mypage/map.png" />
                        <My.Map>{el.room.address}</My.Map>
                      </My.MapWrapper>
                    </My.InfoDay>
                  </My.Info>
                </My.InfoWrapper>
              </My.ReservationInfoWrapper>
            ))
          ) : (
            <My.NodataWrapper>
              <My.Nodata>예약 정보가 없습니다.</My.Nodata>
            </My.NodataWrapper>
          )}

          {/* 후기 작성 부분  */}
          <My.BodyTitleWrapper>
            <My.BodyTitleImg src="/mypage/calendar_title.png" />
            <My.BodyTitle>최근본 Shaki</My.BodyTitle>
          </My.BodyTitleWrapper>
          {props.data ? (
            <My.ReservationInfoWrapper>
              <My.InfoWrapper>
                <My.Image src="/mypage/example.png" />
                <My.Info>
                  <My.InfoDetailWrite>
                    <My.NameWrapper>
                      <My.Name>구로점 쉐이키 2</My.Name>
                    </My.NameWrapper>
                    <My.PriceWrapper>
                      <My.Price>결제 금액: 200,000원</My.Price>
                    </My.PriceWrapper>
                  </My.InfoDetailWrite>

                  <My.InfoDay>
                    <My.DateWrapper>
                      <My.DateImg src="/mypage/calendar_detail.png" />
                      <My.Date>예약 날짜: 2022.07.12</My.Date>
                    </My.DateWrapper>
                    <My.TimeWrapper>
                      <My.TimeImg src="/mypage/clock.png" />
                      <My.Time>예약 시간: 12:00</My.Time>
                    </My.TimeWrapper>
                    <My.MapWrapper>
                      <My.MapImg src="/mypage/map.png" />
                      <My.Map>
                        서울특별시 구로구 디지털로 300 패스트파이브 구로점
                      </My.Map>
                    </My.MapWrapper>
                  </My.InfoDay>
                </My.Info>
              </My.InfoWrapper>
            </My.ReservationInfoWrapper>
          ) : (
            <My.NodataWrapper>
              <My.Nodata>이용내역이 없습니다.</My.Nodata>
            </My.NodataWrapper>
          )}

          {/* 찜한 정보 */}
          <My.PickDetailWrapper>
            <My.PickTitleWrapper>
              <My.PickTitleImg src="/mypage/pick_detail.png" />
              <My.PickTitle>찜한정보</My.PickTitle>
            </My.PickTitleWrapper>

            <My.PickListWrapper>
              <My.PickListCardWrapper>
                <My.ListCardImg src="/mypage/example.png" />
                <My.ListCardDetailWrapper>
                  <My.ListCardName>쉐이키 1</My.ListCardName>
                  <My.ListCardContents>
                    깔끔하고 모던한 느낌으로 품격있는 식사를 하고 싶은 분들을
                    위한 룸 입니다.
                  </My.ListCardContents>
                </My.ListCardDetailWrapper>
              </My.PickListCardWrapper>

              <My.PickListCardWrapper>
                <My.PickListCardWrapper>
                  <My.NoPcickListWrapper>
                    <My.NoPickListCardImg src="/mypage/pick.png" />
                    <My.NoPickListCardContents>
                      찜한 내용이 없습니다.
                    </My.NoPickListCardContents>
                    <My.NoPickListCardContents>
                      마음에 드시면 하트를 눌러주세요!!
                    </My.NoPickListCardContents>
                  </My.NoPcickListWrapper>
                </My.PickListCardWrapper>
              </My.PickListCardWrapper>

              <My.PickListCardWrapper>
                <My.PickListCardWrapper>
                  <My.NoPcickListWrapper>
                    <My.NoPickListCardImg src="/mypage/pick.png" />
                    <My.NoPickListCardContents>
                      찜한 내용이 없습니다.
                    </My.NoPickListCardContents>
                    <My.NoPickListCardContents>
                      마음에 드시면 하트를 눌러주세요!!
                    </My.NoPickListCardContents>
                  </My.NoPcickListWrapper>
                </My.PickListCardWrapper>
              </My.PickListCardWrapper>
            </My.PickListWrapper>
          </My.PickDetailWrapper>
        </My.BodyWrapper>
      </My.Wrapper>
    </My.HTML>
  );
}
