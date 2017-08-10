import classNames from 'classnames';
import events from 'dom-helpers/events';
import ownerDocument from 'dom-helpers/ownerDocument';
import canUseDOM from 'dom-helpers/util/inDOM';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import BaseModal from 'react-overlays/lib/Modal';
import isOverflowing from 'react-overlays/lib/utils/isOverflowing';
import elementType from 'prop-types-extra/lib/elementType';

import Fade from './Fade';
import Body from './ModalBody';
import ModalDialog from './ModalDialog';
import Footer from './ModalFooter';
import Header from './ModalHeader';
import Title from './ModalTitle';
import bsClass from './utils/bsClass';
import prefix from './utils/prefix';
import bsSizes from './utils/bsSizes';
import createChainedFunction from './utils/createChainedFunction';
import splitComponentProps from './utils/splitComponentProps';
import { Size } from './utils/StyleConfig';

const propTypes = {
  ...BaseModal.propTypes,
  ...ModalDialog.propTypes,

  /**
   * @property {'static'|true|false} backdrop - Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: PropTypes.oneOf(['static', true, false]),

  /**
   * @property {string} backdropClassName - Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in".
   */
  backdropClassName: PropTypes.string,

  /**
   * @property {bool} keyboard - Close the modal when escape key is pressed
   */
  keyboard: PropTypes.bool,

  /**
   * @property {bool} animation - Open and close the Modal with a slide and fade animation.
   */
  animation: PropTypes.bool,

  /**
   * A Component type that provides the modal content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * modal component.
   */
  dialogComponentClass: elementType,

  /**
   * @property {bool} autoFocus - When `true` The modal will automatically shift focus to itself when it
   * opens, and replace it to the last focused element when it closes.
   * Generally this should never be set to false as it makes the Modal less
   * accessible to assistive technologies, like screen-readers.
   */
  autoFocus: PropTypes.bool,

  /**
   * @property {bool} enforceFocus - When `true` The modal will prevent focus from leaving the Modal while
   * open. Consider leaving the default value here, as it is necessary to make
   * the Modal work well with assistive technologies, such as screen readers.
   */
  enforceFocus: PropTypes.bool,

  /**
   * @property {bool} restoreFocus - When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: PropTypes.bool,

  /**
   * @property {bool} show - When `true` The modal will show itself.
   */
  show: PropTypes.bool,

  /**
   * @property {func} onHide - A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onHide: PropTypes.func,

  /**
   * @property {func} onEnter - Callback fired before the Modal transitions in
   */
  onEnter: PropTypes.func,

  /**
   * @property {func} onEntering - Callback fired as the Modal begins to transition in
   */
  onEntering: PropTypes.func,

  /**
   * @property {func} onEntered - Callback fired after the Modal finishes transitioning in
   */
  onEntered: PropTypes.func,

  /**
   * @property {func} onExit - Callback fired right before the Modal transitions out
   */
  onExit: PropTypes.func,

  /**
   * @property {func} onExiting - Callback fired as the Modal begins to transition out
   */
  onExiting: PropTypes.func,

  /**
   * @property {func} onExited - Callback fired after the Modal finishes transitioning out
   */
  onExited: PropTypes.func,

  /**
   * @private
   */
  container: BaseModal.propTypes.container,
};

const defaultProps = {
  ...BaseModal.defaultProps,
  animation: true,
  dialogComponentClass: ModalDialog,
};

const childContextTypes = {
  $bs_modal: PropTypes.shape({
    onHide: PropTypes.func,
  }),
};

