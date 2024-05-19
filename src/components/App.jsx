import { useState } from 'react'
import { ConfigProvider } from 'antd'
import SpellingCustom from './SpellingCustom'
import {
   createBrowserRouter,
   RouterProvider,
} from 'react-router-dom'
import Maths from './Maths'
import Error404 from './Error404'
import KSTemplate from './KSTemplate'
import KSTemplate2 from './KSTemplate2'
import SpellingPractice from './SpellingPractice'
import SpellingConsole from './SpellingConsole'
import Home from './Home'

const router = createBrowserRouter([
   {
      path: '/',
      element: <Home />,
      errorElement: <Error404 />,
      children: [
         {
            path: '/spelling-custom',
            element: <SpellingCustom />,
         },
         {
            path: '/maths',
            element: <Maths />,
         },
         {
            path: '/ks/:ksId',
            element: <KSTemplate />,
         },
         {
            path: '/ks/:ksId/:level/:number',
            element: <KSTemplate2 />,
         },
         {
            path: '/spelling-list',
            element: <SpellingPractice />,
         },
         {
            path: '/spelling-console',
            element: <SpellingConsole />,
         },
         {
            path: '/spelling-custom',
            element: <SpellingCustom />,
         },
      ],
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
