import React, { useState, useEffect } from 'react';
import User from './component/User';

function loginQLDT(username, password) {
  class QLDT {
    constructor(username, password) {
      this.username = username;
      this.password = password;
      this.name = '';
      this.session = new XMLHttpRequest();
      this.setupRequestHeaders();
    }
  
    setupRequestHeaders() {
      this.session.open('POST', 'https://qldt.ptit.edu.vn/api/auth/login', false); // Open the request here
      this.session.setRequestHeader('Accept', 'application/json, text/plain, */*');
      this.session.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
      this.session.setRequestHeader('Accept-Language', 'en-US,en;q=0.9,vi;q=0.8');
      this.session.setRequestHeader('Authorization', '');
      this.session.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      this.session.setRequestHeader('Connection', 'keep-alive');
      this.session.setRequestHeader('Content-Length', '0');
      this.session.setRequestHeader('Idpc', '');
      this.session.setRequestHeader('Host', 'qldt.ptit.edu.vn');
      this.session.setRequestHeader('Origin', 'https://qldt.ptit.edu.vn');
      this.session.setRequestHeader('Referer', 'https://qldt.ptit.edu.vn');
      this.session.setRequestHeader('Sec-Fetch-Dest', 'empty');
      this.session.setRequestHeader('Sec-Fetch-Mode', 'cors');
      this.session.setRequestHeader('Sec-Fetch-Site', 'same-origin');
      this.session.setRequestHeader('Sec-Ch-Ua', '"Chromium";v="116", "Not)A;Brand";v="24", "Google Chrome";v="116"');
      this.session.setRequestHeader('Sec-Ch-Ua-Mobile', '?0');
      this.session.setRequestHeader('Sec-Ch-Ua-Platform', '"Windows"');
      this.session.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36');
    }
    login() {
      const dataLogin = {
        'username': this.username,
        'password': this.password,
        'grant_type': 'password'
      };
      let isLogin = false;

      for (let i = 0; i < 5; i++) {
        try {
          const responseText = this.performLoginRequest(dataLogin);
          const response_json = JSON.parse(responseText);

          if (response_json.access_token === null) {
            console.log(response_json.message);
            return false;
          } else {
            isLogin = true;
            console.log("Đăng nhập thành công");
            console.log("Mã sinh viên:", response_json.userName);
            console.log("Tên:", response_json.name);
            this.name = response_json.name;
            this.updateSessionHeaders(response_json);
            break;
          }
        } catch (error) {
          console.log("Đăng nhập không thành công, đang thử lại...");
        }
      }

      if (!isLogin) {
        console.log("Đăng nhập thất bại quá 5 lần, vui lòng thử lại sau");
      }
      return isLogin;
    }

    performLoginRequest(data) {
      this.session.open('POST', 'https://qldt.ptit.edu.vn/api/auth/login', false);
      this.session.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      this.session.send(data);
      return this.session.responseText;
    }

    updateSessionHeaders(response_json) {
      this.session.setRequestHeader("Authorization", `Bearer ${response_json.access_token}`);
      this.session.setRequestHeader("Idpc", response_json.idpc);
      this.session.setRequestHeader("Content-Type", "application/json");
    }
  }

  const qldtApp = new QLDT(username, password);
  qldtApp.login();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <User />
      </header>
    </div>
  );
}

export default App;

// To use the login function:
loginQLDT('B22DCCN125', 'Thu210304');
