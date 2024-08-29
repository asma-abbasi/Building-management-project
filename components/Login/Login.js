import { Box, Button, CircularProgress, Container, FormGroup, Grid, InputLabel, TextField } from "@mui/material";
import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../slices/AuthSlice'
import BaseUrl from "../../services/BaseUrl";
import ReactInputMask from "react-input-mask";
import { RefreshOutlined } from "@mui/icons-material";
import { blue } from "@mui/material/colors";
import Notification from "../common/Notification";

export default function Login(props) {
  const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const [captchacode, setCaptchaCode] = useState("");
  const [enteredCaptchaCode, setEnteredCaptchaCode] = useState("");
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChangeCaptchaCode = (e) => {
    const eCaptchaCode = e.target.value;
    setEnteredCaptchaCode(eCaptchaCode);
  };

  const getCaptcha = () => {
    console.log('captcha username', username);
    if (username == '' || username == null || username == undefined) {
      // alert("لطفا اطلاعات اجباری تکمیل گردد.");
      setNotify({
        isOpen: true,
        message: 'فیلدهای اجباری را تکمیل نمایید.',
        type: 'error'
      })
      return;
    }
    setCaptchaSuccess(false);
    setEnteredCaptchaCode('');
    var urlParams = "userName=" + username;
    var printUrl = BaseUrl() + "/api/building/v1/captcha/jcaptcha/?" + urlParams;
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    fetch(`${printUrl}`, requestOptions)
      .then((res) => {
        setCaptchaSuccess(true);
        //   console.log('getCaptchaData');
        return res.blob();
      }).then((blob) => {
        console.log('blob', blob);
        setCaptchaCode('');
        setCaptchaSuccess(true);
        console.log('URL:', URL.createObjectURL(blob));
        document.getElementById("captchaImg").src = URL.createObjectURL(blob);
      })
      .catch((err) => {
        // getCaptcha();
        setCaptchaSuccess(false);
        setCaptchaCode('');
        console.log('error', err);
        //alert('خطا در دریافت کد امنیتی، لطفا دوباره تلاش کنید.');
        setNotify({
          isOpen: true,
          message: 'دریافت کد امنیتی با مشکل مواجه شده است، لطفا دوباره تلاش کنید!',
          type: 'error'
        })
        //return Promise.reject({ Error: 'Something Went Wrong', err });
      });
  };



  const changeHandler = (event) => {
    if (event.target.name == 'userName') {
      setUserName(event.target.value);
    } else if (event.target.name == 'password') {
      setPassword(event.target.value);
    } else if (event.target.name == 'captcha') {
      setEnteredCaptchaCode(event.target.value);
    }
    console.log('userName', username);
  }

  const captchaHandler = () => {

  }

  const dispatch = useDispatch();

  const loginHandler = () => {
    console.log('loginHandler:captchacode', enteredCaptchaCode);
    //captchacode = enteredCaptchaCode;
    setLoading(true);
    dispatch(login({ username, password, enteredCaptchaCode }))
      .unwrap()
      .then(() => {
        console.log("success login");
        setLoading(false);
        setNotify({
          isOpen: true,
          message: 'ورود موفق',
          type: 'success'
        })
        props.history.push("/profile");
      })
      .catch((error) => {
        console.log("error login");
        setLoading(false);
      })
  }

  return (
    <React.Fragment>
      <Grid container spacing={24} justifyContent="center">
        <Grid item xs={12} sm={12}>
          <Grid item xs={12}>
           <label>شماره تلفن: </label>
            <ReactInputMask
              mask="99999999999"
              maskChar=" "
              value={username}
              onChange={changeHandler}
            >
              {
                () =>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    name="userName"
                    variant="standard"
                    margin="normal"
                    type="text"

                  />
              }
            </ReactInputMask>

          </Grid>
          <Grid item xs={12}>
            <label>رمز عبور: </label>
            <TextField
              required
              fullWidth
              id="password"
              name="password"
              variant="standard"
              margin="normal"
              type="password"
              onChange={changeHandler}
            />

          </Grid>
          <Grid item xs={12} display="flex" flexDirection="row" justifyContent="space-between" >
            <Grid item xs={6}>
              <Button
                onClick={getCaptcha}
                disabled={loading}
                variant='contained'
                color='info'
                fullWidth
                sx={{ mb: 2 }}
                startIcon={<RefreshOutlined />}
              >
                {
                  captchaSuccess &&
                  <img style={{ padding: 0, width: '100px' }} id="captchaImg"
                    alt="کد امنیتی" />

                }
                {
                  !captchaSuccess &&
                  <span> دریافت کد امنیتی  </span>
                }

              </Button>
            </Grid>
            <Grid item xs={4}>
              <ReactInputMask
                mask="99999"
                maskChar=""
                value={enteredCaptchaCode}
                onChange={onChangeCaptchaCode}
              >
                {() =>
                  <TextField
                    maxLength="5"
                    name="captcha"
                    id="captcha"
                    // validations={[required]}
                    variant='standard'
                    sx={{ mb: 2, direction: "rtl" }}
                    fullWidth
                    autoComplete="off"
                    placeholder="  کد امنیتی را وارد کنید" />
                }
              </ReactInputMask>
            </Grid>
            
          </Grid>
          <Grid item xs={12}>
              <Box>
                <Button
                  variant='contained'
                  color='info'
                  fullWidth
                  onClick={() => {
                    loginHandler()
                  }}
                  disabled={loading}
                  sx={{margin:'10px'}}
                >
ورود
                </Button>
                {
                  loading && (
                    <CircularProgress
                      size={50}
                      sx={{
                        color: blue[500],
                        position: "absolute",
                        top: '30%',
                        left: '50%',
                        marginTop: '-12px',
                        marginLeft: '-12px'
                      }}
                    />
                  )
                }
              </Box>
            </Grid>
        </Grid>
        <Notification
                    notify={notify}
                    setNotify={setNotify}
                />
      </Grid>
      {/* <Container>
        <Box
          sx={{
            width: 300,
            height: 400,
            border: "1px solid #9e9e9e",
            opacity: [0.9, 0.8, 0.7],
            margin: "50px auto",
            padding: "20px",
            backgroundColor: "#eceff1",
          }}
        >
          <FormGroup>
            <InputLabel
              htmlFor={"pun"}
              sx={{
                fontSize: "50",
                fontWeight: "bold",
                color: "#000",
                marginTop: "25px",
              }}
            >
              {" "}
              شماره تلفن :
            </InputLabel>
            <TextField
              required
              fullWidth
              id="userName"
              name="userName"
              variant="standard"
              margin="normal"
              type="text"
              onChange={changeHandler}
            />
            <InputLabel
              htmlFor={"pass"}
              sx={{
                fontSize: "50",
                fontWeight: "bold",
                color: "#000",
                marginTop: "25px",
              }}
            >
              {" "}
              رمز ورود:
            </InputLabel>
            <TextField
              required
              fullWidth
              id="password"
              name="password"
              variant="standard"
              margin="normal"
              type="password"
              onChange={changeHandler}
            />
            <Button
              fullWidth
              variant="contained"
              margin="normal"
              sx={{
                margin: "50px 0", padding: "10px", fontSize: "50",
                fontWeight: "bold",
              }}
              onClick={captchaHandler}
            >
              دریافت کد کپچا
            </Button>
            <InputLabel
              htmlFor={"cap"}
              sx={{
                fontSize: "50",
                fontWeight: "bold",
                color: "#000",
                marginTop: "25px",
              }}
            >
              {" "}
              کد کپچا :
            </InputLabel>
            <TextField
              required
              fullWidth
              id="captcha"
              name="captcha"
              variant="standard"
              margin="normal"
              type="text"
              onChange={changeHandler}
            />
            <Button
              fullWidth
              variant="contained"
              margin="normal"
              sx={{
                margin: "50px 0", padding: "10px", fontSize: "50",
                fontWeight: "bold",
              }}
              onClick={loginHandler}
            >
              ورود
            </Button>
          </FormGroup>
        </Box>
      </Container> */}
    </React.Fragment>
  );
}
   