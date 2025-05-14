/*
    웹소켓
    웹소켓은 웹 브라우저와 서버 사이에 지속적으로 연결을 유지하면서 실시간으로 데이터를 주고 받을 수 있는 통신 방식
*/

import express from "express";
import { createServer } from "http";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const server = createServer(app);
const io = new Server(server);
//EX(.mjs)에서는 __dirname 과 __filename이 없음
// import.meta.url: 현재 파일의 경로
// fileURLToPath: 실제 경로를 문자열로 반환
// path.dirnameL 디렉토리의 이름만 추출
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logsDir = path.join(__dirname, "logs");

app.use(express.static(path.join(__dirname, "public")));
const users = {};

io.on("connection", (socket) => {
  socket.on("join", ({ nickname, channel }) => {
    socket.nickname = nickname;
    socket.channel = channel;
    users[socket.id] = { nickname, channel };
    socket.join(channel);

    const msg = { user: "system", text: `${nickname}님이 입장했습니다.` };
    io.to(channel).emit("message", msg);
    console.log(`nickname: ${nickname}\nchannel: ${channel}`);

    updateUserList();
  });

  socket.on("chat", ({ text, to }) => {
    const sender = users[socket.id];
    if (!sender) return;
    const payload = { user: sender.nickname, text };

    if (to) {
      const receiverSocket = Object.entries(users).find(
        ([id, u]) => u.nickname === to
      )?.[0]; // [0] 소켓id, ?.(옵셔널 체이닝): 값이 undefined일 경우 에러 없이 넘어가게 함
      if (receiverSocket) {
        io.to(receiverSocket).emit("whisper", payload);
        socket.emit("whisper", payload);
      }
    } else {
      io.to(sender.channel).emit("message", payload);
    }
  });

  socket.on("changeChannel", ({ newChannel }) => {
    const oldChannel = socket.channel;
    const nickname = socket.nickname;
    socket.leave(oldChannel);
    io.to(oldChannel).emit("message", {
      user: "system",
      text: `${nickname}님이 ${newChannel} 채널로 이동했습니다.`,
    });
    socket.channel = newChannel;
    users[socket.id].channel = newChannel;
    socket.join(newChannel);

    const joinMsg = { user: "system", text: `${nickname}님이 입장했습니다.` };
    io.to(newChannel).emit("message", joinMsg);

    updateUserList();
  });

  socket.on("disconnect", () => {
    const user = users[socket.id];
    if (user) {
      const msg = {
        user: "system",
        text: `${user.nickname}님이 퇴장했습니다.`,
      };
      io.to(user.channel).emit("message", msg);
      delete users[socket.id];

      updateUserList();
    }
  });

  function updateUserList() {
    const userList = Object.values(users); // [{nickname, channel}, ... ]
    io.emit("userList", userList);
  }
});

server.listen(3000, () => {
  console.log("서버 실행 중");
});
