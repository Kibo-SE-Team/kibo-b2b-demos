import { BuilderComponent, builder } from '@builder.io/react'
import getConfig from 'next/config'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BlankLayout from '@/components/layout/BlankLayout/BlankLayout'
import getCategoryTree from '@/lib/api/operations/get-category-tree'
import type { CategoryTreeResponse } from '@/lib/types'

import type { GetServerSidePropsContext } from 'next'

const { publicRuntimeConfig } = getConfig()
const apiKey = publicRuntimeConfig?.builderIO?.apiKey

builder.init(apiKey)

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { locale } = context

  const pathnameArr = context.params?.slug

  let pagename
  if (Array.isArray(pathnameArr) && pathnameArr?.length > 1) {
    pagename = pathnameArr.join('/')
  } else {
    pagename = pathnameArr
  }

  const categoriesTree: CategoryTreeResponse = await getCategoryTree()

  const page = await builder
    .get(publicRuntimeConfig?.builderIO?.modelKeys?.defaultPage, {
      userAttributes: {
        urlPath: `/${pagename}`,
      },
    })
    .toPromise()

  return {
    props: {
      page: page || null,
      categoriesTree,
      ...(await serverSideTranslations(locale as string, ['common'])),
    },
  }
}

const PageNotFound = () => {
  return (
    <div
      style={{
        height: '300px',
        color: 'red',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Page not found (404)</h1>
    </div>
  )
}

const Page = (props: any) => {
  const { page } = props

  return (
    <div>
      <BuilderComponent
        model={publicRuntimeConfig?.builderIO?.modelKeys?.defaultPage}
        content={page}
      />
    </div>
  )
}

export default Page

Page.getLayout = function getLayout(page: any, pageProps: any = {}) {
  return <>{page}</>
}