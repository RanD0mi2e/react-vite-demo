import { Header } from "./Header"
import { MainContain } from "./MainContain"
import { SideBar } from "./SideBar"
import style from './Layout.module.css'

export const Layout = () => {
  return (
    <>
      <Header />
      <div className={style.main}>
        <SideBar />
        <MainContain />
      </div>
    </>
  )
}