import Head from "next/head";
import Image from "next/image";
import Header from "../components/header";
import Search from "../components/Search";
import styles from "../styles/Home.module.css";
import { Container, VStack, HStack } from "@chakra-ui/react";
import { Grid, GridItem } from "@chakra-ui/react";
import BlockList from "../components/BlockList";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Ergo Block Explorer</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container my={3} w="1024">
        <VStack w="90%" spacing={8} direction="row">
          <Header />
          <Search />
          <BlockList />
        </VStack>
      </Container>
    </div>
  );
}
