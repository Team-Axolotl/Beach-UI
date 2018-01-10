import React from 'react';
import PropTypes from 'prop-types';

// An image.
export default class Image extends React.PureComponent {
    render() {
        let { img, size, maxSize, ...other } = this.props;
        return (
            <div {...other} style={Object.assign({
                backgroundImage: 'url(' + img + ')',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                height: size,
                maxHeight: maxSize
            }, this.props.style)} />
        );
    }
}

Image.propTypes = {
    img: PropTypes.string,
    style: PropTypes.object,
    size: PropTypes.string,
    maxSize: PropTypes.string
};

Image.defaultProps = {
    size: '100vh',
    maxSize: '500px'
};
