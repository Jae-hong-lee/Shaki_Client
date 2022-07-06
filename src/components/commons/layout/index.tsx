import FooterPage from "./footer";
import HeaderPage from "./header";
// 사이드
import SideLeftPage from "./sidebar.left";
import SideRightPage from "./sidebar.right";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import { useRouter } from "next/router";

const Body = styled.div`
  width: 100%;
`;
// 사이드
const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

interface LayoutProps {
  children: ReactNode;
}

const HIDDEN_LAYOUT = ["/"];

function EditBoolean(element: any) {
  const a = element.split("/");
  for (let i = 0; i < a.length; i++) {
    if (a[i].includes("adminpage")) {
      HIDDEN_LAYOUT.push(element);
    }
  }
}
export default function LayoutPage(props: LayoutProps) {
  const router = useRouter();
  EditBoolean(router.asPath);
  const isHiddenLayout = HIDDEN_LAYOUT.includes(router.asPath);

  return (
    <div>
      {!isHiddenLayout && <HeaderPage />}
      <PageWrapper>
        <SideLeftPage />
        <Body>{props.children}</Body>
        <SideRightPage />
      </PageWrapper>
      {!isHiddenLayout && <FooterPage />}
    </div>
  );
}
