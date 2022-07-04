import * as Ft from "./Footer.styles";

export default function FooterPage() {
  return (
    <Ft.FooterWrapper>
      <Ft.FooterInfoWrapper>
        {/* FooterTitle */}
        <Ft.FooterInfoTitle>
          <Ft.TitleIcon src="./logo.png" />
          <Ft.InfoLinkTitle>(주)Sixman  |  대표자: 이승훈</Ft.InfoLinkTitle>
          <div>사업자등록번호 : 717-87-02373</div>
        </Ft.FooterInfoTitle>
        {/* FooterInfo */}
        <Ft.FooterInfoLink>
          <Ft.InfoLinkTitle>Follows Up</Ft.InfoLinkTitle>
          <Ft.ImgDiv>
            <Ft.FacebookIcon src="./icon/Facebook.png" />
            <Ft.FacebookIcon src="./icon/Instragam.png" />
            <Ft.TwitterIcon src="./icon/Twitter.png" />
          </Ft.ImgDiv>
        </Ft.FooterInfoLink>
      </Ft.FooterInfoWrapper>
      {/* Footer Address */}
      <Ft.FooterAddressWrapper>
        {/* 지점등록이 된다면 맵으로 뿌려주기 */}
        <div>
          <Ft.AddressTitle>구디점 위치</Ft.AddressTitle>
          <Ft.AddressSub>
            서울특별시 구로구 디지털로 300(구로동),
            <br /> 패스트파이브 구로점 13층
          </Ft.AddressSub>
        </div>
        <div>
          <Ft.AddressTitle>신림점 위치</Ft.AddressTitle>
          <Ft.AddressSub>
            서울특별시 구로구 디지털로 300(구로동),
            <br /> 패스트파이브 구로점 13층
          </Ft.AddressSub>
        </div>
        <div>
          <Ft.AddressTitle>신대방점 위치</Ft.AddressTitle>
          <Ft.AddressSub>
            서울특별시 구로구 디지털로 300(구로동),
            <br /> 패스트파이브 구로점 13층
          </Ft.AddressSub>
        </div>
      </Ft.FooterAddressWrapper>
    </Ft.FooterWrapper>
  );
}
