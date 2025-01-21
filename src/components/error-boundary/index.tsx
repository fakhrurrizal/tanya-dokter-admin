import React, { Component, ErrorInfo, ReactNode } from "react";
import { useRouter, NextRouter } from "next/router";
import Image from "next/image";
import { Button, Grid, Container, Typography } from "@mui/material";

interface Props {
  children?: ReactNode;
  router: NextRouter; // Inject router via HOC
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            direction="column"
            sx={{ minHeight: "100vh", overflow: "hidden" }}
          >
            <Grid item>
              <Typography variant="h3" fontWeight="bold">
                Something Wrong in Servers
              </Typography>
            </Grid>

            <Grid item>
              <Image
                width={500}
                height={400}
                alt="trouble"
                src="/images/trouble.svg"
              />
            </Grid>

            <Grid item>
              <div className="flex gap-[5px]">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => location.reload()}
                >
                  Refresh
                </Button>

                <Button
                  variant="contained"
                  size="large"
                  onClick={() => this.props.router.back()}
                >
                  Kembali
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
      );
    }

    return this.props.children;
  }
}

// Higher-order component to inject the router
function withRouter(Component: typeof ErrorBoundary) {
  function ComponentWithRouterProp(props: Omit<Props, "router">) {
    const router = useRouter();

    return <Component {...props} router={router} />;
  }

  return ComponentWithRouterProp;
}

export default withRouter(ErrorBoundary);
