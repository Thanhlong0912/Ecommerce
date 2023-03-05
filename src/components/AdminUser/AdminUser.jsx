import { Button } from "antd";
import React from "react";
import { WrapperHeader } from "./style";
import { PlusCircleOutlined } from "@ant-design/icons";
import TableConponent from "../TableComponent/TableConponent";

const AdminUser = () => {
  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
        >
          <PlusCircleOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableConponent />
      </div>
    </div>
  );
};

export default AdminUser;
