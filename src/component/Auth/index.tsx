import React from 'react';

interface AuthProps {
  /** 权限标识 */
  auth?: boolean;
  /** 权限码（扩展可用） */
  code?: string;
  /** FALSE节点 */
  or?: any;
  children?: React.ReactNode;
}

const Auth: React.FC<AuthProps> = ({ auth, code, or, children }) => {
  /** 传递了权限码的情况 */
  // if (code) return children;
  /** 自定义auth */
  if (auth) return children;
  /** 返回自定义空或null */
  return or || null;
};

export default Auth;
