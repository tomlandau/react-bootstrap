import classNames from 'classnames';
import React from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import MediaBody from './MediaBody';
import MediaHeading from './MediaHeading';
import MediaLeft from './MediaLeft';
import MediaList from './MediaList';
import MediaListItem from './MediaListItem';
import MediaRight from './MediaRight';
import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';

const propTypes = {
  componentClass: elementType,
};

const defaultProps = {
  componentClass: 'div',
};

/**
 * Abstract object styles for building various types of components (like blog comments, Tweets, etc) that feature a `left` or `right` aligned image alongside textual content.
 * 
 * &nbsp;
 * ## Example
 * ```js
 * const mediaInstance = (
 *  <div>
 *    <Media>
 *     <Media.Left>
 *        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *      </Media.Left>
 *      <Media.Body>
 *        <Media.Heading>Media Heading</Media.Heading>
 *        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
 *      </Media.Body>
 *    </Media>
 *    <Media>
 *      <Media.Left>
 *        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *      </Media.Left>
 *      <Media.Body>
 *        <Media.Heading>Media Heading</Media.Heading>
 *        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
 *        <Media>
 *          <Media.Left>
 *            <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *          </Media.Left>
 *          <Media.Body>
 *            <Media.Heading>Nested Media Heading</Media.Heading>
 *            <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
 *          </Media.Body>
 *        </Media>
 *      </Media.Body>
 *    </Media>
 *    <Media>
 *      <Media.Body>
 *        <Media.Heading>Media Heading</Media.Heading>
 *        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
 *      </Media.Body>
 *      <Media.Right>
 *        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *      </Media.Right>
 *    </Media>
 *    <Media>
 *      <Media.Left>
 *        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *      </Media.Left>
 *      <Media.Body>
 *        <Media.Heading>Media Heading</Media.Heading>
 *        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
 *      </Media.Body>
 *       <Media.Right>
 *        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *      </Media.Right>
 *    </Media>
 *  </div>
 * );
 * 
 * ReactDOM.render(mediaInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Media Alignment
 * The images or other media can be aligned top, middle, or bottom. The default is top aligned.
 * ```js
 * const mediaAlignmentInstance = (
 *  <div>
 *    <Media>
 *      <Media.Left align="top">
 *        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *      </Media.Left>
 *      <Media.Body>
 *        <Media.Heading>Top aligned media</Media.Heading>
 *        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
 * 
 *        <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
 *      </Media.Body>
 *    </Media>
 *    <Media>
 *      <Media.Left align="middle">
 *        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *      </Media.Left>
 *      <Media.Body>
 *        <Media.Heading>Middle aligned media</Media.Heading>
 *        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
 * 
 *        <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
 *      </Media.Body>
 *    </Media>
 *    <Media>
 *      <Media.Left align="bottom">
 *        <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *      </Media.Left>
 *      <Media.Body>
 *        <Media.Heading>Bottom aligned media</Media.Heading>
 *        <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
 * 
 *        <p>Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>
 *      </Media.Body>
 *    </Media>
 *  </div>
 * );
 * 
 * ReactDOM.render(mediaAlignmentInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Media list
 * You can use media inside list (useful for comment threads or articles lists).
 * For more info, see [Media List component](https://bitsrc.io/react-bootstrap/components/media/media-list).
 * 
 * @property {string} bsClasss - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `media`.
 * @property {elementType} componentClass - You can use a custom element type for this component. Default is `div`.
 */
class Media extends React.Component {
  render() {
    const { componentClass: Component, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <Component
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

Media.propTypes = propTypes;
Media.defaultProps = defaultProps;

Media.Heading = MediaHeading;
Media.Body = MediaBody;
Media.Left = MediaLeft;
Media.Right = MediaRight;
Media.List = MediaList;
Media.ListItem = MediaListItem;

export default bsClass('media', Media);
