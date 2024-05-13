import { useState } from 'react'
import { ConfigProvider } from 'antd'
import SpellingHome from './SpellingHome'
import {
   createBrowserRouter,
   RouterProvider,
} from 'react-router-dom'
import Maths from './Maths'
import Error404 from './Error404'
import KSTemplate from './KSTemplate'

const router = createBrowserRouter([
   {
      path: '/',
      element: <SpellingHome />,
      errorElement: <Error404 />,
   },
   {
      path: '/maths',
      element: <Maths />,
   },
   {
      path: '/ks/:ksId',
      element: <KSTemplate />,
   },
])

export default function App() {
   return (
      <ConfigProvider
         theme={{
            token: {
               // fontFamily: 'Delicious Handrawn',
               colorPrimary: '#654321',
               backgroundAttachment: 'fixed',
            },
            components: {
               Slider: {
                  handleStyle: {
                     color: 'brown',
                     backgroundColor: 'brown',
                  },
                  colorPrimary: '#654321',
                  railStyle: {
                     backgroundColor: 'orange',
                  },
               },
            },
         }}
      >
         <RouterProvider router={router} />
      </ConfigProvider>
   )
}
