/**
 * @license MIT License Copyright (c) 2019 Ren Project
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
import React, { useCallback, useState } from 'react';
import { Button, ButtonProps, Fade, IconButton, styled } from '@mui/material';
import { createStyles, withStyles, WithStyles } from '@mui/styles';
import { blue, skyBlue, skyBlueLighter } from '../theme/colors';
import { FC } from 'react';
import { MiddleEllipsisText } from './TypographyHelpers';
import { FileCopyOutlined } from '@mui/icons-material';
import { Hide } from './LayoutHelpers';

export const ActionButton: React.FC<ButtonProps> = ({
    color = "primary",
    ...props
}) => {
    return (
        <Button
            sx={{ maxWidth: 360 }}
            variant="contained"
            size="large"
            fullWidth
            color={color}
            {...props}
        />
    );
};

export const ActionButtonWrapper = styled("div")(() => ({
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
}));

const lightIconButtonStyles = createStyles({
    root: {
        color: blue,
        // backgroundColor: skyBlueLighter,
        fontSize: 8,
        size: 8,
        "&:hover": {
            backgroundColor: skyBlue,
            "@media (hover: none)": {
                backgroundColor: "transparent",
            },
        },
        padding: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
    },
    label: {
        // padding: 10,
    },
});

const copyContentButtonStyles = createStyles({
    root: {
        display: "flex",
        justifyContent: "stretch",
        maxWidth: 320,
    },
    content: {
        flexGrow: 2,
        fontSize: 13,
        // borderRadius: 20,
        // marginRight: 10,
        color: blue,
        // backgroundColor: skyBlueLighter,
        // userSelect: "all",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        maxWidth: 265,
    },
    contentValue: {
        maxWidth: "100%",
        // paddingLeft: 9,
        // paddingRight: 9,
    },
    copy: {
        flexGrow: 0,
        flexShrink: 0,
    },
});

type CopyContentButtonProps = {
    content: string;
    copiedMessage?: string;
};

const CopyContentButtonWithStyles: FC<CopyContentButtonProps & WithStyles<typeof copyContentButtonStyles>> = ({
    classes,
    content,
    copiedMessage = "Copied!",
}) => {
    const styles = classes;
    const iconClasses = lightIconButtonStyles;
    const [copied, setCopied] = useState(false);
    const copyToClipboard = (value: string) => {
        const fauxInput = document.createElement("input");
        document.body.appendChild(fauxInput);
        fauxInput.setAttribute("value", value);
        fauxInput.select();
        document.execCommand("copy");
        document.body.removeChild(fauxInput);
    };

    const handleClick = useCallback(() => {
        if (!copied) {
            copyToClipboard(content);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 4000);
        }
    }, [content, copied]);
    return (
        <div className={styles.root}>
            <div className={styles.content}>
                {copied && (
                    <Fade in={copied} timeout={1200}>
                        <span>{copiedMessage}</span>
                    </Fade>
                )}
                <Hide when={copied} className={styles.contentValue}>
                    <MiddleEllipsisText>{content}</MiddleEllipsisText>
                </Hide>
            </div>
            <div className={styles.copy}>
                <Button sx={{minWidth: 0, padding: "0 0 0 0"}} onClick={handleClick}>
                    <FileCopyOutlined sx={{fontSize:12, width:'100%'}} />
                </Button>
            </div>
        </div>
    );
};

export const CopyContentButton = withStyles(copyContentButtonStyles)(CopyContentButtonWithStyles)