/**
 * # Represents a modal dialog component.
 * ```js
 * const modalInstance = (
 *  <div className="static-modal">
 *    <Modal.Dialog>
 *      <Modal.Header>
 *        <Modal.Title>Modal title</Modal.Title>
 *      </Modal.Header>
 * 
 *      <Modal.Body>
 *        One fine body...
 *      </Modal.Body>
 * 
 *      <Modal.Footer>
 *        <Button>Close</Button>
 *        <Button bsStyle="primary">Save changes</Button>
 *      </Modal.Footer>
 * 
 *    </Modal.Dialog>
 *  </div>
 * );
 * 
 * ReactDOM.render(modalInstance, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Basic example
 * A modal with header, body, and set of actions in the footer. Use `<Modal/>` in combination with other components to show or hide your Modal. The `<Modal/>` Component comes with a few convenient "sub components": `<Modal.Header/>`, `<Modal.Title/>`, `<Modal.Body/>`, and `<Modal.Footer/>`, which you can use to build the Modal content.
 * ```js
 * const Example = React.createClass({
 *  getInitialState() {
 *    return { showModal: false };
 *  },
 * 
 *  close() {
 *    this.setState({ showModal: false });
 *  },
 * 
 *  open() {
 *    this.setState({ showModal: true });
 *  },
 * 
 *  render() {
 *    const popover = (
 *      <Popover id="modal-popover" title="popover">
 *        very popover. such engagement
 *      </Popover>
 *    );
 *    const tooltip = (
 *      <Tooltip id="modal-tooltip">
 *        wow.
 *      </Tooltip>
 *    );
 * 
 *    return (
 *      <div>
 *        <p>Click to get the full Modal experience!</p>
 * 
 *        <Button
 *          bsStyle="primary"
 *          bsSize="large"
 *          onClick={this.open}
 *        >
 *          Launch demo modal
 *        </Button>
 * 
 *        <Modal show={this.state.showModal} onHide={this.close}>
 *          <Modal.Header closeButton>
 *            <Modal.Title>Modal heading</Modal.Title>
 *          </Modal.Header>
 *          <Modal.Body>
 *            <h4>Text in a modal</h4>
 *            <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
 * 
 *            <h4>Popover in a modal</h4>
 *            <p>there is a <OverlayTrigger overlay={popover}><a href="#">popover</a></OverlayTrigger> here</p>
 * 
 *            <h4>Tooltips in a modal</h4>
 *            <p>there is a <OverlayTrigger overlay={tooltip}><a href="#">tooltip</a></OverlayTrigger> here</p>
 * 
 *            <hr />
 * 
 *            <h4>Overflowing text to show scroll behavior</h4>
 *            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
 *            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
 *            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
 *            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
 *            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
 *            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
 *            <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
 *            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
 *            <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
 *          </Modal.Body>
 *          <Modal.Footer>
 *            <Button onClick={this.close}>Close</Button>
 *          </Modal.Footer>
 *        </Modal>
 *      </div>
 *    );
 *  }
 * });
 * 
 * ReactDOM.render(<Example />, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Contained Modal
 * You will need to add the following css to your project and ensure that your container has the `modal-container` class.
 * ```css
 * .modal-container {
 *   position: relative;
 * }
 * .modal-container .modal, .modal-container .modal-backdrop {
 *   position: absolute;
 * }
 * ```
 * 
 * &nbsp;
 * ```js
 * const Trigger = React.createClass({
 *  getInitialState() {
 *    return { show: false };
 *  },
 * 
 *  render() {
 *    let close = () => this.setState({ show: false});
 * 
 *    return (
 *      <div className="modal-container" style={{height: 200}}>
 *        <Button
 *          bsStyle="primary"
 *          bsSize="large"
 *          onClick={() => this.setState({ show: true})}
 *        >
 *          Launch contained modal
 *        </Button>
 * 
 *        <Modal
 *          show={this.state.show}
 *          onHide={close}
 *          container={this}
 *          aria-labelledby="contained-modal-title"
 *        >
 *          <Modal.Header closeButton>
 *            <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
 *          </Modal.Header>
 *          <Modal.Body>
 *            Elit est explicabo ipsum eaque dolorem blanditiis doloribus sed id ipsam, beatae, rem fuga id earum? Inventore et facilis obcaecati.
 *          </Modal.Body>
 *          <Modal.Footer>
 *            <Button onClick={close}>Close</Button>
 *          </Modal.Footer>
 *        </Modal>
 *      </div>
 *    );
 *  }
 * });
 * 
 * ReactDOM.render(<Trigger />, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Sizing modals using standard Bootstrap props
 * You can specify a bootstrap large or small modal by using the "bsSize" prop.
 * ```js
 * const MySmallModal = React.createClass({
 *  render() {
 *    return (
 *      <Modal {...this.props} bsSize="small" aria-labelledby="contained-modal-title-sm">
 *        <Modal.Header closeButton>
 *          <Modal.Title id="contained-modal-title-sm">Modal heading</Modal.Title>
 *        </Modal.Header>
 *        <Modal.Body>
 *          <h4>Wrapped Text</h4>
 *          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
 *          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
 *          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
 *          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
 *          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
 *          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
 *          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
 *          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
 *          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
 *        </Modal.Body>
 *        <Modal.Footer>
 *          <Button onClick={this.props.onHide}>Close</Button>
 *        </Modal.Footer>
 *      </Modal>
 *    );
 *  }
 * });
 * 
 * const MyLargeModal = React.createClass({
 *  render() {
 *    return (
 *      <Modal {...this.props} bsSize="large" aria-labelledby="contained-modal-title-lg">
 *        <Modal.Header closeButton>
 *          <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
 *        </Modal.Header>
 *        <Modal.Body>
 *          <h4>Wrapped Text</h4>
 *          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
 *          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
 *          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
 *          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
 *          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
 *          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
 *          <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
 *          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
 *          <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
 *        </Modal.Body>
 *        <Modal.Footer>
 *          <Button onClick={this.props.onHide}>Close</Button>
 *        </Modal.Footer>
 *      </Modal>
 *    );
 *  }
 * });
 * 
 * const App = React.createClass({
 *  getInitialState() {
 *    return { smShow: false, lgShow: false };
 *  },
 *  render() {
 *    let smClose = () => this.setState({ smShow: false });
 *    let lgClose = () => this.setState({ lgShow: false });
 * 
 *    return (
 *      <ButtonToolbar>
 *        <Button bsStyle="primary" onClick={()=>this.setState({ smShow: true })}>
 *          Launch small demo modal
 *        </Button>
 *        <Button bsStyle="primary" onClick={()=>this.setState({ lgShow: true })}>
 *          Launch large demo modal
 *        </Button>
 * 
 *        <MySmallModal show={this.state.smShow} onHide={smClose} />
 *        <MyLargeModal show={this.state.lgShow} onHide={lgClose} />
 *      </ButtonToolbar>
 *    );
 *  }
 * });
 * 
 * ReactDOM.render(<App/>, mountNode);
 * ```
 * 
 * &nbsp;
 * ## Sizing modals using custom CSS
 * You can apply custom css to the modal dialog div using the "dialogClassName" prop. Example is using a custom css class with width set to 90%.
 * ```js
 * const Example = React.createClass({
 *  getInitialState() {
 *    return {show: false};
 *  },
 * 
 *  showModal() {
 *    this.setState({show: true});
 *  },
 * 
 *  hideModal() {
 *    this.setState({show: false});
 *  },
 * 
 *  render() {
 *    return (
 *      <ButtonToolbar>
 *        <Button bsStyle="primary" onClick={this.showModal}>
 *          Launch demo modal
 *        </Button>
 * 
 *        <Modal
 *          {...this.props}
 *          show={this.state.show}
 *          onHide={this.hideModal}
 *          dialogClassName="custom-modal"
 *        >
 *          <Modal.Header closeButton>
 *            <Modal.Title id="contained-modal-title-lg">Modal heading</Modal.Title>
 *          </Modal.Header>
 *          <Modal.Body>
 *            <h4>Wrapped Text</h4>
 *            <p>Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde commodi aspernatur enim, consectetur. Cumque deleniti temporibus ipsam atque a dolores quisquam quisquam adipisci possimus laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod accusamus eos quod. Ab quos consequuntur eaque quo rem!
 *             Mollitia reiciendis porro quo magni incidunt dolore amet atque facilis ipsum deleniti rem! Dolores debitis voluptatibus ipsum dicta. Dolor quod amet ab sint esse distinctio tenetur. Veritatis laudantium quibusdam quidem corporis architecto veritatis. Ex facilis minima beatae sunt perspiciatis placeat. Quasi corporis
 *             odio eaque voluptatibus ratione magnam nulla? Amet cum maiores consequuntur totam dicta! Inventore adipisicing vel vero odio modi doloremque? Vitae porro impedit ea minima laboriosam quisquam neque. Perspiciatis omnis obcaecati consequatur sunt deleniti similique facilis sequi. Ipsum harum vitae modi reiciendis officiis.
 *             Quas laudantium laudantium modi corporis nihil provident consectetur omnis, natus nulla distinctio illum corporis. Sit ex earum odio ratione consequatur odit minus laborum? Eos? Sit ipsum illum architecto aspernatur perspiciatis error fuga illum, tempora harum earum, a dolores. Animi facilis inventore harum dolore accusamus
 *             fuga provident molestiae eum! Odit dicta error dolorem sunt reprehenderit. Sit similique iure quae obcaecati harum. Eum saepe fugit magnam dicta aliquam? Sapiente possimus aliquam fugiat officia culpa sint! Beatae voluptates voluptatem excepturi molestiae alias in tenetur beatae placeat architecto. Sit possimus rerum
 *             fugiat sapiente aspernatur. Necessitatibus tempora animi dicta perspiciatis tempora a velit in! Doloribus perspiciatis doloribus suscipit nam earum. Deleniti veritatis eaque totam assumenda fuga sapiente! Id recusandae. Consectetur necessitatibus eaque velit nobis aliquid? Fugit illum qui suscipit aspernatur alias ipsum
 *             repudiandae! Quia omnis quisquam dignissimos a mollitia. Suscipit aspernatur eum maiores repellendus ipsum doloribus alias voluptatum consequatur. Consectetur quibusdam veniam quas tenetur necessitatibus repudiandae? Rem optio vel alias neque optio sapiente quidem similique reiciendis tempore. Illum accusamus officia
 *             cum enim minima eligendi consectetur nemo veritatis nam nisi! Adipisicing nobis perspiciatis dolorum adipisci soluta architecto doloremque voluptatibus omnis debitis quas repellendus. Consequuntur assumenda illum commodi mollitia asperiores? Quis aspernatur consequatur modi veritatis aliquid at? Atque vel iure quos.
 *             Amet provident voluptatem amet aliquam deserunt sint, elit dolorem ipsa, voluptas? Quos esse facilis neque nihil sequi non? Voluptates rem ab quae dicta culpa dolorum sed atque molestias debitis omnis! Sit sint repellendus deleniti officiis distinctio. Impedit vel quos harum doloribus corporis. Laborum ullam nemo quaerat
 *             reiciendis recusandae minima dicta molestias rerum. Voluptas et ut omnis est ipsum accusamus harum. Amet exercitationem quasi velit inventore neque doloremque! Consequatur neque dolorem vel impedit sunt voluptate. Amet quo amet magni exercitationem libero recusandae possimus pariatur. Cumque eum blanditiis vel vitae
 *             distinctio! Tempora! Consectetur sit eligendi neque sunt soluta laudantium natus qui aperiam quisquam consectetur consequatur sit sint a unde et. At voluptas ut officiis esse totam quasi dolorem! Hic deserunt doloribus repudiandae! Lorem quod ab nostrum asperiores aliquam ab id consequatur, expedita? Tempora quaerat
 *             ex ea temporibus in tempore voluptates cumque. Quidem nam dolor reiciendis qui dolor assumenda ipsam veritatis quasi. Esse! Sit consectetur hic et sunt iste! Accusantium atque elit voluptate asperiores corrupti temporibus mollitia! Placeat soluta odio ad blanditiis nisi. Eius reiciendis id quos dolorum eaque suscipit
 *             magni delectus maxime. Sit odit provident vel magnam quod. Possimus eligendi non corrupti tenetur culpa accusantium quod quis. Voluptatum quaerat animi dolore maiores molestias voluptate? Necessitatibus illo omnis laborum hic enim minima! Similique. Dolor voluptatum reprehenderit nihil adipisci aperiam voluptatem soluta
 *             magnam accusamus iste incidunt tempore consequatur illo illo odit. Asperiores nesciunt iusto nemo animi ratione. Sunt odit similique doloribus temporibus reiciendis! Ullam. Dolor dolores veniam animi sequi dolores molestias voluptatem iure velit. Elit dolore quaerat incidunt enim aut distinctio. Ratione molestiae laboriosam
 *             similique laboriosam eum et nemo expedita. Consequuntur perspiciatis cumque dolorem.</p>
 *          </Modal.Body>
 *          <Modal.Footer>
 *            <Button onClick={this.hideModal}>Close</Button>
 *          </Modal.Footer>
 *        </Modal>
 *      </ButtonToolbar>
 *    );
 *  }
 * });
 * 
 * ReactDOM.render(<Example/>, mountNode);
 * ```
 * 
 * @property {elementType} dialogComponentClass	- A Component type that provides the modal content Markup. This is a useful prop when you want to use your own styles and markup to create a custom modal component. Default is `ModalDialog`.
 * @property {string} bsClass - Base CSS class and prefix for the component. Generally one should only change `bsClass` to provide new, non-Bootstrap, CSS styles for a component. Default is `modal`.
 * @property {'lg'|'large'|'sm'|'small'} bsSize - Component size variations.
 */
