import React from 'react';
import { connect } from 'react-redux';

import { hideDialog } from '../../../base/dialog/actions';
import { translate } from '../../../base/i18n/functions';
import Dialog from '../../../base/ui/components/web/Dialog';
import Input from '../../../base/ui/components/web/Input';
import AbstractSharedVideoDialog from '../AbstractSharedVideoDialog';

/**
 * Component that renders the video share dialog.
 *
 * @returns {React$Element<any>}
 */
class SharedVideoDialog extends AbstractSharedVideoDialog<any> {

    /**
     * Instantiates a new component.
     *
     * @inheritdoc
     */
    constructor(props: any) {
        super(props);

        this.state = {
            value: '',
            okDisabled: true,
            error: false
        };

        this._onChange = this._onChange.bind(this);
        this._onSubmitValue = this._onSubmitValue.bind(this);

        // adicionei valor fixo para teste
        this._onSubmitValue('http://localhost:8444/?password=12345&autoconnect=true');
    }

    /**
     * Callback for the onChange event of the field.
     *
     * @param {string} value - The static event.
     * @returns {void}
     */
    _onChange(value: string) {
        this.setState({
            value,
            okDisabled: !value
        });
    }

    /**
     * Callback to be invoked when the value of the link input is submitted.
     *
     * @param {string} url - The URL string to set as the video link.
     * @returns {boolean}
     */
    _onSubmitValue(url: string) {
        const result = super._onSetVideoLink(url);

        if (result) {
            this.props.dispatch(hideDialog());
        } else {
            this.setState({
                error: true
            });
        }

        return result;
    }

    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     */
    render() {
        return (
            <div>
                <p>teste</p>
            </div>
        );
    }
}

export default translate(connect()(SharedVideoDialog));
