/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
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
