import LogInMobileButtonStyle from "./LogIn.MobileButton";
import * as Li from "./LogIn.Style";

export default function LogInPresenter(props: any) {
  return (
    <Li.WrapperRoot onSubmit={props.handleSubmit(props.onClickLogIn)}>
      {/* <div onClick={props.onClick}>asdasdsad</div> */}
      <Li.Wrapper>
        <Li.WrapperImg src="/foodlogin2.webp" />
        <Li.LogInWrapper>
          <Li.panel>
            <Li.MiddleWrapper>
              <Li.Head>
                로그인
                <Li.AdminOnOffBox>
                  관리자 로그인
                  <Li.AdminToggle adminOn={props.adminOn}>
                    <Li.AdminToggleButton onClick={props.onClickAdmin} />
                  </Li.AdminToggle>
                </Li.AdminOnOffBox>
              </Li.Head>
              <Li.UpperBody>
                이메일
                <Li.Email
                  defaultValue={props.adminOn ? "admin@adim1234.com" : ""}
                  type="text"
                  {...props.register("email")}
                />
                비밀번호
                <Li.Password
                  defaultValue={props.adminOn ? "rhksflwk1234" : ""}
                  type="password"
                  {...props.register("pwd")}
                />
              </Li.UpperBody>
              <Li.LowerBody>
                다음 소셜계정으로 로그인하기
                <Li.MobileBox>
                  <LogInMobileButtonStyle />
                </Li.MobileBox>
                <Li.ImgWrapper>
                  <Li.ImgBox>
                    <Li.Social src="/icon/sociallogin/kakaotalk_sharing_btn_small_ov.png" />
                    <Li.SocialTitle onClick={props.onClickKakoLogIn}>
                      카카오
                    </Li.SocialTitle>
                  </Li.ImgBox>
                  <Li.ImgBox onClick={props.onClickNaverLogIn}>
                    <Li.Social src="/icon/sociallogin/screenshotAtUploadCC_1656920622973.jpeg" />
                    <Li.SocialTitle>네이버</Li.SocialTitle>
                  </Li.ImgBox>
                  <Li.ImgBox onClick={props.onClickGoogleLogIn}>
                    <Li.Social
                      style={{ borderRadius: "5px" }}
                      src="/icon/sociallogin/screenshotAtUploadCC_1656924592824.jpeg"
                    />
                    <Li.SocialTitle>google</Li.SocialTitle>
                  </Li.ImgBox>
                </Li.ImgWrapper>
              </Li.LowerBody>
              <Li.LogInBox>
                <Li.LogIn>로그인</Li.LogIn>
                <Li.FindEmail>계정찾기</Li.FindEmail>
              </Li.LogInBox>
              <Li.SignUpBox>
                아직 회원이 아니신가요?
                <Li.SignUp onClick={props.onClickMoveToSignUp}>
                  회원가입
                </Li.SignUp>
              </Li.SignUpBox>
            </Li.MiddleWrapper>
          </Li.panel>
        </Li.LogInWrapper>
      </Li.Wrapper>
      <Li.CommentBox onClick={props.onClickMoveToMain}>
        비회원 둘러보기
      </Li.CommentBox>
    </Li.WrapperRoot>
  );
}
