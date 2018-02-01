
import * as React from 'react'
import { connect, Dispatch } from 'react-redux'

import Drawer from '@voiceofamerica/voa-shared/components/Drawer'

import AppState from 'types/AppState'
import toggleCircumventionDrawer from 'redux-store/actions/toggleCircumventionDrawer'

import { circumventionDrawerLabels } from 'labels'

interface StateProps {
  open: boolean
}

interface DispatchProps {
  close: () => void
}

type Props = StateProps & DispatchProps

class CircumventionDrawerBase extends React.Component<Props> {
  render () {
    const { open, close } = this.props
    return (
      <Drawer open={open} onClose={close}>
        {circumventionDrawerLabels.content}
      </Drawer>
    )
  }
}

const mapStateToProps = ({ circumventionDrawer: { open } }: AppState): StateProps => {
  return {
    open,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => {
  return {
    close: () => dispatch(toggleCircumventionDrawer({})),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CircumventionDrawerBase)
