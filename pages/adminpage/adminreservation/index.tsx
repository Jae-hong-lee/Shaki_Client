import styled from "@emotion/styled";
import AdminHeaderPage from "../../../src/components/commons/adminlayout/adminheader/AdminHeader.presenter";
import AdminSideBarUI from "../../../src/components/commons/adminlayout/adminsidebar/AdminSideBar.presenter";
import AdminReservation from "../../../src/components/units/adminpage/adminreservation/AdminReservation.container";

const SideBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default function AdminReservationPage() {
  return (
    <>
      <AdminHeaderPage />
      <SideBar>
        <AdminSideBarUI />
        <AdminReservation />
      </SideBar>
    </>
  );
}
