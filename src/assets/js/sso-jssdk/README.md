## sso-jssdk 国双单点登录jssdk

> 更快的接入公司的 SSO

> 公司 SSO 帮助文档：https://sso-cas.gridsumdissector.com/help/

### 下载

```shell
npm install @components/sso-jssdk --registry http://registry.npm.gridsum.com
```

### 基本用法

```html
<template>
  <div class="demo-page">
    <div v-if="loginSuccess === 1">
      <span>登录成功，hi，{{ userinfo.DisplayName }}</span>
      <a href="javascript:void(0);" @click="logout">取消登录</a>
    </div>
    <span v-if="loginSuccess === 0">正在校验登录信息</span>
    <a
      v-if="loginSuccess === -1"
      href="javascript:void(0);"
      @click="login"
    >登录失败，请点击重新进行登录</a>
  </div>
</template>
```

```js
<script>
  import SsoSdk from '@components/sso-jssdk';

  const sdk = new SsoSdk();

  export default {
    data() {
      return {
        userinfo: {},
        loginSuccess: 0
      };
    },

    mounted() {
      // 发起鉴权流程
      const promise = sdk.autoSSO();

      promise.then(res => {
        this.userinfo = res.data;
        this.loginSuccess = 1;
      }, err => {
        this.loginSuccess = -1;
      })
    },

    methods: {
      login() {
        window.location.href = `https://sso-internal.gridsumdissector.com/login?service=${location.href}`;
      },

      logout() {
        sdk.logout().then(() => {
          this.login();
        }, err => {
          alert(`登录失败，错误信息：${err.message}`);
        });
      }
    }
  };
</script>
```


### sso-jssdk 文档

###### 配置

```
const sdk = new SsoSdk({
  sso: 'https://sso-cas.gridsumdissector.com/api/v2',
  key: 'X-SSO-FullticketId',
  stKey: 'ticket',
  tgtKey: 'tgt'
});
```

`options` 配置参数如下：

```
{
  // SSO 的前缀接口地址
  sso: '', // 必填，默认为空，地址如：`https://sso-cas.gridsumdissector.com/api/v2`

  // TGT 凭据保存在 cookie 的字段标识符
  key: '', // 必填，默认为空，值如：`X-SSO-FullticketId`

  // ST 凭据在页面地址中的参数字段名
  stKey: 'ticket', // default

  // TGT 凭据在页面地址中的参数字段名
  tgtKey: 'tgt', // default

  // 设置cookie的过期时间（单位：天），默认为 `7` 天，设置为 `0` 时表示不缓存tgt
  expires: 7, // default
}
```

###### sso-jssdk 实例接口

**实例所有接口都支持 Promise API**

* `sdk.autoSSO()` 执行 SSO 鉴权流程，鉴权成功会返回当前用户的登录信息

    鉴权流程可参考：https://gitlab.gridsum.com/products/sso-portal/issues/98
    
    用户登录信息数据结构：

    ```
    {
      "errorCode": 0,
      "data": {
        "Ticket": "TGT-817727-XXXXXXXXXXXXXXXXXXXXXXXXXXXX-x-gridsumdissector",
        "LoginEmail": "XXXXX@XXX.com",
        "DisplayName": "XXXXXXXXX",
        "AccountGuid": "XXXXXXXX-XXXXXX-XXXX-XXXX-XXXXXXXXX",
        "extended": {
          "company": "Unknown",
          "role": "Unknown",
          "department": "Unknown"
        }
      },
      "message": "Success"
    }
    ```

* `sdk.userinfo(tgt)` 根据 **TGT** 凭据获取用户信息

* `sdk.validate({ 's-ticket': ticket } | { ticket })` 根据 **ST** 或者 **TGT** 凭据进行身份验证

* `sdk.validateST(st)` 根据 **ST** 凭据进行身份验证

* `sdk.validateTGT(tgt)` 根据 **TGT** 凭据进行身份验证

* `sdk.logout(tgt)` 注销登录


###### 其他 

* `sdk.ssoAxios` 调用 SSO 接口所使用的 `axios` 实例

* `SsoSdk.axios` 原生 `axios` 对象

* `SsoSdk.utils` 方法集


### 参与开发

> 项目构建说明请参考：[打包构建](./guide.md)

* 克隆仓库

```shell
git clone git@gitlab.gridsum.com:frontend/components/numeral.git numeral
cd  numeral
```

* 下载安装依赖

```shell
npm install
```

* 启动开发环境

```shell
npm start
```

浏览器打开 http://localhost:10001 即可看到效果

* 构建打包

```shell
npm run build
```


