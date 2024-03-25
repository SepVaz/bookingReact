import { ICleaners } from "../Cleaners"



export default function Bookings(props: ICleaners) {

  return (
    <>
    <div>
       <li>{props.name}</li>
    </div>
    </>
  )
}
