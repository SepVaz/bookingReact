


interface Props {
    name: string
    id: number
}

export default function Bookings(props: Props) {

  return (
    <>
    <div>
       <li>{props.name}</li>
    </div>
    </>
  )
}
