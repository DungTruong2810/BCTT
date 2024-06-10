import { useState, useEffect } from "react";
import {
  Grid,
  Avatar,
  Button,
  TextField,
  Box,
  Tab,
  Tooltip,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import {
  CloudUpload,
  Close as CloseIcon,
  Check as CheckIcon,
  EditOutlined,
} from "@material-ui/icons";
import { useParams } from "react-router";
import {
  changepassword,
  checkPassword,
  checkRepeatPassword,
  getUser,
} from "../../services/userServices";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { decodeUser } from "../../utils";

function Profile() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isUploadAvatar, setIsUploadAvatar] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errorNewPassword, setErrorNewPassword] = useState("");
  const [errorRepeatPassword, setErrorRepeatPassword] = useState("");
  const [tabIndex, setTabIndex] = useState("1");

  useEffect(() => {
    getUser(id).then((res) => {
      setUser(res);
    });
  }, [id]);
  useEffect(() => {
    const id = decodeUser();
    if (id) {
      getUser(id).then((res) => {
        setUser(res);
        console.log(res);
      });
    }
  }, []);
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleProfileChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event) => {
    setRepeatPassword(event.target.value);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewAvatar(reader.result);
      setIsUploadAvatar(true);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitAvatar = () => {
    // Submit the avatar change
    setIsUploadAvatar(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle profile update
    setIsEditing(false);
  };

  const handleSubmitChangePassword = async (event) => {
    event.preventDefault();
    if (newPassword !== repeatPassword) {
      setErrorRepeatPassword("Mật khẩu không khớp");
      return;
    }
    try {
      await changepassword({ id, newPassword });
      alert("Mật khẩu đã được thay đổi thành công");
    } catch (error) {
      console.error("Error", error);
      alert("Đã xảy ra lỗi, vui lòng thử lại");
    }
  };

  return (
    <div className="container my-5">
      <Grid container spacing={3}>
        <Grid item sm={12} md={12} lg={3}>
          <div className="bg-light rounded py-5" style={{ padding: "16px" }}>
            <div className="d-flex align-items-center justify-content-center flex-column">
              <Avatar
                style={{ fontSize: "100px" }}
                alt={user.lastName?.toUpperCase() || ""}
                src={previewAvatar}
                sx={{ width: 100, height: 100 }}
              />
              {!isUploadAvatar ? (
                <Button
                  className="mt-3"
                  size="small"
                  component="label"
                  variant="outlined"
                  startIcon={<CloudUpload />}
                >
                  Upload avatar
                  <input type="file" hidden onChange={handleImageUpload} />
                </Button>
              ) : (
                <div>
                  <Button
                    className="mt-4 me-2"
                    size="small"
                    variant="outlined"
                    startIcon={<CloseIcon />}
                    onClick={() => {
                      setPreviewAvatar(user.avatar);
                      setIsUploadAvatar(false);
                    }}
                    color="error"
                  >
                    Huỷ
                  </Button>
                  <Button
                    className="mt-4 ms-2"
                    size="small"
                    variant="outlined"
                    startIcon={<CheckIcon />}
                    color="success"
                    onClick={handleSubmitAvatar}
                  >
                    Thay đổi
                  </Button>
                </div>
              )}
            </div>
            <div className="text-center mt-3">
              <p>Email: {user.email}</p>
            </div>
          </div>
        </Grid>
        <Grid item sm={12} md={12} lg={9}>
          <div
            className="bg-light rounded px-2 mt-3"
            style={{ padding: "16px" }}
          >
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={tabIndex}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleTabChange}>
                    <Tab label="Thông tin cá nhân" value="1" />
                    <Tab label="Đơn hàng" value="2" />
                    <Tab label="Đổi mật khẩu" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <form
                    onSubmit={handleSubmit}
                    className="form position-relative"
                  >
                    {!isEditing && (
                      <div
                        className="text-end my-3 position-absolute"
                        style={{ bottom: "0", right: "0" }}
                      >
                        <Tooltip
                          title="Chỉnh sửa thông tin"
                          placement="bottom-end"
                        >
                          <Button
                            variant="contained"
                            type="button"
                            className="rounded-pill"
                            onClick={() => setIsEditing(true)}
                          >
                            <EditOutlined sx={{ width: "24px" }} />
                          </Button>
                        </Tooltip>
                      </div>
                    )}
                    <div className="row">
                      <div className="col-sm-12 col-md-6 col-lg-4">
                        <TextField
                          required
                          fullWidth
                          label=""
                          value={user.idUser}
                          disabled
                          className="input-field"
                          InputProps={{ readOnly: true }}
                        />
                        <TextField
                          required
                          fullWidth
                          label=""
                          name=""
                          value={user.firstName}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="input-field"
                        />
                        <TextField
                          required
                          fullWidth
                          label=""
                          name="phoneNumber"
                          value={user.phoneNumber}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-4">
                        <TextField
                          required
                          fullWidth
                          label=""
                          value={user.username}
                          disabled
                          className="input-field"
                        />
                        <TextField
                          required
                          fullWidth
                          label=""
                          name="lastName"
                          value={user.lastName}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="input-field"
                        />
                        <TextField
                          required
                          fullWidth
                          label=""
                          name="deliveryAddress"
                          value={user.deliveryAddress}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                      <div className="col-sm-12 col-md-6 col-lg-4">
                        <TextField
                          required
                          fullWidth
                          label=""
                          value={user.email}
                          className="input-field"
                          disabled
                          InputProps={{ readOnly: true }}
                        />
                        <TextField
                          required
                          fullWidth
                          className="input-field"
                          label=""
                          value={user.dateOfBirth?.split("T")[0]}
                          onChange={handleProfileChange}
                          disabled={!isEditing}
                        />
                        <FormControl>
                          <FormLabel style={{ marginTop: "10px" }}>
                            Giới tính
                          </FormLabel>
                          <RadioGroup
                            row
                            name="gender"
                            value={user.gender}
                            onChange={handleProfileChange}
                          >
                            <FormControlLabel
                              value="M"
                              control={<Radio />}
                              label="Nam"
                              disabled={!isEditing}
                            />
                            <FormControlLabel
                              value="F"
                              control={<Radio />}
                              label="Nữ"
                              disabled={!isEditing}
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    {isEditing && (
                      <div className="text-center my-3">
                        <Button
                          fullWidth
                          variant="outlined"
                          type="submit"
                          sx={{ width: "50%", padding: "10px" }}
                        >
                          Lưu và thay đổi
                        </Button>
                      </div>
                    )}
                  </form>
                </TabPanel>
                <TabPanel value="2">
                  <div>aa</div>
                </TabPanel>
                <TabPanel value="3">
                  <form
                    onSubmit={handleSubmitChangePassword}
                    className="form position-relative"
                  >
                    <TextField
                      error={!!errorNewPassword}
                      helperText={errorNewPassword}
                      required
                      fullWidth
                      type="password"
                      label="Mật khẩu mới"
                      placeholder="Nhập mật khẩu mới"
                      value={newPassword}
                      onChange={handlePasswordChange}
                      onBlur={(e) =>
                        checkPassword(setErrorNewPassword, e.target.value)
                      }
                      className="input-field"
                    />
                    <TextField
                      error={!!errorRepeatPassword}
                      helperText={errorRepeatPassword}
                      required
                      fullWidth
                      type="password"
                      label="Xác nhận mật khẩu mới"
                      placeholder="Nhập lại mật khẩu mới"
                      value={repeatPassword}
                      onChange={handleRepeatPasswordChange}
                      onBlur={(e) =>
                        checkRepeatPassword(
                          setErrorRepeatPassword,
                          e.target.value,
                          newPassword
                        )
                      }
                      className="input-field"
                    />
                    <div className="text-center my-3">
                      <Button
                        fullWidth
                        variant="outlined"
                        type="submit"
                        onChange={handlePasswordChange}
                        sx={{ width: "50%", padding: "10px" }}
                      >
                        Lưu và thay đổi
                      </Button>
                    </div>
                  </form>
                </TabPanel>
              </TabContext>
            </Box>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
