import style from "./style/Login.module.css";
import { useTranslation } from "react-i18next";
import LogoImg from "@/assets/Innovate-Hub.png";
import LeftImg from "@/assets/left-icon.png";
import CheckPswImg from "@/assets/check-psw.svg";
import { SplitLine } from "@/components/SplitLine/SplitLine";
import { useState } from "react";

const Login = () => {
  const { t } = useTranslation();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [isShowPwd, setIsShowPwd] = useState(false);

  const handleAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordShow = () => {
    setIsShowPwd(isShowPwd => !isShowPwd);
  }

  const handleLoginBtnClick = () => {

  }

  return (
    <>
      <div className={style.layout}>
        <div className={style.left}>
          <div className="font-bold">
            <img className={style["left-img"]} src={LeftImg} alt="" />
          </div>
        </div>
        <div className={style.right}>
          <div className={style.login}>
            <img className={style.logo} src={LogoImg} alt="Logo" />
            {/* 账号 */}
            <div className={style["input-wrapper"]}>
              <div className={style["input-title"]}>
                {t("email-and-account")}:
              </div>
              <input
                value={account}
                onChange={handleAccount}
                className={style["input-zone"]}
                type="text"
              />
            </div>
            {/* 密码 */}
            <div className={style["input-wrapper"]}>
              <div className={style["input-title"]}>{t("password")}:</div>
              {/* 是否显示明文密码 */}
              {!isShowPwd ? (
                <input
                  value={password}
                  onChange={handlePassword}
                  className={style["input-zone"]}
                  type="password"
                />
              ) : (
                <input
                  value={password}
                  onChange={handlePassword}
                  className={style["input-zone"]}
                  type="text"
                />
              )}
              {password.length > 0 && (
                <img onClick={handlePasswordShow} className={style["check-psw"]} src={CheckPswImg} alt="" />
              )}
            </div>
            {/* 忘记密码 */}
            <div className={style["forget-pwd"]}>{t("forget-password")}</div>
            {/* 登陆按钮 */}
            <button onClick={handleLoginBtnClick} className={style["login-btn"]}>{t("login")}</button>
            {/* 分割线 */}
            <div className={style["split-box"]}>
              <SplitLine>or</SplitLine>
            </div>
            {/* 切换注册页 */}
            <div style={{fontSize: '14px'}}>
              <span>{t("no-account")}</span>
              <span className={style["register-line"]}>{t("to-register")}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
