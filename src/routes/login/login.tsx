import * as React from "react";
import { useState, useEffect } from "react";
import "./index.less";
import { Button, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useFetch, BASE_URL } from "@/utils/useFetch";
import { getRandowString } from "@/utils/";
import { http } from "@/services/request";
import { localStore } from "@/services/LocalStoreService";
type LayoutType = Parameters<typeof Form>[0]["layout"];

type formDataTyle = {
  userName: string;
  password: string;
  captcha: string;
};

export default function Login(props: any) {
  const { history } = props;

  const [form] = Form.useForm();
  const [clientId, setClientId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const getIdentifyingCode = () => {
    const randomCode = getRandowString(32);
    const qrImg = `${BASE_URL}/visual/login/captcha.jpg?clientId=${randomCode}`;
    setClientId(randomCode);
    setQrCode(qrImg);
  };
  const handleLoginForm = (formData: formDataTyle) => {
    let flag = false;
    const { userName, password, captcha } = formData;
    if (userName && password && captcha) {
      flag = true;
    } else {
      message.warning("请填写完整");
    }
    return flag;
  };
  const login = async () => {
    const formData = form.getFieldsValue(true);
    if (!handleLoginForm(formData)) {
      return;
    }
    setLoginLoading(true);
    try {
      const params = {
        ...formData,
        clientId,
      };
      const [, data] = await useFetch("/visual/login/login", {
        body: JSON.stringify(params),
      });
      if (data) {
        localStorage.setItem("token", data);
        history.replace("/");
      } else {
        getIdentifyingCode();
      }
    } catch (error) {
      getIdentifyingCode();
    } finally {
      setLoginLoading(false);
    }
  };
  const handleLogin = (e: any) => {
    if (e.keyCode === 13) {
      login();
    }
  };
  useEffect(() => {
    getIdentifyingCode();
  }, []);
  useEffect(() => {
    if (clientId) {
      window.addEventListener("keydown", handleLogin);
      return () => {
        window.removeEventListener("keydown", handleLogin);
      };
    }
  }, [clientId]);
  return (
    <div className="login">
      <div className="leftImage">
        <div className="welcomeText">
          <div className="titleText">欢迎使用可视化开发平台</div>
          <div className="enText">WELCOME TO VISUAL CONSTRUCTION PLATFORM</div>
          <div className="introductionText">数据管理更方便，协作更高效</div>
        </div>
        <img src={require("../../assets/images/主图.png")} alt=""></img>
      </div>
      <div className="righFform">
        <div className="formContainer">
          <div className="formTitle">可视化态势平台</div>
          <Form
            layout="vertical"
            form={form}
            size="large"
            initialValues={{
              userName: "",
              password: "",
              captcha: "",
            }}
          >
            <Form.Item label="账号" name="userName">
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="请输入账号"
              />
            </Form.Item>
            <Form.Item label="密码" name="password">
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                placeholder="请输入密码"
                type="password"
              />
            </Form.Item>
            <Form.Item className="formIdentify" label="验证码" name="captcha">
              <div className="captcha">
                <Input placeholder="请输入验证码" />
                <img
                  className="identifyingCode"
                  src={qrCode}
                  alt=""
                  onClick={getIdentifyingCode}
                ></img>
              </div>
            </Form.Item>
            <Form.Item className="formButton" wrapperCol={{ span: 24 }}>
              <Button
                type="primary"
                block
                loading={loginLoading}
                onClick={login}
                onKeyUp={handleLogin}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
