import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const loginData = new URLSearchParams();
    loginData.append('username', username);
    loginData.append('password', password);
    loginData.append('grant_type', 'password');

    // Gửi yêu cầu POST đăng nhập đến API
    const response = await fetch('https://qldt.ptit.edu.vn/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: loginData.toString(),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Đăng nhập thành công', data);
      // Thực hiện các tác vụ sau khi đăng nhập thành công
    } else {
      console.log('Đăng nhập thất bại');
      const errorData = await response.json();
      console.error(errorData);
    }
  };

  return (
    <div>
      <h1>Đăng nhập</h1>
      <input
        type="text"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Đăng nhập</button>
    </div>
  );
}

export default Login;
