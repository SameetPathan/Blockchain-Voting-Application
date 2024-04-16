import { React, useState, useEffect } from "react";
import "../Typewriter.css";

function ForceLogin() {
  const [text, setText] = useState("");
  const messages = [
    "Revolutionize democracy with our cutting-edge blockchain voting system.",
    "Rest assured, every vote is securely recorded and transparently verified,",
    "ensuring the integrity and fairness of every election.",
    "Empower your community with trust and accountability -",
    "embrace the future of voting today."
  ];
  
  useEffect(() => {
    let i = 0;
    let timer = setInterval(() => {
      setText(messages[i]);
      i = (i + 1) % messages.length;
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="home-page" >
        <img
          className="bg-img"
          src={process.env.PUBLIC_URL + "/bg2.jpg"}
          alt="Background"
          style={{


            width: "100%",
            height: "700px",
            objectFit: "cover",
          }}
        />
        <div className="typewriter-text my-div">{text}</div>
      </div>
    </>
  );
}

export default ForceLogin;
