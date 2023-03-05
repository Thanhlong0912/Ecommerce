import { Badge, Col, Popover } from "antd";
import React, { useEffect, useState } from "react";
import {
  WrapperHeader,
  WrapperTextHeader,
  WrapperAccount,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from "./style";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import ButtonInputSearch from "../ButtonInputSearch/ButtonInputSearch";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../LoadingComponent/Loading";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const [useName, setUserName] = useState("");
  const [useAvatar, setUserAvatar] = useState("");
  const user = useSelector((state) => state.user);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleNavigate = () => {
    navigate("/");
  };
  const dispath = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispath(resetUser());
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);
  const content = (
    <div>
      <WrapperContentPopup onClick={() => navigate("/profile-user")}>
        Thông tin cá nhân
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => navigate("/system/admin")}>
          Quản lí hệ thống
        </WrapperContentPopup>
      )}

      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );
  return (
    <div
      style={{
        width: "100%",
        background: "rgb(26, 148, 255)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <WrapperHeader
        style={{
          justifyContent:
            isHiddenSearch && isHiddenCart ? "space-between" : "unset",
        }}
      >
        <Col span={5}>
          <WrapperTextHeader onClick={handleNavigate}>
            TRANG THƯƠNG MẠI ĐIỆN TỬ
          </WrapperTextHeader>
        </Col>
        {!isHiddenSearch && (
          <Col span={13}>
            <ButtonInputSearch
              size="large"
              bordered={false}
              placeholder="Tìm sản phẩm mong muốn....."
              textButton="Tìm kiếm"
              // onSearch={onSearch}
            />
          </Col>
        )}

        <Col
          span={6}
          style={{ display: "flex", gap: "54px", alignItems: "center" }}
        >
          <Loading isLoading={loading}>
            <WrapperAccount>
              {useAvatar ? (
                <img
                  src={useAvatar}
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  alt="avatar"
                />
              ) : (
                <UserOutlined style={{ fontSize: "30px" }} />
              )}
              {user?.access_token ? (
                <>
                  <Popover content={content} trigger="click">
                    <div style={{ cursor: "pointer" }}>
                      {useName?.length ? useName : user?.email}
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  <WrapperTextHeaderSmall>
                    Đăng Nhập/ Đăng Ký
                  </WrapperTextHeaderSmall>
                  <div>
                    <WrapperTextHeaderSmall>Tài Khoản</WrapperTextHeaderSmall>
                    <CaretDownOutlined />
                  </div>
                </div>
              )}
            </WrapperAccount>
          </Loading>
          {!isHiddenCart && (
            <div>
              <Badge count={4} size="small">
                <ShoppingCartOutlined
                  style={{ fontSize: "30px", color: "#fff" }}
                />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          )}
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
