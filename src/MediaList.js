import classNames from 'classnames';
import React from 'react';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';

/**
 * Use media objects inside a list (useful for comment threads or articles lists).
 * @example
 * const mediaListInstance = (
 *  <div>
 *    <Media.List>
 *      <Media.ListItem>
 *        <Media.Left>
 *          <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *        </Media.Left>
 *        <Media.Body>
 *          <Media.Heading>Media heading</Media.Heading>
 *          <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
 * 
 *            <Media>
 *              <Media.Left>
 *                <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *              </Media.Left>
 *              <Media.Body>
 *                <Media.Heading>Nested media heading</Media.Heading>
 *                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
 * 
 *                <Media>
 *                  <Media.Left>
 *                    <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *                  </Media.Left>
 *                  <Media.Body>
 *                    <Media.Heading>Nested media heading</Media.Heading>
 *                    <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
 *                  </Media.Body>
 *                </Media>
 *              </Media.Body>
 *            </Media>
 * 
 *            <Media>
 *              <Media.Left>
 *                <img width={64} height={64} src="/assets/thumbnail.png" alt="Image"/>
 *              </Media.Left>
 *              <Media.Body>
 *                <Media.Heading>Nested media heading</Media.Heading>
 *                <p>Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis.</p>
 *              </Media.Body>
 *            </Media>
 *        </Media.Body>
 *      </Media.ListItem>
 *    </Media.List>
 *  </div>
 * );
 * 
 * ReactDOM.render(mediaListInstance, mountNode);
 */
class MediaList extends React.Component {
  render() {
    const { className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <ul
        {...elementProps}
        className={classNames(className, classes)}
      />
    );
  }
}

export default bsClass('media-list', MediaList);
