# BiteSpeed Chatbot Flow Builder

A responsive and interactive flow builder for creating chatbot conversation flows, built with React, TypeScript, and React Flow. This application allows you to visually design and manage chatbot conversation paths with an intuitive drag-and-drop interface.


## Features

### Core Functionality
- **Text Node Support**: Add and customize text message nodes in your flow
- **Visual Flow Builder**: Intuitive drag-and-drop interface for building conversation paths
- **Node Management**: Add nodes by dragging from the panel, edit content in the settings panel, and delete nodes using the delete key or right-click menu
- **Connection Validation**: Ensures proper flow structure with validation rules

### User Interface
- **Responsive Design**: Works seamlessly across desktop and tablet devices
- **Real-time Editing**: Edit node content with immediate preview
- **Clean, Modern UI**: Professional interface with smooth animations
- **Contextual Settings**: Side panel updates based on selected node

### Validation & Error Handling
- **Save Validation**: Prevents saving invalid flows
- **Connection Rules**: 
  - One outgoing connection per node
  - Multiple incoming connections allowed
- **Error Feedback**: Clear indicators for connection issues

### Technical Features
- **Built with React 18 & TypeScript**
- **State Management**: React Context API
- **Styling**: Material-UI with custom theme
- **Flow Management**: React Flow for node-based editing
- **Responsive Design**: Adapts to different screen sizes

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm (v8 or later) or yarn (v1.22 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Pichikachandu/Chatbot-flow-builder.git
   cd Chatbot-flow-builder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to access the application.

## 🛠️ Available Scripts

In the project directory, you can run:

- `npm start` or `yarn start` - Runs the app in development mode
- `npm test` or `yarn test` - Launches the test runner
- `npm run build` or `yarn build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (use with caution)

## 🎮 Usage Guide

### Building a Flow

1. **Add a Node**:
   - Click and drag the "Message" node from the left panel onto the canvas
   - Drop it in your desired location

2. **Edit Node Content**:
   - Click on a node to select it
   - Edit the message text in the settings panel on the right
   - Changes are saved automatically

3. **Create Connections**:
   - Hover over a node to see connection handles
   - Click and drag from the right handle (source) to another node's left handle (target)
   - Only one outgoing connection is allowed per node

4. **Delete Elements**:
   - Select a node or connection and press the Delete key
   - Or right-click and select "Delete"

### Saving Your Work
- Click the "Save" button in the top-right corner
- The system will validate your flow before saving
- If there are validation errors, they will be displayed

## 🧩 Extending the Application

### Adding New Node Types
1. Create a new component in `src/components/FlowBuilder/Nodes/`
2. Add the node type to `nodeTypes` in `FlowBuilder.tsx`
3. Update the NodesPanel to include your new node type

### Custom Styling
- Theme variables are defined in `src/theme.ts`
- Component-specific styles are co-located with their components
- Uses Material-UI's styled components API

## 🧪 Testing

Run the test suite with:
```bash
npm test
# or
yarn test
```

## 🚀 Deployment

### Building for Production
```bash
npm run build
# or
yarn build
```

### Deploying to Vercel
1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure the build settings (uses standard Create React App settings)
4. Deploy!

## 📝 License

This project is licensed under the MIT License.
   - Drag a "Message" node from the left panel onto the canvas

2. **Connect Nodes**:
   - Click and drag from the handle (circle) on the right side of a node to another node's left handle

3. **Edit Node Content**:
   - Click on a node to select it
   - Edit the message text in the right panel

4. **Save Flow**:
   - Click the "Save Changes" button in the top-right corner
   - The flow will be validated before saving

## Project Structure

```
src/
  ├── components/
  │   └── FlowBuilder/
  │       ├── FlowBuilder.tsx      # Main flow builder component
  │       ├── NodesPanel.tsx       # Panel with available node types
  │       ├── SettingsPanel.tsx    # Panel for editing node properties
  │       └── Nodes/
  │           └── TextMessageNode.tsx  # Text message node component
  ├── App.tsx                     # Main App component
  └── index.tsx                   # Entry point
```

## Built With

- [React](https://reactjs.org/) - JavaScript library for building user interfaces
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [React Flow](https://reactflow.dev/) - Library for building node-based editors and interactive diagrams
- [Material-UI](https://mui.com/) - React UI component library

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Development Scripts

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

Ejects the app from Create React App, giving you full control over the configuration.

## Learn More

- [React Documentation](https://reactjs.org/)
- [React Flow Documentation](https://reactflow.dev/docs/)
- [Material-UI Documentation](https://mui.com/material-ui/getting-started/overview/)
