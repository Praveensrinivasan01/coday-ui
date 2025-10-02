import { useSelector } from "react-redux"
import ShowUpgrade from "../components/ShowUpgrade"
import WrapperHoc from "src/hoc/WrapperHOC"

export default ScoreCard = function ({score,quote}) {
    const ShowUpgradeWrapper = WrapperHoc(ShowUpgrade);
    // const {plans: {  showUpgrade }} = useSelector((state) => state.plan)
  return (
    <>
      <div>Score Card</div>
      {score}
      <img
        src={quote.gif}
        alt="Description of image"
        height={200}
        width="100%"
      />
      <ShowUpgradeWrapper access={{key:"showUpgrade",skip:false}}/>
      {quote.type ? quote.quote : quote.meme}
    </>
  )
}
