import { Flex, Progress } from 'antd'

function ProgressBar({ percentage }) {
   return (
      <div>
         <Progress
            percent={percentage}
            type='line'
            trailColor={'#6f6f6f'}
            strokeWidth={28}
            size='small'
            strokeColor={{
               '0%': 'red',
               '50%': 'orange',
               '100%': 'green',
            }}
         />
      </div>
   )
}

export default ProgressBar
