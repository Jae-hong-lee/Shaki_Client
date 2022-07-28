import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { breakPoints } from "../../../commons/styles/media";

const On = keyframes`
  from {
    padding-left: 3px;
    background-color: #e0e3e8;
  } to {
    background-color: #40a9ff;
    padding-left: 20px;
  }
`;

const Off = keyframes`
  from {
    padding-left: 20px;
    background-color: #40a9ff;
  } to {
    padding-left: 3px;
    background-color: #e0e3e8;
  }
`;

export const WrapperRoot = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  /* color: #4e75ff; */
`;

export const WrapperImg = styled.div`
  /* border-radius: 20px; */
  display: flex;
  width: 150em;
  height: 580px;
  margin-top: 58px;
  margin-left: 250px;
  box-shadow: 0 0 10px black;

  /* background-image: url("/landing/foodlogin5.jpeg"); */
  background-image: url("/foodlogin2.webp");

  background-size: cover;
  background-repeat: no-repeat;
  /* @media screen and (max-width: 1500px) {x
    display: none;
  } */
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  @media ${breakPoints.mobile} {
    display: flex;
    margin-top: 2em;
    margin-bottom: 1em;
  }
`;

export const LogInWrapper = styled.div`
  width: 100%;
  height: 600px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  margin-left: 2px;
  justify-content: center;
  padding-top: 80px;
  @media screen and (max-width: 1500px) {
    align-items: center;
  }

  @media ${breakPoints.tablet} {
  }
  @media ${breakPoints.mobile} {
    align-items: center;
    width: 100%;
  }
`;

export const panel = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LogInImg = styled.img`
  width: 30em;
`;

export const MiddleWrapper = styled.div`
  width: 25em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border-radius: 20px; */
  padding: 20px 0;
  box-shadow: 0 0 10px black;
  font-weight: 500;
  @media ${breakPoints.mobile} {
    width: 60vw;
    margin-bottom: 1em;
  }
`;

export const Head = styled.div`
  width: 100%;
  font-size: 40px;
  margin-bottom: 1em;
  font-weight: 500;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const AdminOnOffBox = styled.div`
  margin-left: 10px;
  font-size: 15px;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;

export const AdminToggle = styled.div`
  border-radius: 20px;
  flex-direction: row;
  width: 40px;
  height: 20px;
  display: flex;
  align-items: center;
  /* box-shadow: 0 0 10px #4e75ff; */
  margin-top: 5px;
  padding-bottom: 1px;
  animation: ${(props: { adminOn: boolean }) => (props.adminOn ? On : Off)}
    0.15s ease-in-out forwards;
`;

export const AdminToggleButton = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 50%;
  border: 2.5px solid gray;
  cursor: pointer;
  background-color: white;
`;

export const UpperBody = styled.div`
  display: flex;
  width: 20em;
  flex-direction: column;
  border-bottom: 3px solid #4e75ff;
  padding: 0 20px 30px 20px;
  margin-bottom: 30px;
`;

export const Email = styled.input`
  height: 40px;
  border: none;
  border-bottom: 1px solid gray;
  margin-bottom: 10px;
  outline: none;
`;

export const Password = styled.input`
  height: 40px;
  border: none;
  border-bottom: 1px solid gray;

  outline: none;
`;

export const LowerBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 600;
  padding: 0 20px 30px 20px;
`;

export const ImgWrapper = styled.div`
  width: 15em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;

  @media ${breakPoints.mobile} {
    display: none;
  }
`;

export const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Social = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

export const SocialTitle = styled.div``;

export const LogInBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const LogIn = styled.button`
  border: none;
  width: 7em;
  height: 3em;
  background-color: #4e75ff;
  border-radius: 10px;
  font-weight: 500;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const FindEmail = styled.div`
  border: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 7em;
  height: 3em;
  background-color: #4e75ff;
  border-radius: 10px;
  font-weight: 500;
  color: white;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const SignUp = styled.div`
  margin-top: 10px;
  font-weight: 600;
  color: #4e75ff;
  border-bottom: 1px solid #4e75ff;
  cursor: pointer;
`;

export const Footer = styled.div`
  width: 7em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  color: #4e75ff;
  font-weight: 600;
  cursor: pointer;
  :hover {
    border-bottom: 2px solid #4e75ff;
  }
`;

export const MobileBox = styled.div`
  display: none;

  @media ${breakPoints.mobile} {
    display: block;
    margin-top: 1em;
  }
`;

export const CommentBox = styled.div`
  color: #4e75ff;
  font-weight: 600;
  cursor: pointer;
  :hover {
    border-bottom: 2px solid #4e75ff;
  }
  @media ${breakPoints.mobile} {
    margin-top: 1em;
  }
`;
