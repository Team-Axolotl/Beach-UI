import { find, findIndex } from 'lodash';
import { swap } from '../../helpers/utils';

const _parseNode = ({ tree, node }) => {
    const children = node.children.map((child) => {
        const childNode = find(tree, { id: child });
        return _parseNode({ tree, node: childNode });
    });

    node.children = children;
    return node;
};

const _deleteChildNodes = ({ node, tree }) => {
    if (node.children.length) {
        node.children.forEach((childNode) => {
            tree = _deleteChildNodes({ node: find(tree, { id: childNode }), tree });
        });
    }

    return tree.filter(treeNode => treeNode.id !== node.id);
};

const _searchTree = ({ node, filter }) => {
    if (node.name.toLowerCase().indexOf(filter) !== -1) {
        return node;
    } else if (node.children.length) {
        let result = null;

        for (let i = 0; result === null && i < node.children.length; i += 1) {
            result = _searchTree({ node: node.children[i], filter });
        }

        return result;
    }

    return null;
};

export const mapMenuItems = (items) => {
    return items.map((item) => {
        return Object.assign({}, item, {
            params: {
                ...item.params,
                action: 'add'
            }
        });
    });
};

export const addTreeNode = ({ tree, node }) => {
    let treeCopy = JSON.parse(JSON.stringify(tree));
    const parent = find(treeCopy, { id: node.parentId });
    treeCopy = treeCopy.concat([node]);

    if (parent) {
        const parentIndex = findIndex(treeCopy, { id: parent.id });
        treeCopy[parentIndex].children = parent.children.concat([node.id]);
    }

    return treeCopy;
};

export const deleteTreeNode = ({ tree, node }) => {
    const treeCopy = JSON.parse(JSON.stringify(tree));
    const selected = find(treeCopy, { id: node.id });
    const parentIndex = selected.parentId === null ? selected.parentId : findIndex(treeCopy, { id: selected.parentId });

    if (parentIndex !== null) {
        treeCopy[parentIndex].children.splice(treeCopy[parentIndex].children.indexOf(selected.id), 1);
    }

    return _deleteChildNodes({ node: selected, tree: treeCopy });
};

export const moveTreeNode = ({ tree, node, direction }) => {
    const newTree = JSON.parse(JSON.stringify(tree));
    const siblings = node.parentId ? find(newTree, { id: node.parentId }).children : newTree.filter(treeNode => treeNode.parentId === node.parentId);
    const currentIndex = node.parentId ? siblings.indexOf(node.id) : findIndex(siblings, { id: node.id });
    let newIndex = currentIndex;

    if (direction === 1 && currentIndex + 1 <= siblings.length - 1) {
        newIndex = node.parentId ? currentIndex + 1 : findIndex(newTree, { id: siblings[currentIndex + 1].id });
    }

    if (direction === -1 && currentIndex - 1 >= 0) {
        newIndex = node.parentId ? currentIndex - 1 : findIndex(newTree, { id: siblings[currentIndex - 1].id });
    }

    if (newIndex !== currentIndex) {
        swap({
            list: node.parentId ? siblings : newTree,
            first: node.parentId ? currentIndex : findIndex(newTree, { id: node.id }),
            second: newIndex
        });

        return newTree;
    }

    return tree;
};

export const buildTree = (tree) => {
    const treeCopy = JSON.parse(JSON.stringify(tree));

    return treeCopy.filter((node) => {
        if (node.parentId === null) {
            node = _parseNode({ tree: treeCopy, node });
            return node;
        }
        return false;
    });
};

export const filterTree = ({ tree, filter }) => {
    const searchResult = [];

    tree.forEach((node) => {
        const result = _searchTree({ node, filter: filter.toLowerCase() });
        if (result) {
            searchResult.push(result);
        }
    });

    return searchResult;
};