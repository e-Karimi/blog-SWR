/* eslint-disable no-unused-vars */
import axios from "axios";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

const queryErrorHandler = (error) => {
  const textError = error instanceof Error ? error.message : "Error Connecting To Server";

  toast.closeAll();

  toast({
    title: "Error Message :",
    description: textError,
    status: "error",
    duration: 5000,
    isClosable: true,
  });
};

export default function SwrConfigs() {
  const defaultConfig = {
    fetcher: async (url) => await axios.get(url).then((res) => res.data),
    onError: (error, key, config) => {
      return queryErrorHandler(error);
    },
  };

  return defaultConfig;
}
