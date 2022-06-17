import styled from "styled-components";
import Button from "./button";
import { useState } from "react";
import axios from "axios";
import { useStore, useStoreTemp, useUserinfo } from "../zustand/store";

const ContainQuestion = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const InputTitleBox = styled.input`
  width: 80vw;
  height: 2vw;
  margin: 1vw 0;
  background: white;
  border-radius: 2vw;
  border: 1px solid gray;
  padding: 3vw;
  font-size: 5vw;
  box-shadow: 3px 3px 3px 3px #999;
`;
const InputTextBox = styled.textarea`
  width: 80vw;
  height: 50vw;
  margin: 1vw;
  background: white;
  vertical-align: middle;
  border-radius: 2vw;
  padding: 3vw;
  font-size: 4vw;
  box-shadow: 3px 3px 3px 3px #999;
  resize: none;
`;
const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const WritingContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 3vw;
  padding: 10px 0;
  .btn {
    font-size: 2.5vw;
    width: 15vw;
  }
`;

const ImageTest = styled.div`
  /* border: 1px solid red; */
  box-sizing: border-box;
  padding: 0 35px;
  display: flex;
  flex-direction: row;

  .input-file-button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5px;
    background-color: #a573ff;
    border: 2px solid #7a57d1;
    border-radius: 10px;
    padding: 5px 7px;
    width: 57px;
    cursor: pointer;
  }

  > .deletebutton {
    font-size: 8px;
    height: 23px;
    width: 38px;

    @media screen and (min-width: 401px) and (max-width: 1000px) {
      font-size: 2vw;
      height: 6vw;
      width: 10vw;
    }

    @media screen and (min-width: 1001px) {
      font-size: 20px;
      width: 100px;
      height: 60px;
    }
  }
`;

const WriteQuestionComponenet = () => {
  const { title, text, setTitle, setText } = useStoreTemp();
  const { nickname, user_id } = useUserinfo();
  const { school, grade, subject } = useStore();
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const textHandler = (e) => {
    setText(e.target.value);
  };

  const [fileImg, setfileImg] = useState("");
  const saveFileImg = (e) => {
    const file = e.target.files[0];

    setfileImg(file);
  };
  const testFn = async () => {
    let formData = new FormData();
    formData.append("file", fileImg);
    const axios1 = await axios.post("http://localhost:3500/question", {
      nickname,
      user_id,
      title,
      content: text,
      school,
      grade,
      subject,
    });

    const axios2 = await axios.post("http://localhost:3500/uploads", formData);
    if (axios2.data.success) {
      alert("okay");
    } else {
      alert("no");
    }
  };

  const deleteFileImg = () => {
    URL.revokeObjectURL(fileImg);
    setfileImg("");
  };

  return (
    <>
      <ContainQuestion>
        <TitleContainer>
          <InputTitleBox
            placeholder="제목"
            value={title}
            onChange={titleHandler}
          />
        </TitleContainer>

        <ImageTest>
          <div>
            <label className="input-file-button" for="input-file">
              이미지 첨부
            </label>
            <input
              style={{ display: "none" }}
              id="input-file"
              name="imgUp"
              type="file"
              accept="image/*"
              onChange={saveFileImg}
            />
          </div>
          <Button className="deletebutton" onClick={() => deleteFileImg()}>
            삭제
          </Button>
        </ImageTest>
        <WritingContainer>
          <InputTextBox
            placeholder="내용을 입력하세요"
            value={text}
            onChange={textHandler}
          ></InputTextBox>
        </WritingContainer>
        <BtnContainer>
          <Button className="btn" onClick={testFn}>
            질문하기
          </Button>
          <Button className="btn">취소</Button>
        </BtnContainer>
        {/* 아래는 사진 업로드 기능인데, db로 보내기랑 css수정해야함 */}
      </ContainQuestion>
    </>
  );
};

export default WriteQuestionComponenet;
