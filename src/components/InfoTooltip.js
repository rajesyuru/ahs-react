import React, { useState } from 'react';
import TooltipTrigger from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

const InfoTooltip = ({ info }) => {
    const Tooltip = ({
        getTooltipProps,
        getArrowProps,
        tooltipRef,
        arrowRef,
        placement,
    }) => {
        return (
            <div
                {...getTooltipProps({
                    ref: tooltipRef,
                    className: 'tooltip-container',
                })}
            >
                <div
                    {...getArrowProps({
                        ref: arrowRef,
                        'data-placement': placement,
                        className: 'tooltip-arrow',
                    })}
                />
                <div className="tooltip-body">{info}</div>
            </div>
        );
    };

    const Trigger = ({ getTriggerProps, triggerRef }) => {
        return (
            <span
                {...getTriggerProps({
                    ref: triggerRef,
                    className: 'trigger',
                })}
            >
                <span className="material-icons text-info" style={{userSelect: "none"}}>textsms</span>
            </span>
        );
    };

    return (
        <TooltipTrigger tooltip={Tooltip} placement="left">
            {Trigger}
        </TooltipTrigger>
    );
};

export default InfoTooltip;
