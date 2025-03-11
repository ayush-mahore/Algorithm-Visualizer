import { useEffect, useState } from 'react';
import './AlgorithmVisualizer.css'
import Node from '../Node/Node';
import Dijkstra from '../../Algorithms/dijkstra';
import getNodesInShortestPathInOrder from '../../Algorithms/ShortestNeighbours';


function AlgorithmVisualizer() {

    // ------------------ Constants ------------------------------------------

    const START_NODE_ROW = 10;
    const START_NODE_COL = 15;
    const FINISH_NODE_ROW = 10;
    const FINISH_NODE_COL = 35;

    // ------------------ State Variables ------------------------------------

    const [grid, setGrid] = useState([]);
    const [isMousePressed, setIsMousePressed] = useState(false);


    // ------------------ Funtions -------------------------------------------

    //Function to create node for every cell
    function createNode(row, col) {
        return {
            row,
            col,
            isStart: row == START_NODE_ROW && col == START_NODE_COL,
            isFinish: row == FINISH_NODE_ROW && col == FINISH_NODE_COL,
            distance: Infinity,
            isVisited: false,
            isWall: false,
            previousNode: null
        }
    }


    // Funtion to get initial state of the maze
    function getInitialMaze() {
        const maze = [];
        for(let row = 0; row < 20; row++){
            const currentRow = [];
            for(let col = 0; col < 50; col++){
                currentRow.push(createNode(row, col));
            }
            maze.push(currentRow);
        }
        return maze;
    }

    // ------------ Funtions to handle mouse movement --------------------------

    function handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
        setIsMousePressed(true);
      }
    
    function handleMouseEnter(row, col) {
        if (!isMousePressed) return;
        const newGrid = getNewGridWithWallToggled(grid, row, col);
        setGrid(newGrid);
      }
    
    function handleMouseUp() {
        setIsMousePressed(false);
      }

    function getNewGridWithWallToggled(grid, row, col) {
        const newGrid = grid.slice();
        const node = newGrid[row][col];
        const newNode = {
            ...node,
            isWall: !node.isWall,
        };
        newGrid[row][col] = newNode;
        return newGrid;
      }


    // ----------- Vizualization functions ------------------------------------

    //Actual Visualization 
    function visualizeAlgorithm() {

        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = Dijkstra(grid, startNode, finishNode);
        const shortestPathNodesInOrder = getNodesInShortestPathInOrder(finishNode);
        animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder);
    }

    // Animation of all the nodes visited to find shortest path
    function animateAlgorithm(visitedNodesInOrder, shortestPathNodesInOrder){
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
            if (i === visitedNodesInOrder.length) {
              setTimeout(() => {
                animateShortestPath(shortestPathNodesInOrder);
              }, 10 * i);
              return;
            }
            setTimeout(() => {
              const node = visitedNodesInOrder[i];
              document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-visited';
            }, 10 * i);
        }
    }

    // Animation for the shortest path
    function animateShortestPath(shortestPathNodesInOrder) {
        for (let i = 0; i < shortestPathNodesInOrder.length; i++) {
            setTimeout(() => {
                const node = shortestPathNodesInOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                'node node-shortest-path';
            }, 50 * i);
        }
    }

    // ------------------ After component mounting ----------------------------

    useEffect(() => {
        const initialMaze = getInitialMaze();
        setGrid(initialMaze);
    }, [])


    // ------------------- Component --------------------------------------------

    return (
        <>

            <button onClick={visualizeAlgorithm}>
                Visualize !
            </button>

            <div className='grid'>
                {
                    grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {
                                    row.map((node, nodeIdx) => {
                                        const {row, col, isStart, isFinish, isWall} = node
                                        return (
                                            <Node 
                                                key = {nodeIdx}
                                                col = {col}
                                                isStart = {isStart}
                                                isFinish = {isFinish}
                                                isWall = {isWall}
                                                mouseIsPressed = {isMousePressed}
                                                onMouseDown =  {() => handleMouseDown(row, col)}
                                                onMouseEnter = { () => handleMouseEnter(row, col)}
                                                onMouseUp = {handleMouseUp}
                                                row = {row}
                                            />
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default AlgorithmVisualizer;