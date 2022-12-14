import React, { useRef, useState, useEffect } from "react";
import "./LiveChat.scss";
import { v4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import { infoType } from "Slices/userInfo";

// 고유키값

function LiveChat(props) {
  const [messageList, setMessageList] = useState([]);
  const [message, setMessage] = useState("");
  const [donation, setDonation] = useState("text");

  const handleChange = event => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    const myProps = { props }.props.props;

    myProps.session?.on("signal:chat", event => {
      const data = JSON.parse(event.data);
      const messageListData = messageList;
      messageListData.push({
        connectionId: event.from.connectionId,
        nickname: data.nickName,
        message: data.message
      });
      setMessageList([...messageListData]);
    });
  }, []);

  const sendMessage = () => {
    const myProps = { props }.props.props;
    if (myProps.myUserName && message) {
      const messageData = message.replace(/ +(?= )/g, "");
      if (messageData !== "" && messageData !== " ") {
        const data = {
          message: messageData,
          nickName: myProps.myUserName,
          streamId: myProps.streamId
        };
        myProps.session.signal({
          data: JSON.stringify(data),
          type: "chat"
        });
      }
    }
    setMessage("");
  };

  const sendDonation = () => {
    const myProps = { props }.props.props;
    if (myProps.myUserName && message) {
      const messageData = message.replace(/ +(?= )/g, "");
      if (messageData !== "" && messageData !== " ") {
        const data = {
          message: messageData,
          nickName: myProps.myUserName,
          streamId: myProps.streamId
        };
        myProps.session.signal({
          data: JSON.stringify(data),
          type: "chat"
        });
      }
    }
  };

  const handlePressKey = event => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };
  //   const ChattingOff = () => {
  //   if (chattingBox) {
  //     setChattingBox(false);
  //   } else {
  //     setChattingBox(true);
  //   }
  // };
  // const playTTS = e => {
  //   // donationOn();
  //   const myProps = { props }.props.props;
  //   if (myProps.myUserName) {
  //     const messageData = e.replace(/ +(?= )/g, "");
  //     if (messageData !== "" && messageData !== " ") {
  //       const data = {
  //         message: messageData,
  //         nickName: myProps.myUserName,
  //         streamId: myProps.streamId
  //       };
  //       myProps.session.signal({
  //         data: JSON.stringify(data),
  //         type: "chat"
  //       });
  //     }
  //   }

  //   const msg = new SpeechSynthesisUtterance(e);
  //   window.speechSynthesis.speak(msg);
  // };

  const scrollRef = React.useRef();
  React.useEffect(() => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  return (
    <div>
      <div className="chatting">
        <div className="chatting-title">
          <p className="chatting-title-text">채팅방</p>
        </div>

        <div className="chatting-box">
          {messageList.map(data => (
            <div key={v4()} id="remoteUsers" className="">
              <div className="chatting-box-content">
                <p className="chatting-box-content-nickname">
                  {data.nickname} : {data.message}
                </p>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>

        <div className="chatting-input">
          <input
            className="chatting-input-form"
            placeholder="메세지를 입력하세요"
            id="chatInput"
            value={message}
            onChange={handleChange}
            onKeyPress={handlePressKey}
            autoComplete="off"
          />
          <button
            type="button"
            className="chatting-input-button"
            onClick={sendMessage}
          >
            전송
          </button>
        </div>
      </div>
      {/* <div className="donation">
        <input
          type="text"
          onChange={event => setDonation(event.target.value)}
        />
        ;
        <button
          type="submit"
          onClick={() => {
            playTTS(donation);
          }}
        >
          도네이션
        </button>
      </div> */}
    </div>
  );
}

export default LiveChat;
