// @flow

import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { translate } from '../../base/i18n/functions';
import Button from '../../base/ui/components/native/Button';
import { BUTTON_TYPES } from '../../base/ui/constants.native';

import AbstractGoogleSignInButton from './AbstractGoogleSignInButton';
import styles from './styles';

// eslint-disable-next-line
const GOOGLE_BRAND_IMAGE = require('../../../../images/btn_google_signin_dark_normal.png');

/**
 * The Google Brand image for Sign In.
 *
 * NOTE: iOS doesn't handle the react-native-google-signin button component
 * well due to our CocoaPods build process (the lib is not intended to be used
 * this way), hence the custom button implementation.
 */

/**
 * A React Component showing a button to sign in with Google.
 *
 * @augments Component
 */
class GoogleSignInButton extends AbstractGoogleSignInButton {

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { onClick, signedIn } = this.props;

        if (signedIn) {
            return (
                <Button
                    accessibilityLabel = 'liveStreaming.signOut'
                    labelKey = 'liveStreaming.signOut'
                    onClick = { onClick }
                    style = { styles.signOutButton }
                    type = { BUTTON_TYPES.SECONDARY } />
            );
        }

        return (
            <TouchableOpacity
                onPress = { onClick }
                style = { styles.signInButton } >
                <Image
                    resizeMode = { 'contain' }
                    source = { GOOGLE_BRAND_IMAGE }
                    style = { styles.signInImage } />
            </TouchableOpacity>
        );
    }
}

export default translate(GoogleSignInButton);
