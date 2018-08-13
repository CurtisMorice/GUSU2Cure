import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import parallaxStyle from './parallaxStyle';

class Parallax extends Component {
    constructor(props) {
        super(props);
        let windowScrollTop = window.pageYOffset / 3;
        this.state = {
            transform: "translate3d(0," + windowScrollTop + "px,0)"
        };
        this.resetTransform = this.resetTransform.bind(this);
    }
    
    componentDidMount() {
        let windowScrollTop = window.pageYOffset / 3;
        this.setState({
            transform: "translate3d(0," + windowScrollTop + "px,0)"
        });
        window.addEventListener('scroll', this.resetTransform);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.resetTransform);
    }

    resetTransform() {
        let windowScrollTop = window.pageYOffset / 3;
        this.setState({
            transform: "translate3d(0," + windowScrollTop + "px,0)"
        });
    }

    render() {
        const {
            classes,
            filter,
            className,
            children,
            style,
            small
        } = this.props;

        const parallaxClasses = classNames({
            [classes.parallax]: true,
            [classes.filter]: filter,
            [classes.small]: small,
            [className]: className !== undefined
        });

        return (
            <div
                className={parallaxClasses}
                style={{
                    ...style,
                    backgroundColor: '#dcdcdc',
                    ...this.state
                }}
                ref='parallax'
            >
                {children}
            </div>
        );
    }
}

Parallax.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    filter: PropTypes.bool,
    children: PropTypes.node,
    style: PropTypes.string,
};

export default withStyles(parallaxStyle)(Parallax);