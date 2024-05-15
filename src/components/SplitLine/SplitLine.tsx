import { ReactNode } from "react";
import style from './style/SplitLine.module.css'

interface SplitLineProps {
  children: ReactNode
  margin?: '12' | '16' | '24' | '32'
}

export const SplitLine = ({ children, margin = '16' }: SplitLineProps) => {
  return (
    <div className={style['split-wrapper']}>
      <div style={{marginRight: `${margin}px`}}  className={style['split-line']}></div>
      <div>{children}</div>
      <div style={{marginLeft: `${margin}px`}} className={style['split-line']}></div>
    </div>
  );
};