class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleEntering = this.handleEntering.bind(this);
    this.handleExited = this.handleExited.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);

    this.state = {
      style: {},
    };
  }

  getChildContext() {
    return {
      $bs_modal: {
        onHide: this.props.onHide,
      },
    };
  }

  componentWillUnmount() {
    // Clean up the listener if we need to.
    this.handleExited();
  }

  handleEntering() {
    // FIXME: This should work even when animation is disabled.
    events.on(window, 'resize', this.handleWindowResize);
    this.updateStyle();
  }

  handleExited() {
    // FIXME: This should work even when animation is disabled.
    events.off(window, 'resize', this.handleWindowResize);
  }

  handleWindowResize() {
    this.updateStyle();
  }

  handleDialogClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onHide();
  }

  updateStyle() {
    if (!canUseDOM) {
      return;
    }

    const dialogNode = this._modal.getDialogElement();
    const dialogHeight = dialogNode.scrollHeight;

    const document = ownerDocument(dialogNode);
    const bodyIsOverflowing = isOverflowing(
      ReactDOM.findDOMNode(this.props.container || document.body)
    );
    const modalIsOverflowing =
      dialogHeight > document.documentElement.clientHeight;

    this.setState({
      style: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ?
          getScrollbarSize() : undefined,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ?
          getScrollbarSize() : undefined
      }
    });
  }

  render() {
    const {
      backdrop,
      backdropClassName,
      animation,
      show,
      dialogComponentClass: Dialog,
      className,
      style,
      children, // Just in case this get added to BaseModal propTypes.
      onEntering,
      onExited,
      ...props
    } = this.props;

    const [baseModalProps, dialogProps] =
      splitComponentProps(props, BaseModal);

    const inClassName = show && !animation && 'in';

    return (
      <BaseModal
        {...baseModalProps}
        ref={c => { this._modal = c; }}
        show={show}
        onEntering={createChainedFunction(onEntering, this.handleEntering)}
        onExited={createChainedFunction(onExited, this.handleExited)}
        backdrop={backdrop}
        backdropClassName={classNames(prefix(props, 'backdrop'), backdropClassName, inClassName)}
        containerClassName={prefix(props, 'open')}
        transition={animation ? Fade : undefined}
        dialogTransitionTimeout={Modal.TRANSITION_DURATION}
        backdropTransitionTimeout={Modal.BACKDROP_TRANSITION_DURATION}
      >
        <Dialog
          {...dialogProps}
          style={{ ...this.state.style, ...style }}
          className={classNames(className, inClassName)}
          onClick={backdrop === true ? this.handleDialogClick : null}
        >
          {children}
        </Dialog>
      </BaseModal>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
Modal.childContextTypes = childContextTypes;

Modal.Body = Body;
Modal.Header = Header;
Modal.Title = Title;
Modal.Footer = Footer;

Modal.Dialog = ModalDialog;

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

export default bsClass('modal',
  bsSizes([Size.LARGE, Size.SMALL], Modal)
);
