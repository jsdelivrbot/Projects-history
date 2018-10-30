import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  prodCatDeleteRequest,
  prodCatSaveRequest
} from 'redux-base/actions';
import { Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { ConnectedTopFormModal } from 'components';
import { Tree, Dropdown, Button, Icon, Menu, Input } from 'antd';
import classnames from 'classnames';
import fields from './modalFields';
import { highlight, treeNode } from './ProductCategories.scss';

const { TreeNode } = Tree;
const { Search } = Input;

const mapStateToProps = state => ({
  loadingPage: state.productCategories.loadingPage,
  needReloadProductCategories: state.productCategories.needReloadProductCategories,
  productCategories: state.productCategories.data
});

const mapDispatchToProps = {
  prodCatDeleteRequest,
  prodCatSaveRequest
};

const newCategory = {
  name: ''
};

export class ProductsTree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalData: newCategory,
      searchText: '',
      autoExpandParent: true,
      expandedKeys: [],
      nodesList: []
    };
  }


  componentWillMount() {
    const nodesList = [];
    this.getNodesList(this.props.productCategories, nodesList);

    this.setState({
      nodesList
    });
  }

  componentWillReceiveProps(nextProps) {
    const nodesList = [];
    this.getNodesList(nextProps.productCategories, nodesList);

    if (nextProps.needReloadProductCategories) {
      this.setState({
        modalVisible: false,
        modalData: undefined
      });
    }

    if (this.state.nodesList.length !== nodesList.length) {
      this.setState({
        modalVisible: false,
        modalData: {},
        nodesList
      });
    }
  }

  getNodesList = (nodes, result) => {
    nodes.forEach((node) => {
      const { name, children } = node;

      result.push({ name, title: name });

      if (children) {
        this.getNodesList(children, result);
      }
    });
  }

  // helpers
  getParentKey = (nodeName, nodes) => {
    let parentKey;
    if (nodes) {
      nodes.forEach((node) => {
        if (node.children && node.children.some(cnode => cnode.name === nodeName)) {
          parentKey = node.name;
        } else if (this.getParentKey(nodeName, node.children)) {
          parentKey = this.getParentKey(nodeName, node.children);
        }
      });
    }
    return parentKey;
  };

  getMenu = ({
    id,
    parentId,
    showAddSibling = false
  }) => (
    <Menu onClick={ this.handleMenuClick }>
      { showAddSibling &&
        <Menu.Item activeKey={ { action: 'addSibling', parentId } }>Add Sibling</Menu.Item>
      }
      <Menu.Item activeKey={ { action: 'addChild', id } }>Add Child</Menu.Item>
      <Menu.Item activeKey={ { action: 'delete', id } }>Delete</Menu.Item>
    </Menu>
  );

  getDropdown = (title, menu, highlightText = false) => (
    <Dropdown
      overlay={ menu }
    >
      <Button className={ classnames({ [highlight]: highlightText }) }>
        { title } <Icon type="down" />
      </Button>
    </Dropdown>
  );

  getTreeNodes = (nodes, parentId, searchText) => (
    nodes.map((node) => {
      // Matches searched text with categories to highlight them.
      const highlightText = searchText && node.name.toLowerCase().includes(searchText.toLowerCase());

      if (node.children) {
        return (
          <TreeNode
            className={ treeNode }
            key={ node.name }
            title={
              this.getDropdown(
                node.name,
                this.getMenu({
                  id: node.id,
                  parentId,
                  showAddSibling: true
                }),
                highlightText
              )
            }
          >
            { this.getTreeNodes(node.children, node.id, searchText) }
          </TreeNode>
        );
      }
      return (
        <TreeNode
          className={ treeNode }
          key={ node.name }
          title={
            this.getDropdown(
              node.name,
              this.getMenu({
                id: node.id,
                parentId,
                showAddSibling: true
              }),
              highlightText
            )
          }
        />
      );
    })
  )

  handleToggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      modalData: newCategory,
    });
  }

  handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();

    // get list of tree nodes to expand.
    const expandedKeys = [];
    this.state.nodesList.forEach((node) => {
      if (node.name.toLowerCase().includes(searchText.toLowerCase())) {
        const expandedKey = this.getParentKey(node.name, this.props.productCategories);
        if (expandedKey) expandedKeys.push(expandedKey);
      }
    });

    this.setState({
      expandedKeys,
      searchText,
      autoExpandParent: true
    });
  }

  handleTreeNodeExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  handleMenuClick = ({ item: { props: { activeKey } } }) => {
    switch (activeKey.action) {
      case 'addSibling':
        this.handleSetParentIdForModalData(activeKey.parentId);
        break;
      case 'addChild':
        this.handleSetParentIdForModalData(activeKey.id);
        break;
      case 'delete':
        this.handleDeleteCategory(activeKey.id);
        break;
      default:
        break;
    }
  }

  handleSetParentIdForModalData = (id) => {
    this.setState({
      modalVisible: true,
      modalData: {
        parentId: id,
        name: ''
      }
    });
  }

  handleDeleteCategory = (id) => {
    this.props.prodCatDeleteRequest({ id });
  }

  handleSaveCaterogy = (values) => {
    this.props.prodCatSaveRequest({
      payload: values
    });
  }

  render() {
    const {
      modalData,
      modalVisible,
      expandedKeys,
      searchText,
      autoExpandParent
    } = this.state;

    const {
      loadingPage,
      productCategories
    } = this.props;

    return (
      <div>
        <ConnectedTopFormModal
          loading={ loadingPage }
          title="New Category"
          buttonVisible={ false }
          handleToggleModal={ this.handleToggleModal }
          handleSave={ this.handleSaveCaterogy }
          visible={ modalVisible }
          initialValues={ modalData }
          fields={ fields() }
        />
        <Row>
          <Col xs={ 3 }>
            <Search
              placeholder="Search"
              onChange={ this.handleSearchChange }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Tree
              showLine
              onExpand={ this.handleTreeNodeExpand }
              expandedKeys={ expandedKeys }
              autoExpandParent={ autoExpandParent }
            >
              { this.getTreeNodes(productCategories, 0, searchText) }
            </Tree>
          </Col>
        </Row>
      </div>
    );
  }
}

ProductsTree.propTypes = {
  // triggers
  loadingPage: PropTypes.bool.isRequired,
  needReloadProductCategories: PropTypes.bool.isRequired,
  // data
  productCategories: PropTypes.array.isRequired,
  // redux-base
  prodCatDeleteRequest: PropTypes.func.isRequired,
  prodCatSaveRequest: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsTree);
