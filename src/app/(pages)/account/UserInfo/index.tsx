'use client'

import React from 'react'
import Image from 'next/image'

import { useAuth } from '@/app/_providers/Auth'
import classes from './index.module.scss'

function UserInfo() {
  const { user } = useAuth()

  return (
    <div className={classes.profile}>
      <Image src="/assets/icons/profile.svg" alt="icône de profil" width={50} height={50} />

      <div className={classes.profileInfo}>
        <p className={classes.name}>{user?.name}</p>
        <p className={classes.email}>{user?.email}</p>
      </div>
    </div>
  )
}

export default UserInfo
