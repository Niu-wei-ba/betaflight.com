import React, { useEffect } from 'react'
import { useLocation } from '@docusaurus/router'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function Root({ children }) {
  const { i18n } = useDocusaurusContext()
  const { pathname } = useLocation()
  const shouldRedirectToChinese = i18n.currentLocale === i18n.defaultLocale && pathname === '/'

  useEffect(() => {
    if (shouldRedirectToChinese) window.location.replace('/zh-CN/docs/wiki')
  }, [shouldRedirectToChinese])

  return shouldRedirectToChinese ? null : <>{children}</>
}
