import { service } from '../../utils/customFetch'
import style from './Layout.module.css'

export const MainContain = () => {
  const registerHandler = () => {
    service.post('/v1/register', {
      email: "12345@qq.com",
      password: "123456"
    })
  }

  return (
    <div className={style.main_contain}>
      内容可视区
      <button onClick={() => registerHandler()}>注册</button>
    </div>
  )
}