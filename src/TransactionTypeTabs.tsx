import { Tab, Tabs, TabsProps } from "@mui/material";
import React, { FunctionComponent, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export const TransactionTypeTabs: FunctionComponent<TabsProps> = () => {
  const navigate = useNavigate();
  const { pathname: path } = useLocation();
  const onTabChange = useCallback(
    (event: React.ChangeEvent<{}>, newPath: string) => {navigate(newPath)},
    [path]
  );

  return (
    <>
      <Tabs
        value={path}
        onChange={onTabChange}
        indicatorColor="primary"
        variant="fullWidth"
      >
        <Tab
          label={'Stake'}
          value={'/stake'}
        />
        <Tab
          label={'Unstake'}
          value={'/unstake'}
        />
      </Tabs>
    </>
  );
};
