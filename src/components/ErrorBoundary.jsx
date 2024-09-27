// ErrorBoundary.jsx
import React from 'react';
import Error from './Error';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <Error message={"Something went wrong. Please try again later"}/>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
