import { MouseEvent } from "react";
import * as Ad from "./AdminList.styles";

interface IAdminListUI {
  data?: any;
  onClickMoveEdit: (event: MouseEvent<HTMLDivElement>) => void;
  onClickDelete: () => void;
}

export default function AdminListUI(props: IAdminListUI) {
  return (
    <Ad.WrapperRoot>
      <Ad.Wrapper>
        <Ad.TopWrapper>
          <Ad.TopLogo src="/logo.png" />
          <Ad.TopTitle>가맹점 목록</Ad.TopTitle>
        </Ad.TopWrapper>

        <Ad.Row>
          <Ad.Branch>지점명</Ad.Branch>
          <Ad.Name>룸이름</Ad.Name>
          <Ad.Remarks>한 줄 소개</Ad.Remarks>
        </Ad.Row>

        {props.data?.fetchRooms.map((el: any) => (
          <Ad.Row key={el.id}>
            <Ad.ListBranch id={el.id} onClick={props.onClickMoveEdit}>
              {el.branch.branch}
            </Ad.ListBranch>
            <Ad.ListName id={el.id} onClick={props.onClickMoveEdit}>
              {el.name}
            </Ad.ListName>
            <Ad.ListRemarks id={el.id} onClick={props.onClickMoveEdit}>
              {el.remarks}
            </Ad.ListRemarks>

            <Ad.DeleteButton onClick={props.onClickDelete}>
              가맹점 삭제
            </Ad.DeleteButton>
          </Ad.Row>
        ))}
      </Ad.Wrapper>
    </Ad.WrapperRoot>
  );
}
