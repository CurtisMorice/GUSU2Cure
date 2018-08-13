import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import cardStyle from './cardStyle';

function CustomCardBody({ ...props }) {
    const {
        classes,
        className,
        children,
        ...rest
    } = props;

    const cardBodyClasses = classNames({
        [classes.cardBody]: true,
        [className]: className !== undefined
    });

    return (
        <div className={cardBodyClasses} {...rest}>
            {children}
        </div>
    );
}

CustomCardBody.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default withStyles(cardStyle)(CustomCardBody);