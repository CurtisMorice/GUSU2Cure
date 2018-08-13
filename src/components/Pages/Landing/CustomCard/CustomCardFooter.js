import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import cardStyle from './cardStyle';

function CustomCardFooter({ ...props }) {
    const {
        classes,
        className,
        children,
        ...rest
    } = props;

    const cardFooterClasses = classNames({
        [classes.cardFooter]: true,
        [className]: className !== undefined
    });

    return (
        <div className={cardFooterClasses} {...rest}>
            {children}
        </div>
    );
}

CustomCardFooter.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default withStyles(cardStyle)(CustomCardFooter);