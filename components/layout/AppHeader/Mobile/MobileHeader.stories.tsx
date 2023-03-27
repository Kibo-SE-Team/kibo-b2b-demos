import React from 'react'

import { ComponentStory, ComponentMeta } from '@storybook/react'

import KiboHeader from '../Common/KiboHeader'
import MobileHeader from './MobileHeader'
import { DialogRoot, HeaderContextProvider, ModalContextProvider } from '@/context'

// This component is used inside KiboHeader.
export default {
  title: 'Layout/Mobile App Header',
  component: MobileHeader,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MobileHeader>

const Template: ComponentStory<typeof KiboHeader> = () => (
  <ModalContextProvider>
    <HeaderContextProvider>
      <MobileHeader />
      <DialogRoot />
    </HeaderContextProvider>
  </ModalContextProvider>
)

export const Common = Template.bind({})
Common.parameters = {
  viewport: {
    defaultViewport: 'iphone12promax',
  },
}
