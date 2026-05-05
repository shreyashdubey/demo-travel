"use client";

import { Component, type ReactNode } from "react";

type State = { error: Error | null };

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: unknown) {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line no-console
      console.error("[ErrorBoundary]", error, info);
    }
  }

  reset = () => this.setState({ error: null });

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div className="grid min-h-screen place-items-center bg-night p-8 text-snow">
        <div className="max-w-lg">
          <p className="text-[12px] uppercase tracking-[0.22em] text-alpenglow">
            The mountains threw a stone.
          </p>
          <h1 className="mt-3 font-display text-[40px] leading-tight tracking-tightest">
            Something broke. We're catching it gracefully.
          </h1>
          <pre className="mt-6 overflow-auto rounded-[3px] border border-snow/10 bg-white/5 p-4 text-[12.5px] leading-relaxed text-snow/80">
            {this.state.error.message}
            {this.state.error.stack && "\n\n" + this.state.error.stack.split("\n").slice(0, 6).join("\n")}
          </pre>
          <button
            onClick={this.reset}
            className="mt-6 rounded-full bg-alpenglow px-5 py-2.5 text-[13.5px] font-medium text-pine"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }
}
