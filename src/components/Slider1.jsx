import './Slider1.css'
import { Popover } from 'antd'

export default function Slider1({ value, onChange }) {
   const handleSliderChange = (event) => {
      onChange(parseFloat(event.target.value))
   }

   return (
      <div
         className='slider-container '
         style={{ alignSelf: 'self-start' }}
      >
         <label>🤖</label>

         <Popover content='change speed of voice' title='SPEED'>
            <input
               type='range'
               min='0.1'
               max='1.4'
               step='0.1'
               value={value}
               onChange={handleSliderChange}
               className='slider rate-control'
               // style={{
               //    backgroundColor: 'brown',
               // }}
               // className='slider'
            />
         </Popover>
         <span className='slider-label'>
            {(value * 100).toFixed(0)}%
         </span>
      </div>
   )
}
