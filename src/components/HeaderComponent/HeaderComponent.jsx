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
import { searchProduct } from "../../redux/slides/productSlide";

const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();
  const [useName, setUserName] = useState("");
  const [useAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };
  const handleNavigate = () => {
    navigate("/");
  };
  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order");
    } else {
      handleLogout();
    }
    setIsOpenPopup(false);
  };
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
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
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
        Quản lí hệ thống
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate("my-order")}>
        Đơn hàng của tôi
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopup>
    </div>
  );
  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };
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
              onChange={onSearch}
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
                  <Popover content={content} trigger="click" open={isOpenPopup}>
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsOpenPopup((prev) => !prev)}
                    >
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
            <div
              onClick={() => navigate("/order")}
              style={{ cursor: "pointer" }}
            >
              <Badge count={order?.orderItems?.length} size="small">
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
