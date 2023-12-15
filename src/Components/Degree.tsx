
type DegreeProp={x: number | string}
const Degree = ({ x }: DegreeProp): JSX.Element => (
  <>
    <span>
     {x}
      <sup>o</sup>
    </span>
  </>
)

export default Degree