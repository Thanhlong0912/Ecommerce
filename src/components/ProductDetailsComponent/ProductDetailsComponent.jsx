import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Col, Image, Rate, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import imageProductSmall from "../../assets/images/imagesmall.webp";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import * as ProductService from "../../services/ProductService";
import { convertPrice } from "../../utils";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import Loading from "../LoadingComponent/Loading";
import {
  WrapperAddressProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from "./style";

const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const onChange = (value) => {
    setNumProduct(Number(value));
  };
  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };
  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else {
      setNumProduct(numProduct - 1);
    }
  };
  const { isLoading, data: productDetails } = useQuery(
    ["product-details", idProduct],
    fetchGetDetailsProduct,
    {
      enabled: !!idProduct,
    }
  );
  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      dispatch(
        addOrderProduct({
          orderItem: {
            name: productDetails?.name,
            amount: numProduct,
            image: productDetails?.image,
            price: productDetails?.price,
            product: productDetails?._id,
          },
        })
      );
    }
  };

  return (
    <div style={{ padding: "16px", background: "#fff", borderRadius: "4px" }}>
      <Loading isLoading={isLoading}>
        <Row>
          <Col
            span={10}
            style={{ borderRight: "1px solid #e5e5e5", paddingRight: "8px" }}
          >
            <Image
              src={productDetails?.image}
              alt="image product"
              preview={false}
            />
            <div>
              <Row
                style={{ paddingTop: "10px", justifyContent: "space-between" }}
              >
                <WrapperStyleColImage span={4}>
                  <WrapperStyleImageSmall
                    src={productDetails?.image}
                    alt="image small"
                    preview={false}
                  />
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                  <WrapperStyleImageSmall
                    src={productDetails?.image}
                    alt="image small"
                    preview={false}
                  />
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                  <WrapperStyleImageSmall
                    src={productDetails?.image}
                    alt="image small"
                    preview={false}
                  />
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                  <WrapperStyleImageSmall
                    src={productDetails?.image}
                    alt="image small"
                    preview={false}
                  />
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                  <WrapperStyleImageSmall
                    src={productDetails?.image}
                    alt="image small"
                    preview={false}
                  />
                </WrapperStyleColImage>
                <WrapperStyleColImage span={4}>
                  <WrapperStyleImageSmall
                    src={productDetails?.image}
                    alt="image small"
                    preview={false}
                  />
                </WrapperStyleColImage>
              </Row>
            </div>
          </Col>
          <Col span={14} style={{ paddingLeft: "10px" }}>
            <WrapperStyleNameProduct>
              {productDetails?.name}
            </WrapperStyleNameProduct>
            <div>
              <Rate
                allowHalf
                defaultValue={productDetails?.rating}
                value={productDetails?.rating}
              />
              <WrapperStyleTextSell>| Da ban 1000+</WrapperStyleTextSell>
            </div>
            <WrapperPriceProduct>
              <WrapperPriceTextProduct>
                {convertPrice(productDetails?.price)}
              </WrapperPriceTextProduct>
            </WrapperPriceProduct>
            <div>{productDetails?.description}</div>
            <WrapperAddressProduct>
              <span style={{ color: "blue" }}>Giao ?????n: </span>
              <span className="address" style={{ fontWeight: "bold" }}>
                {user?.address}
              </span>
            </WrapperAddressProduct>
            <div
              style={{
                margin: "10px 0 20px",
                padding: "10px 0",
                borderTop: "1px solid #e5e5e5",
                borderBottom: "1px solid #e5e5e5",
              }}
            >
              <div style={{ marginBottom: "10px" }}>S??? l?????ng</div>
              <WrapperQualityProduct>
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => handleChangeCount("decrease")}
                >
                  <MinusOutlined style={{ color: "#000", fontSize: "20px" }} />
                </button>
                <WrapperInputNumber
                  onChange={onChange}
                  defaultValue={1}
                  value={numProduct}
                  size="small"
                />
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => handleChangeCount("increase")}
                >
                  <PlusOutlined style={{ color: "#000", fontSize: "20px" }} />
                </button>
              </WrapperQualityProduct>
            </div>
            <div style={{ display: "flex", aliggItems: "center", gap: "12px" }}>
              <ButtonComponent
                size={40}
                styleButton={{
                  background: "rgb(255, 57, 69)",
                  height: "48px",
                  width: "220px",
                  border: "none",
                  borderRadius: "4px",
                }}
                onClick={handleAddOrderProduct}
                textButton={"Ch???n mua"}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              ></ButtonComponent>
              <ButtonComponent
                size={40}
                styleButton={{
                  background: "#fff",
                  height: "48px",
                  width: "220px",
                  border: "1px solid rgb(13, 92, 182)",
                  borderRadius: "4px",
                }}
                textButton={"Mua tr??? sau"}
                styleTextButton={{
                  color: "rgb(13, 92, 182)",
                  fontSize: "15px",
                }}
              ></ButtonComponent>
            </div>
          </Col>
        </Row>
      </Loading>
    </div>
  );
};

export default ProductDetailsComponent;
