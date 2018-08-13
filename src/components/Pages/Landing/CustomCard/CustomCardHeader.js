import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import cardStyle from './cardStyle';

function CustomCardHeader({ ...props }) {
    const { 
        classes, 
        className, 
        children,
        color,
        ...rest 
    } = props;

    const cardHeaderClasses = classNames({
        [classes.cardHeader]: true,
        [className]: className !== undefined
    });

    return (
        <div className={cardHeaderClasses} {...rest}>
            {children}
        </div>
    );
}

CustomCardHeader.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default withStyles(cardStyle)(CustomCardHeader);