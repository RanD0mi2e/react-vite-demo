// 从缓存、url、入参中读取token
export const getToken = (tokenParams?: string) => {
  let token = "";
  const match = location.pathname.match(/(?:[?&])token=([^&]+)/);
  if (tokenParams) {
    token = tokenParams;
  } else if (localStorage.getItem("token")) {
    token = localStorage.getItem("token") || "";
  } else if (match) {
    token = match[1];
  }
  return token ?? "";
};

// 添加token至localStorage缓存
export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};
