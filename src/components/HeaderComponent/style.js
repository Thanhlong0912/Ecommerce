import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
  padding: 10px 120px;
  align-items: center;
  background-color: rgba(26, 148, 255);
  gap: 16px;
  flex-wrap: nowrap;
  width: 1270px;
  padding: 10px 0;
`;

export const WrapperTextHeader = styled(Link)`
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  text-align: left;
  cursor: pointer;
`;

export const WrapperAccount = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 10px;
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  color: #fff;
  white-space: nowrap;
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;
