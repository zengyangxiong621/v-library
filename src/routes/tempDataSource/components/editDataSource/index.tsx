import { memo, useEffect, useState } from "react";
import "./index.less";

import { Modal, Form, Select, Input, Radio, Upload, message, Button, Spin } from "antd";
import type { UploadProps } from "antd";

import { http, BASEURL } from "@/services/request";

const { Option } = Select;
const { TextArea } = Input;
const { Dragger } = Upload;

const EditDataSource = (props: any) => {
  const {
    id,
    description,
    name,
    type,
    apiSourceConfig,
    csvSourceConfig,
    jsonSourceConfig,
    excelSourceConfig,
    rdbmsSourceConfig,
    esSourceConfig,
  } = props.editDataSourceInfo;

  const { visible, spaceId, changeShowState, refreshTable } = props;

  // 获取表单实例准备做校验
  const [editForm] = Form.useForm();

  // 与添加数据源不同，这里需要判断数据源的类型(csv,json,excel)来确定初始的fileUrl
  const [fileUrl, setFileUrl] = useState("");
  useEffect(() => {
    setFileUrl(fileUrl);
  }, [fileUrl]);

  // 因为后端中关系型数据库统一表示为RDBMS, 此处将数据库数据源类型拆解出来
  const [dataSourceType, setDataSourceType] = useState();
  useEffect(() => {
    // if (type === 'RDBMS') {
    // 获取当前是那种类型的数据库
    // setDataSourceType(rdbmsSourceConfig.dataBaseType)
    // } else {
    // 根据数据源类型来获取fileUrl
    setDataSourceType(type);
    switch (type) {
      case "CSV":
        setFileUrl(csvSourceConfig?.fileUrl);
        break;
      case "JSON":
        setFileUrl(jsonSourceConfig?.fileUrl);
        break;
      case "EXCEL":
        setFileUrl(excelSourceConfig?.fileUrl);
        break;
      default:
        break;
    }
    // }
  }, []);

  // 通过后台获取到的数据库列表
  const [dataBaseList, setDataBaseList] = useState([]);
  const [getDBListLoading, setGetDBListLoading] = useState(false);

  // 通过后台获取到的索引列表
  const [indexList, setIndexList] = useState([]);
  const [getIndexListLoading, setGetIndexListLoading] = useState(false);
  const [authMethodType, setAuthMethodType] = useState<string>(esSourceConfig?.authMethod + "");
  // 上传的文件在后端存储的地址,
  // 数据库连接是否测试成功
  const [isConnect, setIsConnect] = useState(false);

  const [loading, setLoading] = useState(false);
  const [testConnectLoading, setTestConnectLoading] = useState(false);

  /**
   * description: 测试数据库连接
   */
  const testConnect = async () => {
    // 点击  获取数据库列表 按钮时 先校验是否已经填了相关字段
    const values = await editForm.validateFields([
      "port",
      "username",
      "password",
      "host",
      "database",
      "serviceType",
    ]);
    const finalParams = {
      type: dataSourceType,
      rdbmsSourceConfig: {
        ...values,
        dataBaseType: dataSourceType,
      },
      // ELASTIC_SEARCH已经不需要测试连接但是后端没改，这个不传会报错
      elasticsearchConfig: {},
    };
    setTestConnectLoading(true);
    try {
      const data = await http({
        url: "/visual/datasource/connectTest",
        method: "post",
        body: finalParams,
      });
      setTestConnectLoading(false);
      if (data) {
        message.success({ content: "连接成功", duration: 2 });
        setIsConnect(true);
      }
    } catch (err) {
      setTimeout(() => {
        setTestConnectLoading(false);
      }, 1000);
    }
  };
  /**
   * description: 获取可选择的数据库名称列表
   */
  const getDataBaseList = async () => {
    // 每次请求数据库列表前，都该清除上次请求成功的列表缓存
    setDataBaseList([]);
    // 点击  获取数据库列表 按钮时 先校验是否已经填了相关字段
    const values = await editForm.validateFields([
      "port",
      "username",
      "password",
      "host",
      "serviceType",
    ]);
    // 攒成目标参数
    const finalParams = {
      ...values,
      dataBaseType: dataSourceType,
    };
    //！ 请求数据库列表
    setGetDBListLoading(true);
    try {
      const data = await http({
        url: "/visual/datasource/queryDataBaseList",
        method: "post",
        body: finalParams,
      });
      setGetDBListLoading(false);
      if (Array.isArray(data)) {
        if (!data.length) {
          message.error("没有可用的数据库");
          setDataBaseList([]);
        } else {
          // data 只是个数组，处理成select需要的形式
          const formatData: any = data.map((item: any) => ({
            label: item,
            value: item,
          }));
          setDataBaseList(formatData);
        }
      }
    } catch {
      message.error("获取数据库列表失败");
      setGetDBListLoading(false);
    }
  };
  /**
   * description: 获取可选择的索引列表
   */
  const getIndexList = async () => {
    // 每次重新发起请求前都应该先清除indexList
    setIndexList([]);
    // 通过表单校验获取es连接地址
    // 通过表单校验获取es连接地址
    const values: any = await editForm.validateFields([
      "url",
      "authMethod",
      "keytab",
      "krb5MechOid",
      "krb5kdc",
      "krb5realm",
      "principal",
      "spnegoOid",
      "password",
      "username",
    ]);
    console.log("fil", fileUrl);
    console.log("vvvvvvvvvvvvvvvv", values);
    const finalBody = {
      authMethod: values.authMethod,
      kerberos: {
        keytab: values.keytab,
        krb5MechOid: values.krb5MechOid,
        krb5kdc: values.krb5kdc,
        krb5realm: values.krb5realm,
        principal: values.principal,
        spnegoOid: values.spnegoOid,
      },
      password: values.password,
      url: values.url,
      username: values.username,
    };
    setGetIndexListLoading(true);
    try {
      const data = await http({
        url: "/visual/datasource/queryIndices",
        method: "post",
        body: finalBody,
      });
      setGetIndexListLoading(false);
      if (Array.isArray(data)) {
        if (!data.length) {
          message.error("没有可用的索引");
          setIndexList([]);
        } else {
          // data 只是个数组，处理成select需要的形式
          const formatData: any = data.map((item: any) => ({
            label: item,
            value: item,
          }));
          setIndexList(formatData);
        }
      } else {
        message.error("获取索引列表失败");
      }
    } catch (err) {
      setTimeout(() => {
        setGetIndexListLoading(false);
      }, 1000);
    }
  };
  /**
   * description: 修改数据源
   */
  const handleOk = async () => {
    /***** 点击确定btn时，应该先触发表单校验，再对数据库测试连接进行判断****/
    const values: any = await editForm.validateFields();
    // es 数据源类型时，如果没有index名，直接return
    if (dataSourceType === "ELASTIC_SEARCH" && !values.index) {
      message.warning({ content: "请先选择索引名称", duration: 2 });
      return;
    }
    //-----所以这里解构出来的type已经是API了
    const {
      name,
      type,
      description,
      krb5MechOid,
      krb5kdc,
      krb5realm,
      principal,
      spnegoOid,
      ...rest
    } = values;
    // 判断当前是否是数据库(这儿是为了凑 (rdbms/api/csv)SourceConfig这种格式的参数的  和上方的dataSourceType不同的)
    const dataBaseOrNormal = dataTypeClassify.get(type);
    // 最终数据源的类型, 如果是特殊的类型（RDBMS和API),需要在下面处理一下
    const finalType = type;
    let finalSourceConfig = rest;
    //如果是数据库类型的数据源的话，
    //-- 先判断数据库测试连接是否成功
    //-- 要加上 dataBaseType 字段
    //-- 数据资源类型type 也要变成 'RDBMS'
    if (dataBaseOrNormal === "rdbms") {
      // 如果数据库测试连接不成功，直接中止
      if (!isConnect) {
        message.warning({
          content: "数据库测试连接失败或未执行，请检查相关连接参数后重试",
          duration: 2,
        });
        return;
      }
      finalSourceConfig.dataBaseType = type;
      // finalType = 'RDBMS'
    }
    // 如果是需要上传文件的这几种类型，先检查有没有fileUrl
    if (["csv", "json", "excel"].includes(dataBaseOrNormal)) {
      if (!fileUrl) {
        message.error("上传文件格式错误或未上传文件");
        return;
      }
      finalSourceConfig = {};
      finalSourceConfig.fileUrl = fileUrl;
    }
    // 如果是API类型,参数中的type类型需要变成RESTFUL_API
    // if (dataBaseOrNormal === 'api') {
    //   finalType = 'RESTFUL_API'
    // }
    if (dataBaseOrNormal === "es") {
      finalSourceConfig.kerberos = {
        krb5MechOid,
        krb5kdc,
        krb5realm,
        principal,
        spnegoOid,
        keytab: fileUrl,
      };
    }

    const finalParams = {
      spaceId,
      id,
      name,
      type: finalType,
      description,
      [`${dataBaseOrNormal}SourceConfig`]: finalSourceConfig,
    };
    // 发送请求
    setLoading(true);
    try {
      const data = await http({
        url: "/visual/datasource/update",
        method: "post",
        body: finalParams,
      });
      if (data) {
        // 成功后  -关闭弹窗 -清除表单 -刷新表格
        handleCancel();
        refreshTable();
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * description: 清除编辑框中的状态
   */
  const clearModalState = () => {
    setDataBaseList([]);
    setIndexList([]);
    setIsConnect(false);
    editForm.resetFields();
    setGetDBListLoading(false);
    setGetIndexListLoading(false);
    setTestConnectLoading(false);
    setLoading(false);
  };
  const handleCancel = () => {
    clearModalState();
    changeShowState("edit");
    /** 要把相关数据重置,不然会有缓存,后面的数据库都不用点击测试连接即可直接更新 */
    // setBtnDisabled(true)
  };
  // 选择数据库名
  const selectDatabase = (val: any) => {
    editForm.setFieldsValue({ database: val });
    // 选择了数据库名，开放测试连接按钮
    // setBtnDisabled(false)
  };
  /**
   * description: 选择索引(es)
   */
  const selectIndex = (val: any) => {
    editForm.setFieldsValue({ index: val });
  };

  /**
   * description: 针对不同格式文件的上传 生成 相应的uploadProps
   * params: @customProps -- 要新增或者覆盖的配置,
   *         @fileSuffix -- 支持的文件后缀
   * return:
   */
  const generateUploadProps = (fileSuffix = "", customProps?: object) => {
    const isKeytab = fileSuffix === ".keytab";
    // 上传框配置
    let uploadProps: UploadProps = {
      name: "file",
      multiple: false,
      maxCount: 1,
      accept: fileSuffix || "",
      action: isKeytab ? `${BASEURL}/visual/file/uploadKeytab` : `${BASEURL}/visual/file/upload`,
      headers: {
        authorization: localStorage.getItem("token") || "",
      },
      beforeUpload(file: any) {
        const { name, size }: { name: string; size: number } = file;
        if (size > 1024 * 1024 * 10) {
          message.warning("文件大小超过限制");
          file.status = "error";
          return false;
        }
        const fileSuffixArr = fileSuffix?.split(",");
        // 考虑 cdb.la...yer.json / ......csv 这种文件名
        const lastPointIndex = name.lastIndexOf(".");
        const nameSuffix = name.slice(lastPointIndex);
        if (!fileSuffixArr?.includes(nameSuffix)) {
          message.error({
            content: "请上传符合格式的文件",
            duration: 2,
          });
          file.status = "error";
          return false;
        }
      },
      onChange(info: any) {
        const { status, response } = info.file;
        if (response) {
          const isSuccess = isKeytab ? response.data.success : response.data;
          if (status === "done" && isSuccess) {
            message.success(`${info.file.name} 上传成功`);
            const newFilePath = isKeytab ? response.data.url : response.data;
            setFileUrl(newFilePath);
          } else if (status === "error" || !isSuccess) {
            const errStr = isKeytab
              ? response.data.errorMsg
                ? `${response.data.errorMsg}`
                : ""
              : `${info.file.name} 上传失败`;
            message.error(errStr);
          }
        }
      },
      onDrop(e: any) {
        const { name } = e.dataTransfer.files[0];
        const fileSuffixArr = fileSuffix?.split(",");
        // 考虑 cdb.la...yer.json 这个文件名
        const lastPointIndex = name.lastIndexOf(".");
        const nameSuffix = name.slice(lastPointIndex);
        if (!fileSuffixArr?.includes(nameSuffix)) {
          message.error({
            content: "文件格式不符",
            duration: 2,
          });
          return;
        }
      },
    };
    if (JSON.stringify(customProps) !== "{}") {
      uploadProps = { ...uploadProps, ...customProps };
    }
    return uploadProps;
  };
  // .json 文件
  const jsonUploadProps = generateUploadProps(".json");
  // .csv 文件
  const csvUploadProps = generateUploadProps(".csv");
  // .excel 文件
  const excelUploadProps = generateUploadProps(".xlsx");
  // .keytab 文件
  const keytabUploadProps = generateUploadProps(".keytab");

  // description: 选择es的认证方式
  const authMethodChange = (e: any) => {
    setAuthMethodType(e.target.value);
  };

  const [initVal, setInitVal] = useState({
    description,
    name,
    type,
    baseUrl: apiSourceConfig?.baseUrl,
    code: csvSourceConfig?.code,
    database: rdbmsSourceConfig?.database,
    port: rdbmsSourceConfig?.port,
    host: rdbmsSourceConfig?.host,
    serviceType: rdbmsSourceConfig?.serviceType,
    // rdbms里和es里都有 username和password
    password: rdbmsSourceConfig?.password || esSourceConfig?.password,
    username: rdbmsSourceConfig?.username || esSourceConfig?.username,
    jsonFileUrl: jsonSourceConfig?.fileUrl,
    csvFileUrl: csvSourceConfig?.fileUrl,
    excelFileUrl: excelSourceConfig?.fileUrl,
    url: esSourceConfig?.url,
    index: esSourceConfig?.index,
    keytab: esSourceConfig?.kerberos?.keytab,
    krb5realm: esSourceConfig?.kerberos?.krb5realm,
    krb5MechOid: esSourceConfig?.kerberos?.krb5MechOid,
    krb5kdc: esSourceConfig?.kerberos?.krb5kdc,
    principal: esSourceConfig?.kerberos?.principal,
    spnegoOid: esSourceConfig?.kerberos?.spnegoOid,
    authMethod: esSourceConfig?.authMethod,
  });
  useEffect(() => {
    setInitVal({ ...initVal, type });
    setFileUrl(initVal.keytab)
  }, [visible, type]);
  return (
    <div className="EditDataSource-wrap">
      <Modal
        title="编辑数据源"
        // destroyOnClose={true}
        maskClosable={false}
        visible={visible}
        okText="确定"
        cancelText="取消"
        onCancel={handleCancel}
        getContainer={false}
        confirmLoading={loading}
        footer={[
          <Button type="primary" className="modalBtn cancelBtn" onClick={handleCancel}>
            取消
          </Button>,
          <Button type="primary" className="modalBtn okBtn" onClick={handleOk}>
            确定
          </Button>,
        ]}
      >
        <Form
          name="editDataSource"
          labelCol={{
            span: 5,
          }}
          form={editForm}
          preserve={false}
          initialValues={initVal}
        >
          <Form.Item label="数据源类型" name="type" rules={[{ required: true }]}>
            <Input
              className="setBackColor"
              autoComplete="off"
              // defaultValue={type}
              disabled
            ></Input>
          </Form.Item>
          <Form.Item
            label="数据源名称"
            name="name"
            rules={generateSingleRules(true, "请输入数据源名称")}
          >
            <Input
              // defaultValue={name}
              className="setBackColor"
              placeholder="请输入数据源名称"
              maxLength={30}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item label="描述" name="description">
            <TextArea
              // defaultValue={description}
              className="setBackColor clearScrollbar"
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="请输入"
              maxLength={300}
            />
          </Form.Item>
          {/* CSV格式 */}
          {dataSourceType === "CSV" && (
            <>
              <Form.Item
                label="编码格式"
                name="code"
                rules={generateSingleRules(true, "请选择编码格式")}
              >
                <Radio.Group
                  // defaultValue={code}
                  options={codeFormatOptions}
                />
              </Form.Item>
              <Form.Item
                label="上传文件"
                // name="csvFileUrl"
                rules={generateSingleRules(true, "请重新上传文件")}
              >
                <div className="setBackColor" style={{ height: "120px" }}>
                  <Dragger {...csvUploadProps}>
                    <p className="ant-upload-hint">
                      点击或拖拽上传新的{" "}
                      <span style={{ color: "#ccc", fontSize: "18px" }}>csv</span> 格式文件，10M以内
                    </p>
                  </Dragger>
                </div>
              </Form.Item>
            </>
          )}
          {/* API接口 */}
          {dataSourceType === "API" && (
            <>
              <Form.Item
                label="Base URL"
                name="baseUrl"
                rules={generateSingleRules(true, "请输入Base URL")}
              >
                <Input
                  className="setBackColor"
                  autoComplete="off"
                  maxLength={1000}
                  // defaultValue={baseUrl}
                ></Input>
              </Form.Item>
            </>
          )}
          {/*//TODO MYSQL数据库 和 PGSQL暂时先共用一个，已经明确两者有差异，视后续的改动决定是否单独抽出去 */}
          {(dataSourceType === "MYSQL" ||
            dataSourceType === "POSTGRESQL" ||
            dataSourceType === "SQLSERVER" ||
            dataSourceType === "CLICKHOUSE") && (
            <>
              <Form.Item
                label="链接地址"
                name="host"
                rules={generateSingleRules(true, "请输入链接地址")}
              >
                <Input
                  className="setBackColor"
                  autoComplete="off"
                  placeholder="请输入"
                  maxLength={1000}
                  // defaultValue={host}
                />
              </Form.Item>
              <Form.Item
                label="端口"
                name="port"
                rules={[
                  {
                    required: true,
                    validator(rule, value) {
                      const reg = /^\d{1,}$/;
                      if (!reg.test(value)) {
                        return Promise.reject(new Error("端口号只能由数字组成"));
                      } else {
                        return Promise.resolve();
                      }
                    },
                  },
                ]}
              >
                <Input
                  autoComplete="off"
                  // defaultValue={port}
                  className="setBackColor"
                  placeholder="请输入数字"
                  maxLength={6}
                />
              </Form.Item>
              <Form.Item
                label="用户名"
                name="username"
                rules={generateSingleRules(true, "请输入用户名")}
              >
                <Input
                  // autoComplete='off'
                  autoComplete="new-password"
                  maxLength={20}
                  // defaultValue={username}
                  className="setBackColor"
                  placeholder="请输入"
                />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                rules={generateSingleRules(true, "请输入密码")}
              >
                <Input.Password
                  autoComplete="new-password"
                  className="setBackColor"
                  placeholder="请输入"
                  // defaultValue={password}
                />
              </Form.Item>
              {dataSourceType === "ORACLE" && (
                <Form.Item
                  label="服务类型"
                  name="serviceType"
                  rules={generateSingleRules(true, "请选择服务类型")}
                >
                  <Select
                    className="setBackColor"
                    placeholder="请选择服务类型"
                    dropdownStyle={{ backgroundColor: "#232630" }}
                  >
                    {dataServiceType.map((item: any) => (
                      <Option key={item.value} value={item.value}>
                        {item.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
              <Form.Item
                label="数据库名"
                name="database"
                rules={generateSingleRules(true, "请选择数据库")}
              >
                <div className="dataBaseName">
                  <Spin spinning={getDBListLoading}>
                    <div className="getDataListBtn" onClick={() => getDataBaseList()}>
                      获取数据库列表
                    </div>
                  </Spin>
                  <Select
                    defaultValue={rdbmsSourceConfig?.database}
                    placeholder="请选择数据库"
                    disabled={Array.isArray(dataBaseList) && dataBaseList.length === 0}
                    onChange={selectDatabase}
                    className="dataBaseName-Select setBackColor"
                  >
                    {dataBaseList.map((item: any) => {
                      return (
                        <Option value={item.value} key={item.value}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                <Spin wrapperClassName="testConnectWrap" spinning={testConnectLoading}>
                  <div
                  // style={{ cursor: btnDisabled ? 'not-allowed' : 'pointer' }}
                  >
                    <div
                      className="testConnect"
                      // className={`${btnDisabled && 'btnDisabled'} testConnect`}
                      onClick={() => testConnect()}
                    >
                      测试连接
                    </div>
                  </div>
                </Spin>
              </Form.Item>
            </>
          )}
          {/* JSON */}
          {dataSourceType === "JSON" && (
            <>
              <Form.Item
                label="上传文件"
                // name="jsonFileUrl"
                rules={generateSingleRules(true, "请选择要上传的文件")}
              >
                <div className="setBackColor" style={{ height: "120px" }}>
                  <Dragger {...jsonUploadProps}>
                    <p className="ant-upload-hint">
                      点击或拖拽上传新的{" "}
                      <span style={{ color: "#ccc", fontSize: "18px" }}>json</span>{" "}
                      格式文件，10M以内
                    </p>
                  </Dragger>
                </div>
              </Form.Item>
            </>
          )}
          {/* EXCEL */}
          {dataSourceType === "EXCEL" && (
            <>
              <Form.Item
                label="上传文件"
                // name='excelFileUrl'
                rules={generateSingleRules(true, "请输入Base URL")}
              >
                <div className="setBackColor" style={{ height: "120px" }}>
                  <Dragger {...excelUploadProps}>
                    <p className="ant-upload-hint">
                      点击或拖拽上传新的{" "}
                      <span style={{ color: "#ccc", fontSize: "18px" }}>.xlsx</span>{" "}
                      格式文件，10M以内
                    </p>
                  </Dragger>
                </div>
              </Form.Item>
            </>
          )}
          {/* Elastic Search 类型 */}
          {dataSourceType === "ELASTIC_SEARCH" && (
            <>
              <Form.Item
                label="连接地址"
                name="url"
                rules={generateSingleRules(true, "请输入链接地址")}
              >
                <Input
                  className="setBackColor"
                  autoComplete="off"
                  placeholder="请输入"
                  maxLength={1000}
                />
              </Form.Item>
              <Form.Item
                label="认证方式"
                name="authMethod"
                // initialValue={authMethodType}
                rules={generateSingleRules(true, "请选择认证方式")}
              >
                <Radio.Group
                  defaultValue={authMethodType}
                  onChange={authMethodChange}
                  options={authMethodOptions}
                />
                {/* 这个空的元素不能删除，否则Radio无法正确回显值 */}
                <></>
              </Form.Item>
              {authMethodType == "1" && (
                <>
                  <Form.Item label="用户名" name="username">
                    <Input
                      autoComplete="new-password"
                      className="setBackColor"
                      maxLength={20}
                      placeholder="请输入"
                    />
                  </Form.Item>
                  <Form.Item label="密码" name="password">
                    <Input.Password
                      autoComplete="new-password"
                      className="setBackColor"
                      placeholder="请输入"
                      maxLength={20}
                    />
                  </Form.Item>
                </>
              )}
              {authMethodType == "2" && (
                <>
                  <Form.Item
                    label="principal"
                    name="principal"
                    rules={generateSingleRules(true, "请输入")}
                  >
                    <Input
                      autoComplete="off"
                      className="setBackColor"
                      maxLength={50}
                      placeholder="请输入"
                    />
                  </Form.Item>
                  <Form.Item
                    label="krb5realm"
                    name="krb5realm"
                    rules={generateSingleRules(true, "请输入")}
                  >
                    <Input
                      autoComplete="off"
                      className="setBackColor"
                      placeholder="请输入"
                      maxLength={20}
                    />
                  </Form.Item>
                  <Form.Item
                    label="krb5kdc"
                    name="krb5kdc"
                    rules={generateSingleRules(true, "请输入")}
                  >
                    <Input
                      autoComplete="off"
                      className="setBackColor"
                      placeholder="请输入"
                      maxLength={20}
                    />
                  </Form.Item>
                  <Form.Item
                    label="krb5MechOid"
                    name="krb5MechOid"
                    rules={generateSingleRules(true, "请输入")}
                  >
                    <Input
                      autoComplete="off"
                      className="setBackColor"
                      placeholder="请输入"
                      maxLength={20}
                    />
                  </Form.Item>
                  <Form.Item
                    label="spnegoOid"
                    name="spnegoOid"
                    rules={generateSingleRules(true, "请输入")}
                  >
                    <Input
                      autoComplete="off"
                      className="setBackColor"
                      placeholder="请输入"
                      maxLength={20}
                    />
                  </Form.Item>
                  <Form.Item
                    label="keytab"
                    style={{ marginBottom: "40px" }}
                    // name='excelFileUrl'
                    rules={generateSingleRules(true, "请输入keytab")}
                  >
                    <div className="setBackColor" style={{ height: "120px" }}>
                      <Dragger {...keytabUploadProps}>
                        <p className="ant-upload-hint">
                          点击或拖拽.keytab格式的文件至此处进行上传，10M以内
                        </p>
                      </Dragger>
                    </div>
                  </Form.Item>
                </>
              )}
              <Form.Item label="索引名称" name="index">
                <div className="dataBaseName">
                  <Spin spinning={getIndexListLoading}>
                    <div className="getDataListBtn" onClick={() => getIndexList()}>
                      获取索引列表
                    </div>
                  </Spin>
                  <Select
                    placeholder="请选择索引"
                    disabled={Array.isArray(indexList) && indexList.length === 0}
                    defaultValue={esSourceConfig?.index}
                    onChange={selectIndex}
                    className="dataBaseName-Select setBackColor"
                  >
                    {indexList.map((item: any) => {
                      return (
                        <Option value={item.value} key={item.value}>
                          {item.label}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default memo(EditDataSource);

// 生成单个校验规则
const generateSingleRules = (required: boolean, message: string | number): any[] => {
  return [
    {
      required,
      message,
    },
  ];
};

type TSelectOptionItems = {
  label: string;
  value: string;
};
// 根据选择的数据源类型，来动态生成 []SourceConfig
const dataTypeClassify: any = new Map([
  ["CSV", "csv"],
  ["API", "api"],
  ["JSON", "json"],
  ["EXCEL", "excel"],
  ["POSTGRESQL", "rdbms"],
  ["MYSQL", "rdbms"],
  ["ES", "rdbms"],
  ["ELASTIC_SEARCH", "es"],
  ["ORACLE", "rdbms"],
  ["SQLSERVER", "rdbms"],
  ["CLICKHOUSE", "rdbms"],
]);
// 可选择的服务类型
const dataServiceType: TSelectOptionItems[] = [
  {
    label: "SERVICE_NAME",
    value: "SERVICE_NAME",
  },
  {
    label: "SID",
    value: "SID",
  },
];

// 单选框 CSV类型- 编码格式
const codeFormatOptions: TSelectOptionItems[] = [
  {
    label: "自动检测",
    value: "0",
  },
  {
    label: "UTF-8",
    value: "1",
  },
  {
    label: "GBK",
    value: "2",
  },
];

const authMethodOptions: TSelectOptionItems[] = [
  {
    label: "无",
    value: "0",
  },
  {
    label: "用户名密码",
    value: "1",
  },
  {
    label: "Kerberos认证",
    value: "2",
  },
];
