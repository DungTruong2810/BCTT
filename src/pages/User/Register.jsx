import { useState } from "react";
import Swal from "sweetalert2";
import { signup } from "../../services/authService";

const Register = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const isPasswordValid = (password) => {
    // Kiểm tra mật khẩu có ít nhất 8 ký tự và bao gồm cả chữ và số
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Gọi hàm đăng ký và truyền dữ liệu từ state
      const response = await signup(data);
      console.log("Đăng ký thành công", response);
      Swal.fire({
        icon: 'success',
        title: 'Đăng ký thành công',
        text: 'Chào mừng bạn!',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Đăng ký thất bại',
        text: 'Vui lòng thử lại!',
      });
      console.error("Đăng ký thất bại", error);
    }
  };

  return (
    <section className="section-content padding-y">
      <div
        className="card mx-auto"
        style={{ maxWidth: 520, marginTop: 40, textAlign: "center" }}
      >
        <article className="card-body">
          <header className="mb-4">
            <h4 style={{ textAlign: "center" }} className="card-title ">
              Sign up
            </h4>
          </header>
          <form onSubmit={handleSignup} style={{ marginBottom: 10 }}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  type="text"
                  placeholder="User name"
                  required
                  onChange={(e) =>
                    setData({ ...data, username: e.target.value })
                  }
                  className="form-control custom-input"
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                  type="text"
                  required
                  className="form-control custom-input"
                  placeholder="Phone number"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6 ">
                <input
                  onChange={(e) => {
                    const password = e.target.value;
                    setData({
                      ...data,
                      password: password,
                      repeatPassword: password,
                    });
                    if (!isPasswordValid(password)) {
                      console.log(isPasswordValid(password));
                    }
                  }}
                  required
                  className="form-control custom-input"
                  type="password"
                  placeholder="Password"
                />
                <small className="form-text text-muted"></small>
              </div>
              <div className="form-group col-md-6">
                <input
                  onChange={(e) =>
                    setData({ ...data, repeatPassword: e.target.value })
                  }
                  className="form-control custom-input"
                  type="password"
                  required
                  placeholder="Repeat password"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <input
                  onChange={(e) =>
                    setData({ ...data, firstName: e.target.value })
                  }
                  type="text"
                  required
                  className="form-control custom-input"
                  placeholder="First name"
                />
              </div>
              <div className="form-group col-md-6">
                <input
                  onChange={(e) =>
                    setData({ ...data, lastName: e.target.value })
                  }
                  type="text"
                  required
                  className="form-control custom-input"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="form-group">
              <input
                onChange={(e) => setData({ ...data, email: e.target.value })}
                type="email"
                className="form-control custom-input"
                placeholder="Email"
                required
              />
              <small className="form-text text-muted"></small>
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">
                Register
              </button>
            </div>

            <div className="form-group">
              <label className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  defaultChecked
                />
                <div className="custom-control-label">
                  I am agree with <a href="#">terms and conditions</a>
                </div>
              </label>
            </div>
          </form>
        </article>
      </div>
      <p className="text-center mt-4">
        Have an account? <a href="/login">Log In</a>
      </p>
      <br />
      <br />
    </section>
  );
};

export default Register;
