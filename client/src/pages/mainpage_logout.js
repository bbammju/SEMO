import styled from "styled-components";
import image1 from "../images/mainimage1.jpg";
import image2 from "../images/mainimage2.jpg";
import image3 from "../images/mainimage3.jpg";
import image4 from "../images/mainimage4.jpg";
import Button from "../components/button";
import Header from "../components/header";

const Button_layout = styled.div`
  padding-top: 20px;
`;

const Conainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 14vh;
  box-sizing: border-box;
  border: 1px solid red;
  position: sticky;
  top: 0px;
`;

const Main_items_right = styled.div`
  border: 1px solid red;
  width: 100vw;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 3px;
  box-sizing: border-box;
  @media only screen and (min-width: 560px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Main_items_left = styled.div`
  border: 1px solid red;
  width: 100vw;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 3px;
  box-sizing: border-box;
  @media only screen and (min-width: 550px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Image_layout = styled.img`
  width: 50vw;
  height: 30vh;
  border: 3px solid black;
  border-radius: 7px;
`;

const Text_layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Outcontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* min -> 이상 */
  /* max -> 이하 */
  @media only screen and (min-width: 550px) {
    gap: 5px;
  }
`;

const Mainpage_logout = () => {
  return (
    <Outcontainer>
      <Header />
      <Main_items_right>
        <Text_layout>
          <h3>문제를 못풀겠나요?</h3>
          <h4>지금 당장 질문하세요!</h4>
          <h5>질문 하러가자~</h5>
          <Button_layout>
            <Button>질문 하러가기!</Button>
          </Button_layout>
        </Text_layout>
        <Image_layout src={image1} alt="" />
      </Main_items_right>
      <Main_items_right>
        <Text_layout>
          <h3>문제를 푸실려구요?</h3>
          <h4>지금 당장 가시죠</h4>
          <h5>문제 풀러 가자~</h5>
          <Button_layout>
            <Button>풀이하러 가기!</Button>
          </Button_layout>
        </Text_layout>
        <Image_layout src={image2} alt="" />
      </Main_items_right>
      {/* 더미데이터 들어가야하는 자리 */}
      <Main_items_left>
        <Image_layout src={image3} alt="" />
        <Text_layout>
          <h3>01</h3>
          <h4>학생들은 모르는</h4>
          <h5>문제를 질문할 수 있어요!</h5>
        </Text_layout>
      </Main_items_left>
      <Main_items_left>
        <Image_layout src={image4} alt="" />
        <Text_layout>
          <h3>02</h3>
          <h4>공부의 신은</h4>
          <h5>문제를 풀어 줄 수 있어요!</h5>
        </Text_layout>
      </Main_items_left>
    </Outcontainer>
  );
};

export default Mainpage_logout;
