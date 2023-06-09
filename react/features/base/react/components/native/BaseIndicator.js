// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import Icon from '../../../icons/components/Icon';
import { type StyleType } from '../../../styles';

import styles from './indicatorstyles';
import { BASE_INDICATOR } from './styles';

type Props = {

    /**
     * Overwritten background color when indicator is highlighted.
     */
    backgroundColor?: string;

    /**
     * True if a highlighted background has to be applied.
     */
    highlight: boolean,

    /**
     * The name of the icon to be used as the indicator.
     */
    icon: string,

    /**
     * Additional style to be applied to the icon element.
     */
    iconStyle: StyleType
};

/**
 * Implements a base indicator to be reused across all native indicators on
 * the filmstrip.
 */
export default class BaseIndicator extends Component<Props> {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        const { icon, iconStyle } = this.props;

        return (
            <View
                style = { BASE_INDICATOR }>
                <Icon
                    src = { icon }
                    style = { [
                        styles.indicator,
                        iconStyle
                    ] } />
            </View>
        );
    }
}
