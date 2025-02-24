import styled from "styled-components";
import Button from "../components/button";
import { useState } from "react";
import axios from "axios";
import { useStore } from "../zustand/store";

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalContainer = styled.div`
  text-align: center;
  margin: 120px auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalView = styled.div.attrs((props) => ({
  role: "dialog",
}))`
  border-radius: 30px;
  background-color: #a573ff;
  border: 1px solid #7a57d1;
  box-sizing: border-box;
  width: 234px;
  height: 320px;
`;

const Closebutton = styled.div`
  /* border: 1px solid red; */
  display: flex;
  justify-content: flex-end;
  color: white;
  font-size: 20px;
  width: 232px;

  > div {
    cursor: pointer;
    padding: 0 15px 0 0;
  }
`;

const Title = styled.div`
  /* border: 1px solid blue; */
  color: white;
  font-size: 30px;
`;

const Login = styled.div`
  color: white;
  font-size: 15px;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 10px;
`;

const Signupform = styled.div`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 0 0 25px;

  > div {
    color: white;
    font-size: 13px;
  }

  > div.idtext {
    /* background-color: black; */
    gap: 15px;
    display: flex;
  }

  > button {
    font-size: 10px;
  }
`;

const Inputbox = styled.input`
  width: 119px;
  height: 20px;
  background-color: #d9d9d9;
  border: 1px solid #828282;
  box-sizing: border-box;
  border-radius: 5px;
`;

const Signupbox1 = styled.div`
  /* border: 1px solid black; */
  display: flex;
  align-items: center;
  gap: 5px;

  > button.text {
    font-size: 1vh;
    height: 2.5vh;
  }
`;

const Text = styled.div``;

const Signupbutton = styled.div`
  padding: 7px 0 0 60px;
`;
const Signupmodal = () => {
  const { closeSignupModal } = useStore();

  const [user_id, setId] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [checkpw, setCheckpw] = useState("");

  const idHandler = (e) => {
    setId(e.target.value);
  };
  const nickNameHandler = (e) => {
    setNickname(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const checkpwHandler = (e) => {
    setCheckpw(e.target.value);
  };
  const signupHandler = () => {
    if (user_id && nickname && password && checkpw) {
      if (password !== checkpw) {
        alert("비밀번호가 일치하지 않습니다.");
      } else {
        axios
          .post("http://localhost:3500/sign/up", {
            user_id,
            nickname,
            password,
          })
          .then((res) => {
            if (res.data === "okay") {
              alert("회원가입에 성공했습니다. 어서오세요!");
            } else {
              alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            }
          });
      }
    } else {
      alert("모든 항목은 필수입니다.");
    }
  };

  const checkUserId = () => {
    if (user_id) {
      axios
        .post("http://localhost:3500/sign/idcheck", {
          user_id,
        })
        .then((res) => {
          if (res.data === "ok") {
            alert("사용할 수 있는 아이디 입니다.");
          } else {
            alert("사용할 수 없는 아이디 입니다.");
          }
        });
    }
  };

  const checkUserNickname = () => {
    if (nickname) {
      axios
        .post("http://localhost:3500/sign/nicknamecheck", {
          nickname,
        })
        .then((res) => {
          if (res.data === "ok") {
            alert("사용할 수 있는 닉네임 입니다.");
          } else {
            alert("사용할 수 없는 닉네임 입니다.");
          }
        });
    }
  };

  return (
    <ModalContainer>
      <ModalBackdrop onClick={closeSignupModal}>
        <ModalView onClick={(e) => e.stopPropagation()}>
          <Closebutton>
            <div onClick={closeSignupModal}>&times;</div>
          </Closebutton>
          <Title>회원가입</Title>
          <Signupform>
            <Text>아이디</Text>
            <Signupbox1>
              <Inputbox name="user_id" value={user_id} onChange={idHandler} />
              <Button className="text" onClick={checkUserId}>
                중복검사
              </Button>
            </Signupbox1>

            <Text>닉네임</Text>
            <Signupbox1>
              <Inputbox value={nickname} onChange={nickNameHandler} />
              <Button className="text" onClick={checkUserNickname}>
                중복검사
              </Button>
            </Signupbox1>

            <Text>비밀번호</Text>
            <Inputbox
              type="password"
              value={password}
              onChange={passwordHandler}
            />

            <Text>비밀번호 확인</Text>
            <Inputbox
              type="password"
              value={checkpw}
              onChange={checkpwHandler}
            />
            <Signupbutton>
              <Button
                onClick={() => {
                  signupHandler();
                  closeSignupModal();
                }}
              >
                회원가입
              </Button>
            </Signupbutton>
          </Signupform>
        </ModalView>
      </ModalBackdrop>
    </ModalContainer>
  );
};

export default Signupmodal;
