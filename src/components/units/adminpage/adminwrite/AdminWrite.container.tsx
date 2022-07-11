import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import AdminWriteUI from "./AdminWrite.persenter";
import { CREATE_ROOM } from "./AdminWrite.queries";
import * as yup from "yup";
import { Modal } from "antd";

const schema = yup.object({
  branch: yup.string().required("필수입력사항 입니다."),
  name: yup.string().required("필수입력사항 입니다."),
  remarks: yup.string().required("필수입력사항 입니다."),
  tags: yup.string().required("필수입력사항 입니다."),
  price: yup
    .number()
    .typeError("숫자만 입력해주세요.")
    .required("필수입력사항 입니다."),
  maxPeople: yup
    .number()
    .typeError("숫자만 입력해주세요!")
    .min(1, "1명 이상으로 해주세요!")
    .max(8, "8명 이상은 전화로 문의 해주세요")
    .required("필수입력사항 입니다."),
  contents: yup.string().required("필수입력사항 입니다."),
});

export default function AdminWrite() {
  const [isModalView, setIsModalView] = useState(false);
  const [imgUrls, setImgUrls] = useState([""]);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");

  const { register, handleSubmit, formState, setValue, trigger } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [createRoom] = useMutation(CREATE_ROOM);

  const onChangeContents = (value: string) => {
    // console.log(value);

    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  };

  const onChangeImgUrls = (fileUrl: string, index: number) => {
    const newImgUrls = [...imgUrls];
    newImgUrls[index] = fileUrl;
    setImgUrls(newImgUrls);
  };

  // Daumpost 연결 및 카카오맵 연동
  const onToggleModal = () => {
    setIsModalView((prev) => !prev);
  };
  const handelCompleteDaum = (addressData: any) => {
    onToggleModal();
    setAddress(addressData.address);
    setZipcode(addressData.zonecode);
  };

  const onClickSubmit = async (data: any) => {
    try {
      await createRoom({
        variables: {
          createRoom: {
            ...data,
            zipcode,
            address,
            images: imgUrls,
          },
        },
      });
      Modal.success({ content: "게시글이 등록되었습니다." });
    } catch (error) {
      Modal.error({ content: "게시글 등록 실패하였습니다." });
    }
  };
  return (
    <AdminWriteUI
      register={register}
      handleSubmit={handleSubmit}
      formState={formState}
      onChangeContents={onChangeContents}
      onClickSubmit={onClickSubmit}
      // 주소검색 daumpost연결
      handelCompleteDaum={handelCompleteDaum}
      isModalView={isModalView}
      onToggleModal={onToggleModal}
      address={address}
      zipcode={zipcode}
      // 이미지 업로드
      onChangeImgUrls={onChangeImgUrls}
      imgUrls={imgUrls}
    />
  );
}
