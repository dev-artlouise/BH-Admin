import React from 'react'

import { Box, Grid } from '@mui/material'

import Content from './WhyUs/Content/Content'
import Form from './WhyUs/Content/Form'

import MUITabs from 'components/common/MUITabs'

import Section from './WhyUs/Section'
import List from './WhyUs/List'

const tabs = [
    {
        label: 'Content',
        content: <Section />
    },
    {
        label: 'List',
        content: <List />
    },
];

const WhyUs = () => {
    return (
        <Box>
            <MUITabs
                tabs={tabs}
            />
        </Box>
    )
}

export default WhyUs
