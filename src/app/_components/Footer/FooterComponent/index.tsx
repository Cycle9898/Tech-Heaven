'use client'

import type { Footer, Media } from '@/payload/payload-types'
import React from 'react'
import classes from './index.module.scss'
import { inclusions, noHeaderFooterUrls, profileNavItems } from '@/app/constants'
import { usePathname } from 'next/navigation'
import { Gutter } from '../../Gutter'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../../Button'

function FooterComponent({ footer }: { footer: Footer }) {
  const pathname = usePathname()

  const navItems = footer?.navItems || []

  return (
    <footer className={noHeaderFooterUrls.includes(pathname) ? classes.hide : ''}>
      <Gutter>
        <ul className={classes.inclusions}>
          {inclusions.map(inclusion => (
            <li key={inclusion.title}>
              <Image
                src={inclusion.icon}
                alt={inclusion.title}
                width={36}
                height={36}
                className={classes.icon}
              />

              <h5 className={classes.title}>{inclusion.title}</h5>

              <p>{inclusion.description}</p>
            </li>
          ))}
        </ul>
      </Gutter>

      <div className={classes.footer}>
        <Gutter>
          <div className={classes.wrap}>
            <Link href="/">
              <Image src="/logo-white.svg" alt="Logo de Tech Heaven" width={170} height={50} />
            </Link>

            <p>{footer.copyright}</p>

            <div className={classes.socialLinks}>
              {navItems.map(navItem => {
                const icon = navItem?.link?.icon as Media

                return (
                  <Button
                    key={navItem.link.label}
                    el="link"
                    href={navItem.link.url}
                    newTab={true}
                    className={classes.socialLinksItem}
                  >
                    <Image
                      src={icon?.url}
                      alt={navItem.link.label}
                      height={24}
                      width={24}
                      className={classes.socialIcon}
                    />
                  </Button>
                )
              })}
            </div>
          </div>
        </Gutter>
      </div>
    </footer>
  )
}

export default FooterComponent
