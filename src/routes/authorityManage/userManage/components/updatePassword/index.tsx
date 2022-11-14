import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";
import { Input, Row, Col, Modal, Form, Select, Button, message } from "antd";
const { Option } = Select;
import { useFetch } from "@/utils/useFetch";
const AddOrEdit = (props: any) => {
  const { showUpdateMode, currentUser, closeModal } = props;
  const [passwordForm] = Form.useForm();
  // const { Option } = Select
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [confirmLoading, SetConfirmLoading] = useState(false);
  const handleCancel = () => {
    passwordForm.resetFields();
    closeModal();
  };
  const handleOk = async () => {
    const value = await passwordForm.validateFields();
    if (value.password !== value.repassword) {
      message.error("两次输入的密码不一致");
      return false;
    }
    SetConfirmLoading(true);
    const [, data] = await useFetch("/visual/user/changePassword", {
      body: JSON.stringify({
        id: currentUser.id,
        password: value.password,
      }),
    }).finally(() => {
      SetConfirmLoading(false);
    });
    if (data) {
      message.success("修改成功");
      handleCancel();
    }
  };

  return (
    <Modal
      visible={showUpdateMode}
      keyboard={true}
      title="修改密码"
      getContainer={false}
      bodyStyle={{
        padding: "10",
      }}
      confirmLoading={confirmLoading}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form
        name="basic"
        form={passwordForm}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
      >
        <Form.Item
          label="新密码"
          name="password"
          rules={[
            { required: true, message: "" },
            () => ({
              validator(_: any, value: any) {
                if (!value) {
                  return Promise.reject(new Error("请输入新密码"));
                } else if (value.length < 4) {
                  return Promise.reject(new Error("密码至少为4个字符"));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password value={password} placeholder="请输入新密码" showCount maxLength={20} />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="repassword"
          rules={[
            { required: true, message: "" },
            () => ({
              validator(_: any, value: any) {
                if (!value) {
                  return Promise.reject(new Error("请再次输入新密码"));
                } else if (value.length < 4) {
                  return Promise.reject(new Error("密码至少为4个字符"));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password
            value={repassword}
            placeholder="请再次输入新密码"
            showCount
            maxLength={20}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(connect(({ userManage }: any) => ({ userManage }))(AddOrEdit));
