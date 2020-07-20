import React from 'react'
import Styled from './style'
import { CTabs } from './style'

const CustomTabs = props => (
    <div style={{ background: "#8395a7" }}>
        <CTabs
            variant="fullWidth"
            indicatorColor="primary"
            {...props}
        />
    </div>
)

export default CustomTabs