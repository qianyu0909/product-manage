import React, { useState, useEffect } from 'react'
import './index.css';
import { User } from '../../type/index'
import { Button } from 'antd';

const Head: React.FC = () => {
  const [userInfo, setUserInfo] = useState({} as User);

  useEffect(() => {
    const uinfo = window.localStorage.getItem('userInfo')
    if (uinfo) {
      setUserInfo(JSON.parse(uinfo))
    }
  }, [])

  const toHome = () => {
    window.location.href = '/#/'
  }

  const logout = () => {
    window.localStorage.removeItem('userInfo')
    window.location.reload()
  }

  return (
    <div className="header">
      <div className="content">
        <div className="logo" onClick={() => { toHome() }} >Product Management</div>
        {
          !userInfo.id ? (
            <Button type="link" href='/#/login'>Login</Button>
          ) : (
            <div className='action'>
              <Button type="link" href='/#/classify'>Classify</Button>
              <Button type="link" href='/#/shoppinglist'>Shopping List</Button>
              <span onClick={() => { logout() }}>{userInfo.email}, Logout</span>
            </div>
          )
        }
      </div>
    </div>
  )
}
export default Head