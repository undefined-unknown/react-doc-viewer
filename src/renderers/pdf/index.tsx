import React from "react";
import styled from "styled-components";
import { DocRenderer, IStyledProps } from "../..";
import PDFPages from "./components/pages/PDFPages";
import PDFControls from "./components/PDFControls";
import { PDFProvider } from "./state";
import { pdfjs } from "react-pdf";

// 动态引入 Worker 文件
async function loadPdfWorker() {
  const workerModule = await import("./pdf.worker.min.mjs");
  pdfjs.GlobalWorkerOptions.workerSrc =
    workerModule.WorkerMessageHandler.toString();
}

loadPdfWorker().catch((err) => {
  console.error("Error loading PDF worker:", err);
});

const PDFRenderer: DocRenderer = ({ mainState }) => {
  return (
    <PDFProvider mainState={mainState}>
      <Container id="pdf-renderer" data-testid="pdf-renderer">
        <PDFControls />
        <PDFPages />
      </Container>
    </PDFProvider>
  );
};

export default PDFRenderer;

PDFRenderer.fileTypes = ["pdf", "application/pdf"];
PDFRenderer.weight = 0;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  /* width */
  &::-webkit-scrollbar {
    ${(props: IStyledProps) => {
      return props.theme.disableThemeScrollbar ? "" : "width: 10px";
    }};
  }
  /* Track */
  &::-webkit-scrollbar-track {
    /* background: ${(props: IStyledProps) => props.theme.secondary}; */
  }
  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: ${(props: IStyledProps) => props.theme.tertiary};
  }
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${(props: IStyledProps) => props.theme.primary};
  }
`;
