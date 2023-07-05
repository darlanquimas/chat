import "./App.css";
import Join from "./components/Join";
import Chat from "./components/Chat";
import { useState } from "react";

function App() {
  const [chatVisibility, setChatVisibility] = useState(false);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState(null);

  const handleLogOut = () => {
    socket.disconnect();
    setChatVisibility(false);
    setUsername(null);
    setSocket(null);
  };

  return (
    <>
      {username ? (
        <div
          style={{
            display: "flex",
            placeContent: "center space-between",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>{`Bem vindo! ${username}`}</h2>{" "}
          <button
            onClick={() => {
              handleLogOut();
            }}
            style={{ height: 40, width: 80, justifyContent: "center" }}
          >
            Sair
          </button>
        </div>
      ) : (
        <h2>Informe um nome de usuário</h2>
      )}
      {chatVisibility ? (
        <Chat socket={socket} username={username} />
      ) : (
        <Join
          setChatVisibility={setChatVisibility}
          setSocket={setSocket}
          setUsername={setUsername}
        />
      )}
    </>
  );
}

export default App;
