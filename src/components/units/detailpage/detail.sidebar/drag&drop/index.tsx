import React, { useEffect } from "react";
import * as D from "./style";

interface IDragProps {
  onClickCartOpen: () => void;
  handleOk: () => void;
  setIsModalVisible: () => void;
  setOption: any;
  setSidePrice: any;
  setCart: any;
  guest: number;
  cartRef: any;
  setAdd: any;
  cart: string[];
  DumDum: {
    name: string;
    price: string;
    countable: boolean;
  }[];
  add: { name: string; price: string; countable: boolean }[];
}

export default function DragPage(props: IDragProps) {
  let dragged: HTMLDivElement;

  // const itemRef = useRef(null);

  const DragItem = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("드레그아이템", e.target);
    e.dataTransfer.setData("data", e.currentTarget.innerHTML);
    dragged = e.target as HTMLDivElement;
  };

  const DragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const BeforeDropZone = (e: React.DragEvent<HTMLDivElement>) => {
    // console.log("드롭존", typeof e.dataTransfer.getData("data"));
    e.preventDefault();
    if ((e.target as HTMLDivElement).id === "BeforeDropzone") {
      (dragged.parentNode as HTMLDivElement).removeChild(dragged);
      (e.target as HTMLDivElement).appendChild(dragged);
      // console.log("ddd", e.target.appendChild(dragged).innerText);
      const newCart = props.cart.filter(
        (el: string) =>
          el !== (e.target as HTMLDivElement).appendChild(dragged).innerText
      );
      props.setCart(newCart);
    }
  };

  const AfterDropZone = (e: React.DragEvent<HTMLDivElement>) => {
    const newCart = [...props.cart];
    // console.log("드롭존", typeof e.dataTransfer.getData("data"));
    e.preventDefault();
    if ((e.target as HTMLDivElement).id === "AfterDropzone") {
      (dragged.parentNode as HTMLDivElement).removeChild(dragged);
      (e.target as HTMLDivElement).appendChild(dragged);
      newCart.push((e.target as HTMLDivElement).appendChild(dragged).innerText);
      props.setCart(newCart);
    }
    console.log(props.cart);
  };

  const onClickCancel = (event: React.MouseEvent<HTMLDivElement>) => {
    if (props.cart.includes((event.target as HTMLDivElement).innerText)) {
      (event.target as HTMLDivElement).remove();
      props.setCart(
        props.cart.filter(
          (el: string) => el !== (event.target as HTMLDivElement).innerText
        )
      );

      for (let i = 0; i < props.DumDum.length; i++) {
        if (
          (event.target as HTMLDivElement).innerText
            .split("$")[0]
            .includes(props.DumDum[i].name)
        ) {
          const item = props.DumDum[i];
          props.add.push(item);
        }
      }
    }
  };

  let sum = 0;

  for (let i = 0; i < props.cart.length; i++) {
    sum += Number(props.cart[i].split("$")[1]);
  }

  useEffect(() => {
    const sidePriceArr = props.DumDum.filter((el) =>
      props.cart?.includes(el.name + " $" + el.price)
    );
    let newSide = 0;
    for (let i = 0; i < sidePriceArr.length; i++) {
      if (sidePriceArr[i].countable) {
        newSide += Number(sidePriceArr[i].price) * props.guest;
      } else {
        newSide += Number(sidePriceArr[i].price);
      }
    }

    props.setSidePrice(newSide);
    console.log(sidePriceArr);
    // console.log(props.sidePrice);
  }, [props.cart]);

  // props.setSidePrice(sum);
  props.setOption(props.cart?.length);

  return (
    <D.Wrapper>
      <D.Head>추가옵션</D.Head>
      <D.DragBox>
        <D.DragList
          id="BeforeDropzone"
          onDrop={BeforeDropZone}
          onDragOver={DragOver}
        >
          {props.DumDum.map((el) => (
            <D.DraggableItem
              id="draggable"
              draggable={true}
              onDragStart={DragItem}
              onClick={onClickCancel}
              // ref={itemRef}
            >
              {el.name} ${el.price}
            </D.DraggableItem>
          ))}
          {props.add?.map((el) => (
            <D.DraggableItem
              id="draggable"
              draggable={true}
              onDragStart={DragItem}
              onClick={onClickCancel}
              // ref={itemRef}
            >
              {el.name} ${el.price}
            </D.DraggableItem>
          ))}
        </D.DragList>

        <D.DragZone
          id="AfterDropzone"
          onDragOver={DragOver}
          onDrop={AfterDropZone}
          onClick={onClickCancel}
        ></D.DragZone>
      </D.DragBox>
      <D.CancelButton onClick={props.onClickCartOpen}>닫기</D.CancelButton>
      <D.OkButton onClick={props.handleOk}>확인</D.OkButton>
    </D.Wrapper>
  );
}
