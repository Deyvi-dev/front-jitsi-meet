import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { getLocalParticipant } from '../../../base/participants/functions';
import { getVerticalViewMaxWidth } from '../../../filmstrip/functions.web';
import { getToolboxHeight } from '../../../toolbox/functions.web';

interface IProps {
    clientHeight: number;
    clientWidth: number;
    filmstripVisible: boolean;
    filmstripWidth: number;
    isOwner: boolean;
    isResizing: boolean;
    videoUrl?: string;
}

class SharedVideo extends Component<IProps> {
    getDimensions() {
        const { clientHeight, clientWidth, filmstripVisible, filmstripWidth } = this.props;

        let width;
        let height;

        if (interfaceConfig.VERTICAL_FILMSTRIP) {
            if (filmstripVisible) {
                width = `${clientWidth - filmstripWidth}px`;
            } else {
                width = `${clientWidth}px`;
            }
            height = `${clientHeight - getToolboxHeight()}px`;
        } else {
            if (filmstripVisible) {
                height = `${clientHeight - Filmstrip.getFilmstripHeight()}px`;
            } else {
                height = `${clientHeight}px`;
            }
            width = `${clientWidth}px`;
        }

        return {
            width,
            height
        };
    }

    render() {
        const { isOwner, isResizing, videoUrl } = this.props;
        const className = !isResizing && isOwner ? '' : 'disable-pointer';
    
        if (!videoUrl || !isOwner) { // adicionando verificação da propriedade isOwner
            return null;
        }

        return (
            <div className={className} id='sharedVideo' style={this.getDimensions()}>
                <iframe
                    src={videoUrl}
                    allowFullScreen
                    allow="camera; microphone; screen"
                    style={{ width: '100%', height: '100%' }}
                />
            </div>
        );
    }
}

function _mapStateToProps(state: IReduxState) {
    const { ownerId, videoUrl } = state['features/shared-video'];
    const { clientHeight, clientWidth } = state['features/base/responsive-ui'];
    const { visible, isResizing } = state['features/filmstrip'];

    const localParticipant = getLocalParticipant(state);

    return {
        clientHeight,
        clientWidth,
        filmstripVisible: visible,
        filmstripWidth: getVerticalViewMaxWidth(state),
        isOwner: ownerId === localParticipant?.id,
        isResizing,
        videoUrl
    };
}

export default connect(_mapStateToProps)(SharedVideo);
