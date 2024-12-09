import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Gutter } from '@/app/_components/Gutter'
import { profileNavItems } from '@/app/constants'
import UserInfo from './UserInfo'

import classes from './index.module.scss'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classes.container}>
      <Gutter>
        <h3>Mon profil</h3>

        <div className={classes.account}>
          <div className={classes.nav}>
            <UserInfo />

            <ul>
              {profileNavItems.map(navItem => (
                <li key={navItem.title}>
                  <Link href={navItem.url} className={classes.navItem}>
                    <Image src={navItem.icon} alt={navItem.title} width={24} height={24} />
                    <p>{navItem.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {children}
        </div>
      </Gutter>
    </div>
  )
}

export default Layout
