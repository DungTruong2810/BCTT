import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate } from "react-router";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      console.log(response.jwtToken);
      localStorage.setItem("token", response.jwtToken);
      alert("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      alert("Đăng nhập thất bại");
      console.error("Đăng nhập thất bại", error);
    }
  };
  return (
    <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
      <div className="card mx-auto" style={{ maxWidth: 380, marginTop: 100 }}>
        <div className="card-body">
          <h4 className="card-title mb-4">Sign in</h4>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                name="username"
                className="form-control"
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                name="password"
                className="form-control"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <a href="/forgotpassword" className="float-right">
                Forgot password?
              </a>
              <label className="float-left custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  defaultChecked
                />{" "}
                <div className="custom-control-label"> Remember </div>{" "}
              </label>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Login
              </button>
            </div>
            <a
              href="/register"
              className="btn btn-link"
              style={{ padding: 0, marginLeft: "100px" }}
            >
              Create an Account
            </a>
          </form>
        </div>
      </div>
      <br />
      <br />
    </section>
  );
};

export default Login;
