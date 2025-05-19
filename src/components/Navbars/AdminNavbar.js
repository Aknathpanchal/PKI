import React, { useState } from "react";
import { toastify } from "common/helpers/toast";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { Modal, Button, Input, Form, Alert } from "antd";
import axios from "axios";
import { BorderBottomOutlined } from "@ant-design/icons";

const AdminNavbar = (props) => {
  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isTModalVisible, setIsTModalVisible] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [form] = Form.useForm();

  const handleTPin = () => {
    form.submit();
  };

  const onFinish = async (values) => {
    const { transactionPin, confirmTransactionPin, ...rest } = values;
    const finalData = { ...rest, tPin: transactionPin };
    const userId = localStorage.getItem("id");
    const authToken = localStorage.getItem("authToken");

    if (!userId || !authToken) {
      toastify({ msg: "User not authenticated!", type: "error" });
      return;
    }

    try {
      const response = await axios.post(
        `https://api1.paykuber.com/api/users/getTpin`,
        {
          ...finalData,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      toastify({ msg: response.data.message, type: "success" });
      setIsTModalVisible(false);
      form.resetFields();
    } catch (error) {
      toastify({
        msg: error.response?.data?.message || "Generate T pin failed!",
        type: "error",
      });
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toastify({ msg: "Logged Out Successfully!", type: "info" });
    navigate("/auth/login");
  };

  const showResetPasswordModal = () => {
    setIsModalVisible(true);
  };

  const showTPinModal = () => {
    setIsTModalVisible(true);
  };

  const handleOk = async () => {
    const userId = localStorage.getItem("id");
    const authToken = localStorage.getItem("authToken");

    if (!userId || !authToken) {
      toastify({ msg: "User not authenticated!", type: "error" });
      return;
    }

    try {
      const response = await axios.patch(
        `https://api1.paykuber.com/api/users/resetPassword/${userId}`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      toastify({ msg: response.data.message, type: "success" });
      setIsModalVisible(false);
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      toastify({
        msg: error.response?.data?.message || "Password reset failed!",
        type: "error",
      });
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsTModalVisible(false);
    setOldPassword("");
    setNewPassword("");
  };

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="sm" id="navbar-main" style={{
  background:"#464646",
  borderBottom: "1px solid #f0f0f0"
}}
>
        <Container fluid>
          <h2 className="mb-0 text-uppercase d-none d-lg-inline-block text-red-600" style={{color: "#f0f0f0"}}>
          {props?.brandText}
          </h2>
          <Nav className="align-items-center d-none d-lg-flex" navbar>
            <UncontrolledDropdown nav>
              <DropdownToggle className="pr-0" nav>
                <Media className="align-items-center">
                  <Media className="ml-2 d-none d-lg-block border rounded border-black p-2">
                    <span className="mb-0 text-sm font-weight-bold" >
                      {props?.user?.username || "User"} -{" "}
                      {Number(
                        props?.user?.wallet || props?.user?.points || 0
                      ).toFixed(2)}
                      {props?.balance !== undefined &&
                        `|| Balance-${Number(props?.balance).toFixed(2)}`}
                    </span>
                  </Media>
                </Media>
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem header tag="div">
                  <h6 className="text-overflow m-0">Welcome!</h6>
                </DropdownItem>
                <DropdownItem divider />

                <DropdownItem onClick={showResetPasswordModal}>
                  <i className="ni ni-lock-circle-open" />
                  <span style={{ marginLeft: "1rem" }}>Reset Password</span>
                </DropdownItem>

                {props?.user?.role === "merchant" && (
                  <DropdownItem onClick={showTPinModal}>
                    <i className="ni ni-key-25" />
                    <span style={{ marginLeft: "1rem" }}>Generate T Pin</span>
                  </DropdownItem>
                )}

                <DropdownItem onClick={handleLogout}>
                  <i className="ni ni-user-run" />
                  <span style={{ marginLeft: "1rem" }}>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>

          {/* Reset Password Modal */}
          <Modal
            title="Reset Password"
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleOk}>
                Reset
              </Button>,
            ]}
          >
            <Input.Password
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
            <Input.Password
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Modal>

          {/* Generate T Pin Modal */}
          <Modal
            title="Generate T Pin"
            open={isTModalVisible}
            onOk={handleTPin}
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={handleTPin}>
                Reset
              </Button>,
            ]}
          >
     {/* How  Generate  T Pin pop-up */}       
<Alert
  message="How  Generate  T Pin ?"
  description={
    <div>
      <ul>
        <li>
          <strong>Salt Key:</strong> Used for generating request
          signatures and verifying webhook responses
        </li>
        <li>
          <strong>API Key:</strong> Used in the Authorization header
          as a Bearer token for API authentication
        </li>
        <li>
          <strong>Merchant ID (merchant_id):</strong> Your unique
          merchant identifier required in all API requests
        </li>
        <li>
          <strong>Current Password:</strong> Required to authenticate and authorize the T Pin generation
        </li>
        <li>
          <strong>Set Transaction Pin:</strong> A secure 6-digit pin that will be used to approve future transactions
        </li>
      </ul>
    </div>
  }
  type="info"
  showIcon
  style={{ marginBottom: 16 }}
/>


            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Form.Item
                name="saltKey"
                rules={[
                  { required: true, message: "Please enter the salt key" },
                ]}
              >
                <Input.Password placeholder="Salt Key" />
              </Form.Item>

              <Form.Item
                name="apiKey"
                rules={[
                  { required: true, message: "Please enter the API key" },
                ]}
              >
                <Input.Password placeholder="API Key" />
              </Form.Item>

              <Form.Item
                name="midKey"
                rules={[{ required: true, message: "Please enter the MID" }]}
              >
                <Input.Password placeholder="MID" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter the current password",
                  },
                ]}
              >
                <Input.Password placeholder="Current Password" />
              </Form.Item>

              <Form.Item
                name="transactionPin"
                rules={[
                  {
                    required: true,
                    message: "Please set the transaction pin",
                  },
                ]}
              >
                <Input.Password placeholder="Set Transaction Pin" />
              </Form.Item>

              <Form.Item
                name="confirmTransactionPin"
                dependencies={["transactionPin"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm the transaction pin",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("transactionPin") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two pins do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirm Transaction Pin" />
              </Form.Item>
            </Form>
          </Modal>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
