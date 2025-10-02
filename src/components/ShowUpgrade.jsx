import React from "react"
import { useSelector } from "react-redux"

import configuration from "../configuration/configuration.json"

export default ShowUpgrade = function ({score,quote,acess}) {
  return (
<div class="upgrade-mini">
  <span>🚀 Upgrade to claim <strong>Unlimited Codings</strong></span>
  <a href="/pricing" class="btn-mini">Upgrade</a>
</div>
  )
}
