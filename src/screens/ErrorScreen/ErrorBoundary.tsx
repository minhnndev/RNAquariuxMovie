import React, {Component, ErrorInfo, ReactNode} from 'react';
import {ErrorDetails} from './ErrorDetails';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state = {error: null, errorInfo: null};

  // If an error in a child is encountered, this will run
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });

    // You can also log error messages to an error reporting service here
    // This is a great place to put BugSnag, Sentry, crashlytics, etc:
    // reportCrash(error)
  }

  // Reset the error back to null
  resetError = () => {
    this.setState({error: null, errorInfo: null});
  };

  // To avoid unnecessary re-renders
  shouldComponentUpdate(
    nextProps: Readonly<Props>,
    nextState: Readonly<State>,
  ): boolean {
    return nextState.error !== this.state.error;
  }

  // Render an error UI if there's an error; otherwise, render children
  render() {
    return this.state.error ? (
      <ErrorDetails
        onReset={this.resetError}
        error={this.state.error}
        errorInfo={this.state.errorInfo}
      />
    ) : (
      this.props.children
    );
  }
}
