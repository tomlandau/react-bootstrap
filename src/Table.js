import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import bsClass from './utils/bsClass';
import getClassSet from './utils/getClassSet';
import {splitBsProps} from './utils/splitBsProps';
import prefix from './utils/prefix';

const propTypes = {
  striped: PropTypes.bool,
  bordered: PropTypes.bool,
  condensed: PropTypes.bool,
  hover: PropTypes.bool,
  responsive: PropTypes.bool,
};

const defaultProps = {
  bordered: false,
  condensed: false,
  hover: false,
  responsive: false,
  striped: false,
};

/**
 * # A table React component.
 * Use the `striped`, `bordered`, `condensed` and `hover` props to customise the table.
 * 
 * &nbsp;
 * ## Responsive
 * Add `responsive` prop to make them scroll horizontally up to small devices (under 768px). When viewing on anything larger than 768px wide, you will not see any difference in these tables.
 * ```js
 * const tableInstance = (
 *  <Table responsive>
 *    <thead>
 *      <tr>
 *        <th>#</th>
 *        <th>Table heading</th>
 *        <th>Table heading</th>
 *        <th>Table heading</th>
 *        <th>Table heading</th>
 *        <th>Table heading</th>
 *        <th>Table heading</th>
 *      </tr>
 *    </thead>
 *    <tbody>
 *      <tr>
 *        <td>1</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *      </tr>
 *      <tr>
 *        <td>2</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *      </tr>
 *      <tr>
 *        <td>3</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *        <td>Table cell</td>
 *      </tr>
 *    </tbody>
 *  </Table>
 * );
​ * 
 * ReactDOM.render(tableInstance, mountNode);
 * ```
 * 
 * @property {bool} bordered
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `table`.
 * @property {bool} condensed
 * @property {bool} hover
 * @property {bool} responsive
 * @property {bool} striped
 */
class Table extends React.Component {
  render() {
    const {
      striped,
      bordered,
      condensed,
      hover,
      responsive,
      className,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'striped')]: striped,
      [prefix(bsProps, 'bordered')]: bordered,
      [prefix(bsProps, 'condensed')]: condensed,
      [prefix(bsProps, 'hover')]: hover,
    };

    const table = (
      <table
        {...elementProps}
        className={classNames(className, classes)}
      />
    );

    if (responsive) {
      return (
        <div className={prefix(bsProps, 'responsive')}>
          {table}
        </div>
      );
    }

    return table;
  }
}

Table.propTypes = propTypes;
Table.defaultProps = defaultProps;

export default bsClass('table', Table);
