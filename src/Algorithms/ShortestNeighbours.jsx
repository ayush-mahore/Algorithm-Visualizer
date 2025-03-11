

function getNodesInShortestPathInOrder(finishNode) {
    const nodesInShortestPathOrder = [];

    let currentNode = finishNode;

    while (currentNode !== null) {
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }

    return nodesInShortestPathOrder;
}

export default getNodesInShortestPathInOrder