import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import cardStyle from './cardStyle';

function CustomCard({ ...props }) {
    const {
        classes,
        className,
        children,
        ...rest
    } = props;
    
    const cardClasses = classNames({
        [classes.card]: true,
        [className]: className !== undefined
    });

    return (
        <div className={cardClasses} {...rest}>
            {children}
        </div>
    );
};

CustomCard.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string
};

export default withStyles(cardStyle)(CustomCard);