import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

const MUITabs = ({ tabs }) => {
    const [currentTab, setCurrentTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setCurrentTab(newValue);
    };

    // console.log(tabs)

    return (
        <Box>
            <Tabs value={currentTab} onChange={handleTabChange}>
                {tabs.map(({ label }, index) => (
                    <Tab
                        key={index}
                        label={label}
                    />
                ))}
            </Tabs>

            <Box p={2}>
                {tabs[currentTab].content}
            </Box>
        </Box>
    )
}

export default MUITabs

