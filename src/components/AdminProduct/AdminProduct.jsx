import { Button, Form, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import {
  PlusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import TableConponent from "../TableComponent/TableConponent";
import InputComponent from "../InputComponent/InputComponent";
import { getBase64 } from "../../utils";
import * as ProductService from "../../services/ProductService";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { useQuery } from "@tanstack/react-query";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import { useSelector } from "react-redux";
import ModalComponent from "../ModalComponent/ModalConponent";

const AdminProduct = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rowSelected, setRowSelected] = useState("");
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const user = useSelector((state) => state?.user);
  const [stateProduct, setStateProduct] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    description: "",
    discount: "",
    selled: "",
  });
  const [stateProductDetails, setStateProductDetails] = useState({
    name: "",
    image: "",
    type: "",
    price: "",
    countInStock: "",
    rating: "",
    description: "",
    discount: "",
    selled: "",
  });
  const [form] = Form.useForm();
  const mutation = useMutationHooks((data) => {
    const {
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      selled,
    } = data;
    const res = ProductService.createProduct({
      name,
      image,
      type,
      price,
      countInStock,
      rating,
      description,
      discount,
      selled,
    });
    return res;
  });
  const mutationUpdate = useMutationHooks((data) => {
    const { id, token, ...rests } = data;
    const res = ProductService.updateProduct(id, token, { ...rests });
    return res;
  });
  const mutationDelete = useMutationHooks((data) => {
    const { id, token } = data;
    const res = ProductService.deleteProduct(id, token);
    return res;
  });
  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  const fetchGetDetailsProduct = async (rowSelected) => {
    const res = await ProductService.getDetailsProduct(rowSelected);
    if (res?.data) {
      setStateProductDetails({
        name: res?.data?.name,
        price: res?.data?.price,
        description: res?.data?.description,
        rating: res?.data?.rating,
        image: res?.data?.image,
        type: res?.data?.type,
        countInStock: res?.data?.countInStock,
        discount: res?.data?.discount,
      });
    }
    setIsLoadingUpdate(false);
  };
  useEffect(() => {
    form.setFieldsValue(stateProductDetails);
  }, [form, stateProductDetails]);

  useEffect(() => {
    if (rowSelected && isOpenDrawer) {
      setIsLoadingUpdate(true);
      fetchGetDetailsProduct(rowSelected);
    }
  }, [rowSelected, isOpenDrawer]);
  const handleDetailsProduct = () => {
    if (rowSelected) {
      setIsOpenDrawer(true);
    }
  };
  const { data, isLoading, isSuccess, isError } = mutation;
  const {
    data: dataUpdate,
    isLoading: isLoadingUpdated,
    isSuccess: isSuccessUpdated,
    isError: isErrorUpdated,
  } = mutationUpdate;
  const {
    data: dataDeleted,
    isLoading: isLoadingDeleted,
    isSuccess: isSuccessDeleted,
    isError: isErrorDeleted,
  } = mutationDelete;
  const queryProduct = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });
  const { isLoading: isLoadingProducts, data: products } = queryProduct;
  const renderAction = () => {
    return (
      <div>
        <EditOutlined
          style={{
            color: "yellowgreen",
            fontSize: "30px",
            cursor: "pointer",
          }}
          onClick={handleDetailsProduct}
        />
        <DeleteOutlined
          style={{ color: "red", fontSize: "30px", cursor: "pointer" }}
          onClick={() => setIsModalOpenDelete(true)}
        />
      </div>
    );
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: renderAction,
    },
  ];
  const dataTable =
    products?.data?.length &&
    products?.data?.map((product) => {
      return {
        ...product,
        key: product._id,
      };
    });

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      message.success();
      handleCancel();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isSuccessDeleted && dataDeleted?.status === "OK") {
      message.success();
      handleCancelDelete();
    } else if (isErrorDeleted) {
      message.error();
    }
  }, [isSuccessDeleted]);
  const handleCloseDrawer = () => {
    setIsOpenDrawer(false);
    setStateProductDetails({
      name: "",
      image: "",
      type: "",
      price: "",
      countInStock: "",
      rating: "",
      description: "",
      discount: "",
      selled: "",
    });
    form.resetFields();
  };
  useEffect(() => {
    if (isSuccessUpdated && dataUpdate?.status === "OK") {
      message.success();
      handleCloseDrawer();
    } else if (isErrorUpdated) {
      message.error();
    }
  }, [isSuccessUpdated]);
  const handleCancel = () => {
    setIsModalOpen(false);
    setStateProduct({
      name: "",
      image: "",
      type: "",
      price: "",
      countInStock: "",
      rating: "",
      description: "",
      discount: "",
      selled: "",
    });
    form.resetFields();
  };
  const handleCancelDelete = () => {
    setIsModalOpenDelete(false);
  };
  const handleDeleteProduct = () => {
    mutation.mutate(
      { id: rowSelected, token: user?.access_token },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  const onFinish = () => {
    mutation.mutate(stateProduct, {
      onSettled: () => {
        queryProduct.refetch();
      },
    });
  };
  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnChangeDetails = (e) => {
    setStateProductDetails({
      ...stateProductDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleOnchangeAvatar = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };
  const handleOnchangeAvatarDetails = async ({ fileList }) => {
    const file = fileList[0];
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setStateProductDetails({
      ...stateProductDetails,
      image: file.preview,
    });
  };
  const onUpdateProduct = () => {
    mutationUpdate.mutate(
      {
        id: rowSelected,
        token: user?.access_token,
        ...setStateProductDetails,
      },
      {
        onSettled: () => {
          queryProduct.refetch();
        },
      }
    );
  };
  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <div style={{ marginTop: "10px" }}>
        <Button
          style={{
            height: "150px",
            width: "150px",
            borderRadius: "6px",
            borderStyle: "dashed",
          }}
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleOutlined style={{ fontSize: "60px" }} />
        </Button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <TableConponent
          columns={columns}
          isLoading={isLoadingProducts}
          data={dataTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setRowSelected(record._id);
              },
            };
          }}
        />
      </div>
      <ModalComponent
        title="Tạo sản phẩm"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Loading isLoading={isLoading}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            onFinish={onFinish}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.name}
                onChange={handleOnChange}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your type!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.type}
                onChange={handleOnChange}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Count inStock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your countInStock!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.countInStock}
                onChange={handleOnChange}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.price}
                onChange={handleOnChange}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input your rating!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.rating}
                onChange={handleOnChange}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <InputComponent
                value={stateProduct.description}
                onChange={handleOnChange}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input your image!",
                },
              ]}
            >
              <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                <Button>Select File</Button>
                {stateProduct?.image && (
                  <img
                    src={stateProduct?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </ModalComponent>
      <DrawerComponent
        title="Chi tiết sản phẩm"
        isOpen={isOpenDrawer}
        onClose={() => setIsOpenDrawer(false)}
        width="90%"
      >
        <Loading isLoading={isLoadingUpdate || isLoadingUpdated}>
          <Form
            name="basic"
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 22,
            }}
            onFinish={onUpdateProduct}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails["name"]}
                onChange={handleOnChangeDetails}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Type"
              name="type"
              rules={[
                {
                  required: true,
                  message: "Please input your type!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails["type"]}
                onChange={handleOnChangeDetails}
                name="type"
              />
            </Form.Item>

            <Form.Item
              label="Count inStock"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Please input your countInStock!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails["countInStock"]}
                onChange={handleOnChangeDetails}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="Price"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Please input your price!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails["price"]}
                onChange={handleOnChangeDetails}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Rating"
              name="rating"
              rules={[
                {
                  required: true,
                  message: "Please input your rating!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails["rating"]}
                onChange={handleOnChangeDetails}
                name="rating"
              />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Please input your description!",
                },
              ]}
            >
              <InputComponent
                value={stateProductDetails["description"]}
                onChange={handleOnChangeDetails}
                name="description"
              />
            </Form.Item>

            <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Please input your image!",
                },
              ]}
            >
              <WrapperUploadFile
                onChange={handleOnchangeAvatarDetails}
                maxCount={1}
              >
                <Button>Select File</Button>
                {stateProductDetails?.image && (
                  <img
                    src={stateProductDetails?.image}
                    style={{
                      height: "60px",
                      width: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "10px",
                    }}
                    alt="avatar"
                  />
                )}
              </WrapperUploadFile>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 20,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Loading>
      </DrawerComponent>
      <ModalComponent
        title="Xóa sản phẩm"
        open={isModalOpenDelete}
        onCancel={handleCancelDelete}
        onOK={handleDeleteProduct}
      >
        <Loading isLoading={isLoadingDeleted}>
          <div>Bạn có muốn xóa sản phẩm này không?</div>
        </Loading>
      </ModalComponent>
    </div>
  );
};

export default AdminProduct;
