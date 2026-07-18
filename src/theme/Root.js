import React from 'react'
import { Redirect, useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function Root({ children }) {
  const { i18n } = useDocusaurusContext()
  const { pathname } = useLocation()

  if (i18n.currentLocale === i18n.defaultLocale && pathname === '/') {
    return <Redirect to="/zh-CN/" />
  }

  return <>{children}</>
}
