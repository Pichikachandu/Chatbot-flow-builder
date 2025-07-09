import { useCallback, useState, useRef, ReactNode } from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import { BezierEdge, SmoothStepEdge, StepEdge, StraightEdge, Node as FlowNode } from 'reactflow';
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Node,
  Edge,
  NodeTypes as FlowNodeTypes,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ReactFlowInstance,
  MarkerType,
  ConnectionLineType,
  useReactFlow,
  NodeChange,
  EdgeChange,
  OnConnect,
  OnNodesChange,
  OnEdgesChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import NodesPanel from './NodesPanel';
import { SettingsPanel } from './SettingsPanel';
import TextMessageNode from './Nodes/TextMessageNode';
import { Notification, useNotification } from '../common/Notification';

// Define node and edge types
const nodeTypes: FlowNodeTypes = {
  textMessage: TextMessageNode,
};

const edgeTypes = {
  default: SmoothStepEdge,
  smoothstep: SmoothStepEdge,
  step: StepEdge,
  straight: StraightEdge,
  bezier: BezierEdge,
};

// Define initial nodes and edges
const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const FlowBuilderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
  '& *': {
    boxSizing: 'border-box',
  },
  // Edge styles
  '& .react-flow__edge-path': {
    stroke: '#94A3B8',
    strokeWidth: 2,
    strokeDasharray: '0',
  },
  '& .react-flow__edge.selected .react-flow__edge-path': {
    stroke: '#6366F1',
    strokeWidth: 2,
  },
  '& .react-flow__edge.selected .react-flow__edge-interaction': {
    stroke: '#6366F1',
    strokeWidth: 20,
    opacity: 0.1,
  },
  '& .react-flow__edge-updater': {
    cursor: 'default',
    pointerEvents: 'all',
    fill: '#FFFFFF',
    stroke: '#94A3B8',
    strokeWidth: 1,
    r: 6,
  },
  '& .react-flow__handle': {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#4F46E5',
    border: '2px solid white',
    boxShadow: '0 0 0 2px rgba(79, 70, 229, 0.3)',
  },
  '& .react-flow__handle-top': {
    top: '-8px',
  },
  '& .react-flow__handle-bottom': {
    bottom: '-8px',
  },
  '& .react-flow__handle-connecting': {
    backgroundColor: '#ef4444',
  },
  '& .react-flow__handle-valid': {
    backgroundColor: '#10B981',
  },
}));

// Header removed as it's now handled by MainLayout

const RightSidebar = styled(Box)({
  width: '320px',
  backgroundColor: 'white',
  borderLeft: '1px solid #e2e8f0',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  zIndex: 5,
  boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.04)',
});

const PanelContainer = styled(Box)({
  flex: 1,
  overflowY: 'auto',
  padding: '20px',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#f1f1f1',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#c7d2fe',
    borderRadius: '3px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#a5b4fc',
  },
});

const Content = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  position: 'relative',
  height: '100%',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

const FlowArea = styled(Box)(({ theme }) => ({
  flex: 1,
  position: 'relative',
  height: '100%',
  backgroundColor: '#f8fafc',
  '& .react-flow__container': {
    height: '100%',
  },
  '& .react-flow__background': {
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
    backgroundColor: '#f8fafc',
  },
  '& .react-flow__edge-path': {
    stroke: '#4b5563',
    strokeWidth: 2,
  },
  '& .react-flow__edge.selected .react-flow__edge-path': {
    stroke: '#3b82f6',
    strokeWidth: 2.5,
  },
  '& .react-flow__edge.animated path': {
    strokeDasharray: '5 5',
    animation: 'dashdraw 0.5s linear infinite',
  },
  '@keyframes dashdraw': {
    '0%': { strokeDashoffset: 10 },
    '100%': { strokeDashoffset: 0 },
  },
  '& .react-flow__controls': {
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '6px',
    overflow: 'hidden',
    '& button': {
      backgroundColor: 'white',
      borderBottom: `1px solid ${theme.palette.divider}`,
      color: theme.palette.text.secondary,
      minWidth: '32px',
      minHeight: '32px',
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '& svg': {
        width: '16px',
        height: '16px',
      },
      '&:last-child': {
        borderBottom: 'none',
      },
      '&[title^="Fit"]': {
        borderBottom: `1px solid ${theme.palette.divider}`,
      },
      '&[title^="Zoom in"], &[title^="Zoom out"]': {
        borderBottom: 'none',
      },
    },
  },
  '& .react-flow__controls-button': {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.secondary,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '& svg': {
      width: 16,
      height: 16,
    },
  },
  '& .react-flow__controls-button:last-child': {
    borderBottom: 'none',
  },
  '& .react-flow__handle': {
    width: '10px',
    height: '10px',
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.background.paper,
  },
  '& .react-flow__handle-top': {
    top: '-6px',
  },
  '& .react-flow__handle-bottom': {
    bottom: '-6px',
  },
}));

const SaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  textTransform: 'none',
  padding: '6px 16px',
  borderRadius: '4px',
  fontWeight: 500,
  fontSize: '0.8125rem',
  height: '32px',
  minWidth: '120px',
  boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  '&.Mui-disabled': {
    background: '#E5E7EB',
    color: '#9CA3AF',
  },
  '& .MuiButton-startIcon': {
    marginRight: '8px',
    '& svg': {
      width: '16px',
      height: '16px',
    }
  },
}));

const FlowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<FlowNode | null>(null);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const { showNotification } = useNotification();
  
  // Type the node and edge change handlers
  const onNodesChangeHandler: OnNodesChange = useCallback(
    (changes: NodeChange[]) => onNodesChange(changes),
    [onNodesChange]
  );

  const onEdgesChangeHandler: OnEdgesChange = useCallback(
    (changes: EdgeChange[]) => onEdgesChange(changes),
    [onEdgesChange]
  );

  const onConnectHandler: OnConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges]
  );

  // Custom edge options
  const edgeOptions = {
    type: 'smoothstep',
    style: {
      stroke: '#94A3B8',
      strokeWidth: 2,
      transition: 'stroke 0.2s ease',
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: '#94A3B8',
      width: 12,
      height: 12,
    },
    animated: false,
  };

  // Node and edge change handlers are now provided by useNodesState and useEdgesState

  // Handle connection between nodes
  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, [setEdges]);

  // Handle node click
  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Handle pane click to deselect nodes
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  // Handle initialization of ReactFlow instance
  const onInit = useCallback((instance: ReactFlowInstance) => {
    setReactFlowInstance(instance);
  }, []);

  // Handle drag over event
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle drop event
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      // Get the dropped element type
      const type = event.dataTransfer.getData('application/reactflow');

      // Check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Get the position where the node was dropped
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      // Create a new node
      const newNode: Node = {
        id: `node-${Date.now()}`,
        type,
        position,
        data: { label: 'New message' },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Handle saving the flow
  const handleSave = useCallback(() => {
    // Check if there are no nodes
      if (nodes.length === 0) {
        showNotification(
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                backgroundColor: '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#DC2626"/>
                  <path d="M11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="#DC2626"/>
                </svg>
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#DC2626' }}>Cannot save flow</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#6B7280', pl: '28px' }}>
              Please add at least one node to the flow before saving.
            </Typography>
          </Box>,
          'error'
        );
        return;
      }

      // Check for nodes with no incoming edges (except the first node)
      const nodesWithNoIncomingEdges = nodes.filter(
        (node) => !edges.some((edge) => edge.target === node.id)
      );

      // If there's more than one node with no incoming edges, it's an invalid flow
      if (nodes.length > 1 && nodesWithNoIncomingEdges.length > 1) {
        showNotification(
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                backgroundColor: '#FEE2E2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="#DC2626"/>
                  <path d="M11 7H13V13H11V7ZM11 15H13V17H11V15Z" fill="#DC2626"/>
                </svg>
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#DC2626' }}>Cannot save flow</Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#6B7280', pl: '28px' }}>
              Invalid flow detected. Please ensure all nodes are properly connected with only one entry point.
            </Typography>
          </Box>,
          'error'
        );
        return;
      }

      try {
        // In a real app, this would be an API call
        const flowData = {
          nodes: nodes.map(node => ({
            id: node.id,
            type: node.type,
            position: node.position,
            data: node.data
          })),
          edges: edges.map(edge => ({
            id: edge.id,
            source: edge.source,
            target: edge.target,
            type: edge.type
          }))
        };
        
        console.log('Flow saved:', flowData);
        
        // Show success message
        showNotification(
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                backgroundColor: '#D1FAE5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#10B981"/>
                </svg>
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#10B981' }}>Flow saved successfully!</Typography>
            </Box>
          </Box>,
          'success'
        );
        
        // You can add additional logic here to handle the saved flow data
        // For example, sending it to an API or updating the application state
        
      } catch (error) {
        console.error('Failed to save flow:', error);
        showNotification('Failed to save changes. Please try again.', 'error');
      }
  }, [nodes, edges, showNotification]);



  return (
    <FlowBuilderContainer>
      <Box sx={{
        position: 'fixed',
        top: '16px',
        right: 'calc(320px + 32px)', // Account for right sidebar width + padding
        zIndex: 1200, // Above most other elements
        display: 'flex',
        height: '40px', // Match the header height
        backgroundColor: 'background.paper',
        padding: '0 16px',
        borderRadius: '6px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        border: '1px solid',
        borderColor: 'divider',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.2s ease'
      }}>
        <SaveButton 
          variant="contained" 
          onClick={handleSave}
          startIcon={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V7L17 3ZM12 19C10.34 19 9 17.66 9 16C9 14.34 10.34 13 12 13C13.66 13 15 14.34 15 16C15 17.66 13.66 19 12 19ZM15 9H5V5H15V9Z" fill="white"/>
            </svg>
          }
        >
          Save Changes
        </SaveButton>
      </Box>
      <Content>
        <FlowArea 
          onDragOver={onDragOver}
          onDrop={onDrop}
          ref={reactFlowWrapper}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onInit={(instance) => {
              setReactFlowInstance(instance);
              // Fit view after initialization
              setTimeout(() => {
                instance.fitView({ padding: 0.2 });
              }, 0);
            }}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            fitView
            nodesDraggable
            nodesConnectable
            panOnScroll
            zoomOnScroll
            zoomOnPinch
            panOnDrag={[0, 1]}
            defaultEdgeOptions={{
              type: 'smoothstep',
              style: {
                stroke: '#4b5563',
                strokeWidth: 2,
              },
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#4b5563',
                width: 14,
                height: 14,
              },
              animated: true,
            }}
            connectionLineStyle={{
              stroke: '#4b5563',
              strokeWidth: 2,
            }}
            nodeExtent={[
              [0, 0],
              [10000, 10000],
            ]}
          >
            <Background 
              variant={BackgroundVariant.Cross}
              gap={20}
              size={1}
              color="#e2e8f0"
              style={{ backgroundColor: '#f8fafc' }}
              className="react-flow__background"
            />
            <Controls 
              position="top-right"
              style={{
                right: 20,
                top: '500px', // Positioned lower below the header
                backgroundColor: 'white',
                borderRadius: '4px',
                border: '1px solid #e2e8f0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              }}
              className="react-flow__controls"
            />
          </ReactFlow>
        </FlowArea>
        <RightSidebar>
          <PanelContainer>
            {selectedNode ? (
              <SettingsPanel 
                selectedNode={selectedNode} 
                setNodes={setNodes} 
                onBack={() => setSelectedNode(null)} 
              />
            ) : (
              <NodesPanel />
            )}
          </PanelContainer>
        </RightSidebar>
      </Content>
      
      {/* Notification is handled by the useNotification hook */}
    </FlowBuilderContainer>
  );
};

export default FlowBuilder;
