import "./App.css";
import React from "react";
import UI_STRINGS from "./ui-strings.json";
import Layout from "antd/es/layout";
import { Header, SheetDisplay, UploadCard } from "./components";
import { FileManagerProvider } from "./context/fileManager";

function App() {
  return (
    <FileManagerProvider>
      <Layout style={{ height: "100%" }}>
        <Layout.Header>
          <Header title={UI_STRINGS.title} />
        </Layout.Header>
        <Layout.Content style={{ height: "100%" }}>
          <main style={{ padding: "1em" }}>
            <SheetDisplay noDataText={UI_STRINGS.noDataText} />
            <UploadCard label={UI_STRINGS.uploadButtonText} />
          </main>
        </Layout.Content>
      </Layout>
    </FileManagerProvider>
  );
}

export default App;
