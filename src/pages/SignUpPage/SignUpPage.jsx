import React, { useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "./style";
import { Image } from "antd";
import imageLogo from "../../assets/images/logo-login.png";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(0, 0, 0, 0.53)",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "800px",
            height: "445px",
            borderRadius: "6px",
            background: "#fff",
          }}
        >
          <WrapperContainerLeft>
            <h4>Xin chào</h4>
            <p>Đăng nhập và tạo tài khoản</p>
            <InputForm
              style={{ marginBottom: "10px" }}
              placeholder="abc@gmail.com"
            />
            <div style={{ position: "relative" }}>
              <span
                onClick={() => setIsShowPassword(!isShowPassword)}
                style={{
                  zIndex: 10,
                  position: "absolute",
                  top: "4px",
                  right: "8px",
                }}
              >
                {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
              </span>
              <InputForm
                placeholder="password"
                style={{ marginBottom: "10px" }}
                type={isShowPassword ? "text" : "password"}
              />
            </div>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  zIndex: 10,
                  position: "absolute",
                  top: "4px",
                  right: "8px",
                }}
              >
                {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
              </span>
              <InputForm
                placeholder="comfirm password"
                type={isShowConfirmPassword ? "text" : "password"}
              />
            </div>
            <ButtonComponent
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "48px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "26px 0 10px",
              }}
              textButton={"Đăng ký"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
            <p>
              Bạn đã có tài khoản?
              <WrapperTextLight> Đăng nhập</WrapperTextLight>
            </p>
          </WrapperContainerLeft>
          <WrapperContainerRight>
            <Image
              src={imageLogo}
              preview={false}
              alt="image-logo"
              height="203px"
              width="203px"
            />
            <h4>Mua sắm tại Thương Mại Điện Tử</h4>
          </WrapperContainerRight>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
