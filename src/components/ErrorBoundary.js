import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary capturou um erro:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2>Ocorreu um erro. Por favor, tente novamente mais tarde.</h2>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;