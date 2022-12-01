// @refresh reload
import { createSignal, createEffect, createContext, useContext } from "solid-js"
import { createStore } from "solid-js/store";
import { Suspense } from "solid-js";
import {A, Body, ErrorBoundary, FileRoutes,
  Head, Html, Meta, Routes, Scripts, Title, } from "solid-start";
import Header from "~/components/Header"
import "./root.css";
import { UserProvider } from "./providers";

export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>Assetium</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
              <Header />
              <Routes>
                <FileRoutes />
              </Routes>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  );
}
